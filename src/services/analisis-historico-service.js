// SERVICIO DE ANÁLISIS HISTÓRICO
// Gestiona y analiza el progreso del estudiante a lo largo del tiempo
// [RESET] Eliminada dependencia de taxonomía avanzada para "Start from Zero"

/**
 * Analizar múltiples evaluaciones para identificar tendencias
 * @param {Array} evaluaciones - Array de resultados de evaluaciones previas
 * @returns {Object} Análisis de tendencias y recomendaciones
 */
export function analizarTendencias(evaluaciones) {
    if (!evaluaciones || evaluaciones.length === 0) {
        return {
            hayDatos: false,
            mensaje: 'No hay datos históricos suficientes para análisis de tendencias'
        };
    }

    // Ordenar por fecha (más reciente primero)
    const ordenadas = [...evaluaciones].sort((a, b) =>
        new Date(b.fecha) - new Date(a.fecha)
    );

    const analisis = {
        hayDatos: true,
        totalEvaluaciones: evaluaciones.length,

        // Tendencia general
        tendenciaGeneral: calcularTendenciaGeneral(ordenadas),

        // Evolución de puntuación
        evolucionPuntuacion: calcularEvolucionPuntuacion(ordenadas),

        // Patrones de error recurrentes (DESACTIVADO)
        patronesRecurrentes: [],

        // Criterios LOMLOE problemáticos (DESACTIVADO)
        criteriosProblematicos: [],

        // Fortalezas consistentes
        fortalezasConsistentes: identifyingFortalezas(ordenadas),

        // Alertas (BÁSICAS)
        alertas: generarAlertas(ordenadas),

        // Velocidad de mejora
        velocidadMejora: calcularVelocidadMejora(ordenadas),

        // Predicciones
        predicciones: generarPredicciones(ordenadas),

        // Recomendaciones basadas en historial
        recomendaciones: generarRecomendacionesHistoricas(ordenadas)
    };

    return analisis;
}

/**
 * Calcular tendencia general (mejorando, estable, empeorando)
 */
function calcularTendenciaGeneral(evaluaciones) {
    if (evaluaciones.length < 2) {
        return {
            tipo: 'insuficiente',
            mensaje: 'Necesitas al menos 2 evaluaciones para ver tendencias'
        };
    }

    // Tomar las últimas 5 evaluaciones
    const recientes = evaluaciones.slice(0, Math.min(5, evaluaciones.length));
    const puntuaciones = recientes.map(e => e.porcentaje).reverse();

    // Calcular pendiente de la línea de tendencia
    const n = puntuaciones.length;
    const sumX = (n * (n + 1)) / 2;
    const sumY = puntuaciones.reduce((a, b) => a + b, 0);
    const sumXY = puntuaciones.reduce((sum, y, i) => sum + (i + 1) * y, 0);
    const sumX2 = (n * (n + 1) * (2 * n + 1)) / 6;

    const pendiente = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);

    let tipo, mensaje, icono;
    if (pendiente > 2) {
        tipo = 'mejorando_rapido';
        mensaje = '¡Excelente! Estás mejorando rápidamente';
        icono = '🚀';
    } else if (pendiente > 0.5) {
        tipo = 'mejorando';
        mensaje = 'Vas mejorando progresivamente. ¡Sigue así!';
        icono = '📈';
    } else if (pendiente > -0.5) {
        tipo = 'estable';
        mensaje = 'Tu rendimiento se mantiene estable';
        icono = '➡️';
    } else if (pendiente > -2) {
        tipo = 'empeorando';
        mensaje = 'Tu rendimiento está bajando ligeramente';
        icono = '📉';
    } else {
        tipo = 'empeorando_rapido';
        mensaje = '⚠️ Tu rendimiento está bajando. Necesitas apoyo';
        icono = '⚠️';
    }

    return {
        tipo,
        mensaje,
        icono,
        pendiente: pendiente.toFixed(2),
        ultimasPuntuaciones: puntuaciones
    };
}

/**
 * Calcular evolución de puntuación
 */
function calcularEvolucionPuntuacion(evaluaciones) {
    const datos = evaluaciones.map(e => ({
        fecha: e.fecha,
        puntuacion: e.porcentaje,
        correctas: e.correctas,
        total: e.totalPreguntas
    })).reverse();

    const promedio = datos.reduce((sum, d) => sum + d.puntuacion, 0) / datos.length;
    const mejor = Math.max(...datos.map(d => d.puntuacion));
    const peor = Math.min(...datos.map(d => d.puntuacion));

    return {
        datos,
        promedio: Math.round(promedio),
        mejor,
        peor,
        mejoria: datos[datos.length - 1].puntuacion - datos[0].puntuacion
    };
}


/**
 * Identificar fortalezas consistentes
 */
function identifyingFortalezas(evaluaciones) {
    const fortalezas = [];

    // Rendimiento consistente >80%
    const puntuacionesAltas = evaluaciones.filter(e => e.porcentaje >= 80).length;
    if (puntuacionesAltas / evaluaciones.length >= 0.7) {
        fortalezas.push({
            tipo: 'rendimiento_alto',
            icono: '⭐',
            titulo: 'Rendimiento consistentemente alto',
            descripcion: `${Math.round((puntuacionesAltas / evaluaciones.length) * 100)}% de evaluaciones con >80%`
        });
    }

    // Completitud (responde todo)
    const evaluacionesCompletas = evaluaciones.filter(e => e.sinResponder === 0).length;
    if (evaluacionesCompletas / evaluaciones.length >= 0.8) {
        fortalezas.push({
            tipo: 'completitud',
            icono: '✅',
            titulo: 'Siempre completa las evaluaciones',
            descripcion: `${Math.round((evaluacionesCompletas / evaluaciones.length) * 100)}% de completitud`
        });
    }

    return fortalezas;
}

