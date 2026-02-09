// SISTEMA DE DETECCIÓN DE NECESIDADES EDUCATIVAS ESPECÍFICAS (NEE)
// Sistema de cribado y alerta temprana (NO diagnóstico médico)

import { analizarTendencias } from './analisis-historico-service';

/**
 * IMPORTANTE: DISCLAIMER LEGAL
 * Este sistema NO realiza diagnósticos médicos ni psicológicos.
 * Es una herramienta de cribado educativo que identifica patrones
 * que sugieren la necesidad de evaluación profesional externa.
 */

/**
 * CRITERIOS ANALÍTICOS PARA DETECCIÓN NEE
 */
export const CRITERIOS_NEE = {
    // Altas Capacidades
    AACC: {
        id: 'AACC',
        nombre: 'Altas Capacidades',
        icono: '🎯',
        descripcion: 'Patrón de eficiencia extrema y procesamiento rápido',
        criterios: [
            {
                id: 'velocidad_alta',
                nombre: 'Alto Ritmo Cognitivo',
                metrica: 'Tiempo de respuesta consistentemente < percentil 10',
                peso: 3
            },
            {
                id: 'aburrimient o_ec',
                nombre: 'EC por Aburrimiento',
                metrica: 'Errores EC en temas dominados (por falta de atención)',
                peso: 2
            },
            {
                id: 'disincronia',
                nombre: 'Disincronía Bloom',
                metrica: 'Alto en ANALIZAR/EVALUAR, bajo en RECORDAR',
                peso: 3
            },
            {
                id: 'variabilidad_cualitativa',
                nombre: 'Variabilidad por Desinterés',
                metrica: 'Alto en temas complejos, bajo en triviales',
                peso: 2
            }
        ],
        umbral_activacion: 2, // Mínimo de criterios para alerta
        gravedad: 'INFORMATIVA'
    },

    // TDAH
    TDAH: {
        id: 'TDAH',
        nombre: 'Patrón TDAH',
        icono: '⚡',
        descripcion: 'Patrón de inconsistencia y variabilidad temporal',
        criterios: [
            {
                id: 'variabilidad_tiempo',
                nombre: 'Inconsistencia Atencional',
                metrica: 'Desviación estándar de tiempos > 200% de la media',
                peso: 3
            },
            {
                id: 'alto_etf',
                nombre: 'Impulsividad/Despiste',
                metrica: 'Alto ETF (>40%) con bajo EP/EC',
                peso: 3
            },
            {
                id: 'necesidad_refuerzo',
                nombre: 'Necesidad de Soporte Externo',
                metrica: 'Uso frecuente de pistas/feedback inmediato',
                peso: 2
            },
            {
                id: 'saltos_atencion',
                nombre: 'Saltos de Atención',
                metrica: 'Cambios bruscos de rendimiento entre ejercicios consecutivos',
                peso: 2
            }
        ],
        umbral_activacion: 2,
        gravedad: 'ALTA'
    },

    // Dislexia
    DISLEXIA: {
        id: 'DISLEXIA',
        nombre: 'Patrón Dislexia',
        icono: '📝',
        descripcion: 'Discrepancia entre conocimiento y expresión escrita',
        criterios: [
            {
                id: 'errores_fonologicos',
                nombre: 'Dificultad Fonológica/Ortográfica',
                metrica: 'Alto ETF con patrones de omisión/sustitución/inversión',
                peso: 3
            },
            {
                id: 'discrepancia_verbal_logica',
                nombre: 'Brecha Verbal/Lógica',
                metrica: 'Rendimiento Matemáticas/Ciencias > Lengua (diferencia >25%)',
                peso: 3
            },
            {
                id: 'sobreesfuerzo_lectoescritor',
                nombre: 'Sobreesfuerzo Lectoescritor',
                metrica: 'Tiempo lectura/escritura >> tiempo cálculo',
                peso: 2
            },
            {
                id: 'comprension_vs_ortografia',
                nombre: 'Comprensión OK, Ortografía NO',
                metrica: 'Bajo EC en lengua pero alto ETF ortográfico',
                peso: 2
            }
        ],
        umbral_activacion: 2,
        gravedad: 'ALTA'
    }
};

