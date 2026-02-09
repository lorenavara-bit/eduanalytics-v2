
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetPath = path.resolve(__dirname, '../src/services/khan/santillana-4-primaria-INGLES.js');

console.log(`Processing file: ${targetPath}`);

try {
    let content = fs.readFileSync(targetPath, 'utf8');
    const originalLength = content.length;

    // Regla de Reemplazo Masivo
    // Buscamos claves explicacion:, explanation:, repaso: y las cambiamos a explicacionDiamante:
    content = content.replace(/\bexplicacion\s*:/g, 'explicacionDiamante:');
    content = content.replace(/\bexplanation\s*:/g, 'explicacionDiamante:');
    content = content.replace(/\brepaso\s*:/g, 'explicacionDiamante:');

    fs.writeFileSync(targetPath, content, 'utf8');

    console.log(`✅ Success! Renamed metadata keys.`);
    console.log(`Old Size: ${originalLength} -> New Size: ${content.length}`);

} catch (err) {
    console.error("❌ Error processing file:", err);
    process.exit(1);
}
