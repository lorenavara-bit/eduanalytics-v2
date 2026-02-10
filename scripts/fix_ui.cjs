const fs = require('fs');
const path = 'c:\\AMISPROYECTOS\\eduanalytics-app\\eduanalytics-v2\\src\\components\\WorksheetGenerator.jsx';
let content = fs.readFileSync(path, 'utf8');

// Buscamos la secuencia de divs rotos después de gamificationProfile
// Queremos cerrar el control row (890), el header row container (887) y el header hero container (884)
// Y luego abrir el contenedor del contenido principal

const startMarker = '{gamificationProfile && (';
const endMarker = '{mode === \'ROADMAP\' ? (';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const prefix = content.substring(0, endIndex);
    const suffix = content.substring(endIndex);

    // El problema está justo antes de endMarker. 
    // Vamos a buscar los 4 closing divs previos y reemplazarlos.
    const lastPart = prefix.substring(prefix.lastIndexOf(')}'));
    const cleanLastPart = ')}\n                </div>\n            </div>\n        </div>\n\n        <div className="max-w-6xl mx-auto px-6">\n\n    ';

    const finalContent = prefix.substring(0, prefix.lastIndexOf(')}')) + cleanLastPart + suffix;
    fs.writeFileSync(path, finalContent, 'utf8');
    console.log('✅ UI layout fixed successfully');
} else {
    console.log('❌ Could not find markers');
}
