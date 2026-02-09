// DÍA 1: Script simplificado para análisis rápido
// Lee y clasifica ejercicios de la estructura actual

const fs = require('fs');
const path = require('path');

console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║  ANÁLISIS RÁPIDO DE EJERCICIOS - DÍA 1                    ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

let totalEjercicios = 0;
let archivosAnalizados = 0;

const dirKhan = path.join(__dirname, '../src/services/khan');
const archivos = fs.readdirSync(dirKhan);

console.log(`📂 Archivos encontrados: ${archivos.length}\n`);

for (const archivo of archivos) {
    if (!archivo.endsWith('.js') || archivo.includes('config') || archivo.includes('fetcher') || archivo.includes('por-curso')) {
        continue;
    }

    const rutaCompleta = path.join(dirKhan, archivo);
    const contenido = fs.readFileSync(rutaCompleta, 'utf8');

    // Contar ejercicios en este archivo
    const matches = contenido.match(/{\s*tipo:/g);
    const numEjercicios = matches ? matches.length : 0;

    if (numEjercicios > 0) {
        console.log(`✓ ${archivo.padEnd(40)} → ${numEjercicios.toString().padStart(4)} ejercicios`);
        totalEjercicios += numEjercicios;
        archivosAnalizados++;
    }
}

console.log('\n╔═══════════════════════════════════════════════════════════╗');
console.log('║  RESUMEN                                                  ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');
console.log(`📊 Total ejercicios encontrados: ${totalEjercicios}`);
console.log(`📁 Archivos con ejercicios: ${archivosAnalizados}`);
console.log(`📈 Promedio por archivo: ${Math.round(totalEjercicios / archivosAnalizados)}`);

console.log('\n📋 PRÓXIMO PASO:');
console.log('   Necesitamos extraer la información completa de cada ejercicio');
console.log('   para clasificarlos por foco_pedagogico, criterio LOMLOE y licencia.\n');