/**
 * Analizar evaluaciones históricas para detectar patrones NEE
 * @param {Array} evaluaciones - Historial de evaluaciones (últimas 20 mínimo recomendado)
 * @returns {Object} - Alertas NEE generadas
 */
export function generarAlertasNEE(evaluaciones) {
    if (!evaluaciones || evaluaciones.length < 10) {
        return {
            hayDatos: false,
            mensaje: 'Se necesitan al menos 10 evaluaciones para análisis NEE',
            alertas: []
        };
    }

    const alertas = [];

    // 1. Analizar patrón de Altas Capacidades
    const alertaAACC = detectarAltasCapacidades(evaluaciones);
    if (alertaAACC) alertas.push(alertaAACC);

    // 2. Analizar patrón TDAH
    const alertaTDAH = detectarTDAH(evaluaciones);
    if (alertaTDAH) alertas.push(alertaTDAH);

    // 3. Analizar patrón Dislexia
    const alertaDislexia = detectarDislexia(evaluaciones);
    if (alertaDislexia) alertas.push(alertaDislexia);

    return {
        hayDatos: true,
        totalEvaluaciones: evaluaciones.length,
        alertas: alertas,
        disclaimer: 'IMPORTANTE: Estos patrones son indicadores que sugieren una evaluación profesional, NO son diagnósticos médicos.'
    };
}

/**
 * Detectar patrón de Altas Capacidades
 */
function detectarAltasCapacidades(evaluaciones) {
    const criterios = CRITERIOS_NEE.AACC;
    const criteriosCumplidos = [];
    let puntuacionTotal = 0;

    // CRITERIO 1: Velocidad de respuesta (percentil 10)
    if (evaluaciones[0].tiempoPromedio) {
        const tiempos = evaluaciones.map(e => e.tiempoPromedio).filter(t => t > 0);
        const percentil10 = calcularPercentil(tiempos, 10);
        const tiempoMedio = tiempos.reduce((a, b) => a + b, 0) / tiempos.length;

        if (tiempoMedio < percentil10) {
            criteriosCumplidos.push({
                id: 'velocidad_alta',
                cumple: true,
                evidencia: `Tiempo promedio: ${Math.round(tiempoMedio)}s vs percentil 10: ${Math.round(percentil10)}s`
            });
            puntuacionTotal += 3;
        }
    }

    // CRITERIO 2: EC por aburrimiento (no por falta de comprensión)
    const evalConAltoRendimiento = evaluaciones.filter(e => e.porcentaje >= 80);
    const ecEnAltoRendimiento = evalConAltoRendimiento.filter(e => e.erroresPorPatron?.EC > 0);

    if (evalConAltoRendimiento.length > 5 && ecEnAltoRendimiento.length > 0) {
        const tasaECenAltos = ecEnAltoRendimiento.length / evalConAltoRendimiento.length;
        if (tasaECenAltos > 0.2) { // >20% de las evaluaciones altas tienen EC
            criteriosCumplidos.push({
                id: 'aburrimiento_ec',
                cumple: true,
                evidencia: `${Math.round(tasaECenAltos * 100)}% de evaluaciones con alto rendimiento tienen errores conceptuales (posible falta de atención)`
            });
            puntuacionTotal += 2;
        }
    }

    // CRITERIO 3: Disincronía Bloom (alto en niveles altos, bajo en bajos)
    const rendimientoPorBloom = calcularRendimientoPorBloom(evaluaciones);
    if (rendimientoPorBloom.ANALIZAR > 80 && rendimientoPorBloom.RECORDAR < 70) {
        const diferencia = rendimientoPorBloom.ANALIZAR - rendimientoPorBloom.RECORDAR;
        if (diferencia > 20) {
            criteriosCumplidos.push({
                id: 'disincronia',
                cumple: true,
                evidencia: `Rendimiento ANALIZAR: ${rendimientoPorBloom.ANALIZAR}% vs RECORDAR: ${rendimientoPorBloom.RECORDAR}% (diferencia: ${diferencia}%)`
            });
            puntuacionTotal += 3;
        }
    }

    // CRITERIO 4: Variabilidad cualitativa (interés selectivo)
    const variabilidadPorAsignatura = calcularVariabilidadAsignaturas(evaluaciones);
    if (variabilidadPorAsignatura.desviacion > 25) {
        criteriosCumplidos.push({
            id: 'variabilidad_cualitativa',
            cumple: true,
            evidencia: `Gran variación en rendimiento entre asignaturas (${Math.round(variabilidadPorAsignatura.desviacion)}% desviación)`
        });
        puntuacionTotal += 2;
    }

    // Verificar si se cumple el umbral
    if (criteriosCumplidos.length >= criterios.umbral_activacion) {
        return {
            tipo: 'AACC',
            nombre: criterios.nombre,
            icono: criterios.icono,
            gravedad: criterios.gravedad,
            confianza: Math.min(0.95, (puntuacionTotal / 10)),
            criteriosCumplidos: criteriosCumplidos,
            mensaje: 'Patrón de alto ritmo cognitivo y eficiencia extrema detectado',
            recomendacion: 'Se recomienda evaluación psicopedagógica para determinar si el estudiante podría beneficiarse de un programa de enriquecimiento o adaptación curricular.',
            visiblePara: ['padres', 'tutores', 'profesores']
        };
    }

    return null;
}

