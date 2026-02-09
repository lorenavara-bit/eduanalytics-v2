// scripts/extractor-completo.cjs
// DÍA 1: Extractor y Clasificador Completo de Ejercicios
// Genera CSV con clasificación automática de 3 campos críticos

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════

const CONFIG = {
    directorioEjercicios: path.join(__dirname, '../src/services/khan'),
    archivoSalida: 'ejercicios_qa_consolidado.csv',
    umbralConfianza: 0.75
};

// ═══════════════════════════════════════════════════════════
// TABLA DE MAPEO: TEMA → CRITERIO LOMLOE
// ═══════════════════════════════════════════════════════════

const MAPEO_LOMLOE = {
    'Matemáticas': {
        '4º Primaria': {
            // Números
            'Números de 5 y 6 cifras': 'MAT_PRI4_C1.1',
            'Sumas y Restas': 'MAT_PRI4_C1.1',
            'División': 'MAT_PRI4_C1.1',
            'Operaciones básicas': 'MAT_PRI4_C1.1',
            'Propiedad Asociativa': 'MAT_PRI4_C1.1',
            'Propiedad Distributiva': 'MAT_PRI4_C1.1',
            // Fracciones y decimales
            'Fracciones': 'MAT_PRI4_C1.2',
            'Números Decimales': 'MAT_PRI4_C1.3',
            'Decimales': 'MAT_PRI4_C1.3',
            // Geometría
            'Geometría': 'MAT_PRI4_C2.1',
            'Ángulos': 'MAT_PRI4_C2.1',
            // Medidas
            'Medidas de Longitud': 'MAT_PRI4_C2.2',
            'Medidas de Tiempo': 'MAT_PRI4_C2.3',
            'Medidas': 'MAT_PRI4_C2.2',
            // Problemas
            'Problemas': 'MAT_PRI4_C3.1',
            'Matemáticas': 'MAT_PRI4_C1.1'  // General
        },
        '5º Primaria': {
            'Números decimales': 'MAT_PRI5_C1.1',
            'Porcentajes': 'MAT_PRI5_C1.2',
            'Múltiplos y divisores': 'MAT_PRI5_C1.3',
            'Área y perímetro': 'MAT_PRI5_C2.1',
            'Unidades de medida': 'MAT_PRI5_C2.2',
            'Matemáticas': 'MAT_PRI5_C1.1'  // General
        }
    },
    'Lengua Castellana': {
        '4º Primaria': {
            // Gramática
            'Gramática': 'LEN_PRI4_C1.1',
            'Sustantivos y Adjetivos': 'LEN_PRI4_C1.1',
            'El Verbo - Tiempos Verbales': 'LEN_PRI4_C1.1',
            'La Oración Simple': 'LEN_PRI4_C1.1',
            // Ortografía (implícito en otros temas)
            'Ortografía': 'LEN_PRI4_C1.2',
            // Comprensión
            'Comprensión lectora': 'LEN_PRI4_C2.1',
            'Comprensión Lectora': 'LEN_PRI4_C2.1',
            // Expresión
            'Expresión escrita': 'LEN_PRI4_C2.2',
            'Tipos de Texto': 'LEN_PRI4_C2.2',
            'Lengua Castellana': 'LEN_PRI4_C1.1'  // General
        },
        '5º Primaria': {
            'Gramática: Clases de palabras': 'LEN_PRI5_C1.1',
            'Gramática': 'LEN_PRI5_C1.1',
            'Sintaxis: La oración': 'LEN_PRI5_C1.1',
            'Ortografía': 'LEN_PRI5_C1.2',
            'Comprensión lectora': 'LEN_PRI5_C2.1',
            'Expresión escrita': 'LEN_PRI5_C2.2',
            'Lengua Castellana': 'LEN_PRI5_C1.1'  // General
        }
    },
    'Ciencias Sociales': {
        '4º Primaria': {
            // Geografía
            'Geografía': 'SOC_PRI4_C1.1',
            'El Clima de España': 'SOC_PRI4_C1.1',
            'Mi Localidad': 'SOC_PRI4_C1.1',
            'La Población de España': 'SOC_PRI4_C1.2',
            // Historia
            'Historia': 'SOC_PRI4_C2.1',
            'La Historia: Prehistoria y Edad Antigua': 'SOC_PRI4_C2.1',
            'La Edad Media en España': 'SOC_PRI4_C2.1',
            // Economía
            'Los Sectores Económicos': 'SOC_PRI4_C3.1',
            'Ciencias Sociales': 'SOC_PRI4_C1.1'  // General
        },
        '5º Primaria': {
            'El Universo y la Tierra': 'SOC_PRI5_C1.1',
            'El relieve de Europa': 'SOC_PRI5_C1.1',
            'Países de Europa': 'SOC_PRI5_C1.1',
            'Geografía': 'SOC_PRI5_C1.1',
            'La Edad Contemporánea en España': 'SOC_PRI5_C2.1',
            'Historia': 'SOC_PRI5_C2.1',
            'Ciencias Sociales': 'SOC_PRI5_C1.1'  // General
        }
    },
    'Ciencias Naturales': {
        '4º Primaria': {
            // Seres vivos
            'Los Animales Vertebrados': 'NAT_PRI4_C1.1',
            'Los Animales Invertebrados': 'NAT_PRI4_C1.1',
            'Seres vivos': 'NAT_PRI4_C1.1',
            // Cuerpo humano
            'El Cuerpo Humano': 'NAT_PRI4_C1.2',
            'El cuerpo humano': 'NAT_PRI4_C1.2',
            // Ecosistemas
            'Los Ecosistemas': 'NAT_PRI4_C1.3',
            // Materia y energía
            'La Materia': 'NAT_PRI4_C2.1',
            'La Energía': 'NAT_PRI4_C2.2',
            'Las Máquinas': 'NAT_PRI4_C2.3',
            'Ciencias de la Naturaleza': 'NAT_PRI4_C1.1'  // General
        },
        '5º Primaria': {
            'Los animales': 'NAT_PRI5_C1.1',
            'Las plantas': 'NAT_PRI5_C1.1',
            'Seres vivos': 'NAT_PRI5_C1.1',
            'Ecosistemas': 'NAT_PRI5_C1.2',
            'La materia': 'NAT_PRI5_C2.1',
            'La energía': 'NAT_PRI5_C2.2',
            'Ciencias de la Naturaleza': 'NAT_PRI5_C1.1'  // General
        }
    },
    'Inglés': {
        '4º Primaria': {
            // Vocabulario
            'Vocabulary: Daily Routines': 'ING_PRI4_C1.1',
            'Vocabulary: Food and Drinks': 'ING_PRI4_C1.1',
            'Vocabulary: School Subjects': 'ING_PRI4_C1.1',
            'Colors and Animals': 'ING_PRI4_C1.1',
            'Family and Greetings': 'ING_PRI4_C1.1',
            'Vocabulario': 'ING_PRI4_C1.1',
            // Gramática
            'Present Continuous': 'ING_PRI4_C1.2',
            'Past Simple (was/were)': 'ING_PRI4_C1.2',
            'Gramática': 'ING_PRI4_C1.2',
            'Inglés': 'ING_PRI4_C1.1'  // General
        }
    },
    'Lingua Galega': {
        '4º Primaria': {
            'Gramática Galega': 'GAL_PRI4_C1.1',
            'Gramática': 'GAL_PRI4_C1.1',
            'Ortografía da Lingua Galega': 'GAL_PRI4_C1.2',
            'Ortografía': 'GAL_PRI4_C1.2',
            'Vocabulario Galego Avanzado': 'GAL_PRI4_C1.3',
            'Vocabulario galego': 'GAL_PRI4_C1.3',
            'Redacción e Expresión en Galego': 'GAL_PRI4_C2.1',
            'Cultura Galega': 'GAL_PRI4_C2.2',
            'Lingua Galega': 'GAL_PRI4_C1.1'  // General
        }
    }
};