/**
 * Generar alertas basadas en el historial
 */
function generarAlertas(evaluaciones) {
    const alertas = [];

    // Alerta: Tendencia a la baja
    if (evaluaciones.length >= 3) {
        const ultimas3 = evaluaciones.slice(0, 3).map(e => e.porcentaje);
        if (ultimas3[0] < ultimas3[1] && ultimas3[1] < ultimas3[2]) {
            alertas.push({
                tipo: 'tendencia_negativa',
                gravedad: 'MEDIA',
                icono: '📉',
                titulo: 'Tendencia a la baja',
                mensaje: 'El rendimiento está bajando en las últimas 3 evaluaciones',
                accion: 'Revisar método de estudio y aumentar tiempo de práctica'
            });
        }
    }

    return alertas;
}

/**
 * Calcular velocidad de mejora
 */
function calcularVelocidadMejora(evaluaciones) {
    if (evaluaciones.length < 2) {
        return { tipo: 'insuficiente', valor: 0 };
    }

    const primera = evaluaciones[evaluaciones.length - 1].porcentaje;
    const ultima = evaluaciones[0].porcentaje;
    const mejora = ultima - primera;
    const tiempo = evaluaciones.length;
    const velocidad = mejora / tiempo;

    let tipo, mensaje;
    if (velocidad > 3) {
        tipo = 'rapida';
        mensaje = '¡Estás mejorando muy rápido!';
    } else if (velocidad > 1) {
        tipo = 'moderada';
        mensaje = 'Mejoras de forma constante';
    } else if (velocidad > -1) {
        tipo = 'lenta';
        mensaje = 'Mejora lenta pero progresiva';
    } else {
        tipo = 'negativa';
        mensaje = 'Necesitas cambiar estrategia de estudio';
    }

    return {
        tipo,
        mensaje,
        valor: velocidad.toFixed(1),
        mejoraTotal: mejora,
        evaluaciones: tiempo
    };
}

/**
 * Generar predicciones basadas en tendencia
 */
function generarPredicciones(evaluaciones) {
    if (evaluaciones.length < 3) {
        return { disponible: false };
    }

    const tendencia = calcularTendenciaGeneral(evaluaciones);
    const ultima = evaluaciones[0].porcentaje;
    const pendiente = parseFloat(tendencia.pendiente);

    // Predecir próxima puntuación
    const proximaPuntuacion = Math.max(0, Math.min(100, ultima + pendiente));

    // Predecir cuando alcanzará 90% (si es realista)
    let evaluacionesHasta90 = null;
    if (pendiente > 0 && ultima < 90) {
        evaluacionesHasta90 = Math.ceil((90 - ultima) / pendiente);
    }

    return {
        disponible: true,
        proximaPuntuacion: Math.round(proximaPuntuacion),
        evaluacionesHasta90,
        confianza: evaluaciones.length >= 5 ? 'alta' : 'media'
    };
}

/**
 * Generar recomendaciones basadas en historial
 */
function generarRecomendacionesHistoricas(evaluaciones) {
    const recomendaciones = [];

    // Recomendación basada en tendencia
    const tendencia = calcularTendenciaGeneral(evaluaciones);
    if (tendencia.tipo === 'empeorando' || tendencia.tipo === 'empeorando_rapido') {
        recomendaciones.push({
            prioridad: 1,
            icono: '⚠️',
            titulo: 'Revisar método de estudio',
            descripcion: 'Tu rendimiento está bajando',
            accion: 'Solicitar ayuda de profesor/tutor y revisar estrategia de estudio'
        });
    }

    // Recomendación basada en fortalezas
    const fortalezas = identifyingFortalezas(evaluaciones);
    if (fortalezas.some(f => f.tipo === 'rendimiento_alto')) {
        recomendaciones.push({
            prioridad: 3,
            icono: '🚀',
            titulo: 'Considera contenido más avanzado',
            descripcion: 'Tu rendimiento es consistentemente alto',
            accion: 'Explora temas de mayor complejidad para seguir creciendo'
        });
    }

    return recomendaciones.sort((a, b) => a.prioridad - b.prioridad);
}

/**
 * Generar resumen ejecutivo del progreso
 */
export function generarResumenProgreso(evaluaciones) {
    if (!evaluaciones || evaluaciones.length === 0) {
        return null;
    }

    const tendencias = analizarTendencias(evaluaciones);

    return {
        totalEvaluaciones: evaluaciones.length,
        tendencia: tendencias.tendenciaGeneral,
        puntuacionPromedio: tendencias.evolucionPuntuacion.promedio,
        mejorPuntuacion: tendencias.evolucionPuntuacion.mejor,
        patronesRecurrentes: 0,
        alertasActivas: tendencias.alertas.length,
        fortalezas: tendencias.fortalezasConsistentes.length
    };
}

export default {
    analizarTendencias,
    generarResumenProgreso
};
