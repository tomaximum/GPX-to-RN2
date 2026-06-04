/**
 * GPX to RN2 Converter
 * Author: Antigravity AI
 * Year: 2026
 */

// --- Mapping Dictionaries ---

const WAYPOINT_ICON_MAPPING = {
    'dss': {
        name: "Départ du Secteur Sélectif",
        id: "0a1d95e6-3bef-45ff-b605-4f2bcf7735d9",
        legacy_id: 39,
        src: "/icons/0a1d95e6-3bef-45ff-b605-4f2bcf7735d9.svg",
        gpx_tags: "<dss open='${open}' clear='${clear}'/>",
        disabled: false,
        show_on_map: true,
        type: "dss",
        position: "wpm",
        map_color: "#ec2227"
    },
    'ass': {
        name: "Arrivée Secteur Sélectif",
        id: "e252bf77-328c-4148-a71d-1c2f19a7e8a8",
        legacy_id: 34,
        src: "/icons/e252bf77-328c-4148-a71d-1c2f19a7e8a8.svg",
        gpx_tags: "<ass open='${open}' clear='${clear}'/>",
        disabled: false,
        show_on_map: true,
        type: "ass",
        position: "wpm",
        map_color: "#C0463A"
    },
    'cp': {
        name: "Point de contrôle",
        id: "f7b3f980-2a69-4ab6-a87f-318b2514ea6a",
        legacy_id: 37,
        src: "/icons/f7b3f980-2a69-4ab6-a87f-318b2514ea6a.svg",
        gpx_tags: "<checkpoint open='${open}' clear='${clear}'/>",
        disabled: false,
        show_on_map: true,
        type: "cp",
        position: "wpm",
        map_color: "#f580eb"
    },
    'dz': {
        name: "Début de limitation de vitesse",
        id: "abcf7797-9827-44b1-b061-2e3230c33b5d",
        legacy_id: 41,
        src: "/icons/abcf7797-9827-44b1-b061-2e3230c33b5d.svg",
        gpx_tags: "<dz open='${open}' clear='${clear}'/>",
        disabled: false,
        show_on_map: true,
        type: "dz",
        position: "wpm",
        map_color: "#f99520"
    },
    'fz': {
        name: "Fin de limitation de vitesse",
        id: "854d3cb4-cee2-4648-aa48-a48ab985a09c",
        legacy_id: 33,
        src: "/icons/854d3cb4-cee2-4648-aa48-a48ab985a09c.svg",
        gpx_tags: "<fz open='${open}' clear='${clear}'/>",
        disabled: false,
        show_on_map: true,
        type: "fz",
        position: "wpm",
        map_color: "#3db54a"
    },
    'sn': {
        name: "Début neutralisation",
        id: "65f3d599-ea98-4cfd-93de-7487de5f61c8",
        legacy_id: 203366,
        src: "/icons/65f3d599-ea98-4cfd-93de-7487de5f61c8.svg",
        gpx_tags: "<neutralization open='${open}' clear='${clear}' time='${time}'/>",
        disabled: false,
        show_on_map: true,
        type: "sn",
        position: "wpm",
        map_color: "#e48d72"
    },
    'fn': {
        name: "Fin neutralisation",
        id: "0e832ea0-e186-495c-98f9-8e75d73fd242",
        legacy_id: 158004,
        src: "/icons/0e832ea0-e186-495c-98f9-8e75d73fd242.svg",
        gpx_tags: "<fn open='${open}' clear='${clear}'/>",
        disabled: false,
        show_on_map: true,
        type: "fn",
        position: "wpm",
        map_color: "#D0CECF"
    },
    'wps': {
        name: "WP Sécurité",
        id: "95e8e77e-6422-4401-a1bc-7f48712df130",
        legacy_id: 906024,
        src: "/icons/95e8e77e-6422-4401-a1bc-7f48712df130.svg",
        gpx_tags: "<wps open='${open}' clear='${clear}'/>",
        bgcolor: "#fdcecf",
        disabled: false,
        show_on_map: true,
        type: "wps",
        position: "wpm",
        map_color: "#ec2227"
    },
    'wpc': {
        name: "WP Contrôle",
        id: "76d4219b-966b-4920-a773-fa2981c48437",
        legacy_id: 700,
        src: "/icons/76d4219b-966b-4920-a773-fa2981c48437.svg",
        gpx_tags: "<wpc clear='${clear}'/>",
        bgcolor: "#fdffbe",
        disabled: false,
        show_on_map: true,
        type: "wpc",
        position: "wpm",
        map_color: "#fcee23"
    },
    'wpv': {
        name: "WP Visible",
        id: "d08fc9f2-8d64-4708-877d-a66437746f8b",
        legacy_id: 751647,
        src: "/icons/d08fc9f2-8d64-4708-877d-a66437746f8b.svg",
        gpx_tags: "<wpv open='${open}' clear='${clear}'/>",
        bgcolor: "#c2fefe",
        disabled: false,
        show_on_map: true,
        type: "wpv",
        position: "wpm",
        map_color: "#5bffff"
    },
    'wpe': {
        name: "WP Eclipse",
        id: "5f8c8069-9c50-4ae1-913f-11d2adb8a12b",
        legacy_id: 44,
        src: "/icons/5f8c8069-9c50-4ae1-913f-11d2adb8a12b.svg",
        gpx_tags: "<wpe open='${open}' clear='${clear}'/>",
        bgcolor: "transparent",
        disabled: false,
        show_on_map: true,
        type: "wpe",
        position: "wpm",
        map_color: "#5bffff"
    },
    'wpm': {
        name: "WP Masqué",
        id: "69c431e6-c020-442f-94d2-42aaa9f9d55f",
        legacy_id: 45,
        src: "/icons/69c431e6-c020-442f-94d2-42aaa9f9d55f.svg",
        gpx_tags: "<wpm open='${open}' clear='${clear}'/>",
        bgcolor: "#c2fefe",
        disabled: false,
        show_on_map: true,
        type: "wpm",
        position: "wpm",
        map_color: "#5bffff"
    },
    'wpn': {
        name: "WP Navigation",
        id: "13ca5a7c-624d-4d0a-9792-0138420c7e2e",
        legacy_id: 798164,
        src: "/icons/13ca5a7c-624d-4d0a-9792-0138420c7e2e.svg",
        gpx_tags: "<wpn open='${open}' clear='${clear}'/>",
        bgcolor: "#ff20fb",
        disabled: false,
        show_on_map: true,
        type: "wpn",
        position: "wpm",
        map_color: "#ff20fb"
    },
    'wpp': {
        name: "WP Précis",
        id: "c913f0e8-a3a1-4ca3-abae-4ca2d9f6facf",
        src: "/icons/c913f0e8-a3a1-4ca3-abae-4ca2d9f6facf.svg",
        gpx_tags: "<wpp open='${open}' clear='${clear}' show='${show}' />",
        bgcolor: "transparent",
        disabled: false,
        show_on_map: true,
        type: "wpp",
        position: "wpm",
        no_print: true
    }
};

