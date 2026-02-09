// SISTEMA DE NORMALIZACIÓN AUTOMÁTICA
// Mapea nombres comunes a nombres oficiales del currículo LOMLOE

// ========== NORMALIZACIÓN DE ASIGNATURAS ==========

export const SUBJECT_MAPPING = {
    // Inglés
    'ingles': 'Inglés',
    'inglés': 'Inglés',
    'english': 'Inglés',
    'lengua extranjera ingles': 'Inglés',
    'lengua extranjera inglés': 'Inglés',
    'lengua extranjera: inglés': 'Inglés',

    // Matemáticas
    'mates': 'Matemáticas',
    'matematicas': 'Matemáticas',
    'matemáticas': 'Matemáticas',
    'matematicas i': 'Matemáticas I',
    'matemáticas i': 'Matemáticas I',
    'matematicas ii': 'Matemáticas II',
    'matemáticas ii': 'Matemáticas II',

    // Lengua
    'lengua': 'Lengua Castellana y Literatura',
    'lengua castellana': 'Lengua Castellana y Literatura',
    'lengua castellana y literatura': 'Lengua Castellana y Literatura',
    'lengua i': 'Lengua Castellana y Literatura I',
    'lengua ii': 'Lengua Castellana y Literatura II',

    // Gallego
    'gallego': 'Lingua Galega e Literatura',
    'galego': 'Lingua Galega e Literatura',
    'lingua galega': 'Lingua Galega e Literatura',
    'lingua galega e literatura': 'Lingua Galega e Literatura',
    'lingua galega i': 'Lingua Galega e Literatura I',
    'lingua galega ii': 'Lingua Galega e Literatura II',

    // Ciencias Naturales / Biología
    'naturales': 'Ciencias de la Naturaleza',
    'ciencias': 'Ciencias de la Naturaleza',
    'ciencias naturales': 'Ciencias de la Naturaleza',
    'ciencias de la naturaleza': 'Ciencias de la Naturaleza',
    'biologia': 'Biología y Geología',
    'biología': 'Biología y Geología',
    'biologia y geologia': 'Biología y Geología',
    'biología y geología': 'Biología y Geología',

    // Ciencias Sociales / Historia
    'sociales': 'Ciencias Sociales',
    'ciencias sociales': 'Ciencias Sociales',
    'historia': 'Geografía e Historia',
    'geografia': 'Geografía e Historia',
    'geografía': 'Geografía e Historia',
    'geografia e historia': 'Geografía e Historia',
    'geografía e historia': 'Geografía e Historia',
    'historia del mundo contemporaneo': 'Historia del Mundo Contemporáneo',
    'historia del mundo contemporáneo': 'Historia del Mundo Contemporáneo',
    'historia de españa': 'Historia de España',

    // Física y Química
    'fisica': 'Física y Química',
    'física': 'Física y Química',
    'quimica': 'Física y Química',
    'química': 'Física y Química',
    'fisica y quimica': 'Física y Química',
    'física y química': 'Física y Química',
    'fisica (bach)': 'Física',
    'física (bach)': 'Física',

    // Educación Física
    'educacion fisica': 'Educación Física',
    'educación física': 'Educación Física',
    'ef': 'Educación Física',
    'ed. fisica': 'Educación Física',

    // Conocimiento del Medio (LOMLOE 1º Ciclo o General) -> Mapeamos a Naturales por defecto para encontrar saberes científicos
    'conocimiento del medio': 'Ciencias de la Naturaleza',
    'cono': 'Ciencias de la Naturaleza',

    // Valores
    'valores': 'Educación en Valores Cívicos y Éticos',
    'etica': 'Educación en Valores Cívicos y Éticos',

    // Artística
    'plastica': 'Educación Artística',
    'plástica': 'Educación Artística',
    'musica': 'Educación Artística',
    'música': 'Educación Artística',
};

// ========== NORMALIZACIÓN DE CURSOS ==========

export const GRADE_MAPPING = {
    // Primaria
    'primero primaria': '1º Primaria',
    '1 primaria': '1º Primaria',
    '1º primaria': '1º Primaria',
    'primero de primaria': '1º Primaria',

    'segundo primaria': '2º Primaria',
    '2 primaria': '2º Primaria',
    '2º primaria': '2º Primaria',
    'segundo de primaria': '2º Primaria',

    'tercero primaria': '3º Primaria',
    '3 primaria': '3º Primaria',
    '3º primaria': '3º Primaria',
    'tercero de primaria': '3º Primaria',

    'cuarto primaria': '4º Primaria',
    '4 primaria': '4º Primaria',
    '4º primaria': '4º Primaria',
    'cuarto de primaria': '4º Primaria',

    'quinto primaria': '5º Primaria',
    '5 primaria': '5º Primaria',
    '5º primaria': '5º Primaria',
    'quinto de primaria': '5º Primaria',

    'sexto primaria': '6º Primaria',
    '6 primaria': '6º Primaria',
    '6º primaria': '6º Primaria',
    'sexto de primaria': '6º Primaria',

    // ESO
    'primero eso': '1º ESO',
    '1 eso': '1º ESO',
    '1º eso': '1º ESO',
    'primero de eso': '1º ESO',

    'segundo eso': '2º ESO',
    '2 eso': '2º ESO',
    '2º eso': '2º ESO',
    'segundo de eso': '2º ESO',

    'tercero eso': '3º ESO',
    '3 eso': '3º ESO',
    '3º eso': '3º ESO',
    'tercero de eso': '3º ESO',

    'cuarto eso': '4º ESO',
    '4 eso': '4º ESO',
    '4º eso': '4º ESO',
    'cuarto de eso': '4º ESO',

    // Bachillerato
    'primero bachillerato': '1º Bachillerato',
    '1 bachillerato': '1º Bachillerato',
    '1º bachillerato': '1º Bachillerato',
    'primero de bachillerato': '1º Bachillerato',
    '1 bach': '1º Bachillerato',

    'segundo bachillerato': '2º Bachillerato',
    '2 bachillerato': '2º Bachillerato',
    '2º bachillerato': '2º Bachillerato',
    'segundo de bachillerato': '2º Bachillerato',
    '2 bach': '2º Bachillerato',
};