/**
 * Detectar patrón de TDAH
 */
function detectarTDAH(evaluaciones) {
    const criterios = CRITERIOS_NEE.TDAH;
    const criteriosCumplidos = [];
    let puntuacionTotal = 0;

    // CRITERIO 1: Variabilidad extrema en tiempos
    if (evaluaciones[0].tiempoPromedio) {
        const tiempos = evaluaciones.map(e => e.tiempoPromedio).filter(t => t > 0);
        const media = tiempos.reduce((a, b) => a + b, 0) / tiempos.length;
        const desviacion = calcularDesviacionEstandar(tiempos);
        const coeficienteVariacion = (desviacion / media) * 100;

        if (coeficienteVariacion > 200) { // Desviación > 200% de la media
            criteriosCumplidos.push({
                id: 'variabilidad_tiempo',
                cumple: true,
                evidencia: `Variabilidad temporal extrema: ${Math.round(coeficienteVariacion)}% (normal: <100%)`
            });
            puntuacionTotal += 3;
        }
    }

    // CRITERIO 2: Alto ETF con bajo EP/EC (despistes, no falta de conocimiento)
    const totalErrores = {};
    evaluaciones.forEach(e => {
        if (e.erroresPorPatron) {
            Object.keys(e.erroresPorPatron).forEach(patron => {
                totalErrores[patron] = (totalErrores[patron] || 0) + e.erroresPorPatron[patron];
            });
        }
    });

    const sumaTotal = Object.values(totalErrores).reduce((a, b) => a + b, 0);
    if (sumaTotal > 0) {
        const porcentajeETF = ((totalErrores.ETF || 0) / sumaTotal) * 100;
        const porcentajeECEP = (((totalErrores.EC || 0) + (totalErrores.EP || 0)) / sumaTotal) * 100;

        if (porcentajeETF > 40 && porcentajeECEP < 30) {
            criteriosCumplidos.push({
                id: 'alto_etf',
                cumple: true,
                evidencia: `${Math.round(porcentajeETF)}% errores de forma/despiste vs ${Math.round(porcentajeECEP)}% errores conceptuales/procedimentales`
            });
            puntuacionTotal += 3;
        }
    }

    // CRITERIO 3: Saltos de atención (rendimiento errático)
    let saltosSignificativos = 0;
    for (let i = 1; i < evaluaciones.length; i++) {
        const diferencia = Math.abs(evaluaciones[i].porcentaje - evaluaciones[i - 1].porcentaje);
        if (diferencia > 30) { // Cambio >30% entre evaluaciones consecutivas
            saltosSignificativos++;
        }
    }

    if (saltosSignificativos > evaluaciones.length * 0.3) { // >30% de las transiciones son saltos
        criteriosCumplidos.push({
            id: 'saltos_atencion',
            cumple: true,
            evidencia: `${saltosSignificativos} saltos significativos de rendimiento entre evaluaciones consecutivas`
        });
        puntuacionTotal += 2;
    }

    // Verificar umbral
    if (criteriosCumplidos.length >= criterios.umbral_activacion) {
        return {
            tipo: 'TDAH',
            nombre: criterios.nombre,
            icono: criterios.icono,
            gravedad: criterios.gravedad,
            confianza: Math.min(0.90, (puntuacionTotal / 8)),
            criteriosCumplidos: criteriosCumplidos,
            mensaje: 'Patrón de inconsistencia atencional y variabilidad temporal detectado',
            recomendacion: 'Se recomienda evaluación neuropsicológica por un profesional especializado en atención y función ejecutiva para descartar o confirmar TDAH y establecer apoyos apropiados.',
            visiblePara: ['padres', 'tutores']
        };
    }

    return null;
}

