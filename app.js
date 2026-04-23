/**
 * GPX to RN2 Converter
 * Author: Antigravity AI
 * Year: 2026
 */

// Mapping dictionary for Rally Navigator Icon IDs
const ICON_MAPPING = {
    'reset': '308c7365-bc3f-451b-9e98-531e9015024f',
    'speed_40': '0e5e32f1-0b62-467b-b3b9-9066de77df6f',
    'dz': 'abcf7797-9827-44b1-b061-2e3230c33b5d', // Start Speed
    'fz': '854d3cb4-cee2-4648-aa48-a48ab985a09c', // Finish Speed
    'wpv': 'd08fc9f2-8d64-4708-877d-a66437746f8b', // Visible WP
    'wps': '95e8e77e-6422-4401-a1bc-7f48712df130', // Safety/Secret WP
    'danger_1': '576884ff-4ca3-4ffd-be7c-580a62db85ad',
    'danger_2': 'a6c80c12-49b1-4e68-a21f-a6d48ef0a0ed',
    'danger_3': '10bbbf0f-4703-4c7d-a53a-68ee9c5216cc',
    'dss': '0a1d95e6-3bef-45ff-b605-4f2bcf7735d9', // Start Selective
    'ass': 'ec316c9b-0dcf-4823-ace0-1ed5c570f16f', // Finish Selective
    'fuel': '8f673b0a-7c9e-4c5a-8b0a-5b0a5b0a5b0a', // Fuel
    'caution': 'ce7da75a-abf3-46e4-8eb8-668b27aa870c'
};

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const fileInfo = document.getElementById('file-info');
    const fileNameDisplay = document.getElementById('selected-file-name');
    const convertBtn = document.getElementById('convert-btn');
    const statusMessage = document.getElementById('status-message');

    let selectedFile = null;

    // --- Event Listeners ---
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => { dropZone.classList.remove('drag-over'); });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', (e) => { if (e.target.files.length) handleFile(e.target.files[0]); });
    convertBtn.addEventListener('click', () => { if (selectedFile) processFile(selectedFile); });

    // --- Logic Functions ---
    function handleFile(file) {
        if (!file.name.toLowerCase().endsWith('.gpx')) {
            showStatus('Veuillez sélectionner un fichier .gpx', 'error');
            return;
        }
        selectedFile = file;
        fileNameDisplay.textContent = file.name;
        fileInfo.classList.remove('hidden');
        showStatus('', '');
    }

    function showStatus(text, type) {
        statusMessage.textContent = text;
        statusMessage.className = 'status-message ' + type;
    }

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    async function processFile(file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const xmlContent = e.target.result;
            try {
                const rn2Data = convertGpxToRn2(xmlContent, file.name);
                const safeName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9]/gi, '_').toLowerCase() + ".rn2";
                const downloadLink = prepareDownload(rn2Data, safeName);
                downloadLink.click();
                showStatus('Conversion réussie ! Si le téléchargement n\'a pas démarré, cliquez ici : ', 'success');
                const manualBtn = document.createElement('button');
                manualBtn.textContent = 'Télécharger ' + safeName;
                manualBtn.className = 'btn-primary';
                manualBtn.style.marginLeft = '10px';
                manualBtn.style.padding = '5px 10px';
                manualBtn.style.fontSize = '0.8rem';
                manualBtn.onclick = () => downloadLink.click();
                statusMessage.appendChild(manualBtn);
            } catch (err) {
                console.error(err);
                showStatus('Erreur lors de la conversion : ' + err.message, 'error');
            }
        };
        reader.readAsText(file);
    }

    function convertGpxToRn2(xmlString, fileName) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        
        const trkpts = Array.from(xmlDoc.getElementsByTagName("trkpt"));
        const wpts = Array.from(xmlDoc.getElementsByTagName("wpt"));
        
        // 1. Convert track points to simple objects
        let trackPoints = trkpts.map((pt, index) => ({
            lat: parseFloat(pt.getAttribute("lat")),
            lon: parseFloat(pt.getAttribute("lon")),
            index: index,
            isWaypoint: false
        }));

        // 2. Extract waypoints and find their closest track point index
        let roadbookWaypoints = wpts.map(wpt => {
            const lat = parseFloat(wpt.getAttribute("lat"));
            const lon = parseFloat(wpt.getAttribute("lon"));
            const ele = parseFloat(wpt.getElementsByTagName("ele")[0]?.textContent || 0);
            
            // Find closest index in trackPoints
            let minDict = Infinity;
            let closestIndex = 0;
            trackPoints.forEach((tpt, idx) => {
                let d = Math.pow(tpt.lat - lat, 2) + Math.pow(tpt.lon - lon, 2);
                if (d < minDict) {
                    minDict = d;
                    closestIndex = idx;
                }
            });

            return {
                lat, lon, ele,
                closestIndex: closestIndex,
                isWaypoint: true,
                xmlNode: wpt
            };
        });

        // 3. Create a combined list by inserting waypoints into the track
        // We iterate through track points and insert waypoints at their closest position
        let mergedPoints = [];
        let wptMap = new Map();
        roadbookWaypoints.forEach(w => {
            if (!wptMap.has(w.closestIndex)) wptMap.set(w.closestIndex, []);
            wptMap.get(w.closestIndex).push(w);
        });

        for (let i = 0; i < trackPoints.length; i++) {
            // If waypoints are anchored to this track point, add them first
            if (wptMap.has(i)) {
                wptMap.get(i).forEach(w => mergedPoints.push(w));
            } else {
                mergedPoints.push(trackPoints[i]);
            }
        }

        // 4. Convert to RN2 format
        let rn2Waypoints = mergedPoints.map((pt, idx) => {
            if (pt.isWaypoint) {
                const wpt = pt.xmlNode;
                const extensions = wpt.getElementsByTagName("extensions")[0];
                const reset = extensions?.getElementsByTagName("openrally:reset")[0]?.textContent;
                const speed = extensions?.getElementsByTagName("openrally:speed")[0]?.textContent;
                const wpv = extensions?.getElementsByTagName("openrally:wpv")[0];
                const dz = extensions?.getElementsByTagName("openrally:dz")[0];
                const fz = extensions?.getElementsByTagName("openrally:fz")[0];
                const dss = extensions?.getElementsByTagName("openrally:dss")[0];
                const ass = extensions?.getElementsByTagName("openrally:ass")[0];
                const fuel = extensions?.getElementsByTagName("openrally:fuel")[0];
                const danger = extensions?.getElementsByTagName("openrally:danger")[0]?.textContent;

                const name = wpt.getElementsByTagName("name")[0]?.textContent;
                const desc = wpt.getElementsByTagName("desc")[0]?.textContent;
                const cmt = wpt.getElementsByTagName("cmt")[0]?.textContent;

                // Extract Base64 Images
                const tulipImage = extensions?.getElementsByTagName("openrally:tulip")[0]?.textContent;
                const noteImage = extensions?.getElementsByTagName("openrally:notes")[0]?.textContent;

                let rn2Wpt = {
                    "t_uuid": "wpt_uuid_" + generateUUID(),
                    "waypointid": idx,
                    "lat": pt.lat,
                    "lon": pt.lon,
                    "ele": pt.ele,
                    "show": true,
                    "tulip": { "elements": [] },
                    "notes": { "elements": [], "texts": [] },
                    "overridenSmartTags": { "dataType": "Map", "value": [] }
                };

                // Visual Recovery: Inject Base64 images as custom icons
                if (tulipImage && tulipImage.includes("data:image")) {
                    rn2Wpt.tulip.elements.push({
                        "type": "Icon",
                        "name": "Original Drawing",
                        "id": "img_" + generateUUID(),
                        "src": tulipImage.trim(),
                        "x": 100, "y": 100, "w": 180, "h": 180, "z": 10,
                        "rerender": false,
                        "eId": generateUUID()
                    });
                }

                if (noteImage && noteImage.includes("data:image")) {
                    rn2Wpt.notes.elements.push({
                        "type": "Icon",
                        "name": "Original Note",
                        "id": "img_note_" + generateUUID(),
                        "src": noteImage.trim(),
                        "x": 100, "y": 100, "w": 180, "h": 180, "z": 10,
                        "rerender": false,
                        "eId": generateUUID()
                    });
                }

                // Extract text notes
                // Filter out names that are just numbers (like "001") if desc/cmt exist
                let noteParts = [];
                if (name && (isNaN(name) || name.length > 3)) noteParts.push(name);
                if (desc) noteParts.push(desc);
                if (cmt) noteParts.push(cmt);
                
                let combinedNote = noteParts.filter(t => t && t.length > 0).join('\n');
                if (combinedNote) {
                    rn2Wpt.notes.texts.push({
                        "text": combinedNote,
                        "x": 2.5,
                        "y": 2.5,
                        "w": 195,
                        "h": 100,
                        "fontSize": 14,
                        "lineHeight": 1.2,
                        "eId": generateUUID(),
                        "z": 1
                    });
                }

                if (reset !== undefined) {
                    rn2Wpt.notes.elements.push(createIconElement("Reset", ICON_MAPPING['reset'], `<openrally:reset>${reset}</openrally:reset>`, 30));
                }
                
                let iconX = 80;
                if (speed) {
                    rn2Wpt.notes.elements.push(createIconElement(`Speed Limit ${speed}`, ICON_MAPPING['speed_40'], `<speed>${speed}</speed>`, iconX));
                    iconX += 55;
                }
                if (fuel !== undefined || wpt.getElementsByTagName("openrally:fuel").length > 0) {
                    rn2Wpt.notes.elements.push(createIconElement("Fuel", ICON_MAPPING['fuel'], `<fuel/>`, iconX));
                    iconX += 55;
                }
                if (danger) {
                    let dId = ICON_MAPPING['danger_' + danger] || ICON_MAPPING['danger_2'];
                    rn2Wpt.notes.elements.push(createIconElement(`Danger Level ${danger}`, dId, `<danger>${danger}</danger>`, iconX));
                }

                // Special Waypoint Icons
                if (dss) rn2Wpt.waypointIcon = createWaypointIcon("Start Special", "dss", ICON_MAPPING['dss'], dss);
                else if (ass) rn2Wpt.waypointIcon = createWaypointIcon("Finish Special", "ass", ICON_MAPPING['ass'], ass);
                else if (fz) rn2Wpt.waypointIcon = createWaypointIcon("Finish Speed Limit", "fz", ICON_MAPPING['fz'], fz);
                else if (dz) rn2Wpt.waypointIcon = createWaypointIcon("Start Speed Limit", "dz", ICON_MAPPING['dz'], dz);
                else if (wpv) rn2Wpt.waypointIcon = createWaypointIcon("Visible WP", "wpv", ICON_MAPPING['wpv'], wpv);
                else if (extensions?.getElementsByTagName("openrally:wps")[0]) rn2Wpt.waypointIcon = createWaypointIcon("Secret WP", "wps", ICON_MAPPING['wps'], null);

                return rn2Wpt;
            } else {
                return {
                    "t_uuid": "wpt_uuid_" + generateUUID(),
                    "waypointid": idx,
                    "lat": pt.lat,
                    "lon": pt.lon,
                    "ele": 0,
                    "show": false,
                    "tulip": { "elements": [ { "type": "Track", "roadIn": {"handles": [], "z": 0}, "roadOut": {"handles": [], "z": 0}, "z": 0, "eId": generateUUID() } ] },
                    "notes": { "elements": [], "texts": [] },
                    "overridenSmartTags": { "dataType": "Map", "value": [] }
                };
            }
        });

        return {
            "route": {
                "version": 4,
                "name": fileName.replace('.gpx', ''),
                "description": "Converted from GPX OpenRally",
                "current_style": "cross_country",
                "waypoints": rn2Waypoints,
                "settings": {
                    "units": "metric",
                    "coordFormat": 1,
                    "showHighlight": true,
                    "showDistanceTickMark": true,
                    "showCoordinates": false,
                    "hundredthsStyle": "on"
                }
            }
        };
    }

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    function createIconElement(name, id, gpxTag, x = 99.5, y = 54.5) {
        return { "name": name, "id": id, "src": `/icons/${id}.svg`, "gpx_tags": gpxTag, "disabled": false, "system": true, "eId": generateUUID(), "type": "Icon", "angle": 0, "w": 50, "x": x, "y": y, "rerender": false };
    }

    function createWaypointIcon(name, type, id, xmlNode) {
        const options = {};
        if (xmlNode) for (let attr of xmlNode.attributes) options[attr.name] = parseInt(attr.value);
        return { "name": name, "id": id, "src": `/icons/${id}.svg`, "type": type, "options": options, "system": true, "eId": generateUUID() };
    }

    function prepareDownload(data, filename) {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename; a.style.display = 'none';
        document.body.appendChild(a);
        return a;
    }
});