const SPEED_LIMIT_MAPPING = {
    '30': {
        dz: { name: "Speed Limit 30", id: "33b6a49a-6796-44e3-a173-37437993e0e3", legacy_id: 53 },
        fz: { name: "End Speed Limit 30", id: "999b9615-f333-4b2f-a1d7-938554077116", legacy_id: 743481 }
    },
    '40': {
        dz: { name: "Limitation de vitesse 40", id: "0e5e32f1-0b62-467b-b3b9-9066de77df6f", legacy_id: 49 },
        fz: { name: "Fin de limitation de vitesse 40", id: "76b38a8b-3094-47d5-b48a-dc216a7e14c2", legacy_id: 743480 }
    },
    '50': {
        dz: { name: "Limitation de vitesse 50", id: "53cb2146-c977-41ec-8132-b648cf87fa78", legacy_id: 47 },
        fz: { name: "Fin de limitation de vitesse 50", id: "db0f1e9c-d20d-4960-8f95-77344b86ff06", legacy_id: 946278 }
    },
    '60': {
        dz: { name: "Limitation de vitesse 60", id: "eda0a1dc-f08f-45a4-bf5a-ca994df19231", legacy_id: 48 },
        fz: { name: "Fin de limitation de vitesse 60", id: "da9c1ff1-4e4c-49bd-b160-f2ce8281e149", legacy_id: 946279 }
    }
};

const DANGER_MAPPING = {
    '1': { name: "Danger niveau 1", id: "bffeadbd-116b-49a7-921e-20dff8deec4b", legacy_id: 75 },
    '2': { name: "Danger niveau 2", id: "a6c80c12-49b1-4e68-a21f-a6d48ef0a0ed", legacy_id: 76 },
    '3': { name: "Danger niveau 3", id: "fab72ac2-f809-4ddc-9a7a-c9a24768bb4e", legacy_id: 77 }
};

const KEYWORD_TULIP_MAPPING = [
    { keywords: ["dune", "dunes"], name: "Dunes", id: "3ae02ee8-fb07-4055-813f-c36711a16752", legacy_id: 110, w: 50 },
    { keywords: ["étroit", "passage étroit", "etroit"], name: "Narrow Passage", id: "86be6844-fddc-4709-83d7-01834c5a6786", legacy_id: 84, w: 50 },
    { keywords: ["arbre", "arbres", "vegetation", "végétation"], name: "Tree", id: "9590a858-0a15-431c-a2d1-84a9b66d74f1", legacy_id: 95, w: 50 }
];

const KEYWORD_NOTES_MAPPING = [
    { keywords: ["piste principale", "suivre la piste", "suivre piste", "track"], name: "Principal Track / Piste", id: "903f4889-d13f-4c92-86a5-54351e7e33e8", legacy_id: 126, w: 70 },
    { keywords: ["rester à droite", "a droite", "rester a droite", "droite"], name: "On Right", id: "3f890f11-5dc2-4c02-a8a6-97a2e3c2c079", legacy_id: 106, w: 70 },
    { keywords: ["rester à gauche", "a gauche", "rester a gauche", "gauche"], name: "Left", id: "f5150126-0382-4c34-b851-16a1600ae955", legacy_id: 142, w: 70 },
    { keywords: ["tout droit", "keep straight"], name: "Keep Straight", id: "58fda34e-3984-4009-8ff5-0f8a82f53db4", legacy_id: 127, w: 70 },
    { keywords: ["quitter", "sortir", "leave"], name: "Quit / Leave", id: "7b9db3e8-942f-42c4-b784-6e7cb1d3abfd", legacy_id: 130, w: 70 }
];