/**
 * Detectar patrón de Dislexia
 */
function detectarDislexia(evaluaciones) {
    const criterios = CRITERIOS_NEE.DISLEXIA;
    const criteriosCumplidos = [];
    let puntuacionTotal = 0;

    // CRITERIO 1: Discrepancia verbal/lógica
    const rendimientoPorAsignatura = {};
    evaluaciones.forEach(e => {
        if (e.asignatura) {
            if (!rendimientoPorAsignatura[e.asignatura]) {
                rendimientoPorAsignatura[e.asignatura] = [];
            }
            rendimientoPorAsignatura[e.asignatura].push(e.porcentaje);
        }
    });

    const promedios = {};
    Object.keys(rendimientoPorAsignatura).forEach(asig => {
        const vals = rendimientoPorAsignatura[asig];
        promedios[asig] = vals.reduce((a, b) => a + b, 0) / vals.length;
    });

    // Comparar Matemáticas/Ciencias vs Lengua
    const asigLogicas = ['Matemáticas', 'Ciencias', 'Ciencias de la Naturaleza'];
    const asigVerbales = ['Lengua', 'Lengua Castellana', 'Lengua Castellana y Literatura'];

    const promedioLogico = calcularPromedioGrupo(promedios, asigLogicas);
    const promedioVerbal = calcularPromedioGrupo(promedios, asigVerbales);

    if (promedioLogico > 0 && promedioVerbal > 0) {
        const diferencia = promedioLogico - promedioVerbal;
        if (diferencia > 25) {
            criteriosCumplidos.push({
                id: 'discrepancia_verbal_logica',
                cumple: true,
                evidencia: `Rendimiento lógico-matemático: ${Math.round(promedioLogico)}% vs verbal: ${Math.round(promedioVerbal)}% (diferencia: ${Math.round(diferencia)}%)`
            });
            puntuacionTotal += 3;
        }
    }

    // CRITERIO 2: Alto ETF en Lengua con patrón ortográfico
    const evalLengua = evaluaciones.filter(e =>
        e.asignatura && e.asignatura.toLowerCase().includes('lengua')
    );

    if (evalLengua.length > 3) {
        let totalETFLengua = 0;
        let totalECLengua = 0;
        evalLengua.forEach(e => {
            if (e.erroresPorPatron) {
                totalETFLengua += e.erroresPorPatron.ETF || 0;
                totalECLengua += e.erroresPorPatron.EC || 0;
            }
        });

        if (totalETFLengua > totalECLengua * 2) { // ETF >> EC en lengua
            criteriosCumplidos.push({
                id: 'comprension_vs_ortografia',
                cumple: true,
                evidencia: `En Lengua: ${totalETFLengua} errores de forma vs ${totalECLengua} errores conceptuales (comprensión preservada)`
            });
            puntuacionTotal += 2;
        }
    }

    // CRITERIO 3: Tiempo lectoescritura >> tiempo cálculo
    const evalConTiempo = evaluaciones.filter(e => e.tiempoPromedio > 0);
    if (evalConTiempo.length > 5) {
        const tiemposLengua = evalConTiempo
            .filter(e => e.asignatura && e.asignatura.toLowerCase().includes('lengua'))
            .map(e => e.tiempoPromedio);

        const tiemposMate = evalConTiempo
            .filter(e => e.asignatura && e.asignatura.toLowerCase().includes('matemáticas'))
            .map(e => e.tiempoPromedio);

        if (tiemposLengua.length > 0 && tiemposMate.length > 0) {
            const mediaLengua = tiemposLengua.reduce((a, b) => a + b, 0) / tiemposLengua.length;
            const mediaMate = tiemposMate.reduce((a, b) => a + b, 0) / tiemposMate.length;

            if (mediaLengua > mediaMate * 1.5) { // 50% más lento en lengua
                criteriosCumplidos.push({
                    id: 'sobreesfuerzo_lectoescritor',
                    cumple: true,
                    evidencia: `Tiempo medio Lengua: ${Math.round(mediaLengua)}s vs Matemáticas: ${Math.round(mediaMate)}s (${Math.round((mediaLengua / mediaMate - 1) * 100)}% más lento)`
                });
                puntuacionTotal += 2;
            }
        }
    }

    // Verificar umbral
    if (criteriosCumplidos.length >= criterios.umbral_activacion) {
        return {
            tipo: 'DISLEXIA',
            nombre: criterios.nombre,
            icono: criterios.icono,
            gravedad: criterios.gravedad,
            confianza: Math.min(0.85, (puntuacionTotal / 7)),
            criteriosCumplidos: criteriosCumplidos,
            mensaje: 'Patrón de discrepancia entre conocimiento y expresión escrita detectado',
            recomendacion: 'Se recomienda evaluación especializada en lectoescritura por un logopeda o psicopedagogo para valorar posibles dificultades específicas de aprendizaje en el área verbal y establecer apoyos apropiados.',
            visiblePara: ['padres', 'tutores']
        };
    }

    return null;
}