// ═══════════════════════════════════════════════════════════
// FUNCIONES DE CLASIFICACIÓN
// ═══════════════════════════════════════════════════════════

function clasificarFocoPedagogico(ejercicio, contexto) {
    const pregunta = (ejercicio.ejercicio || ejercicio.pregunta || '').toLowerCase();
    const tipo = (ejercicio.tipo || contexto.tipo || '').toLowerCase();

    // Heurística por TIPO
    if (tipo.includes('concepto') || tipo.includes('definición')) {
        return { foco: 'CONCEPTO', confianza: 0.90 };
    }

    if (tipo.includes('problema') || tipo.includes('situación') || tipo.includes('aplicación')) {
        return { foco: 'APLICACION', confianza: 0.85 };
    }

    // Heurística por PALABRAS CLAVE
    const patronesConcepto = /qué es|define|explica|cuál es|identifica|señala qué|significa/i;
    if (patronesConcepto.test(pregunta)) {
        return { foco: 'CONCEPTO', confianza: 0.88 };
    }

    const patronesProcedimiento = /calcula|resuelve|suma|resta|multiplica|divide|cuánto|resultado|escribe|completa|conjuga/i;
    if (patronesProcedimiento.test(pregunta)) {
        return { foco: 'PROCEDIMIENTO', confianza: 0.85 };
    }

    const patronesAplicacion = /juan|maría|pedro|ana|carlos|problema|tienda|si tiene|historia|caso/i;
    if (patronesAplicacion.test(pregunta)) {
        return { foco: 'APLICACION', confianza: 0.80 };
    }

    // Por defecto PROCEDIMIENTO (la mayoría son ejercicios prácticos)
    return { foco: 'PROCEDIMIENTO', confianza: 0.65 };
}

