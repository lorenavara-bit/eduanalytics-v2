import { LOMLOE_PARENT_GUIDE } from '../data/parent-report-mappings';

/**
 * SERVICIO DE INFORMES PEDAGÓGICOS (LOMLOE)
 * Genera reportes semanales accionables para los padres.
 */
export const ParentReportService = {

    /**
     * Genera un informe completo basado en el historial reciente
     * @param {Array} history - Array de intentos/actividades recientes
     * @param {Object} studentProfile - Datos del estudiante
     */
    generateWeeklyReport: (history, studentProfile) => {
        // 1. Análisis de Errores
        // Contamos frecuencia de cada failure_pattern_id (suponiendo que viene en el historial)
        // Si no hay historial detallado, usamos simulacion basada en medallas NO conseguidas

        const errorCounts = {};
        const successCounts = {};
        let totalActivities = 0;

        history.forEach(activity => {
            totalActivities++;
            // Lógica ficticia de extracción de patrones:
            // En una app real, esto vendría de una tabla 'analytics_events' o 'mistakes_log'
            if (activity.mistakes && Array.isArray(activity.mistakes)) {
                activity.mistakes.forEach(patternId => {
                    errorCounts[patternId] = (errorCounts[patternId] || 0) + 1;
                });
            }
            if (activity.success_pattern_id) {
                successCounts[activity.success_pattern_id] = (successCounts[activity.success_pattern_id] || 0) + 1;
            }
        });

        // 2. Identificar Top 3 Debilidades
        const topWeaknesses = Object.entries(errorCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([id]) => id);

        // 3. Traducir a Lenguaje Padres
        const areasToImprove = topWeaknesses.map(id => {
            const mapping = LOMLOE_PARENT_GUIDE[id] || LOMLOE_PARENT_GUIDE['DEFAULT'];
            return {
                id: id,
                area: mapping.competencia,
                mensaje: mapping.diagnostico, // "Olvida la 'S'..."
                consejo: mapping.consejo
            };
        });

        // 4. Identificar Logros (Medallas de Oro)
        // Asumimos que pattern terminado = medalla potencial
        const topStrengths = Object.entries(successCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([id]) => {
                const mapping = LOMLOE_PARENT_GUIDE[id];
                return mapping ? mapping.competencia : id.replace(/_/g, ' '); // Fallback name
            });

        // 5. Recomendación Estrella (Action Item)
        // Seleccionamos la debilidad #1 para dar la tarea
        let recommendation = null;
        if (topWeaknesses.length > 0) {
            const mainWeaknessId = topWeaknesses[0];
            const mapping = LOMLOE_PARENT_GUIDE[mainWeaknessId] || LOMLOE_PARENT_GUIDE['DEFAULT'];
            recommendation = {
                title: mapping.accion_reparadora.titulo,
                description: mapping.accion_reparadora.actividad,
                topic: mapping.competencia
            };
        } else {
            // Si no hay errores graves, recomendación de mantenimiento
            recommendation = {
                title: "Maintain the Spark",
                description: "¡Todo va genial! Ved una película en versión original juntos este finde.",
                topic: "General English"
            };
        }

        // 6. Construir JSON Final
        return {
            report_date: new Date().toISOString(),
            student_name: studentProfile?.name || "Student",
            summary: {
                activities_completed: totalActivities,
                mastery_level: "Progreso Adecuado", // Lógica simplificada
                top_strengths: topStrengths
            },
            needs_attention: areasToImprove,
            weekly_challenge: recommendation, // La "Tarea para casa" de los padres
            pedagogical_note: "Este informe se basa en los criterios de evaluación del currículo LOMLOE para 4º de Primaria."
        };
    }
};