/**
 * FUNCIONES AUXILIARES
 */

function calcularPercentil(valores, percentil) {
    const sorted = [...valores].sort((a, b) => a - b);
    const index = Math.ceil((percentil / 100) * sorted.length) - 1;
    return sorted[Math.max(0, index)];
}

function calcularDesviacionEstandar(valores) {
    const media = valores.reduce((a, b) => a + b, 0) / valores.length;
    const varianza = valores.reduce((sum, val) => sum + Math.pow(val - media, 2), 0) / valores.length;
    return Math.sqrt(varianza);
}

function calcularRendimientoPorBloom(evaluaciones) {
    const rendimiento = { RECORDAR: [], COMPRENDER: [], APLICAR: [], ANALIZAR: [], EVALUAR: [], CREAR: [] };

    evaluaciones.forEach(e => {
        if (e.detalleRespuestas) {
            e.detalleRespuestas.forEach(r => {
                const bloom = r.nivelBloom || 'APLICAR';
                if (rendimiento[bloom]) {
                    rendimiento[bloom].push(r.correcta ? 100 : 0);
                }
            });
        }
    });

    const promedios = {};
    Object.keys(rendimiento).forEach(nivel => {
        if (rendimiento[nivel].length > 0) {
            promedios[nivel] = rendimiento[nivel].reduce((a, b) => a + b, 0) / rendimiento[nivel].length;
        } else {
            promedios[nivel] = 0;
        }
    });

    return promedios;
}

