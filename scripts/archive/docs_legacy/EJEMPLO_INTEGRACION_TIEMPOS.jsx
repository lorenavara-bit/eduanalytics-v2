// EJEMPLO DE INTEGRACIÓN - InteractiveWorksheet.jsx
// Cómo integrar el gestor de tiempos en tu componente existente

import React, { useState, useEffect } from 'react';
import { useGestorTiempos, formatearTiempo, prepararDatosEvaluacion } from '../services/gestor-tiempos-service';
import { analizarRespuesta } from '../services/evaluacion-service';

/**
 * Componente InteractiveWorksheet con captura de tiempos
 */
const InteractiveWorksheet = ({ preguntas, onComplete }) => {
    // Estados existentes
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [respuestas, setRespuestas] = useState({});
    const [analisisRespuestas, setAnalisisRespuestas] = useState({});

    // Hook del gestor de tiempos
    const tiempos = useGestorTiempos();

    // Estado para mostrar tiempo transcurrido (opcional)
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);

    // ═══════════════════════════════════════════════════════════
    // EFECTO 1: Iniciar temporizador cuando se monta la pregunta
    // ═══════════════════════════════════════════════════════════

    useEffect(() => {
        const preguntaId = preguntas[preguntaActual]?.id;

        if (preguntaId) {
            // Iniciar temporizador para esta pregunta
            tiempos.iniciar(preguntaId);
            console.log(`[WORKSHEET] Iniciado temporizador para pregunta ${preguntaId}`);
        }

        // Cleanup: Si el usuario sale sin responder, finalizar el temporizador
        return () => {
            if (preguntaId && tiempos.obtenerTiempo(preguntaId) > 0) {
                // Opcional: podrías registrar esto como "pregunta abandonada"
            }
        };
    }, [preguntaActual]);

    // ═══════════════════════════════════════════════════════════
    // EFECTO 2: Actualizar visualización de tiempo (opcional)
    // ═══════════════════════════════════════════════════════════

    useEffect(() => {
        const preguntaId = preguntas[preguntaActual]?.id;

        if (!preguntaId) return;

        // Actualizar cada segundo
        const interval = setInterval(() => {
            const tiempo = tiempos.obtenerTiempo(preguntaId);
            setTiempoTranscurrido(tiempo);
        }, 1000);

        return () => clearInterval(interval);
    }, [preguntaActual]);

    // ═══════════════════════════════════════════════════════════
    // FUNCIÓN: Manejar envío de respuesta
    // ═══════════════════════════════════════════════════════════

    const handleSubmitRespuesta = async (respuesta) => {
        const pregunta = preguntas[preguntaActual];
        const preguntaId = pregunta.id;

        // 1. FINALIZAR TEMPORIZADOR
        const datosTiempo = tiempos.finalizar(preguntaId);

        console.log(`[WORKSHEET] Tiempo para ${preguntaId}:`, datosTiempo);

        // 2. ANALIZAR RESPUESTA
        const analisis = await analizarRespuesta({
            pregunta: pregunta,
            respuestaUsuario: respuesta,
            respuestaCorrecta: pregunta.respuesta_correcta
        });

        // 3. GUARDAR RESPUESTA Y ANÁLISIS
        setRespuestas(prev => ({
            ...prev,
            [preguntaId]: respuesta
        }));

        setAnalisisRespuestas(prev => ({
            ...prev,
            [preguntaId]: {
                ...analisis,
                tiempo: datosTiempo // Añadir datos de tiempo
            }
        }));

        // 4. AVANZAR A SIGUIENTE PREGUNTA O FINALIZAR
        if (preguntaActual < preguntas.length - 1) {
            setPreguntaActual(prev => prev + 1);
        } else {
            // FINALIZAR EVALUACIÓN
            await finalizarEvaluacion();
        }
    };

    // ═══════════════════════════════════════════════════════════
    // FUNCIÓN: Finalizar evaluación y enviar al backend
    // ═══════════════════════════════════════════════════════════

    const finalizarEvaluacion = async () => {
        // Obtener todos los tiempos registrados
        const todosLosTiempos = tiempos.obtenerTodos();

        // Preparar datos para el backend
        const datosEvaluacion = prepararDatosEvaluacion(
            todosLosTiempos,
            respuestas,
            analisisRespuestas
        );

        // Calcular estadísticas de tiempo
        const estadisticas = tiempos.calcularEstadisticas();

        // Detectar patrones NEE
        const variabilidad = tiempos.detectarVariabilidad();
        const velocidad = tiempos.detectarVelocidad();

        // Objeto completo para enviar al backend
        const evaluacionCompleta = {
            estudiante_id: 'user_id_aqui', // Obtener del contexto
            asignatura: 'Matemáticas',
            tema: 'Fracciones',
            fecha_evaluacion: new Date().toISOString(),

            // Resultados
            total_preguntas: preguntas.length,
            correctas: Object.values(analisisRespuestas).filter(a => a.correcta).length,
            incorrectas: Object.values(analisisRespuestas).filter(a => !a.correcta).length,
            porcentaje: (Object.values(analisisRespuestas).filter(a => a.correcta).length / preguntas.length) * 100,

            // ⭐ DATOS DE TIEMPO (CRÍTICO PARA NEE)
            tiempo_total_segundos: datosEvaluacion.tiempo_total_segundos,
            tiempo_promedio_por_pregunta: datosEvaluacion.tiempo_promedio_por_pregunta,

            // Estadísticas de tiempo
            estadisticas_tiempo: estadisticas,

            // Indicadores NEE preliminares
            indicadores_nee: {
                variabilidad_extrema: variabilidad?.esExtrema || false,
                coeficiente_variacion: variabilidad?.coeficienteVariacion || 0,
                alta_velocidad: velocidad?.esRapido || false,
                tiempo_vs_percentil10: velocidad?.promedioUsuario || 0
            },

            // Errores por patrón
            errores_por_patron: calcularErroresPorPatron(analisisRespuestas),

            // Detalle completo
            detalle_respuestas: datosEvaluacion.detalle_respuestas,

            // Metadatos
            dispositivo: 'web',
            metadata_tiempo: datosEvaluacion.metadata_tiempo
        };

        console.log('[WORKSHEET] Evaluación completa:', evaluacionCompleta);

        // Enviar al backend (Supabase)
        try {
            // await supabase.from('evaluaciones_historicas').insert(evaluacionCompleta);
            console.log('[WORKSHEET] Datos listos para enviar a Supabase');

            // Resetear gestor de tiempos para próxima evaluación
            tiempos.resetear();

            // Callback para el componente padre
            if (onComplete) {
                onComplete(evaluacionCompleta);
            }
        } catch (error) {
            console.error('[WORKSHEET] Error al guardar evaluación:', error);
        }
    };

    // ═══════════════════════════════════════════════════════════
    // FUNCIÓN AUXILIAR: Calcular errores por patrón
    // ═══════════════════════════════════════════════════════════

    const calcularErroresPorPatron = (analisis) => {
        const errores = { EC: 0, EP: 0, EAC: 0, ETF: 0 };

        Object.values(analisis).forEach(a => {
            if (!a.correcta && a.patron) {
                errores[a.patron] = (errores[a.patron] || 0) + 1;
            }
        });

        return errores;
    };

    // ═══════════════════════════════════════════════════════════
    // RENDER
    // ═══════════════════════════════════════════════════════════

    const pregunta = preguntas[preguntaActual];

    if (!pregunta) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="interactive-worksheet">
            {/* Header con progreso y tiempo */}
            <div className="worksheet-header">
                <div className="progreso">
                    Pregunta {preguntaActual + 1} de {preguntas.length}
                </div>

                {/* Mostrar tiempo transcurrido (opcional) */}
                <div className="tiempo-transcurrido">
                    ⏱️ {formatearTiempo(tiempoTranscurrido)}
                </div>
            </div>

            {/* Pregunta */}
            <div className="pregunta-container">
                <h3>{pregunta.pregunta}</h3>

                {/* Aquí va tu componente de respuesta (input, opciones, etc.) */}
                <div className="respuesta-input">
                    {/* ... tu lógica de input existente ... */}
                </div>
            </div>

            {/* Botón de envío */}
            <button
                onClick={() => handleSubmitRespuesta(/* respuesta del usuario */)}
                className="btn-submit"
            >
                Comprobar Respuesta
            </button>

            {/* Debug info (solo desarrollo) */}
            {import.meta.env.DEV && (
                <div className="debug-info">
                    <p>Tiempo: {tiempoTranscurrido.toFixed(1)}s</p>
                    <p>Pregunta ID: {pregunta.id}</p>
                </div>
            )}
        </div>
    );
};

export default InteractiveWorksheet;


// ═══════════════════════════════════════════════════════════
// EJEMPLO DE USO DEL COMPONENTE
// ═══════════════════════════════════════════════════════════

/*
import InteractiveWorksheet from './components/InteractiveWorksheet';

function App() {
    const preguntas = [
        {
            id: 'mat_4p_q001',
            pregunta: '¿Cuánto es 3 + 5?',
            respuesta_correcta: '8',
            tipo: 'calculo',
            nivelBloom: 'APLICAR'
        },
        // ... más preguntas
    ];

    const handleComplete = (evaluacion) => {
        console.log('Evaluación completada:', evaluacion);
        
        // Aquí puedes:
        // 1. Mostrar resultados
        // 2. Guardar en Supabase
        // 3. Generar informe
        // 4. Navegar a página de resultados
    };

    return (
        <InteractiveWorksheet 
            preguntas={preguntas}
            onComplete={handleComplete}
        />
    );
}
*/
