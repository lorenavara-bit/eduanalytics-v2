// scripts/ver-muestra-csv.cjs
// Muestra ejemplos del CSV por categoría de confianza

const fs = require('fs');
const csv = require('csv-parser');

const ejercicios = {
    alta: [],
    media: [],
    baja: []
};

fs.createReadStream('ejercicios_qa_consolidado.csv')
    .pipe(csv())
    .on('data', (row) => {
        const confianza = parseFloat(row.confianza);

        if (confianza >= 0.85 && ejercicios.alta.length < 5) {
            ejercicios.alta.push(row);
        } else if (confianza >= 0.70 && confianza < 0.85 && ejercicios.media.length < 5) {
            ejercicios.media.push(row);
        } else if (confianza < 0.70 && ejercicios.baja.length < 5) {
            ejercicios.baja.push(row);
        }
    })
    .on('end', () => {
        console.log('╔═══════════════════════════════════════════════════════════╗');
        console.log('║  MUESTRA DEL CSV - CALIDAD DE CLASIFICACIÓN              ║');
        console.log('╚═══════════════════════════════════════════════════════════╝\n');

        // Alta confianza
        console.log('🟢 EJERCICIOS DE ALTA CONFIANZA (≥0.85)\n');
        ejercicios.alta.forEach((ej, i) => {
            console.log(`Ejercicio ${i + 1}:`);
            console.log(`  ID: ${ej.id}`);
            console.log(`  Pregunta: ${ej.pregunta.substring(0, 80)}...`);
            console.log(`  Asignatura: ${ej.asignatura} | Curso: ${ej.curso}`);
            console.log(`  Tema: ${ej.tema}`);
            console.log(`  Foco auto: ${ej.foco_auto}`);
            console.log(`  Criterio auto: ${ej.criterio_auto}`);
            console.log(`  Licencia auto: ${ej.licencia_auto}`);
            console.log(`  Confianza: ${ej.confianza}`);
            console.log(`  Estado: ${ej.foco_auto && ej.criterio_auto && ej.licencia_auto ? '✅ COMPLETO' : '⚠️ REVISAR'}\n`);
        });

        // Media confianza
        console.log('\n🟡 EJERCICIOS DE CONFIANZA MEDIA (0.70-0.85)\n');
        ejercicios.media.forEach((ej, i) => {
            console.log(`Ejercicio ${i + 1}:`);
            console.log(`  ID: ${ej.id}`);
            console.log(`  Pregunta: ${ej.pregunta.substring(0, 80)}...`);
            console.log(`  Asignatura: ${ej.asignatura} | Curso: ${ej.curso}`);
            console.log(`  Tema: ${ej.tema}`);
            console.log(`  Foco auto: ${ej.foco_auto}`);
            console.log(`  Criterio auto: ${ej.criterio_auto || '❌ FALTA'}`);
            console.log(`  Licencia auto: ${ej.licencia_auto}`);
            console.log(`  Confianza: ${ej.confianza}`);
            console.log(`  Acción: ${!ej.criterio_auto ? '⚠️ Asignar criterio LOMLOE' : '✓ Validar rápido'}\n`);
        });

        // Baja confianza
        console.log('\n🔴 EJERCICIOS DE BAJA CONFIANZA (<0.70)\n');
        ejercicios.baja.forEach((ej, i) => {
            console.log(`Ejercicio ${i + 1}:`);
            console.log(`  ID: ${ej.id}`);
            console.log(`  Pregunta: ${ej.pregunta.substring(0, 80)}...`);
            console.log(`  Asignatura: ${ej.asignatura} | Curso: ${ej.curso}`);
            console.log(`  Tema: ${ej.tema}`);
            console.log(`  Foco auto: ${ej.foco_auto || '❌ FALTA'}`);
            console.log(`  Criterio auto: ${ej.criterio_auto || '❌ FALTA'}`);
            console.log(`  Licencia auto: ${ej.licencia_auto}`);
            console.log(`  Confianza: ${ej.confianza}`);
            console.log(`  Acción: ⚠️ REVISIÓN MANUAL NECESARIA\n`);
        });

        console.log('\n═══════════════════════════════════════════════════════════');
        console.log('  RESUMEN DE CALIDAD');
        console.log('═══════════════════════════════════════════════════════════\n');
        console.log('✅ Alta confianza: Clasificación automática correcta');
        console.log('   → Acción: Validación opcional');
        console.log('\n🟡 Media confianza: Mayoría está bien, algunos sin criterio');
        console.log('   → Acción: Revisar campos vacíos');
        console.log('\n🔴 Baja confianza: Requieren atención manual');
        console.log('   → Acción: Completar y corregir\n');
    });