function mapearCriterioLOMLOE(contexto) {
    const { asignatura, curso, tema } = contexto;

    if (!asignatura || !curso) {
        return { criterio: null, confianza: 0.00 };
    }

    // Búsqueda exacta
    const criterio = MAPEO_LOMLOE[asignatura]?.[curso]?.[tema];
    if (criterio) {
        return { criterio, confianza: 0.90 };
    }

    // Búsqueda fuzzy
    const cursoMap = MAPEO_LOMLOE[asignatura]?.[curso] || {};
    for (const [temaKey, criterioValue] of Object.entries(cursoMap)) {
        const temaLower = (tema || '').toLowerCase();
        const keyLower = temaKey.toLowerCase();

        if (temaLower.includes(keyLower) || keyLower.includes(temaLower)) {
            return { criterio: criterioValue, confianza: 0.75 };
        }
    }

    return { criterio: null, confianza: 0.00 };
}

function asignarLicencia(nombreArchivo, contexto) {
    const archivo = nombreArchivo.toLowerCase();

    // Santillana
    if (archivo.includes('santillana')) {
        return { licencia: 'PROPRIETARY', confianza: 0.95, fuente: 'Santillana' };
    }

    // Khan Academy / Adaptado
    if (archivo.includes('khan') || contexto.source?.toLowerCase().includes('khan')) {
        return { licencia: 'CC-BY-NC-SA', confianza: 0.85, fuente: 'Khan Academy (adaptado)' };
    }

    // Creación propia (galicia, quinto primaria)
    if (archivo.includes('galicia') || archivo.includes('quinto')) {
        return { licencia: 'PROPRIETARY', confianza: 0.90, fuente: 'Creación propia - EduAnalytics' };
    }

    // Por defecto
    return { licencia: 'PROPRIETARY', confianza: 0.60, fuente: 'Sin especificar' };
}

// ═══════════════════════════════════════════════════════════
// EXTRACCIÓN DE EJERCICIOS
// ═══════════════════════════════════════════════════════════