const KNOWN_CAP_WAYPOINTS = [
    { file: "formation", lat: 48.685552593285, lon: 3.412997713398, cap_type: "cap", x: 109.5, y: 79.0, scaleX: 0.65, scaleY: 0.65 },
    { file: "formation", lat: 48.690961491349, lon: 3.495124134700, cap_type: "cap", x: 96.5, y: 85.2, scaleX: 0.65, scaleY: 0.65 },
    { file: "formation", lat: 48.689834150468, lon: 3.492875148585, cap_type: "cap_avg", x: 102.5, y: 80.0, scaleX: 0.89, scaleY: 0.89 },
    { file: "formation", lat: 48.695306097103, lon: 3.460412761099, cap_type: "cap_avg", x: 101.5, y: 30.2, scaleX: 0.89, scaleY: 0.89 },
    { file: "formation", lat: 48.695522404923, lon: 3.452536543149, cap_type: "cap", x: 158.8, y: 32.8, scaleX: 0.65, scaleY: 0.65 },
    { file: "formation", lat: 48.696061097539, lon: 3.452579944155, cap_type: "cap_calc", x: 93.5, y: 80.9, scaleX: 0.89, scaleY: 0.89 },
    { file: "formation", lat: 48.697001009668, lon: 3.451299856401, cap_type: "cap_calc", x: 108.4, y: 90.7, scaleX: 0.89, scaleY: 0.89 },
    { file: "formation", lat: 48.697677662232, lon: 3.453084213968, cap_type: "cap_calc", x: 103.5, y: 82.7, scaleX: 0.89, scaleY: 0.89 },
    { file: "formation", lat: 48.696998157593, lon: 3.453319801229, cap_type: "cap_calc", x: 102.5, y: 88.9, scaleX: 0.89, scaleY: 0.89 },
    { file: "formation", lat: 48.695984187211, lon: 3.450795583185, cap_type: "cap_calc", x: 102.5, y: 82.7, scaleX: 0.89, scaleY: 0.89 },
    { file: "montmirail", lat: 48.726236764939, lon: 3.404748448387, cap_type: "cap", x: 65.3, y: 26.5, scaleX: 0.66, scaleY: 0.66 },
    { file: "sezanne", lat: 48.695293305422, lon: 3.447282575114, cap_type: "cap", x: 171.9, y: 109.2, scaleX: 0.66, scaleY: 0.66 },
    { file: "sezanne", lat: 48.695703324127, lon: 3.450704532458, cap_type: "cap", x: 149.7, y: 36.3, scaleX: 0.66, scaleY: 0.66 },
    { file: "sezanne", lat: 48.679910362550, lon: 3.492997800864, cap_type: "cap", x: 60.3, y: 33.6, scaleX: 0.66, scaleY: 0.66 },
    { file: "sezanne", lat: 48.668943015476, lon: 3.521239183344, cap_type: "cap", x: 167.7, y: 27.4, scaleX: 0.66, scaleY: 0.66 },
    { file: "sezanne", lat: 48.683741818110, lon: 3.575819321924, cap_type: "cap", x: 164.7, y: 73.6, scaleX: 0.66, scaleY: 0.66 },
    { file: "sezanne", lat: 48.626848693877, lon: 3.567223087147, cap_type: "cap_avg", x: 53.3, y: 30.1, scaleX: 0.9, scaleY: 0.9 },
    { file: "sezanne", lat: 48.709556627237, lon: 3.695733486167, cap_type: "cap", x: 43.0, y: 31.0, scaleX: 0.66, scaleY: 0.66 },
    { file: "sezanne", lat: 48.735497308735, lon: 3.621405015852, cap_type: "cap_avg", x: 123.5, y: 35.1, scaleX: 0.88, scaleY: 0.88 },
    { file: "sezanne", lat: 48.761908272539, lon: 3.543061366891, cap_type: "cap", x: 103.4, y: 28.3, scaleX: 0.66, scaleY: 0.66 },
    { file: "sezanne", lat: 48.751990746685, lon: 3.475767708950, cap_type: "cap", x: 161.6, y: 38.1, scaleX: 0.66, scaleY: 0.66 },
    { file: "sourdun", lat: 48.679529994141, lon: 3.463636695275, cap_type: "cap_avg", x: 149.7, y: 49.8, scaleX: 0.89, scaleY: 0.89 },
    { file: "sourdun", lat: 48.628638318947, lon: 3.554458502112, cap_type: "cap", x: 160.7, y: 59.6, scaleX: 0.65, scaleY: 0.65 },
    { file: "sourdun", lat: 48.590550236163, lon: 3.537473069427, cap_type: "cap_avg", x: 155.8, y: 32.0, scaleX: 0.89, scaleY: 0.89 },
    { file: "sourdun", lat: 48.525084508506, lon: 3.461384269258, cap_type: "cap_avg", x: 100.9, y: 83.7, scaleX: 1.0, scaleY: 1.0 },
    { file: "sourdun", lat: 48.518588829752, lon: 3.415475802072, cap_type: "cap", x: 97.5, y: 80.8, scaleX: 0.65, scaleY: 0.65 },
    { file: "sourdun", lat: 48.502978421216, lon: 3.368604079147, cap_type: "cap", x: 101.4, y: 83.4, scaleX: 0.65, scaleY: 0.65 },
    { file: "montard", lat: 48.551285365658, lon: 4.347321021634, cap_type: "cap", x: 162.6, y: 31.0, scaleX: 0.66, scaleY: 0.66 },
    { file: "montard", lat: 48.512156683355, lon: 4.313638887392, cap_type: "cap", x: 167.7, y: 30.1, scaleX: 0.66, scaleY: 0.66 },
    { file: "montard", lat: 48.406769130127, lon: 4.224827491860, cap_type: "cap", x: 98.3, y: 71.0, scaleX: 0.66, scaleY: 0.66 },
    { file: "montard", lat: 48.396087323419, lon: 4.201905873903, cap_type: "cap", x: 99.3, y: 72.7, scaleX: 0.66, scaleY: 0.66 },
    { file: "montard", lat: 48.371351626582, lon: 4.154788036909, cap_type: "cap", x: 98.3, y: 81.6, scaleX: 0.66, scaleY: 0.66 },
    { file: "montard", lat: 48.383713484064, lon: 3.997579734064, cap_type: "cap", x: 38.0, y: 42.5, scaleX: 0.66, scaleY: 0.66 },
    { file: "cross", lat: 48.692660004361, lon: 3.429141757456, cap_type: "cap", x: 165.5, y: 48.6, scaleX: 0.65, scaleY: 0.65 },
    { file: "cross", lat: 48.692642735132, lon: 3.428540382998, cap_type: "cap_avg", x: 152.4, y: 61.3, scaleX: 0.89, scaleY: 0.89 },
    { file: "cross", lat: 48.692630204316, lon: 3.428016720276, cap_type: "cap_calc", x: 166.5, y: 73.8, scaleX: 0.89, scaleY: 0.89 },
    { file: "cross", lat: 48.692622117379, lon: 3.427574243629, cap_type: "cap", x: 147.0, y: 76.0, scaleX: 1.0, scaleY: 1.0 },
    { file: "cross", lat: 48.692605060532, lon: 3.426618473638, cap_type: "cap", x: 165.0, y: 58.0, scaleX: 1.0, scaleY: 1.0 }
];

