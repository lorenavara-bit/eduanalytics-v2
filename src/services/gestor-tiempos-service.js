// SERVICIO DE GESTIÓN DE TIEMPO DE RESPUESTA
// Sistema robusto para captura de tiempos con manejo de pausas y precisión analítica

/**
 * EVENTOS DE TEMPORIZACIÓN CLAVE
 */
export const EVENTOS_TIEMPO = {
    START_EXERCISE: 'START_EXERCISE',      // Pregunta visible
    SUBMIT_ANSWER: 'SUBMIT_ANSWER',         // Usuario envía respuesta
    LEAVE_WINDOW: 'LEAVE_WINDOW',           // Usuario sale de la pestaña
    FOCUS_WINDOW: 'FOCUS_WINDOW',           // Usuario vuelve a la pestaña
    PAUSE_TIMER: 'PAUSE_TIMER',             // Temporizador pausado manualmente
    RESUME_TIMER: 'RESUME_TIMER'            // Temporizador reanudado
};

/**
 * Clase para gestionar temporizadores de ejercicios
 */
export class GestorTiempos {
    constructor() {
        this.temporizadores = {}; // { exerciseId: {...data} }
        this.tiemposRespuesta = {}; // { exerciseId: tiempoSegundos }
        this.pausas = {}; // { exerciseId: [{inicio, fin}] }
        this.enFoco = true;
    }

    /**
     * Iniciar temporizador para un ejercicio
     */
    iniciarTemporizador(exerciseId) {
        const ahora = Date.now();

        this.temporizadores[exerciseId] = {
            inicio: ahora,
            ultimoCheckpoint: ahora,
            pausado: false,
            tiempoPausado: 0,
            eventos: [{
                tipo: EVENTOS_TIEMPO.START_EXERCISE,
                timestamp: ahora
            }]
        };

        console.log(`[TIEMPO] Iniciado para ejercicio ${exerciseId}`);
        return ahora;
    }

    /**
     * Pausar temporizador (cuando usuario sale de la ventana)
     */
    pausarTemporizador(exerciseId) {
        const temporizador = this.temporizadores[exerciseId];

        if (!temporizador || temporizador.pausado) return;

        const ahora = Date.now();
        temporizador.pausado = true;
        temporizador.inicioPausa = ahora;
        temporizador.eventos.push({
            tipo: EVENTOS_TIEMPO.LEAVE_WINDOW,
            timestamp: ahora
        });

        console.log(`[TIEMPO] Pausado ejercicio ${exerciseId}`);
    }

    /**
     * Reanudar temporizador (cuando usuario vuelve)
     */
    reanudarTemporizador(exerciseId) {
        const temporizador = this.temporizadores[exerciseId];

        if (!temporizador || !temporizador.pausado) return;

        const ahora = Date.now();
        const tiempoPausa = ahora - temporizador.inicioPausa;

        temporizador.pausado = false;
        temporizador.tiempoPausado += tiempoPausa;
        temporizador.eventos.push({
            tipo: EVENTOS_TIEMPO.FOCUS_WINDOW,
            timestamp: ahora,
            duracionPausa: tiempoPausa
        });

        // Registrar pausa para análisis
        if (!this.pausas[exerciseId]) {
            this.pausas[exerciseId] = [];
        }
        this.pausas[exerciseId].push({
            inicio: temporizador.inicioPausa,
            fin: ahora,
            duracion: tiempoPausa
        });

        console.log(`[TIEMPO] Reanudado ejercicio ${exerciseId} (pausa: ${(tiempoPausa / 1000).toFixed(1)}s)`);
    }