function extraerEjerciciosDeArchivo(archivo, rutaCompleta) {
    const ejerciciosExtraidos = [];

    try {
        const contenido = fs.readFileSync(rutaCompleta, 'utf8');

        // Usar regex para encontrar la estructura de ejercicios
        // Buscar patrones como: 'Tema': { ejercicios: [...] }

        const regex = /'([^']+)':\s*\{[^}]*ejercicios:\s*\[([\s\S]*?)\]\s*\}/g;
        let match;
        let contador = 0;

        while ((match = regex.exec(contenido)) !== null) {
            const tema = match[1];
            const ejerciciosBloque = match[2];

            // Extraer cada ejercicio individual
            const regexEjercicio = /\{\s*tipo:\s*'([^']*)',\s*ejercicio:\s*'([^']*)',\s*respuesta:\s*'([^']*)'/g;
            let matchEj;

            while ((matchEj = regexEjercicio.exec(ejerciciosBloque)) !== null) {
                contador++;
                const id = `${archivo.replace('.js', '')}_${contador}`;

                ejerciciosExtraidos.push({
                    id: id,
                    tipo: matchEj[1],
                    ejercicio: matchEj[2],
                    respuesta: matchEj[3],
                    tema: tema,
                    archivo: archivo
                });
            }
        }

    } catch (error) {
        console.warn(`  ⚠️  Error leyendo ${archivo}: ${error.message}`);
    }

    return ejerciciosExtraidos;
}

function inferirContextoDeArchivo(nombreArchivo) {
    const archivo = nombreArchivo.toLowerCase();

    let asignatura = 'Sin especificar';
    let curso = 'Sin especificar';

    // Inferir curso
    if (archivo.includes('cuarto') || archivo.includes('4-primaria')) {
        curso = '4º Primaria';
    } else if (archivo.includes('quinto') || archivo.includes('5-primaria')) {
        curso = '5º Primaria';
    }

    // Inferir asignatura
    if (archivo.includes('matemat') || archivo.includes('mates')) {
        asignatura = 'Matemáticas';
    } else if (archivo.includes('lengua')) {
        asignatura = 'Lengua Castellana';
    } else if (archivo.includes('sociales')) {
        asignatura = 'Ciencias Sociales';
    } else if (archivo.includes('naturales')) {
        asignatura = 'Ciencias Naturales';
    } else if (archivo.includes('ingles')) {
        asignatura = 'Inglés';
    } else if (archivo.includes('galego')) {
        asignatura = 'Lingua Galega';
    }

    return { asignatura, curso };
}

function inferirAsignaturaDesdeTema(tema) {
    const temaLower = (tema || '').toLowerCase();

    // Matemáticas
    if (temaLower.match(/número|fracción|decimal|división|multiplicación|suma|resta|geometría|ángulo|medida|longitud|tiempo|problema matemático/)) {
        return 'Matemáticas';
    }

    // Lengua
    if (temaLower.match(/gramática|ortografía|verbo|sustantivo|adjetivo|oración|comprensión|lectura|texto|redacción/)) {
        return 'Lengua Castellana';
    }

    // Ciencias Sociales
    if (temaLower.match(/geografía|clima|historia|edad media|prehistoria|población|localidad|sector económico|universo|tierra|europa/)) {
        return 'Ciencias Sociales';
    }

    // Ciencias Naturales
    if (temaLower.match(/animal|planta|cuerpo humano|materia|energía|ecosistema|máquina|ser vivo|vertebrado|invertebrado/)) {
        return 'Ciencias Naturales';
    }

    // Inglés
    if (temaLower.match(/colors|animals|family|greetings|present|past|vocabulary|food|drink|daily routine/)) {
        return 'Inglés';
    }

    // Galego
    if (temaLower.match(/galega|galego/)) {
        return 'Lingua Galega';
    }

    return 'Sin especificar';
}

// ═══════════════════════════════════════════════════════════
// PROCESO PRINCIPAL
// ═══════════════════════════════════════════════════════════

