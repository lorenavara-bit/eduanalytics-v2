// scripts/ayuda-revision.cjs
// Script de ayuda para revisión manual de ejercicios de baja confianza
// Genera recomendaciones y CSV simplificado

const fs = require('fs');
const csv = require('csv-parser');

console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║  ASISTENTE DE REVISIÓN MANUAL - DÍA 2                     ║');
console.log('║  Análisis de 97 ejercicios pendientes                     ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

const ejerciciosBajaConfianza = [];
const problemasPorTipo = {
    sinCriterio: [],
    focoIncorrecto: [],
    ambos: []
};

// Leer CSV
fs.createReadStream('ejercicios_qa_consolidado.csv')
    .pipe(csv())
    .on('data', (row) => {
        const confianza = parseFloat(row.confianza);

        if (confianza < 0.70) {
            ejerciciosBajaConfianza.push(row);

            // Clasificar tipo de problema
            const sinCriterio = !row.criterio_auto || row.criterio_auto === '';
            const focoIncorrecto = row.foco_auto === 'PROCEDIMIENTO' &&
                (row.pregunta.toLowerCase().includes('qué es') ||
                    row.pregunta.toLowerCase().includes('define'));

            if (sinCriterio && focoIncorrecto) {
                problemasPorTipo.ambos.push(row);
            } else if (sinCriterio) {
                problemasPorTipo.sinCriterio.push(row);
            } else if (focoIncorrecto) {
                problemasPorTipo.focoIncorrecto.push(row);
            }
        }
    })
    .on('end', () => {
        console.log('📊 ANÁLISIS DE PROBLEMAS:\n');
        console.log(`Total ejercicios baja confianza: ${ejerciciosBajaConfianza.length}`);
        console.log(`  ├─ Sin criterio LOMLOE: ${problemasPorTipo.sinCriterio.length}`);
        console.log(`  ├─ Foco incorrecto: ${problemasPorTipo.focoIncorrecto.length}`);
        console.log(`  └─ Ambos problemas: ${problemasPorTipo.ambos.length}\n`);

        // Agrupar por tema
        const porTema = {};
        ejerciciosBajaConfianza.forEach(ej => {
            const tema = ej.tema || 'Sin tema';
            if (!porTema[tema]) porTema[tema] = [];
            porTema[tema].push(ej);
        });

        console.log('📚 EJERCICIOS AGRUPADOS POR TEMA:\n');
        Object.entries(porTema).sort((a, b) => b[1].length - a[1].length).forEach(([tema, ejercicios]) => {
            console.log(`  ${tema}: ${ejercicios.length} ejercicios`);
        });

        console.log('\n═══════════════════════════════════════════════════════════');
        console.log('  GENERANDO ARCHIVOS DE AYUDA');
        console.log('═══════════════════════════════════════════════════════════\n');

        // Generar CSV simplificado solo con los que necesitan revisión
        generarCSVSimplificado(ejerciciosBajaConfianza);

        // Generar guía de referencia rápida
        generarGuiaReferencia(porTema);

        // Generar sugerencias automáticas
        generarSugerencias(ejerciciosBajaConfianza);

        console.log('\n✅ Archivos generados:');
        console.log('  📄 revision_pendiente.csv - Solo 97 ejercicios a revisar');
        console.log('  📋 guia_referencia.txt - Tabla criterios LOMLOE');
        console.log('  💡 sugerencias.txt - Sugerencias automáticas\n');

        console.log('📋 PRÓXIMOS PASOS:');
        console.log('  1. Abrir revision_pendiente.csv en Excel');
        console.log('  2. Consultar guia_referencia.txt para criterios LOMLOE');
        console.log('  3. Aplicar sugerencias.txt cuando aplique');
        console.log('  4. Completar campos *_final');
        console.log('  5. Marcar verificado = true');
        console.log('  6. Guardar y cerrar\n');
    });

function generarCSVSimplificado(ejercicios) {
    const header = [
        'id', 'pregunta', 'asignatura', 'curso', 'tema',
        'foco_auto', 'criterio_auto', 'confianza',
        'foco_final', 'criterio_final', 'verificado', 'notas_revisor'
    ].join(',');

    const rows = ejercicios.map(ej => [
        ej.id,
        `"${ej.pregunta.substring(0, 100).replace(/"/g, '""')}"`,
        ej.asignatura,
        ej.curso,
        ej.tema,
        ej.foco_auto,
        ej.criterio_auto || '',
        ej.confianza,
        ej.foco_auto, // Inicialmente igual
        ej.criterio_auto || '', // Inicialmente igual (o vacío)
        'false',
        '""'
    ].join(','));

    const csvContent = [header, ...rows].join('\n');
    fs.writeFileSync('revision_pendiente.csv', csvContent, 'utf8');
}

function generarGuiaReferencia(porTema) {
    let guia = `
╔═══════════════════════════════════════════════════════════╗
║         GUÍA RÁPIDA DE CRITERIOS LOMLOE                  ║
╚═══════════════════════════════════════════════════════════╝

MATEMÁTICAS 4º PRIMARIA:
────────────────────────
Tema                          Criterio
─────────────────────────────────────────────────
Fracciones                    MAT_PRI4_C1.2
División                      MAT_PRI4_C1.1
Sumas y Restas                MAT_PRI4_C1.1
Números Decimales             MAT_PRI4_C1.3
Geometría / Ángulos           MAT_PRI4_C2.1
Medidas                       MAT_PRI4_C2.2
Problemas                     MAT_PRI4_C3.1

LENGUA CASTELLANA 4º/5º PRIMARIA:
──────────────────────────────────
Gramática, Verbos, Sustantivos    LEN_PRI4_C1.1 / LEN_PRI5_C1.1
Ortografía, Acentuación           LEN_PRI4_C1.2 / LEN_PRI5_C1.2
Comprensión Lectora               LEN_PRI4_C2.1 / LEN_PRI5_C2.1
Redacción, Expresión              LEN_PRI4_C2.2 / LEN_PRI5_C2.2

CIENCIAS SOCIALES 4º PRIMARIA:
───────────────────────────────
Geografía, Clima, Localidad      SOC_PRI4_C1.1
Población                         SOC_PRI4_C1.2
Historia, Edad Media              SOC_PRI4_C2.1
Sectores Económicos               SOC_PRI4_C3.1

CIENCIAS NATURALES 4º PRIMARIA:
────────────────────────────────
Animales, Seres Vivos             NAT_PRI4_C1.1
Cuerpo Humano                     NAT_PRI4_C1.2
Ecosistemas                       NAT_PRI4_C1.3
Materia                           NAT_PRI4_C2.1
Energía                           NAT_PRI4_C2.2
Máquinas                          NAT_PRI4_C2.3

═══════════════════════════════════════════════════════════

REGLAS PARA FOCO PEDAGÓGICO:
─────────────────────────────

CONCEPTO → Preguntas que piden DEFINIR o EXPLICAR
  Palabras clave: "¿Qué es...?", "Define...", "Explica..."
  Ejemplo: "¿Qué es una fracción?"

PROCEDIMIENTO → Preguntas que piden EJECUTAR pasos
  Palabras clave: "Calcula...", "Resuelve...", "Suma...", "Escribe..."
  Ejemplo: "Calcula 3/4 + 1/2"

APLICACION → Problemas CONTEXTUALIZADOS
  Palabras clave: Nombres propios, situaciones reales
  Ejemplo: "Juan tiene 3/4 de pizza..."

═══════════════════════════════════════════════════════════
`;

    // Añadir temas específicos encontrados
    guia += '\n\nTEMAS ESPECÍFICOS ENCONTRADOS:\n';
    guia += '────────────────────────────────\n';
    Object.entries(porTema).forEach(([tema, ejercicios]) => {
        const asignatura = ejercicios[0].asignatura;
        guia += `${tema.padEnd(35)} (${asignatura})\n`;
    });

    fs.writeFileSync('guia_referencia.txt', guia, 'utf8');
}

function generarSugerencias(ejercicios) {
    let sugerencias = `
╔═══════════════════════════════════════════════════════════╗
║           SUGERENCIAS AUTOMÁTICAS                        ║
╚═══════════════════════════════════════════════════════════╝

`;

    const sugerenciasPorEjercicio = ejercicios.map(ej => {
        const problema = [];
        const solucion = [];

        // Analizar y sugerir
        if (!ej.criterio_auto || ej.criterio_auto === '') {
            problema.push('Sin criterio LOMLOE');

            // Sugerir basado en tema
            const tema = ej.tema.toLowerCase();
            if (tema.includes('fracción') || tema.includes('fracciones')) {
                solucion.push('Sugerencia: MAT_PRI4_C1.2');
            } else if (tema.includes('división')) {
                solucion.push('Sugerencia: MAT_PRI4_C1.1');
            } else if (tema.includes('gramática') && ej.curso === '4º Primaria') {
                solucion.push('Sugerencia: LEN_PRI4_C1.1');
            } else if (tema.includes('clima') || tema.includes('geografía')) {
                solucion.push('Sugerencia: SOC_PRI4_C1.1');
            } else {
                solucion.push('Consultar guia_referencia.txt');
            }
        }

        // Detectar foco incorrecto
        const pregunta = ej.pregunta.toLowerCase();
        if (ej.foco_auto === 'PROCEDIMIENTO' &&
            (pregunta.includes('qué es') || pregunta.includes('define') || pregunta.includes('explica'))) {
            problema.push('Foco posiblemente incorrecto');
            solucion.push('Debería ser CONCEPTO');
        }

        if (problema.length > 0) {
            return {
                id: ej.id,
                pregunta: ej.pregunta.substring(0, 80),
                problemas: problema.join(', '),
                soluciones: solucion.join(', ')
            };
        }

        return null;
    }).filter(s => s !== null);

    sugerenciasPorEjercicio.forEach((sug, i) => {
        sugerencias += `
${i + 1}. ID: ${sug.id}
   Pregunta: "${sug.pregunta}..."
   Problema: ${sug.problemas}
   → ${sug.soluciones}
`;
    });

    sugerencias += `
═══════════════════════════════════════════════════════════

Total sugerencias: ${sugerenciasPorEjercicio.length}

NOTA: Estas son sugerencias automáticas. Siempre verifica
      manualmente antes de aplicar.
`;

    fs.writeFileSync('sugerencias.txt', sugerencias, 'utf8');
}
