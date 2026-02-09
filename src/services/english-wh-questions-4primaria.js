/**
 * GENERADOR DE WH- QUESTIONS - 4º PRIMARIA
 * 
 * Includes:
 * - Who (Persona)
 * - What (Cosa/Acción)
 * - Where (Lugar)
 * - When (Tiempo)
 * - Why (Razón -> Because)
 * - How (Manera/Edad/Cantidad) -> How old, How many
 */

// ==========================================
// DATOS
// ==========================================

const WH_MAP = [
    { wh: 'Who', es: 'Quién', key: 'person', answers: ['My dad', 'The teacher', 'Tom', 'Batman'] },
    { wh: 'What', es: 'Qué', key: 'thing', answers: ['A car', 'Blue', 'Pizza', 'Football'] },
    { wh: 'Where', es: 'Dónde', key: 'place', answers: ['In London', 'At home', 'Under the table', 'In the park'] },
    { wh: 'When', es: 'Cuándo', key: 'time', answers: ['On Monday', 'At 5 o\'clock', 'In summer', 'Tomorrow'] },
    { wh: 'Why', es: 'Por qué', key: 'reason', answers: ['Because I am happy', 'Because it is hot', 'Because I like it'] },
    { wh: 'How', es: 'Cómo', key: 'manner', answers: ['By bus', 'Fast', 'Slowly', 'Well'] },
    { wh: 'How old', es: 'Cuántos años', key: 'age', answers: ['10 years old', '9', 'Twelve'] },
    { wh: 'How many', es: 'Cuántos', key: 'quantity', answers: ['Ten', 'Three dogs', 'A lot'] }
];

const QUESTIONS = [
    { q: '___ is your name?', a: 'What' },
    { q: '___ are you?', a: 'How' }, // How are you?
    { q: '___ old are you?', a: 'How' },
    { q: '___ do you live?', a: 'Where' },
    { q: '___ is your birthday?', a: 'When' },
    { q: '___ is that boy?', a: 'Who' },
    { q: '___ are you sad?', a: 'Why' },
    { q: '___ brothers have you got?', a: 'How many' } // Special handling
];

let ejerciciosUsados = new Set();

// ==========================================
// UTILIDADES
// ==========================================

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ==========================================
// NIVEL FÁCIL: ASSOCIATE ANSWER -> QUESTION
// ==========================================

function generarMatchAnswerChoice() {
    const item = getRandomItem(WH_MAP);
    const answer = getRandomItem(item.answers);

    return {
        tipo: 'grammar',
        subtipo: 'wh_match_answer',
        question_type: 'multiple_choice',
        pregunta: `Si la respuesta es "${answer}", ¿cuál es la pregunta?`,
        opciones: shuffleArray([item.wh, 'Who', 'Where', 'When', 'Why', 'What'].slice(0, 4)), // Randomize distractors better ideally
        correcta: item.wh,
        explicacion: `"${answer}" es ${item.es === 'Quién' ? 'una persona' : (item.es === 'Dónde' ? 'un lugar' : 'una cosa/tiempo')}, así que usamos "${item.wh}".`,
        dificultad: 'facil',
        gramatica: 'wh_questions_logic'
    };
}

function generarCompleteQuestionChoice() {
    const q = getRandomItem(QUESTIONS);

    // Distractors
    const options = shuffleArray(['What', 'Where', 'When', 'Who', 'How'].filter(w => w !== q.a));
    const finalOptions = [q.a, options[0], options[1], options[2]];

    return {
        tipo: 'grammar',
        subtipo: 'wh_complete',
        question_type: 'multiple_choice',
        pregunta: `Completa la pregunta: "${q.q}"`,
        opciones: shuffleArray(finalOptions),
        correcta: q.a,
        explicacion: `Pregunta correcta: "${q.q.replace('___', q.a)}"`,
        dificultad: 'facil',
        gramatica: 'wh_questions_form'
    };
}

// ==========================================
// NIVEL MEDIO: TRANSLATE SIMPLE
// ==========================================

function generarTranslateWhChoice() {
    const item = getRandomItem(WH_MAP);

    return {
        tipo: 'grammar',
        subtipo: 'wh_translate_simple',
        question_type: 'multiple_choice',
        pregunta: `¿Qué significa "${item.wh}"?`,
        opciones: shuffleArray([item.es, 'Dónde', 'Cuándo', 'Quién', 'Por qué', 'Qué'].slice(0, 4)),
        correcta: item.es,
        explicacion: `${item.wh} = ${item.es}`,
        dificultad: 'medio',
        gramatica: 'wh_translate'
    };
}

// ==========================================
// NIVEL DIFÍCIL: WRITE QUESTION
// ==========================================

function generarWriteQuestion() {
    const q = getRandomItem(QUESTIONS);
    const fullQ = q.q.replace('___', q.a);

    // Scramble logic is hard for WH textual without clear context.
    // Let's do partial translation or fill in logic.
    // E.g. "Traduce: ¿Dónde vives?" -> "Where do you live?"

    const questionsEs = [
        { es: '¿Dónde vives?', en: 'Where do you live?' },
        { es: '¿Cómo te llamas?', en: 'What is your name?' },
        { es: '¿Quién es él?', en: 'Who is he?' },
        { es: '¿Por qué?', en: 'Why?' },
        { es: '¿Cuándo es tu cumpleaños?', en: 'When is your birthday?' }
    ];

    const item = getRandomItem(questionsEs);

    return {
        tipo: 'grammar',
        subtipo: 'wh_write',
        question_type: 'text_input',
        pregunta: `Escribe en inglés: "${item.es}"`,
        correcta: item.en,
        accept_variations: [item.en, item.en.replace('?', ''), item.en.toLowerCase()],
        case_sensitive: false,
        explicacion: `Respuesta: ${item.en}`,
        dificultad: 'dificil',
        gramatica: 'wh_write_sentence'
    };
}

// ==========================================
// PRINCIPAL
// ==========================================

export function generarWhQuestions(nivel = 'facil') {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarMatchAnswerChoice, peso: 50 },
            { func: generarCompleteQuestionChoice, peso: 50 }
        ],
        medio: [
            { func: generarTranslateWhChoice, peso: 100 }
        ],
        dificil: [
            { func: generarWriteQuestion, peso: 100 }
        ]
    };

    const tipos = tiposPorNivel[nivelNormalizado] || tiposPorNivel.facil;

    const total = tipos.reduce((acc, t) => acc + t.peso, 0);
    let rand = Math.random() * total;

    for (const t of tipos) {
        rand -= t.peso;
        if (rand <= 0) return t.func();
    }
    return tipos[0].func();
}

export function resetearEjerciciosUsados() {
    ejerciciosUsados.clear();
}

export default {
    generarWhQuestions,
    resetearEjerciciosUsados
};
