// Khan Academy API Integration
// Acceso a ejercicios educativos gratuitos de Khan Academy

/**
 * Khan Academy API - Configuración
 * La API de Khan Academy es pública y gratuita
 * Documentación: https://api-explorer.khanacademy.org/
 */

export const KHAN_ACADEMY_CONFIG = {
    api_base: 'https://www.khanacademy.org/api/v1',
    api_internal: 'https://es.khanacademy.org/api/internal',

    // Mapeo de temas a topics de Khan Academy
    topic_mapping: {
        // MATEMÁTICAS
        'Fracciones': {
            khan_topic: 'fractions',
            khan_domain: 'math',
            keywords: ['fracciones', 'fracción', 'numerador', 'denominador']
        },
        'Ecuaciones': {
            khan_topic: 'linear-equations-and-inequalities',
            khan_domain: 'math',
            keywords: ['ecuación', 'resolver', 'despejar', 'incógnita']
        },
        'Álgebra': {
            khan_topic: 'algebra',
            khan_domain: 'math',
            keywords: ['álgebra', 'expresiones', 'variables']
        },
        'Geometría': {
            khan_topic: 'geometry',
            khan_domain: 'math',
            keywords: ['geometría', 'área', 'perímetro', 'triángulo', 'círculo']
        },
        'Estadística': {
            khan_topic: 'statistics-probability',
            khan_domain: 'math',
            keywords: ['estadística', 'media', 'moda', 'probabilidad']
        },
        'Trigonometría': {
            khan_topic: 'trigonometry',
            khan_domain: 'math',
            keywords: ['trigonometría', 'seno', 'coseno', 'tangente']
        },
        'Cálculo': {
            khan_topic: 'calculus-1',
            khan_domain: 'math',
            keywords: ['cálculo', 'derivadas', 'integrales']
        },

        // CIENCIAS
        'Física': {
            khan_topic: 'physics',
            khan_domain: 'science',
            keywords: ['física', 'fuerza', 'energía', 'movimiento']
        },
        'Química': {
            khan_topic: 'chemistry',
            khan_domain: 'science',
            keywords: ['química', 'átomos', 'moléculas', 'reacciones']
        },
        'Biología': {
            khan_topic: 'biology',
            khan_domain: 'science',
            keywords: ['biología', 'células', 'ADN']
        },

        // PROGRAMACIÓN
        'Programación': {
            khan_topic: 'computer-programming',
            khan_domain: 'computing',
            keywords: ['programación', 'código', 'javascript']
        }
    },

    // Niveles educativos de Khan Academy
    grade_mapping: {
        '1º Primaria': 'early-math',
        '2º Primaria': 'early-math',
        '3º Primaria': 'arithmetic',
        '4º Primaria': 'arithmetic',
        '5º Primaria': 'pre-algebra',
        '6º Primaria': 'pre-algebra',
        '1º ESO': 'algebra-basics',
        '2º ESO': 'algebra',
        '3º ESO': 'geometry',
        '4º ESO': 'algebra2',
        '1º Bachillerato': 'precalculus',
        '2º Bachillerato': 'calculus-1'
    }
};

/**
 * Estructura de ejercicios de Khan Academy
 * Los ejercicios vienen en formato específico de KA
 */
export const KHAN_EXERCISE_STRUCTURE = {
    // Ejemplo de ejercicio de Khan Academy
    example: {
        name: "adding-and-subtracting-fractions",
        display_name: "Sumar y restar fracciones",
        description: "Practica sumar y restar fracciones con el mismo denominador",
        ka_url: "https://es.khanacademy.org/math/arithmetic/fraction-arithmetic",
        related_videos: [],
        problem_types: [
            {
                name: "adding-fractions-same-denominator",
                items: 10
            }
        ]
    }
};

/**
 * Helper para construir URLs de Khan Academy
 */
export function buildKhanURL(topic, lang = 'es') {
    const topicConfig = KHAN_ACADEMY_CONFIG.topic_mapping[topic];
    if (!topicConfig) return null;

    const domain = topicConfig.khan_domain;
    const topicSlug = topicConfig.khan_topic;

    return `https://${lang}.khanacademy.org/${domain}/${topicSlug}`;
}

/**
 * Helper para generar cache key de Khan Academy
 */
export function generateKhanCacheKey(asignatura, tema) {
    return `khan_${asignatura}_${tema}`.toLowerCase().replace(/\s+/g, '_');
}

export default {
    KHAN_ACADEMY_CONFIG,
    buildKhanURL,
    generateKhanCacheKey
};
