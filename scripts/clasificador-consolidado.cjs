// scripts/clasificador-consolidado.js
// DÍA 1: Script de Clasificación Consolidada
// Clasifica automáticamente: foco_pedagogico + criterio_lomloe_id + licencia

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════

const CONFIG = {
    directorioEjercicios: path.join(__dirname, '../src/services/khan'),
    archivoSalida: 'ejercicios_qa_consolidado.csv',
    umbralConfianza: 0.75  // Ejercicios con confianza < 0.75 requieren revisión
};

// ═══════════════════════════════════════════════════════════
// TABLA DE MAPEO: TEMA → CRITERIO LOMLOE
// ═══════════════════════════════════════════════════════════

const MAPEO_LOMLOE = {
    'Matemáticas': {
        '4º Primaria': {
            'Operaciones básicas': 'MAT_PRI4_C1.1',
            'Operaciones': 'MAT_PRI4_C1.1',
            'Suma y resta': 'MAT_PRI4_C1.1',
            'Multiplicación': 'MAT_PRI4_C1.1',
            'División': 'MAT_PRI4_C1.1',
            'Fracciones': 'MAT_PRI4_C1.2',
            'Decimales': 'MAT_PRI4_C1.3',
            'Números decimales': 'MAT_PRI4_C1.3',
            'Geometría': 'MAT_PRI4_C2.1',
            'Figuras geométricas': 'MAT_PRI4_C2.1',
            'Medidas': 'MAT_PRI4_C2.2',
            'Longitud': 'MAT_PRI4_C2.2',
            'Peso': 'MAT_PRI4_C2.2',
            'Capacidad': 'MAT_PRI4_C2.2',
            'Problemas': 'MAT_PRI4_C3.1',
            'Resolución de problemas': 'MAT_PRI4_C3.1'
        },
        '5º Primaria': {
            'Operaciones': 'MAT_PRI5_C1.1',
            'Fracciones': 'MAT_PRI5_C1.2',
            'Decimales': 'MAT_PRI5_C1.3',
            'Geometría': 'MAT_PRI5_C2.1',
            'Medidas': 'MAT_PRI5_C2.2'
        }
    },
    'Lengua Castellana': {
        '4º Primaria': {
            'Gramática': 'LEN_PRI4_C1.1',
            'Sintaxis': 'LEN_PRI4_C1.1',
            'Morfología': 'LEN_PRI4_C1.1',
            'Ortografía': 'LEN_PRI4_C1.2',
            'Acentuación': 'LEN_PRI4_C1.2',
            'Comprensión lectora': 'LEN_PRI4_C2.1',
            'Lectura': 'LEN_PRI4_C2.1',
            'Expresión escrita': 'LEN_PRI4_C2.2',
            'Redacción': 'LEN_PRI4_C2.2',
            'Vocabulario': 'LEN_PRI4_C1.3'
        }
    },
    'Ciencias Sociales': {
        '4º Primaria': {
            'Geografía': 'SOC_PRI4_C1.1',
            'Historia': 'SOC_PRI4_C1.2',
            'El Clima': 'SOC_PRI4_C2.1',
            'Relieve': 'SOC_PRI4_C2.2'
        }
    },
    'Ciencias Naturales': {
        '4º Primaria': {
            'Seres vivos': 'NAT_PRI4_C1.1',
            'El cuerpo humano': 'NAT_PRI4_C1.2',
            'Materia': 'NAT_PRI4_C2.1',
            'Energía': 'NAT_PRI4_C2.2'
        }
    }
};

// ═══════════════════════════════════════════════════════════
// FUNCIONES DE CLASIFICACIÓN
// ═══════════════════════════════════════════════════════════

/**
 * Clasifica foco_pedagogico basado en heurísticas
 */
