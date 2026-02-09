// Khan Academy - Organizado por CURSO
// COMPLETO 4º Y 5º PRIMARIA

// 4º PRIMARIA
import { CUARTO_PRIMARIA_GALICIA } from './cuarto-primaria-galicia-PARTE1.js';
import { CUARTO_PRIMARIA_GALICIA_PARTE2 } from './cuarto-primaria-galicia-PARTE2.js';
import { SANTILLANA_MATEMATICAS_4 } from './santillana-4-primaria-MATES.js';
import { SANTILLANA_LENGUA_4 } from './santillana-4-primaria-LENGUA.js';
import { SANTILLANA_NATURALES_4 } from './santillana-4-primaria-NATURALES.js';
import { SANTILLANA_SOCIALES_4 } from './santillana-4-primaria-SOCIALES.js';
import { SANTILLANA_GALEGO_4 } from './santillana-4-primaria-GALEGO.js';
// import { SANTILLANA_INGLES_4 } from './santillana-4-primaria-INGLES.js'; // ARCHIVO FALTANTE

// 5º PRIMARIA
import { QUINTO_PRIMARIA_MATEMATICAS } from './quinto-primaria-matematicas.js';
import { QUINTO_PRIMARIA_LENGUA } from './quinto-primaria-lengua.js';
import { QUINTO_PRIMARIA_SOCIALES } from './quinto-primaria-sociales.js';
import { QUINTO_PRIMARIA_NATURALES } from './quinto-primaria-naturales.js';

// Mapeo selectivo para asegurar que los nombres de UI coincidan con la DB interna
const SUBJECT_MAPPING = {
    'ciencias naturales': 'Ciencias de la Naturaleza',
    'naturales': 'Ciencias de la Naturaleza',
    'gallego': 'Lingua Galega',
    'galego': 'Lingua Galega',
    'lingua galega e literatura': 'Lingua Galega',
    'lengua': 'Lengua Castellana',
    'lengua castellana y literatura': 'Lengua Castellana',
    'sociales': 'Ciencias Sociales',
    'ciencias sociales': 'Ciencias Sociales'
};

function normalizeAsignatura(name) {
    if (!name) return name;
    const low = name.toLowerCase().trim();
    // Intentar mapeo directo o retorno del original
    return SUBJECT_MAPPING[low] || name;
}