    /**
     * Finalizar temporizador y calcular tiempo total
     */
    finalizarTemporizador(exerciseId) {
        const temporizador = this.temporizadores[exerciseId];

        if (!temporizador) {
            console.warn(`[TIEMPO] No existe temporizador para ${exerciseId}`);
            return null;
        }

        const ahora = Date.now();

        // Si estaba pausado, reanudar antes de finalizar
        if (temporizador.pausado) {
            this.reanudarTemporizador(exerciseId);
        }

        // Calcular tiempo total
        const tiempoTotalMs = ahora - temporizador.inicio;
        const tiempoActivoMs = tiempoTotalMs - temporizador.tiempoPausado;
        const tiempoActivoSegundos = tiempoActivoMs / 1000;

        // Registrar evento final
        temporizador.eventos.push({
            tipo: EVENTOS_TIEMPO.SUBMIT_ANSWER,
            timestamp: ahora
        });

        // Guardar resultado
        this.tiemposRespuesta[exerciseId] = {
            tiempoTotal: tiempoTotalMs / 1000,
            tiempoActivo: tiempoActivoSegundos,
            tiempoPausado: temporizador.tiempoPausado / 1000,
            numeroPausas: this.pausas[exerciseId]?.length || 0,
            inicio: temporizador.inicio,
            fin: ahora,
            eventos: temporizador.eventos
        };

        console.log(`[TIEMPO] Finalizado ejercicio ${exerciseId}: ${tiempoActivoSegundos.toFixed(2)}s activos`);

        // Limpiar temporizador
        delete this.temporizadores[exerciseId];

        return this.tiemposRespuesta[exerciseId];
    }

    /**
     * Obtener tiempo transcurrido actual (sin finalizar)
     */
    obtenerTiempoTranscurrido(exerciseId) {
        const temporizador = this.temporizadores[exerciseId];

        if (!temporizador) return 0;

        const ahora = Date.now();
        const tiempoTotalMs = ahora - temporizador.inicio;
        const tiempoActivoMs = tiempoTotalMs - temporizador.tiempoPausado;

        return tiempoActivoMs / 1000;
    }

    /**
     * Obtener todos los tiempos de respuesta registrados
     */
    obtenerTodosLosTiempos() {
        return { ...this.tiemposRespuesta };
    }

    /**
     * Calcular estadísticas de tiempos
     */
    calcularEstadisticas() {
        const tiempos = Object.values(this.tiemposRespuesta).map(t => t.tiempoActivo);

        if (tiempos.length === 0) return null;

        const suma = tiempos.reduce((a, b) => a + b, 0);
        const promedio = suma / tiempos.length;
        const min = Math.min(...tiempos);
        const max = Math.max(...tiempos);

        // Calcular desviación estándar
        const varianza = tiempos.reduce((sum, t) => sum + Math.pow(t - promedio, 2), 0) / tiempos.length;
        const desviacionEstandar = Math.sqrt(varianza);
        const coeficienteVariacion = (desviacionEstandar / promedio) * 100;

        return {
            total: tiempos.length,
            promedio: promedio,
            min: min,
            max: max,
            desviacionEstandar: desviacionEstandar,
            coeficienteVariacion: coeficienteVariacion,
            tiempos: tiempos
        };
    }

    /**
     * Detectar variabilidad extrema (indicador TDAH)
     */
    detectarVariabilidadExtrema() {
        const stats = this.calcularEstadisticas();

        if (!stats || stats.total < 3) return null;

        // Variabilidad extrema: CV > 200%
        const esExtrema = stats.coeficienteVariacion > 200;

        return {
            coeficienteVariacion: stats.coeficienteVariacion,
            esExtrema: esExtrema,
            umbral: 200,
            mensaje: esExtrema ?
                'Variabilidad temporal extrema detectada (posible indicador de inconsistencia atencional)' :
                'Variabilidad dentro de rangos normales'
        };
    }

    /**
     * Detectar alta velocidad (indicador AACC)
     */
    detectarAltaVelocidad() {
        const stats = this.calcularEstadisticas();

        if (!stats || stats.total < 5) return null;

        // Calcular percentil 10
        const tiemposOrdenados = [...stats.tiempos].sort((a, b) => a - b);
        const index10 = Math.floor(tiemposOrdenados.length * 0.1);
        const percentil10 = tiemposOrdenados[index10];

        const esRapido = stats.promedio < percentil10;

        return {
            promedioUsuario: stats.promedio,
            percentil10: percentil10,
            esRapido: esRapido,
            mensaje: esRapido ?
                'Alta velocidad de respuesta detectada (posible indicador de alto ritmo cognitivo)' :
                'Velocidad dentro de rangos normales'
        };
    }