function clasificarFocoPedagogico(ejercicio) {
    const pregunta = ejercicio.pregunta.toLowerCase();

    // HEURÍSTICA 1: CONCEPTO
    const patronesConcepto = [
        /qué es/i, /define/i, /explica/i, /cuál es la definición/i,
        /identifica/i, /señala qué/i, /indica qué/i, /a qué se refiere/i,
        /significado de/i, /¿qué significa/i
    ];

    for (const patron of patronesConcepto) {
        if (patron.test(pregunta)) {
            return { foco: 'CONCEPTO', confianza: 0.90 };
        }
    }

    // HEURÍSTICA 2: PROCEDIMIENTO
    const patronesProcedimiento = [
        /calcula/i, /resuelve/i, /suma/i, /resta/i, /multiplica/i, /divide/i,
        /conjuga/i, /aplica/i, /ejecuta/i, /realiza/i, /completa/i,
        /cuánto es/i, /cuántos/i, /resultado de/i
    ];

    for (const patron of patronesProcedimiento) {
        if (patron.test(pregunta)) {
            return { foco: 'PROCEDIMIENTO', confianza: 0.85 };
        }
    }

    // HEURÍSTICA 3: APLICACION (contexto/problema)
    const patronesAplicacion = [
        /problema/i, /situación/i, /historia/i, /caso/i,
        /juan/i, /maría/i, /pedro/i, /ana/i, /carlos/i,
        /en una tienda/i, /en un/i, /si tenemos/i, /si tiene/i
    ];

    for (const patron of patronesAplicacion) {
        if (patron.test(pregunta)) {
            return { foco: 'APLICACION', confianza: 0.80 };
        }
    }

    // HEURÍSTICA 4: Por tipo de respuesta (si existe)
    if (ejercicio.tipo_respuesta === 'NUMERICO' || ejercicio.tipo === 'short_answer') {
        return { foco: 'PROCEDIMIENTO', confianza: 0.70 };
    }

    // NO SE PUEDE CLASIFICAR
    return { foco: null, confianza: 0.00 };
}

/**
 * Mapea tema → criterio LOMLOE
 */
function mapearCriterioLOMLOE(ejercicio) {
    const { asignatura, curso, tema } = ejercicio;

    if (!asignatura || !curso || !tema) {
        return { criterio: null, confianza: 0.00 };
    }

    try {
        // Búsqueda exacta
        const criterio = MAPEO_LOMLOE[asignatura]?.[curso]?.[tema];

        if (criterio) {
            return { criterio, confianza: 0.90 };
        }

        // Búsqueda fuzzy (tema similar)
        const cursoMap = MAPEO_LOMLOE[asignatura]?.[curso] || {};
        for (const [temaKey, criterioValue] of Object.entries(cursoMap)) {
            const temaLower = tema.toLowerCase();
            const keyLower = temaKey.toLowerCase();

            if (temaLower.includes(keyLower) || keyLower.includes(temaLower)) {
                return { criterio: criterioValue, confianza: 0.75 };
            }
        }

        return { criterio: null, confianza: 0.00 };
    } catch (error) {
        return { criterio: null, confianza: 0.00 };
    }
}

/**
 * Asigna licencia basado en fuente_original
 */
function asignarLicencia(ejercicio) {
    const fuente = (ejercicio.fuente_original || ejercicio.fuente || '').toLowerCase();
    const autor = (ejercicio.autor || '').toLowerCase();

    // Sin fuente → Asumir propietary (creación propia)
    if (!fuente && !autor) {
        return { licencia: 'PROPRIETARY', confianza: 0.60 };
    }

    // Creación propia
    if (fuente.includes('creación propia') || fuente.includes('eduanalytics') ||
        autor.includes('eduanalytics')) {
        return { licencia: 'PROPRIETARY', confianza: 0.95 };
    }

    // Khan Academy
    if (fuente.includes('khan') || autor.includes('khan')) {
        return { licencia: 'CC-BY-NC-SA', confianza: 0.90 };
    }

    // Editoriales conocidas
    if (fuente.includes('santillana') || fuente.includes('sm') ||
        fuente.includes('anaya') || fuente.includes('edelvives')) {
        return { licencia: 'PROPRIETARY', confianza: 0.85 };
    }

    // Dominio público
    if (fuente.includes('público') || fuente.includes('dominio público') ||
        fuente.includes('public domain')) {
        return { licencia: 'PD', confianza: 0.90 };
    }

    // Creative Commons
    if (fuente.includes('creative commons') || fuente.includes('cc-by')) {
        return { licencia: 'CC-BY', confianza: 0.85 };
    }

    // Por defecto → PROPRIETARY (requiere revisión)
    return { licencia: 'PROPRIETARY', confianza: 0.50 };
}

/**
 * Clasificación consolidada de un ejercicio
 */
function clasificarEjercicio(ejercicio) {
    const resultadoFoco = clasificarFocoPedagogico(ejercicio);
    const resultadoCriterio = mapearCriterioLOMLOE(ejercicio);
    const resultadoLicencia = asignarLicencia(ejercicio);

    // Confianza general (promedio ponderado)
    // foco_pedagogico es el más crítico (40%)
    const confianzaGeneral = (
        resultadoFoco.confianza * 0.4 +
        resultadoCriterio.confianza * 0.4 +
        resultadoLicencia.confianza * 0.2
    );

    return {
        foco_auto: resultadoFoco.foco || '',
        criterio_auto: resultadoCriterio.criterio || '',
        licencia_auto: resultadoLicencia.licencia || '',
        confianza: parseFloat(confianzaGeneral.toFixed(2))
    };
}

