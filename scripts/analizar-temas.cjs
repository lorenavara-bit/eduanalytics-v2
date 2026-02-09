// scripts/analizar-temas.cjs
// Analiza el CSV para ver qué temas necesitan ser mapeados

const fs = require('fs');
const csv = require('csv-parser');

console.log('🔍 Analizando temas del CSV...\n');

const temasPorAsignatura = {};

fs.createReadStream('ejercicios_qa_consolidado.csv')
    .pipe(csv())
    .on('data', (row) => {
        const asignatura = row.asignatura || 'Sin especificar';
        const curso = row.curso || 'Sin especificar';
        const tema = row.tema || 'Sin especificar';

        if (!temasPorAsignatura[asignatura]) {
            temasPorAsignatura[asignatura] = {};
        }
        if (!temasPorAsignatura[asignatura][curso]) {
            temasPorAsignatura[asignatura][curso] = new Set();
        }
        temasPorAsignatura[asignatura][curso].add(tema);
    })
    .on('end', () => {
        console.log('═══════════════════════════════════════════════════════════');
        console.log('  TEMAS ENCONTRADOS POR ASIGNATURA Y CURSO');
        console.log('═══════════════════════════════════════════════════════════\n');

        for (const [asignatura, cursos] of Object.entries(temasPorAsignatura)) {
            console.log(`\n📚 ${asignatura.toUpperCase()}`);

            for (const [curso, temas] of Object.entries(cursos)) {
                console.log(`\n  ${curso}:`);
                const temasArray = Array.from(temas).sort();
                temasArray.forEach(tema => {
                    console.log(`    - ${tema}`);
                });
            }
        }

        console.log('\n═══════════════════════════════════════════════════════════\n');
    });