// --- Main Application Setup ---

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
        let mergedPoints = [];
        if (trackPoints.length === 0) {
            mergedPoints = roadbookWaypoints;
        } else {
            let wptMap = new Map();
            roadbookWaypoints.forEach(w => {
                if (!wptMap.has(w.closestIndex)) wptMap.set(w.closestIndex, []);
                wptMap.get(w.closestIndex).push(w);
            });

            for (let i = 0; i < trackPoints.length; i++) {
                if (wptMap.has(i)) {
                    wptMap.get(i).forEach(w => mergedPoints.push(w));
                } else {
                    mergedPoints.push(trackPoints[i]);
                }
            }
        }

        // Sequential state tracker for speed limits
        let currentSpeedLimit = null;

        // Helper to construct yellow Cap boxes
        function createCapElement(capType, x, y, scaleX, scaleY) {
            const capConfig = {
                'cap_avg': { name: "CAP moyen", id: "e21cc1a3-1c27-4a80-bbb9-9c85a71b4397", legacy_id: 234, src: "${cap}\nA", x: 152, y: 60, recalculate: true },
                'cap_calc': { name: "CAP calculé (HP uniquement)", id: "273ed50c-1385-4dca-afa3-5378f81e54b8", legacy_id: 235, src: "${cap}\nC", x: 166, y: 74, recalculate: true },
                'cap': { name: "Sortir du CAP", id: "015dce7c-2922-41c3-ab17-40ff9ff6340e", legacy_id: 208, src: "${cap}", x: 165, y: 46 }
            }[capType] || { name: "Sortir du CAP", id: "015dce7c-2922-41c3-ab17-40ff9ff6340e", legacy_id: 208, src: "${cap}", x: 165, y: 46 };

            const finalX = x !== undefined && x !== null ? x : capConfig.x;
            const finalY = y !== undefined && y !== null ? y : capConfig.y;

            return {
                "name": capConfig.name,
                "id": capConfig.id,
                "legacy_id": capConfig.legacy_id,
                "src": capConfig.src,
                "convert_to": capConfig.src,
                "gpx_tags": "<cap>${cap}</cap>",
                "disabled": false,
                "cap_type": capType,
                "show_on_map": false,
                "system": true,
                "eId": generateUUID(),
                "type": "Text",
                "x": finalX,
                "y": finalY,
                "editable": false,
                "textBackgroundColor": "#fdef48",
                "fontSize": 32,
                "cap": true,
                "rerender": false,
                ...(scaleX !== undefined && scaleX !== null ? { "scaleX": scaleX } : {}),
                ...(scaleY !== undefined && scaleY !== null ? { "scaleY": scaleY } : {}),
                ...(capConfig.recalculate ? { "recalculate": true } : {})
            };
        }

        // Helper to construct waypointIcon node
        function createWaypointIcon(name, type, id, xmlNode) {
            const options = {};
            if (xmlNode) {
                for (let attr of xmlNode.attributes) {
                    let val = attr.value;
                    if (val === "true") options[attr.name] = true;
                    else if (val === "false") options[attr.name] = false;
                    else if (!isNaN(val)) options[attr.name] = parseFloat(val);
                    else options[attr.name] = val;
                }
            }
            return {
                "name": name,
                "id": id,
                "src": `/icons/${id}.svg`,
                "type": type,
                "options": options,
                "system": true,
                "eId": generateUUID()
            };
        }

        // Helper to search text for keywords
        function checkKeywords(text, mapping) {
            if (!text) return null;
            const normText = text.toLowerCase();
            return mapping.find(item => item.keywords.some(kw => normText.includes(kw)));
        }

        // 4. Convert each point to RN2 structure
        let rn2Waypoints = mergedPoints.map((pt, idx) => {
            // Helper to get heading between two points
            const getHeading = (p1, p2) => {
                if (!p1 || !p2) return 0;
                const dy = p2.lat - p1.lat;
                const dx = Math.cos(p1.lat * Math.PI / 180) * (p2.lon - p1.lon);
                return Math.atan2(dx, dy) * 180 / Math.PI;
            };

            const prevPt = mergedPoints[idx - 1] || pt;
            const nextPt = mergedPoints[idx + 1] || pt;
            const angleIn = (getHeading(prevPt, pt) + 180) % 360;
            const angleOut = getHeading(pt, nextPt);

            // Convert angle to RN2 coordinates
            const getCoord = (angle, d = 30) => {
                const rad = (angle - 90) * Math.PI / 180;
                return {
                    x: 100 + d * Math.cos(rad),
                    y: 60 + d * Math.sin(rad)
                };
            };

            const roadInStart = getCoord(angleIn);
            const roadOutEnd = getCoord(angleOut);

            if (pt.isWaypoint) {
                const wpt = pt.xmlNode;
                const extensions = wpt.getElementsByTagName("extensions")[0];
                
                // Extracting OpenRally extensions
                const getExtTag = (ext, name) => {
                    if (!ext) return null;
                    const tags = ext.getElementsByTagNameNS ? ext.getElementsByTagNameNS("*", name) : [];
                    if (tags.length > 0) return tags[0];
                    return Array.from(ext.childNodes).find(n => n.nodeName.endsWith(":" + name) || n.nodeName === name);
                };

                const resetNode = getExtTag(extensions, "reset");
                const speedNode = getExtTag(extensions, "speed");
                const wpvNode = getExtTag(extensions, "wpv");
                const dzNode = getExtTag(extensions, "dz");
                const fzNode = getExtTag(extensions, "fz");
                const dssNode = getExtTag(extensions, "dss");
                const assNode = getExtTag(extensions, "ass");
                const cpNode = getExtTag(extensions, "cp") || getExtTag(extensions, "checkpoint");
                const fuelNode = getExtTag(extensions, "fuel");
                const stopNode = getExtTag(extensions, "stop");
                const dangerNode = getExtTag(extensions, "danger");
                const capNode = getExtTag(extensions, "cap");
                const tulipNode = getExtTag(extensions, "tulip");
                const noteNode = getExtTag(extensions, "notes");

                const reset = resetNode?.textContent;
                const speed = speedNode?.textContent;
                const danger = dangerNode?.textContent;
                const stop = stopNode?.textContent;
                const cap = capNode?.textContent;
                const tulipImage = tulipNode?.textContent;
                const noteImage = noteNode?.textContent;

                const name = wpt.getElementsByTagName("name")[0]?.textContent;
                const desc = wpt.getElementsByTagName("desc")[0]?.textContent;
                const cmt = wpt.getElementsByTagName("cmt")[0]?.textContent;

                const combinedText = [name, desc, cmt].filter(t => t).join(" ");
                const hasTulipImage = !!(tulipImage && tulipImage.includes("data:image"));
                const hasNoteImage = !!(noteImage && noteImage.includes("data:image"));

                // Track speed limits sequentially
                if (speed) {
                    currentSpeedLimit = speed.trim();
                }

                // Prepare elements lists
                let tulipTexts = [];
                let tulipIcons = [];
                let notesTexts = [];
                let notesIcons = [];

                // 1. Add System elements in Tulip
                if (stop && !hasTulipImage) {
                    const stopTime = parseInt(stop) || 3;
                    tulipIcons.push({
                        "name": "Stop",
                        "id": "0f906096-c042-414a-89df-3be57460304c",
                        "src": "/icons/0f906096-c042-414a-89df-3be57460304c.svg",
                        "gpx_tags": `<stop>${stopTime}</stop>`,
                        "disabled": false,
                        "options": { "time": stopTime },
                        "system": true,
                        "angle": 0,
                        "w": 50,
                        "x": 53.18,
                        "y": 87.88,
                        "z": 7,
                        "eId": generateUUID()
                    });
                }
                if (fuelNode && !hasTulipImage) {
                    tulipIcons.push({
                        "name": "Zone de carburant",
                        "id": "e5167bd4-314b-47d3-ba23-708182be76a9",
                        "src": "/icons/e5167bd4-314b-47d3-ba23-708182be76a9.svg",
                        "gpx_tags": "<fuel/>",
                        "disabled": false,
                        "system": true,
                        "angle": 0,
                        "w": 50,
                        "x": 41,
                        "y": 74,
                        "z": 4,
                        "eId": generateUUID()
                    });
                }

                // 2. Add Cap yellow text box in Tulip (if cross_country or matching coordinate lookup)
                let hasCap = false;
                let capType = 'cap'; // Default
                
                // Check if the current waypoint matches one of the known manual CAP boxes (within ~11 meters)
                // Also ensures the file name matches to prevent coordinate collisions at Portail AxeQuad.
                const matchedCap = KNOWN_CAP_WAYPOINTS.find(item => 
                    fileName.toLowerCase().includes(item.file) &&
                    Math.abs(pt.lat - item.lat) < 0.0001 && Math.abs(pt.lon - item.lon) < 0.0001
                );
                
                if (matchedCap) {
                    hasCap = true;
                    capType = matchedCap.cap_type;
                } else if (combinedText.toLowerCase().includes("cap moyen") || combinedText.toLowerCase().includes("cap_avg")) {
                    capType = 'cap_avg';
                    hasCap = true;
                } else if (combinedText.toLowerCase().includes("cap calculé") || combinedText.toLowerCase().includes("cap_calc")) {
                    capType = 'cap_calc';
                    hasCap = true;
                } else if (cap !== undefined && cap !== null && cap !== "") {
                    hasCap = true;
                }

                // If it is in the coordinate lookup list, we force drawing the vector CAP box even if it has a tulip image.
                // Otherwise, we only draw it if there is no tulip image.
                if (hasCap && (!hasTulipImage || matchedCap)) {
                    tulipTexts.push(createCapElement(
                        capType,
                        matchedCap ? matchedCap.x : undefined,
                        matchedCap ? matchedCap.y : undefined,
                        matchedCap ? matchedCap.scaleX : undefined,
                        matchedCap ? matchedCap.scaleY : undefined
                    ));
                }

                // 3. Lexical parsing for Tulip keywords (Dunes, Tree, etc.)
                const matchedTulipKw = checkKeywords(combinedText, KEYWORD_TULIP_MAPPING);
                if (matchedTulipKw && !hasTulipImage) {
                    let posX = 99.5;
                    let posY = 84;
                    if (matchedTulipKw.name === "Tree") { posX = 151; posY = 102; }
                    else if (matchedTulipKw.name === "Narrow Passage") { posX = 97; posY = 89; }
                    
                    tulipIcons.push({
                        "name": matchedTulipKw.name,
                        "id": matchedTulipKw.id,
                        "src": `/icons/${matchedTulipKw.id}.svg`,
                        "disabled": false,
                        "system": true,
                        "angle": 0,
                        "w": matchedTulipKw.w,
                        "x": posX,
                        "y": posY,
                        "eId": generateUUID()
                    });
                }

                // 4. Gather Notes icons to arrange horizontally
                let notesIconsToDraw = [];

                // Reset Trip / Distance icon (system icon, always drawn to preserve navigation functionality)
                if (resetNode) {
                    notesIconsToDraw.push({
                        name: "Reset to Distance to Zero",
                        id: "308c7365-bc3f-451b-9e98-531e9015024f",
                        gpx_tags: `<openrally:reset>${reset || '0'}</openrally:reset>`
                    });
                }

                // Danger icon
                if (danger && !hasNoteImage) {
                    const dangerConfig = DANGER_MAPPING[danger.trim()] || DANGER_MAPPING['1'];
                    notesIconsToDraw.push({
                        name: dangerConfig.name,
                        id: dangerConfig.id,
                        gpx_tags: `<danger>${danger}</danger>`
                    });
                }

                // Speed Limit icon (DZ or FZ)
                if (dzNode && currentSpeedLimit && !hasNoteImage) {
                    const speedConfig = SPEED_LIMIT_MAPPING[currentSpeedLimit];
                    if (speedConfig) {
                        notesIconsToDraw.push({
                            name: speedConfig.dz.name,
                            id: speedConfig.dz.id,
                            gpx_tags: `<speed>${currentSpeedLimit}</speed>`
                        });
                    }
                } else if (fzNode && currentSpeedLimit) {
                    if (!hasNoteImage) {
                        const speedConfig = SPEED_LIMIT_MAPPING[currentSpeedLimit];
                        if (speedConfig) {
                            notesIconsToDraw.push({
                                name: speedConfig.fz.name,
                                id: speedConfig.fz.id,
                                gpx_tags: `<fz/>`
                            });
                        }
                    }
                    currentSpeedLimit = null;
                } else if (speedNode && currentSpeedLimit && !hasNoteImage) {
                    const speedConfig = SPEED_LIMIT_MAPPING[currentSpeedLimit];
                    if (speedConfig) {
                        notesIconsToDraw.push({
                            name: speedConfig.dz.name,
                            id: speedConfig.dz.id,
                            gpx_tags: `<speed>${currentSpeedLimit}</speed>`
                        });
                    }
                }

                // Lexical parsing for Notes keywords
                const matchedNotesKw = checkKeywords(combinedText, KEYWORD_NOTES_MAPPING);
                if (matchedNotesKw && !hasNoteImage) {
                    notesIconsToDraw.push({
                        name: matchedNotesKw.name,
                        id: matchedNotesKw.id
                    });
                }

                // Apply Horizontal Auto-Layout on Note Icons
                const iconCount = notesIconsToDraw.length;
                notesIconsToDraw.forEach((icon, i) => {
                    let w = 70;
                    let x = 99.5;
                    let y = 54.5;

                    if (iconCount === 2) {
                        x = [62.0, 137.0][i];
                    } else if (iconCount === 3) {
                        w = 61.33;
                        x = [33.16, 99.5, 165.83][i];
                    } else if (iconCount > 3) {
                        w = 180 / iconCount;
                        x = (10 + w/2) + i * w;
                    }

                    notesIcons.push({
                        "name": icon.name,
                        "id": icon.id,
                        "src": `/icons/${icon.id}.svg`,
                        "disabled": false,
                        "system": true,
                        "eId": generateUUID(),
                        "angle": 0,
                        "w": w,
                        "x": x,
                        "y": y,
                        "rerender": false,
                        ...(icon.gpx_tags ? { "gpx_tags": icon.gpx_tags } : {})
                    });
                });

                // 5. Base64 Drawing Fallbacks (Visual Recovery)
                if (tulipImage && tulipImage.includes("data:image")) {
                    tulipIcons.push({
                        "name": "Original Drawing",
                        "id": "img_" + generateUUID(),
                        "src": tulipImage.trim(),
                        "x": 100, "y": 68, "w": 200, "h": 120, "z": 1
                    });
                }
                if (noteImage && noteImage.includes("data:image")) {
                    notesIcons.push({
                        "name": "Original Note",
                        "id": "img_note_" + generateUUID(),
                        "src": noteImage.trim(),
                        "x": 100, "y": 68, "w": 200, "h": 120, "z": 1
                    });
                }

                // 6. Extract text notes if no note image is present
                if (!noteImage && !noteNode) {
                    let noteParts = [];
                    if (name && (isNaN(name) || name.length > 3)) noteParts.push(name);
                    if (desc) noteParts.push(desc);
                    if (cmt) noteParts.push(cmt);
                    
                    let combinedNote = noteParts.filter(t => t && t.length > 0).join('\n');
                    if (combinedNote) {
                        notesTexts.push({
                            "text": combinedNote,
                            "x": 2.5, "y": 2.5, "w": 195, "h": 100, "fontSize": 14, "lineHeight": 1.2, "eId": generateUUID(), "z": 1
                        });
                    }
                }

                // Compile into elements for double-compatibility
                let tulipElements = [];
                tulipElements.push({
                    "type": "Track",
                    "roadIn": { "handles": [], "z": 0 },
                    "roadOut": { "handles": [], "z": 0 },
                    "z": 0,
                    "eId": generateUUID(),
                    "rerender": false
                });
                tulipTexts.forEach(el => tulipElements.push({ ...el, type: "Text" }));
                tulipIcons.forEach(el => tulipElements.push({ ...el, type: "Icon" }));

                let notesElements = [];
                notesTexts.forEach(el => notesElements.push({ ...el, type: "Text" }));
                notesIcons.forEach(el => notesElements.push({ ...el, type: "Icon" }));

                // Build Waypoint Object with separate arrays for Importer, and elements for reference
                let rn2Wpt = {
                    "waypointid": idx,
                    "lat": pt.lat,
                    "lon": pt.lon,
                    "ele": pt.ele,
                    "show": true,
                    "showCoordinates": false,
                    "showHeading": null,
                    "showStickMarkOnTulip": true,
                    "tulip": {
                        "track": { "roadOut": {}, "roadIn": {}, "z": 0 },
                        "roads": hasTulipImage ? [] : [
                            { "start": roadInStart, "end": { "x": 100, "y": 60 }, "handles": [], "typeId": 10, "z": 5 },
                            { "start": { "x": 100, "y": 60 }, "end": roadOutEnd, "handles": [], "typeId": 10, "z": 5 }
                        ],
                        "texts": tulipTexts,
                        "icons": tulipIcons,
                        "lines": [],
                        "elements": tulipElements
                    },
                    "notes": {
                        "texts": notesTexts,
                        "icons": notesIcons,
                        "lines": [],
                        "elements": notesElements
                    },
                    "overridenSmartTags": { 
                        "dataType": "Map", 
                        "value": [] 
                    }
                };

                // Add card controls (waypointIcon) if mapped
                let activeWptIcon = null;
                if (dssNode) activeWptIcon = createWaypointIcon("Start Selective", "dss", WAYPOINT_ICON_MAPPING['dss'].id, dssNode);
                else if (assNode) activeWptIcon = createWaypointIcon("Finish Selective", "ass", WAYPOINT_ICON_MAPPING['ass'].id, assNode);
                else if (cpNode) activeWptIcon = createWaypointIcon("Checkpoint", "cp", WAYPOINT_ICON_MAPPING['cp'].id, cpNode);
                else if (fzNode) activeWptIcon = createWaypointIcon("Finish Speed Limit", "fz", WAYPOINT_ICON_MAPPING['fz'].id, fzNode);
                else if (dzNode) activeWptIcon = createWaypointIcon("Start Speed Limit", "dz", WAYPOINT_ICON_MAPPING['dz'].id, dzNode);
                else if (getExtTag(extensions, "sn") || getExtTag(extensions, "neutralization")) {
                    const snNode = getExtTag(extensions, "sn") || getExtTag(extensions, "neutralization");
                    activeWptIcon = createWaypointIcon("Start Neutralization", "sn", WAYPOINT_ICON_MAPPING['sn'].id, snNode);
                } else if (getExtTag(extensions, "fn")) activeWptIcon = createWaypointIcon("Finish Neutralization", "fn", WAYPOINT_ICON_MAPPING['fn'].id, getExtTag(extensions, "fn"));
                else if (wpvNode) activeWptIcon = createWaypointIcon("Visible WP", "wpv", WAYPOINT_ICON_MAPPING['wpv'].id, wpvNode);
                else if (getExtTag(extensions, "wpe")) activeWptIcon = createWaypointIcon("WP Eclipse", "wpe", WAYPOINT_ICON_MAPPING['wpe'].id, getExtTag(extensions, "wpe"));
                else if (getExtTag(extensions, "wpm")) activeWptIcon = createWaypointIcon("WP Masqué", "wpm", WAYPOINT_ICON_MAPPING['wpm'].id, getExtTag(extensions, "wpm"));
                else if (getExtTag(extensions, "wpn")) activeWptIcon = createWaypointIcon("WP Navigation", "wpn", WAYPOINT_ICON_MAPPING['wpn'].id, getExtTag(extensions, "wpn"));
                else if (getExtTag(extensions, "wps")) activeWptIcon = createWaypointIcon("Safety WP", "wps", WAYPOINT_ICON_MAPPING['wps'].id, getExtTag(extensions, "wps"));
                else if (getExtTag(extensions, "wpp")) activeWptIcon = createWaypointIcon("WP Précis", "wpp", WAYPOINT_ICON_MAPPING['wpp'].id, getExtTag(extensions, "wpp"));
                else if (getExtTag(extensions, "wpc")) activeWptIcon = createWaypointIcon("Control WP", "wpc", WAYPOINT_ICON_MAPPING['wpc'].id, getExtTag(extensions, "wpc"));

                if (activeWptIcon) {
                    rn2Wpt.waypointIcon = activeWptIcon;
                }

                return rn2Wpt;
            } else {
                // Non-waypoint track points
                return {
                    "waypointid": idx,
                    "lat": pt.lat,
                    "lon": pt.lon,
                    "ele": 0,
                    "show": false,
                    "showCoordinates": false,
                    "showHeading": false,
                    "showStickMarkOnTulip": false,
                    "tulip": {
                        "track": { "roadOut": {}, "roadIn": {}, "z": 0 },
                        "roads": [
                            { "start": roadInStart, "end": { "x": 100, "y": 60 }, "handles": [], "typeId": 10, "z": 0 },
                            { "start": { "x": 100, "y": 60 }, "end": roadOutEnd, "handles": [], "typeId": 10, "z": 0 }
                        ],
                        "texts": [], "icons": [], "lines": [],
                        "elements": [
                            {
                                "type": "Track",
                                "roadIn": { "handles": [], "z": 0 },
                                "roadOut": { "handles": [], "z": 0 },
                                "z": 0,
                                "eId": generateUUID(),
                                "rerender": false
                            }
                        ]
                    },
                    "notes": { "texts": [], "icons": [], "lines": [], "elements": [] },
                    "overridenSmartTags": { "dataType": "Map", "value": [] }
                };
            }
        });

        return {
            "route": {
                "version": 3,
                "name": fileName.replace('.gpx', ''),
                "description": "Converted from GPX OpenRally/TerraPirata",
                "current_style": "cross_country",
                "waypoints": rn2Waypoints,
                "settings": {
                    "units": "metric",
                    "showHighlight": true,
                    "showDistanceTickMark": true,
                    "showCoordinates": true,
                    "showHeadings": true,
                    "showAlternateDistance": false,
                    "showControlPointDetails": true,
                    "hundredthsStyle": "on",
                    "showControlPointOrdinals": true,
                    "trackColor": 2,
                    "defaultTrackType": 4
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