// ═══════════════════════════════════════════════════════════
// PROCESAMIENTO DE EJERCICIOS
// ═══════════════════════════════════════════════════════════

/**
 * Obtiene todos los ejercicios de los archivos .js
 */
function obtenerTodosLosEjercicios() {
    const ejercicios = [];

    try {
        const archivos = fs.readdirSync(CONFIG.directorioEjercicios);

        for (const archivo of archivos) {
            if (!archivo.endsWith('.js')) continue;

            const rutaCompleta = path.join(CONFIG.directorioEjercicios, archivo);

            try {
                // Leer contenido del archivo
                const contenido = fs.readFileSync(rutaCompleta, 'utf8');

                // Buscar array de ejercicios/preguntas
                // Patrón: export const preguntas = [...] o export const ejercicios = [...]
                const match = contenido.match(/export\s+const\s+(preguntas|ejercicios)\s*=\s*\[/);

                if (match) {
                    // Evaluar el módulo (simplificado)
                    // NOTA: En producción, usar un parser más robusto
                    const modulo = require(rutaCompleta);
                    const ejerciciosArchivo = modulo.preguntas || modulo.ejercicios || modulo.default || [];

                    if (Array.isArray(ejerciciosArchivo)) {
                        ejercicios.push(...ejerciciosArchivo);
                        console.log(`  ✓ ${archivo}: ${ejerciciosArchivo.length} ejercicios`);
                    }
                }
            } catch (error) {
                console.warn(`  ⚠️  Error leyendo ${archivo}: ${error.message}`);
            }
        }
    } catch (error) {
        console.error('❌ Error al leer directorio:', error.message);
    }

    return ejercicios;
}

/**
 * Exporta resultados a CSV
 */
function exportarCSV(datos, nombreArchivo) {
    const csvHeader = [
        'id', 'pregunta', 'asignatura', 'curso', 'tema',
        'foco_auto', 'criterio_auto', 'licencia_auto', 'confianza',
        'foco_final', 'criterio_final', 'licencia_final',
        'verificado', 'notas'
    ].join(',');

    const csvRows = datos.map(row => {
        return [
            row.id || '',
            `"${(row.pregunta || '').replace(/"/g, '""').substring(0, 100)}"`,
            row.asignatura || '',
            row.curso || '',
            row.tema || '',
            row.foco_auto || '',
            row.criterio_auto || '',
            row.licencia_auto || '',
            row.confianza || 0,
            row.foco_final || '',
            row.criterio_final || '',
            row.licencia_final || '',
            row.verificado || 'false',
            `"${row.notas || ''}"`
        ].join(',');
    });

    const csv = [csvHeader, ...csvRows].join('\n');

    fs.writeFileSync(nombreArchivo, csv, 'utf8');
}

// ═══════════════════════════════════════════════════════════
// PROCESO PRINCIPAL
// ═══════════════════════════════════════════════════════════

function procesarTodosLosEjercicios() {
    console.log('╔═══════════════════════════════════════════════════════════╗');
    console.log('║  CLASIFICADOR CONSOLIDADO - DÍA 1                         ║');
    console.log('║  Etiquetado automático de 3 campos críticos               ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');

    // 1. Obtener ejercicios
    console.log('📂 Leyendo ejercicios...\n');
    const ejercicios = obtenerTodosLosEjercicios();
    console.log(`\n📊 Total ejercicios encontrados: ${ejercicios.length}\n`);

    if (ejercicios.length === 0) {
        console.error('❌ No se encontraron ejercicios para procesar');
        return;
    }

    // 2. Clasificar cada ejercicio
    console.log('🔄 Clasificando ejercicios...\n');
    const resultados = ejercicios.map((ejercicio, index) => {
        if ((index + 1) % 100 === 0) {
            console.log(`  Procesando ${index + 1}/${ejercicios.length}...`);
        }

        const clasificacion = clasificarEjercicio(ejercicio);

        return {
            // Datos originales
            id: ejercicio.id,
            pregunta: ejercicio.pregunta,
            asignatura: ejercicio.asignatura,
            curso: ejercicio.curso,
            tema: ejercicio.tema,

            // Clasificación automática
            foco_auto: clasificacion.foco_auto,
            criterio_auto: clasificacion.criterio_auto,
            licencia_auto: clasificacion.licencia_auto,
            confianza: clasificacion.confianza,

            // Para revisión manual (inicialmente igual a auto)
            foco_final: clasificacion.foco_auto,
            criterio_final: clasificacion.criterio_auto,
            licencia_final: clasificacion.licencia_auto,
            verificado: 'false',
            notas: ''
        };
    });

    // 3. Ordenar por confianza (bajos primero para revisión prioritaria)
    resultados.sort((a, b) => a.confianza - b.confianza);

    // 4. Estadísticas
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║  ESTADÍSTICAS DE CLASIFICACIÓN                            ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');

    const stats = {
        total: resultados.length,
        alta_confianza: resultados.filter(r => r.confianza >= 0.85).length,
        media_confianza: resultados.filter(r => r.confianza >= 0.70 && r.confianza < 0.85).length,
        baja_confianza: resultados.filter(r => r.confianza < 0.70).length,

        foco_concepto: resultados.filter(r => r.foco_auto === 'CONCEPTO').length,
        foco_procedimiento: resultados.filter(r => r.foco_auto === 'PROCEDIMIENTO').length,
        foco_aplicacion: resultados.filter(r => r.foco_auto === 'APLICACION').length,
        foco_null: resultados.filter(r => !r.foco_auto).length,

        con_criterio: resultados.filter(r => r.criterio_auto).length,
        sin_criterio: resultados.filter(r => !r.criterio_auto).length
    };

    console.log(`📊 TOTAL: ${stats.total} ejercicios\n`);

    console.log('🎯 POR CONFIANZA:');
    console.log(`  ✅ Alta (≥0.85):      ${stats.alta_confianza.toString().padStart(4)} (${((stats.alta_confianza / stats.total) * 100).toFixed(1).padStart(5)}%)`);
    console.log(`  🟡 Media (0.70-0.85): ${stats.media_confianza.toString().padStart(4)} (${((stats.media_confianza / stats.total) * 100).toFixed(1).padStart(5)}%)`);
    console.log(`  ⚠️  Baja (<0.70):      ${stats.baja_confianza.toString().padStart(4)} (${((stats.baja_confianza / stats.total) * 100).toFixed(1).padStart(5)}%)`);

    console.log('\n🎓 FOCO PEDAGÓGICO:');
    console.log(`  📖 CONCEPTO:         ${stats.foco_concepto.toString().padStart(4)} (${((stats.foco_concepto / stats.total) * 100).toFixed(1).padStart(5)}%)`);
    console.log(`  🔢 PROCEDIMIENTO:    ${stats.foco_procedimiento.toString().padStart(4)} (${((stats.foco_procedimiento / stats.total) * 100).toFixed(1).padStart(5)}%)`);
    console.log(`  🌍 APLICACION:       ${stats.foco_aplicacion.toString().padStart(4)} (${((stats.foco_aplicacion / stats.total) * 100).toFixed(1).padStart(5)}%)`);
    console.log(`  ❓ Sin clasificar:   ${stats.foco_null.toString().padStart(4)} (${((stats.foco_null / stats.total) * 100).toFixed(1).padStart(5)}%)`);

    console.log('\n📚 CRITERIO LOMLOE:');
    console.log(`  ✅ Con criterio:     ${stats.con_criterio.toString().padStart(4)} (${((stats.con_criterio / stats.total) * 100).toFixed(1).padStart(5)}%)`);
    console.log(`  ❌ Sin criterio:     ${stats.sin_criterio.toString().padStart(4)} (${((stats.sin_criterio / stats.total) * 100).toFixed(1).padStart(5)}%)`);

    // 5. Exportar CSV
    console.log('\n📝 Generando CSV...\n');
    exportarCSV(resultados, CONFIG.archivoSalida);

    console.log('╔═══════════════════════════════════════════════════════════╗');
    console.log('║  ✅ PROCESO COMPLETADO                                    ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');

    console.log(`📄 CSV generado: ${CONFIG.archivoSalida}`);
    console.log(`📊 Total ejercicios: ${resultados.length}`);
    console.log(`🔍 Requieren revisión manual: ${stats.baja_confianza} (confianza < 0.70)\n`);

    console.log('📋 PRÓXIMOS PASOS:');
    console.log('  1. Abrir CSV en Excel/Google Sheets');
    console.log('  2. Revisar ejercicios con confianza < 0.75');
    console.log('  3. Corregir foco_final, criterio_final, licencia_final');
    console.log('  4. Marcar verificado = true');
    console.log('  5. Guardar CSV y ejecutar script de importación\n');

    return resultados;
}

// ═══════════════════════════════════════════════════════════
// EJECUTAR
// ═══════════════════════════════════════════════════════════

if (require.main === module) {
    procesarTodosLosEjercicios();
}

module.exports = {
    clasificarEjercicio,
    clasificarFocoPedagogico,
    mapearCriterioLOMLOE,
    asignarLicencia,
    procesarTodosLosEjercicios
};