function procesarTodosLosEjercicios() {
    console.log('╔═══════════════════════════════════════════════════════════╗');
    console.log('║  EXTRACTOR Y CLASIFICADOR COMPLETO - DÍA 1                ║');
    console.log('║  Generando CSV con clasificación de 3 campos              ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');

    const archivos = fs.readdirSync(CONFIG.directorioEjercicios);
    const todosLosEjercicios = [];

    console.log('📂 Extrayendo ejercicios de archivos...\n');

    for (const archivo of archivos) {
        if (!archivo.endsWith('.js') ||
            archivo.includes('config') ||
            archivo.includes('fetcher') ||
            archivo.includes('por-curso')) {
            continue;
        }

        const rutaCompleta = path.join(CONFIG.directorioEjercicios, archivo);
        const ejercicios = extraerEjerciciosDeArchivo(archivo, rutaCompleta);

        if (ejercicios.length > 0) {
            console.log(`  ✓ ${archivo.padEnd(40)} → ${ejercicios.length.toString().padStart(4)} ejercicios`);
            todosLosEjercicios.push(...ejercicios.map(ej => ({ ...ej, archivoOrigen: archivo })));
        }
    }

    console.log(`\n📊 Total ejercicios extraídos: ${todosLosEjercicios.length}\n`);

    // Clasificar cada ejercicio
    console.log('🔄 Clasificando ejercicios...\n');

    const resultados = todosLosEjercicios.map((ejercicio, index) => {
        if ((index + 1) % 100 === 0) {
            console.log(`  Procesando ${index + 1}/${todosLosEjercicios.length}...`);
        }

        const contextoArchivo = inferirContextoDeArchivo(ejercicio.archivoOrigen);

        // Si asignatura no se pudo inferir del archivo, intentar desde el tema
        if (contextoArchivo.asignatura === 'Sin especificar') {
            const asignaturaInferida = inferirAsignaturaDesdeTema(ejercicio.tema);
            contextoArchivo.asignatura = asignaturaInferida;
        }

        const contexto = {
            ...contextoArchivo,
            tema: ejercicio.tema,
            tipo: ejercicio.tipo
        };

        const resultadoFoco = clasificarFocoPedagogico(ejercicio, contexto);
        const resultadoCriterio = mapearCriterioLOMLOE(contexto);
        const resultadoLicencia = asignarLicencia(ejercicio.archivoOrigen, contexto);

        const confianzaGeneral = (
            resultadoFoco.confianza * 0.4 +
            resultadoCriterio.confianza * 0.4 +
            resultadoLicencia.confianza * 0.2
        );

        return {
            id: ejercicio.id,
            pregunta: ejercicio.ejercicio.substring(0, 150), // Limitar longitud
            asignatura: contexto.asignatura,
            curso: contexto.curso,
            tema: ejercicio.tema,
            tipo_ejercicio: ejercicio.tipo,
            foco_auto: resultadoFoco.foco,
            criterio_auto: resultadoCriterio.criterio || '',
            licencia_auto: resultadoLicencia.licencia,
            fuente_original: resultadoLicencia.fuente,
            confianza: parseFloat(confianzaGeneral.toFixed(2)),
            foco_final: resultadoFoco.foco,
            criterio_final: resultadoCriterio.criterio || '',
            licencia_final: resultadoLicencia.licencia,
            verificado: 'false',
            notas: ''
        };
    });

    // Ordenar por confianza (bajos primero)
    resultados.sort((a, b) => a.confianza - b.confianza);

    // Estadísticas
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║  ESTADÍSTICAS DE CLASIFICACIÓN                            ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');

    const stats = {
        total: resultados.length,
        alta: resultados.filter(r => r.confianza >= 0.85).length,
        media: resultados.filter(r => r.confianza >= 0.70 && r.confianza < 0.85).length,
        baja: resultados.filter(r => r.confianza < 0.70).length,

        concepto: resultados.filter(r => r.foco_auto === 'CONCEPTO').length,
        procedimiento: resultados.filter(r => r.foco_auto === 'PROCEDIMIENTO').length,
        aplicacion: resultados.filter(r => r.foco_auto === 'APLICACION').length,

        conCriterio: resultados.filter(r => r.criterio_auto).length,
        sinCriterio: resultados.filter(r => !r.criterio_auto).length
    };

    console.log(`📊 TOTAL: ${stats.total} ejercicios\n`);

    console.log('🎯 POR CONFIANZA:');
    console.log(`  ✅ Alta (≥0.85):      ${stats.alta.toString().padStart(4)} (${((stats.alta / stats.total) * 100).toFixed(1).padStart(5)}%)`);
    console.log(`  🟡 Media (0.70-0.85): ${stats.media.toString().padStart(4)} (${((stats.media / stats.total) * 100).toFixed(1).padStart(5)}%)`);
    console.log(`  ⚠️  Baja (<0.70):      ${stats.baja.toString().padStart(4)} (${((stats.baja / stats.total) * 100).toFixed(1).padStart(5)}%)`);

    console.log('\n🎓 FOCO PEDAGÓGICO:');
    console.log(`  📖 CONCEPTO:         ${stats.concepto.toString().padStart(4)} (${((stats.concepto / stats.total) * 100).toFixed(1).padStart(5)}%)`);
    console.log(`  🔢 PROCEDIMIENTO:    ${stats.procedimiento.toString().padStart(4)} (${((stats.procedimiento / stats.total) * 100).toFixed(1).padStart(5)}%)`);
    console.log(`  🌍 APLICACION:       ${stats.aplicacion.toString().padStart(4)} (${((stats.aplicacion / stats.total) * 100).toFixed(1).padStart(5)}%)`);

    console.log('\n📚 CRITERIO LOMLOE:');
    console.log(`  ✅ Con criterio:     ${stats.conCriterio.toString().padStart(4)} (${((stats.conCriterio / stats.total) * 100).toFixed(1).padStart(5)}%)`);
    console.log(`  ❌ Sin criterio:     ${stats.sinCriterio.toString().padStart(4)} (${((stats.sinCriterio / stats.total) * 100).toFixed(1).padStart(5)}%)`);

    // Exportar CSV
    console.log('\n📝 Generando CSV...\n');
    exportarCSV(resultados, CONFIG.archivoSalida);

    console.log('╔═══════════════════════════════════════════════════════════╗');
    console.log('║  ✅ PROCESO COMPLETADO - DÍA 1 FINALIZADO                 ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');

    console.log(`📄 CSV generado: ${CONFIG.archivoSalida}`);
    console.log(`📊 Total ejercicios procesados: ${resultados.length}`);
    console.log(`🔍 Requieren revisión manual: ${stats.baja} (${((stats.baja / stats.total) * 100).toFixed(1)}%)\n`);

    console.log('📋 PRÓXIMOS PASOS (DÍA 2-5):');
    console.log('  1. ✅ Abrir CSV en Excel/Google Sheets');
    console.log('  2. ✅ Revisar ejercicios con confianza < 0.75');
    console.log('  3. ✅ Corregir campos *_final si es necesario');
    console.log('  4. ✅ Marcar verificado = true');
    console.log('  5. ✅ Guardar y ejecutar script de importación (DÍA 6)\n');
}

function exportarCSV(datos, nombreArchivo) {
    const csvHeader = [
        'id', 'pregunta', 'asignatura', 'curso', 'tema', 'tipo_ejercicio',
        'foco_auto', 'criterio_auto', 'licencia_auto', 'fuente_original', 'confianza',
        'foco_final', 'criterio_final', 'licencia_final',
        'verificado', 'notas'
    ].join(',');

    const csvRows = datos.map(row => {
        return [
            row.id || '',
            `"${(row.pregunta || '').replace(/"/g, '""')}"`,
            row.asignatura || '',
            row.curso || '',
            row.tema || '',
            row.tipo_ejercicio || '',
            row.foco_auto || '',
            row.criterio_auto || '',
            row.licencia_auto || '',
            `"${row.fuente_original || ''}"`,
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

// Ejecutar
procesarTodosLosEjercicios();