// ========== FUNCIONES DE NORMALIZACIÓN ==========

/**
 * Normaliza nombre de asignatura a formato oficial
 * @param {string} subjectName - Nombre de asignatura (puede ser variación)
 * @returns {string} - Nombre oficial o el original si no hay match
 */
export function normalizeSubject(subjectName) {
    if (!subjectName) return '';

    const normalized = subjectName.toLowerCase().trim();

    // Buscar coincidencia exacta
    if (SUBJECT_MAPPING[normalized]) {
        return SUBJECT_MAPPING[normalized];
    }

    // Buscar coincidencia parcial (contiene)
    for (const [key, value] of Object.entries(SUBJECT_MAPPING)) {
        if (normalized.includes(key) || key.includes(normalized)) {
            return value;
        }
    }

    // Si no hay match, devolver original (capitalizado)
    return subjectName.charAt(0).toUpperCase() + subjectName.slice(1);
}

/**
 * Normaliza curso a formato oficial
 * @param {string} gradeName - Nombre de curso (puede ser variación)
 * @returns {string} - Formato oficial o el original si no hay match
 */
export function normalizeGrade(gradeName) {
    if (!gradeName) return '';

    const normalized = gradeName.toLowerCase().trim();

    // Buscar coincidencia exacta
    if (GRADE_MAPPING[normalized]) {
        return GRADE_MAPPING[normalized];
    }

    // Buscar coincidencia parcial
    for (const [key, value] of Object.entries(GRADE_MAPPING)) {
        if (normalized.includes(key) || key.includes(normalized)) {
            return value;
        }
    }

    // Si no hay match, devolver original
    return gradeName;
}

/**
 * Obtiene lista de asignaturas oficiales disponibles
 * @param {string} gradeLevel - Nivel educativo
 * @returns {Array} - Lista de asignaturas oficiales para ese nivel
 */
export function getOfficialSubjects(gradeLevel) {
    const normalizedGrade = normalizeGrade(gradeLevel);

    if (normalizedGrade.includes('Primaria')) {
        return [
            'Matemáticas',
            'Lengua Castellana y Literatura',
            'Lingua Galega e Literatura', // Solo Galicia
            'Ciencias de la Naturaleza',
            'Ciencias Sociales',
            'Inglés',
            'Educación Física'
        ];
    }

    if (normalizedGrade.includes('ESO')) {
        return [
            'Matemáticas',
            'Lengua Castellana y Literatura',
            'Lingua Galega e Literatura', // Solo Galicia
            'Geografía e Historia',
            'Biología y Geología',
            'Física y Química',
            'Inglés',
            'Tecnología',
            'Educación Física'
        ];
    }

    if (normalizedGrade.includes('Bachillerato')) {
        return [
            'Matemáticas I',
            'Matemáticas II',
            'Lengua Castellana y Literatura I',
            'Lengua Castellana y Literatura II',
            'Lingua Galega e Literatura I', // Solo Galicia
            'Lingua Galega e Literatura II', // Solo Galicia
            'Historia del Mundo Contemporáneo',
            'Historia de España',
            'Física y Química',
            'Física',
            'Química',
            'Biología',
            'Inglés I',
            'Inglés II',
            'Filosofía',
            'Economía'
        ];
    }

    return [];
}

/**
 * Verifica si una asignatura existe en el currículo LOMLOE
 * @param {string} subjectName - Nombre de asignatura
 * @param {string} gradeName - Curso
 * @returns {boolean} - true si existe
 */
export function isValidSubject(subjectName, gradeName) {
    const normalized = normalizeSubject(subjectName);
    const officialSubjects = getOfficialSubjects(gradeName);

    return officialSubjects.some(subject =>
        subject.toLowerCase() === normalized.toLowerCase()
    );
}

// ========== EJEMPLOS DE USO ==========

/*
console.log(normalizeSubject('ingles')); 
// → "Inglés"

console.log(normalizeSubject('mates')); 
// → "Matemáticas"

console.log(normalizeGrade('4 primaria')); 
// → "4º Primaria"

console.log(normalizeGrade('segundo de eso')); 
// → "2º ESO"

console.log(getOfficialSubjects('4º Primaria'));
// → ['Matemáticas', 'Lengua Castellana y Literatura', ...]

console.log(isValidSubject('ingles', '4º Primaria'));
// → true
*/
