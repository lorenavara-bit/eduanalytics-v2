// Definición de planes: Beta (Gratis) y Premium (De pago)

export const PLANS = {
    BETA: {
        id: 'beta',
        name: 'Beta Gratuita',
        price: 0,
        currency: '€',
        billing: 'siempre gratis',

        features: [
            'Ejercicios ilimitados',
            'Todas las asignaturas (6)',
            '216+ ejercicios de calidad',
            'Contenido de 4º Primaria completo',
            'Modo Test/Ejercicio',
            'Historial básico',
            'Guardar fichas generadas'
        ],

        // Límites de características (false = no disponible)
        limits: {
            aiCorrection: false,            // Corrección con AI
            progressAnalysis: false,        // Análisis de progreso
            parentReports: false,           // Informes para padres
            adaptiveDifficulty: false,      // Dificultad adaptativa
            textbookAdaptation: false,      // Adaptación a libro del cole
            errorDetection: false,          // Detección de patrones de error
            personalizedRecommendations: false  // Recomendaciones personalizadas
        }
    },

    PREMIUM: {
        id: 'premium',
        name: 'Premium',
        price: 7.99,
        currency: '€',
        billing: 'mes',
        trialDays: 7,  // 7 días gratis de prueba

        features: [
            // Todo de Beta +
            'Todo lo de Beta Gratuita',
            '',
            // Características Premium
            '✨ Corrección inteligente con AI',
            '📊 Análisis detallado de progreso',
            '📈 Informes mensuales para padres',
            '🎯 Dificultad adaptativa (AI ajusta)',
            '📚 Adaptación a libro del cole',
            '🔍 Detección de patrones de error',
            '💡 Recomendaciones personalizadas',
            '🎓 Consejos pedagógicos para padres',
            '📱 Soporte prioritario'
        ],

        // Límites de características (true = disponible)
        limits: {
            aiCorrection: true,
            progressAnalysis: true,
            parentReports: true,
            adaptiveDifficulty: true,
            textbookAdaptation: true,
            errorDetection: true,
            personalizedRecommendations: true
        }
    }
};

/**
 * Obtener información del plan según ID
 * @param {string} planId - 'beta' o 'premium'
 * @returns {object} Información del plan
 */
export function getPlanInfo(planId) {
    const normalizedId = (planId || 'beta').toUpperCase();
    return PLANS[normalizedId] || PLANS.BETA;
}

/**
 * Verificar si un usuario puede usar una característica
 * @param {string} userPlan - Plan del usuario ('beta' o 'premium')
 * @param {string} feature - Nombre de la característica
 * @returns {boolean} true si puede usarla
 */
export function canUseFeature(userPlan, feature) {
    const plan = getPlanInfo(userPlan);
    return plan.limits[feature] === true;
}

/**
 * Verificar si un plan es premium
 * @param {string} planId - ID del plan
 * @returns {boolean} true si es premium
 */
export function isPremiumPlan(planId) {
    return (planId || '').toLowerCase() === 'premium';
}

/**
 * Obtener precio formateado
 * @param {string} planId - ID del plan
 * @returns {string} Precio formateado (ej: "€7.99/mes")
 */
export function getFormattedPrice(planId) {
    const plan = getPlanInfo(planId);

    if (plan.price === 0) {
        return 'Gratis';
    }

    return `${plan.currency}${plan.price}/${plan.billing}`;
}

// Exportar todo
export default {
    PLANS,
    getPlanInfo,
    canUseFeature,
    isPremiumPlan,
    getFormattedPrice
};
