// scripts/ver-primeras-10.cjs
// Muestra las primeras 10 filas del CSV para entender qué hacer

const fs = require('fs');
const csv = require('csv-parser');

const primeras10 = [];

console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║  PRIMERAS 10 FILAS DE TU CSV - EJEMPLO PRÁCTICO          ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

fs.createReadStream('revision_pendiente.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (primeras10.length < 10) {
            primeras10.push(row);
        }
    })
    .on('end', () => {
        primeras10.forEach((row, i) => {
            console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
            console.log(`FILA ${i + 1} DE 97:`);
            console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
            console.log(`\n📝 Pregunta: "${row.pregunta.substring(0, 70)}..."`);
            console.log(`\n📚 Datos del ejercicio:`);
            console.log(`   Asignatura: ${row.asignatura}`);
            console.log(`   Curso: ${row.curso}`);
            console.log(`   Tema: ${row.tema}`);
            console.log(`\n❓ Estado actual:`);
            console.log(`   foco_auto: ${row.foco_auto}`);
            console.log(`   criterio_auto: ${row.criterio_auto || '❌ VACÍO'}`);
            console.log(`   verificado: ${row.verificado}`);

            // Sugerencia
            console.log(`\n💡 LO QUE TÚ DEBES HACER:`);

            const tema = row.tema.toLowerCase();
            const curso = row.curso;
            let sugerencia = '';

            if (tema.includes('fracción') || tema.includes('fracciones')) {
                sugerencia = 'MAT_PRI4_C1.2';
            } else if (tema.includes('problema')) {
                sugerencia = 'MAT_PRI4_C3.1';
            } else if (tema.includes('división')) {
                sugerencia = 'MAT_PRI4_C1.1';
            } else if (tema.includes('matemáticas') || tema.includes('matematicas')) {
                sugerencia = curso.includes('5º') ? 'MAT_PRI5_C1.1' : 'MAT_PRI4_C1.1';
            } else if (tema.includes('lengua')) {
                sugerencia = curso.includes('5º') ? 'LEN_PRI5_C1.1' : 'LEN_PRI4_C1.1';
            } else if (tema.includes('social') || tema.includes('geografía')) {
                sugerencia = 'SOC_PRI4_C1.1';
            } else if (tema.includes('natural') || tema.includes('ciencias de la naturaleza')) {
                sugerencia = 'NAT_PRI4_C1.1';
            } else if (tema.includes('color') || tema.includes('animal') || tema.includes('inglés')) {
                sugerencia = 'ING_PRI4_C1.1';
            } else {
                sugerencia = '???';
            }

            console.log(`   1. Escribe en "criterio_final": ${sugerencia}`);
            console.log(`   2. Cambia "verificado" de "false" a "true"`);
            console.log(`\n✅ DESPUÉS DE TU EDICIÓN:`);
            console.log(`   criterio_final: ${sugerencia}`);
            console.log(`   verificado: true`);
        });

        console.log(`\n\n╔═══════════════════════════════════════════════════════════╗`);
        console.log(`║                    RESUMEN                                ║`);
        console.log(`╚═══════════════════════════════════════════════════════════╝`);
        console.log(`\nEstas son las primeras 10 filas de 97.`);
        console.log(`\nHaces lo mismo con las 87 restantes:`);
        console.log(`  1. Lees tema + curso`);
        console.log(`  2. Buscas código en tabla`);
        console.log(`  3. Escribes en criterio_final`);
        console.log(`  4. Cambias verificado a true`);
        console.log(`\nTiempo: ~10 segundos por fila = 15 minutos total\n`);
    });