// Combinar contenido 4º PRIMARIA (original + Santillana)
const COMPLETO_4_PRIMARIA = {
    // Merge Matemáticas (original + Santillana)
    'Matemáticas': {
        ...CUARTO_PRIMARIA_GALICIA['Matemáticas'],
        ...SANTILLANA_MATEMATICAS_4['Matemáticas']
    },

    // Exclusivo Santillana 4º (según petición de borrar todo lo anterior)
    'Lengua Castellana': {
        ...SANTILLANA_LENGUA_4['Lengua Castellana']
    },

    // Merge Lingua Galega (original + Santillana)
    'Lingua Galega': {
        ...CUARTO_PRIMARIA_GALICIA['Lingua Galega'],
        ...SANTILLANA_GALEGO_4['Lingua Galega']
    },

    // Merge Ciencias de la Naturaleza (original + Santillana)
    'Ciencias de la Naturaleza': {
        ...CUARTO_PRIMARIA_GALICIA_PARTE2['Ciencias de la Naturaleza'],
        ...SANTILLANA_NATURALES_4['Ciencias de la Naturaleza']
    },

    // Merge Ciencias Sociales (original + Santillana)
    'Ciencias Sociales': {
        ...CUARTO_PRIMARIA_GALICIA_PARTE2['Ciencias Sociales'],
        ...SANTILLANA_SOCIALES_4['Ciencias Sociales']
    },

    // Merge Inglés (Configurado para mostrar temas aunque los datos vengan de Supabase)
    'Inglés': {
        'Present Simple (Unit 1)': { ejercicios: [] },
        'Unit 2: Daily Routines': { ejercicios: [] },
        'Unit 3: Jobs & Workplaces': { ejercicios: [] },
        'Unit 4: Health & Feelings': { ejercicios: [] },
        'Unit 5: Comparatives': { ejercicios: [] },
        'Unit 6: Past Simple (Was/Were)': { ejercicios: [] },
        'Unit 7: Final Boss (The Big Mix)': { ejercicios: [] },
        'Vocabulary: Sports': { ejercicios: [] },
        'Vocabulary: Hobbies': { ejercicios: [] },
        'Vocabulary: Colors': { ejercicios: [] },
        'Vocabulary: Family': { ejercicios: [] },
        'Vocabulary: Body': { ejercicios: [] },
        'Vocabulary: Animals': { ejercicios: [] },
        'Vocabulary: School': { ejercicios: [] },
        'Vocabulary: Food': { ejercicios: [] },
        'Vocabulary: House': { ejercicios: [] },
        'Vocabulary: Clothes': { ejercicios: [] },
        'Vocabulary: Nature': { ejercicios: [] },
        'Vocabulary: Transport': { ejercicios: [] },
        'Vocabulary: Numbers': { ejercicios: [] },
        'Vocabulary: Time': { ejercicios: [] },
        'Vocabulary: Daily Routines': { ejercicios: [] },
        'Vocabulary: City': { ejercicios: [] },
        'Vocabulary: Professions': { ejercicios: [] },
        'Grammar: Present Simple': { ejercicios: [] },
        'Grammar: Present Continuous': { ejercicios: [] },
        'Grammar: Past Simple (Was/Were & Verbs)': { ejercicios: [] },
        'Grammar: Verb To Be (Am/Is/Are)': { ejercicios: [] },
        'Grammar: Verb Have Got': { ejercicios: [] },
        'Grammar: There is / There are': { ejercicios: [] },
        'Grammar: Prepositions (Place & Time)': { ejercicios: [] },
        'Grammar: Adjectives (Comparatives & Superlatives)': { ejercicios: [] },
        'Grammar: Modals (Can/Must)': { ejercicios: [] },
        'Grammar: Countable & Uncountable': { ejercicios: [] },
        'Grammar: Articles & Quantifiers': { ejercicios: [] },
        'Grammar: Possessives & Saxon Genitive': { ejercicios: [] },
        'Grammar: Question Words (Wh-)': { ejercicios: [] },
        'Skill: Sentence Building (Word Order)': { ejercicios: [] },
        'Skill: Translation Practice (Reverse)': { ejercicios: [] }
    }
};

// 5º PRIMARIA completo
const COMPLETO_5_PRIMARIA = {
    'Matemáticas': QUINTO_PRIMARIA_MATEMATICAS['Matemáticas'],
    'Lengua Castellana': QUINTO_PRIMARIA_LENGUA['Lengua Castellana'],
    'Ciencias Sociales': QUINTO_PRIMARIA_SOCIALES['Ciencias Sociales'],
    'Ciencias de la Naturaleza': QUINTO_PRIMARIA_NATURALES['Ciencias de la Naturaleza']
};

export const KHAN_EXERCISES_POR_CURSO = {
    '4º Primaria': COMPLETO_4_PRIMARIA,
    '5º Primaria': COMPLETO_5_PRIMARIA,

    '1º ESO': {
        'Matemáticas': {
            'Fracciones': {
                source: 'Khan Academy',
                url: 'https://es.khanacademy.org/math/arithmetic/fraction-arithmetic',
                nivel: '1º ESO',
                ejercicios: [] // Ya tenemos estos en el banco general
            }
        }
    }
};

/**
 * Obtener ejercicios por CURSO y tema
 * Con coincidencia parcial/fuzzy para mejorar el matching
 */
