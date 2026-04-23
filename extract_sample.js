const fs = require('fs');
const content = fs.readFileSync('AxeQuad RoadBook - Formation RB 25k v26.03.08 (TerraPirata).gpx', 'utf8');
const match = content.match(/<openrally:tulip>\s*<!\[CDATA\[data:image\/png;base64,([^\]]+)\]\]>\s*<\/openrally:tulip>/);
if (match) {
    fs.writeFileSync('sample_tulip.png', Buffer.from(match[1], 'base64'));
    console.log('Sample tulip extracted to sample_tulip.png');
} else {
    console.log('No tulip image found');
}