function calcularVariabilidadAsignaturas(evaluaciones) {
    const promediosPorAsignatura = {};

    evaluaciones.forEach(e => {
        if (e.asignatura) {
            if (!promediosPorAsignatura[e.asignatura]) {
                promediosPorAsignatura[e.asignatura] = [];
            }
            promediosPorAsignatura[e.asignatura].push(e.porcentaje);
        }
    });

    const promedios = Object.values(promediosPorAsignatura).map(vals =>
        vals.reduce((a, b) => a + b, 0) / vals.length
    );

    if (promedios.length < 2) return { desviacion: 0 };

    const desviacion = calcularDesviacionEstandar(promedios);
    return { desviacion };
}

function calcularPromedioGrupo(promedios, asignaturas) {
    const valores = asignaturas
        .filter(asig => promedios[asig] !== undefined)
        .map(asig => promedios[asig]);

    if (valores.length === 0) return 0;
    return valores.reduce((a, b) => a + b, 0) / valores.length;
}

/**
 * Generar informe para padres/tutores (NUNCA para el alumno)
 */
export function generarInformeNEEParaPadres(alertas) {
    if (!alertas || alertas.length === 0) {
        return {
            hayAlertas: false,
            mensaje: 'No se han detectado patrones que requieran atención especializada en este momento.'
        };
    }

    let informe = '# 📋 INFORME DE PATRONES DETECTADOS\n\n';
    informe += '**IMPORTANTE:** Este informe es una herramienta de cribado educativo, NO un diagnóstico médico o psicológico. Los patrones detectados sugieren que podría ser beneficioso consultar con un profesional especializado.\n\n';
    informe += '---\n\n';

    alertas.forEach(alerta => {
        informe += `## ${alerta.icono} ${alerta.nombre}\n\n`;
        informe += `**Confianza del patrón:** ${Math.round(alerta.confianza * 100)}%\n\n`;
        informe += `**Patrón detectado:** ${alerta.mensaje}\n\n`;

        informe += `**Evidencias encontradas:**\n`;
        alerta.criteriosCumplidos.forEach((criterio, idx) => {
            informe += `${idx + 1}. ${criterio.evidencia}\n`;
        });
        informe += '\n';

        informe += `**Recomendación:** ${alerta.recomendacion}\n\n`;
        informe += '---\n\n';
    });

    informe += '## 👨‍⚕️ Próximos Pasos Recomendados\n\n';
    informe += '1. **No alarmarse:** Estos son patrones estadísticos, no certezas.\n';
    informe += '2. **Consultar con el tutor/a:** Compartir este informe con el profesor para contrastar observaciones.\n';
    informe += '3. **Evaluación profesional:** Si las observaciones coinciden, considerar consulta con:\n';

    const tiposDetectados = alertas.map(a => a.tipo);
    if (tiposDetectados.includes('AACC')) {
        informe += '   - Psicopedagogo/a especializado en altas capacidades\n';
    }
    if (tiposDetectados.includes('TDAH')) {
        informe += '   - Neuropsicólogo/a o psiquiatra infantil\n';
    }
    if (tiposDetectados.includes('DISLEXIA')) {
        informe += '   - Logopeda o especialista en dificultades de aprendizaje\n';
    }

    informe += '\n4. **Mantener la calma:** Cualquiera de estas condiciones, con el apoyo adecuado, no impide el éxito académico.\n';

    return {
        hayAlertas: true,
        totalAlertas: alertas.length,
        tiposDetectados: tiposDetectados,
        informe: informe,
        alertas: alertas
    };
}

export default {
    CRITERIOS_NEE,
    generarAlertasNEE,
    generarInformeNEEParaPadres
};