export async function getKhanExercisesPorCurso({ curso, asignatura, tema, cantidad = 10 }) {
    console.log(`🎓 Buscando ejercicios de Khan Academy: ${curso} - ${asignatura} - ${tema}`);

    const normAsignatura = normalizeAsignatura(asignatura);

    // Normalizar curso (Ej: "4" o "4º" -> "4º Primaria")
    let cursoNorm = curso;
    if (curso === '4' || curso === '4º' || curso?.toString().includes('4')) cursoNorm = '4º Primaria';
    if (curso === '5' || curso === '5º' || curso?.toString().includes('5')) cursoNorm = '5º Primaria';

    // Buscar en la estructura por curso
    const cursoDB = KHAN_EXERCISES_POR_CURSO[cursoNorm];
    if (!cursoDB) {
        console.log(`⚠️ No hay contenido para ${curso} (normalizado: ${cursoNorm})`);
        return null;
    }

    const asignaturaDB = cursoDB[normAsignatura];
    if (!asignaturaDB) {
        console.log(`⚠️ No hay ${normAsignatura} para ${curso}`);
        return null;
    }

    // Intentar coincidencia EXACTA primero
    let temaDB = asignaturaDB[tema];
    let temaEncontrado = tema;

    // Si no hay coincidencia exacta, intentar coincidencia PARCIAL (fuzzy matching)
    if (!temaDB || !temaDB.ejercicios || temaDB.ejercicios.length === 0) {
        console.log(`⚠️ No hay coincidencia exacta para "${tema}", intentando coincidencia parcial...`);

        // Normalizar tema de búsqueda
        const temaNormalizado = tema.toLowerCase().trim();

        // Buscar coincidencia parcial en los temas disponibles
        const temaKey = Object.keys(asignaturaDB).find(key => {
            const keyNormalizado = key.toLowerCase().trim();
            // Coincide si uno contiene al otro
            return keyNormalizado.includes(temaNormalizado) || temaNormalizado.includes(keyNormalizado);
        });

        if (temaKey) {
            console.log(`✅ Coincidencia parcial encontrada: "${tema}" → "${temaKey}"`);
            temaDB = asignaturaDB[temaKey];
            temaEncontrado = temaKey;
        }
    }

    // Si aún no hay contenido, retornar null
    if (!temaDB || !temaDB.ejercicios || temaDB.ejercicios.length === 0) {
        console.log(`⚠️ No hay ejercicios de "${tema}" para ${curso}`);
        console.log(`📋 Temas disponibles: ${Object.keys(asignaturaDB).join(', ')}`);
        return null;
    }

    console.log(`✅ Encontrados ${temaDB.ejercicios.length} ejercicios de "${temaEncontrado}" para ${curso}`);

    return {
        source: 'KHAN_ACADEMY',
        url_oficial: temaDB.url,
        nivel: temaDB.nivel,
        resumen: temaDB.resumen,
        total_disponibles: temaDB.ejercicios.length,
        ejercicios: temaDB.ejercicios.slice(0, cantidad),
        metadata: {
            curso,
            asignatura: normAsignatura,
            tema: temaEncontrado, // Usar el tema real encontrado
            tema_original: tema, // Guardar el tema original buscado
            cantidad: Math.min(temaDB.ejercicios.length, cantidad)
        }
    };
}

/**
 * Verificar si hay contenido para un curso específico
 */
export function hasKhanContentPorCurso(curso, asignatura, tema) {
    const normAsignatura = normalizeAsignatura(asignatura);
    const cursoDB = KHAN_EXERCISES_POR_CURSO[curso];
    if (!cursoDB) return false;

    const asignaturaDB = cursoDB[normAsignatura];
    if (!asignaturaDB) return false;

    const temaDB = asignaturaDB[tema];
    return !!(temaDB && temaDB.ejercicios && temaDB.ejercicios.length > 0);
}

/**
 * Listar todos los temas disponibles para un curso
 */
export function getTemasDisponiblesPorCurso(curso, asignatura) {
    const normAsignatura = normalizeAsignatura(asignatura);

    // Normalizar curso
    let cursoNorm = curso;
    if (curso === '4' || curso === '4º' || curso?.toString().includes('4')) cursoNorm = '4º Primaria';
    if (curso === '5' || curso === '5º' || curso?.toString().includes('5')) cursoNorm = '5º Primaria';

    const cursoDB = KHAN_EXERCISES_POR_CURSO[cursoNorm];
    if (!cursoDB) return [];

    const asignaturaDB = cursoDB[normAsignatura];
    if (!asignaturaDB) return [];

    return Object.keys(asignaturaDB);
}

export default {
    KHAN_EXERCISES_POR_CURSO,
    getKhanExercisesPorCurso,
    hasKhanContentPorCurso,
    getTemasDisponiblesPorCurso
};
