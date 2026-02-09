// GENERADOR DE FICHAS PERSONALIZADAS
// Crea fichas enfocadas basadas en el análisis histórico del estudiante
// [RESET] Modo simplificado para "Start from Zero"

import { analizarTendencias } from './analisis-historico-service';
import { obtenerPreguntasPorTema } from './banco-preguntas';

/**
 * Generar ficha personalizada basada en historial del estudiante
 */
export async function generarFichaPersonalizada(historial, configuracion = {}) {
    const {
        asignatura,
        tema,
        curso = '4º Primaria',
        numPreguntas = 10
    } = configuracion;

    // En "Start from Zero", deshabilitamos la lógica compleja de patrones
    // y devolvemos una ficha normal por defecto.
    return await generarFichaNormal(asignatura, tema, curso, numPreguntas);
}

/**
 * Generar ficha normal (sin historial)
 */
async function generarFichaNormal(asignatura, tema, curso, numPreguntas) {
    const preguntas = await obtenerPreguntasPorTema(asignatura, tema, numPreguntas, curso);

    return {
        titulo: `${asignatura} - ${tema}`,
        descripcion: 'Ficha de ejercicios estándar',
        preguntas: preguntas.slice(0, numPreguntas),
        enfoque: { tipo: 'general', personalizada: false },
        metadata: {
            asignatura,
            tema,
            curso,
            personalizada: false,
            fechaGeneracion: new Date().toISOString()
        }
    };
}

/**
 * Sugerir fichas basadas en análisis
 */
export function sugerirFichas(analisis, asignatura, curso) {
    const sugerencias = [];

    // Sugerencia 1: Desafío (si va muy bien)
    if (analisis.evolucionPuntuacion && analisis.evolucionPuntuacion.promedio >= 85) {
        sugerencias.push({
            tipo: 'desafio',
            prioridad: 3,
            titulo: 'Desafío Avanzado',
            descripcion: '¡Vas muy bien! Prueba con ejercicios más desafiantes',
            icono: '🚀',
            configuracion: {
                asignatura,
                curso,
                enfoque: {
                    tipo: 'desafio',
                    dificultadSugerida: 'dificil'
                }
            }
        });
    }

    // Sugerencia 2: Repaso general (si va mal)
    if (analisis.evolucionPuntuacion && analisis.evolucionPuntuacion.promedio < 60) {
        sugerencias.push({
            tipo: 'repaso_basico',
            prioridad: 1,
            titulo: 'Repaso Básico',
            descripcion: 'Refuerza los conceptos fundamentales desde el principio',
            icono: '📚',
            configuracion: {
                asignatura,
                curso,
                enfoque: {
                    tipo: 'general',
                    dificultadSugerida: 'facil'
                }
            }
        });
    }

    return sugerencias.sort((a, b) => a.prioridad - b.prioridad);
}

export default {
    generarFichaPersonalizada,
    sugerirFichas
};