    /**
     * Resetear todos los datos
     */
    resetear() {
        this.temporizadores = {};
        this.tiemposRespuesta = {};
        this.pausas = {};
        console.log('[TIEMPO] Sistema reseteado');
    }
}

/**
 * Hook de React para usar el gestor de tiempos
 */
export function useGestorTiempos() {
    // Instancia única (singleton)
    if (!window.__gestorTiempos) {
        window.__gestorTiempos = new GestorTiempos();
    }

    const gestor = window.__gestorTiempos;

    // Listeners de ventana
    React.useEffect(() => {
        const handleBlur = () => {
            gestor.enFoco = false;
            // Pausar todos los temporizadores activos
            Object.keys(gestor.temporizadores).forEach(id => {
                gestor.pausarTemporizador(id);
            });
        };

        const handleFocus = () => {
            gestor.enFoco = true;
            // Reanudar todos los temporizadores pausados
            Object.keys(gestor.temporizadores).forEach(id => {
                gestor.reanudarTemporizador(id);
            });
        };

        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    return {
        iniciar: (id) => gestor.iniciarTemporizador(id),
        finalizar: (id) => gestor.finalizarTemporizador(id),
        pausar: (id) => gestor.pausarTemporizador(id),
        reanudar: (id) => gestor.reanudarTemporizador(id),
        obtenerTiempo: (id) => gestor.obtenerTiempoTranscurrido(id),
        obtenerTodos: () => gestor.obtenerTodosLosTiempos(),
        calcularEstadisticas: () => gestor.calcularEstadisticas(),
        detectarVariabilidad: () => gestor.detectarVariabilidadExtrema(),
        detectarVelocidad: () => gestor.detectarAltaVelocidad(),
        resetear: () => gestor.resetear()
    };
}

/**
 * Función auxiliar para formatear tiempo
 */
export function formatearTiempo(segundos) {
    if (segundos < 60) {
        return `${Math.round(segundos)}s`;
    }
    const minutos = Math.floor(segundos / 60);
    const segs = Math.round(segundos % 60);
    return `${minutos}m ${segs}s`;
}

/**
 * Función para preparar datos para el backend
 */
export function prepararDatosEvaluacion(tiemposRespuesta, respuestas, analisis) {
    // Calcular tiempo total
    const tiempos = Object.values(tiemposRespuesta);
    const tiempoTotalSegundos = tiempos.reduce((sum, t) => sum + t.tiempoActivo, 0);
    const tiempoPromedioSegundos = tiempoTotalSegundos / tiempos.length;

    // Preparar detalle por pregunta
    const detalleRespuestas = Object.keys(respuestas).map(exerciseId => ({
        ejercicio_id: exerciseId,
        respuesta: respuestas[exerciseId],
        patron_error: analisis[exerciseId]?.patron || 'N/A',
        correcta: analisis[exerciseId]?.correcta || false,
        // Datos de tiempo
        tiempo_respuesta: tiemposRespuesta[exerciseId]?.tiempoActivo || 0,
        tiempo_total: tiemposRespuesta[exerciseId]?.tiempoTotal || 0,
        numero_pausas: tiemposRespuesta[exerciseId]?.numeroPausas || 0,
        tiempo_pausado: tiemposRespuesta[exerciseId]?.tiempoPausado || 0
    }));

    return {
        // Tiempos globales
        tiempo_total_segundos: tiempoTotalSegundos,
        tiempo_promedio_por_pregunta: tiempoPromedioSegundos,

        // Detalle completo
        detalle_respuestas: detalleRespuestas,

        // Metadatos de tiempo
        metadata_tiempo: {
            inicio_evaluacion: Math.min(...tiempos.map(t => t.inicio)),
            fin_evaluacion: Math.max(...tiempos.map(t => t.fin)),
            pausas_totales: tiempos.reduce((sum, t) => sum + t.numeroPausas, 0)
        }
    };
}

export default {
    GestorTiempos,
    useGestorTiempos,
    EVENTOS_TIEMPO,
    formatearTiempo,
    prepararDatosEvaluacion
};
