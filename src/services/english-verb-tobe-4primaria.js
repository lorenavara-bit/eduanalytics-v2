/**
 * GENERADOR DE VERBO TO BE (PRESENTE) - 4º PRIMARIA
 * 
 * Lógica dinámica para generar ejercicios infinitos de To Be.
 * 
 * Estructuras:
 * - Afirmativo: Sujeto + am/is/are + Adjetivo/Nombre/Lugar
 * - Negativo: Sujeto + am not/isn't/aren't + Adjetivo/Nombre/Lugar
 * - Interrogativo: Am/Is/Are + Sujeto + Adjetivo/Nombre/Lugar?
 */

import vocabularyData from '../data/english-4primaria.json';

// ==========================================
// DATOS: SUJETOS Y COMPLEMENTOS
// ==========================================

const SUBJECTS = {
    // 1st Person
    i: { pronoun: 'I', form: 'am', neg: 'am not', spanish: 'Yo' },

    // 3rd Person Singular (IS)
    he: { pronoun: 'He', form: 'is', neg: 'isn\'t', spanish: 'Él' },
    she: { pronoun: 'She', form: 'is', neg: 'isn\'t', spanish: 'Ella' },
    it: { pronoun: 'It', form: 'is', neg: 'isn\'t', spanish: 'Ello' },
    my_dad: { pronoun: 'My dad', form: 'is', neg: 'isn\'t', spanish: 'Mi papá' },
    my_mum: { pronoun: 'My mum', form: 'is', neg: 'isn\'t', spanish: 'Mi mamá' },
    the_dog: { pronoun: 'The dog', form: 'is', neg: 'isn\'t', spanish: 'El perro' },
    mary: { pronoun: 'Mary', form: 'is', neg: 'isn\'t', spanish: 'Mary' },
    tom: { pronoun: 'Tom', form: 'is', neg: 'isn\'t', spanish: 'Tom' },

    // Plural (ARE)
    we: { pronoun: 'We', form: 'are', neg: 'aren\'t', spanish: 'Nosotros' },
    you: { pronoun: 'You', form: 'are', neg: 'aren\'t', spanish: 'Tú/Vosotros' },
    they: { pronoun: 'They', form: 'are', neg: 'aren\'t', spanish: 'Ellos' },
    my_friends: { pronoun: 'My friends', form: 'are', neg: 'aren\'t', spanish: 'Mis amigos' },
    cats: { pronoun: 'Cats', form: 'are', neg: 'aren\'t', spanish: 'Los gatos' }
};

const COMPLEMENTS = [
    // Adjetivos
    { en: 'happy', es: 'feliz', type: 'adj' },
    { en: 'sad', es: 'triste', type: 'adj' },
    { en: 'tall', es: 'alto', type: 'adj' },
    { en: 'hungry', es: 'hambriento', type: 'adj' },
    { en: 'tired', es: 'cansado', type: 'adj' },
    { en: 'clever', es: 'listo', type: 'adj' },
    // Lugares (preposition included sometimes for simplicity logic)
    { en: 'at home', es: 'en casa', type: 'place' },
    { en: 'at school', es: 'en el colegio', type: 'place' },
    { en: 'in the park', es: 'en el parque', type: 'place' },
    // Profesiones / Roles
    { en: 'a student', es: 'un estudiante', type: 'noun', plural: 'students' },
    { en: 'a teacher', es: 'un profesor', type: 'noun', plural: 'teachers' },
    { en: 'a doctor', es: 'un doctor', type: 'noun', plural: 'doctors' },
    { en: 'my friend', es: 'mi amigo', type: 'noun', plural: 'my friends' }
];

// Función para cargar vocabulario dinámico
function getDynamicComplements() {
    const dynamicComps = [...COMPLEMENTS];

    // Add Professions
    if (vocabularyData.vocabulary.professions) {
        vocabularyData.vocabulary.professions.forEach(p => {
            // "teacher" -> en: "a teacher", plural: "teachers"
            dynamicComps.push({
                en: `a ${p.english}`,
                es: `un/a ${p.spanish.split('/')[0]}`, // Simplificar "profesor/a" -> "profesor"
                type: 'noun',
                plural: `${p.english}s`
            });
        });
    }

    // Add Adjectives
    if (vocabularyData.adjectives) {
        // Flatten adjective categories
        Object.values(vocabularyData.adjectives).forEach(adjList => {
            adjList.forEach(adj => {
                dynamicComps.push({
                    en: adj.english,
                    es: adj.spanish,
                    type: 'adj'
                });
            });
        });
    }

    // Add Places (City) -> "at the..." or "in the..."
    if (vocabularyData.vocabulary.city) {
        vocabularyData.vocabulary.city.forEach(place => {
            dynamicComps.push({
                en: `in the ${place.english}`,
                es: `en el/la ${place.spanish}`,
                type: 'place'
            });
        });
    }

    return dynamicComps;
}

function getComplementsByCategory(category) {
    const all = getDynamicComplements();
    if (!category) return all;

    if (category === 'professions') return all.filter(c => c.type === 'noun' && c.en.startsWith('a ')); // crude heuristic for professions added dynamically
    if (category === 'adjectives') return all.filter(c => c.type === 'adj');
    if (category === 'city' || category === 'places') return all.filter(c => c.type === 'place');

    // Use heuristic for other categories if items were added to complements
    // This generator is specific to 'To Be', so only these make sense.
    // However, if we added 'animals' we could say "It is a dog".

    return all;
}

let ejerciciosUsados = new Set();

// ==========================================
// UTILIDADES
// ==========================================

function getRandomItem(array) {
    // Si el array es la lista de complementos base, usamos la dinámica
    if (array === COMPLEMENTS) {
        const fullList = getDynamicComplements();
        return fullList[Math.floor(Math.random() * fullList.length)];
    }
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomComplement(categoria) {
    const list = getComplementsByCategory(categoria);
    return list[Math.floor(Math.random() * list.length)];
}

function getRandomSubject() {
    const keys = Object.keys(SUBJECTS);
    const key = getRandomItem(keys);
    return SUBJECTS[key];
}

function getCorrectComplement(subject, comp) {
    // Ajustar plurales si el sujeto es plural y el complemento es sustantivo
    if (comp.type === 'noun') {
        if (subject.form === 'are' && subject.pronoun !== 'You') { // You es ambiguo, 'a student' vale.
            // Simplificación: si es We o They o Plural, usamos plural.
            if (['We', 'They', 'My friends', 'Cats'].includes(subject.pronoun)) {
                return comp.plural || comp.en + 's';
            }
        }
    }
    return comp.en;
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
// LOGIC: EDAD (AGE)
// ==========================================

function generarAgeExercise() {
    const s = getRandomSubject();
    const age = Math.floor(Math.random() * 20) + 5; // 5 to 25

    // I am 10 years old.
    const sentence = `${s.pronoun} ___ ${age} years old.`;
    const correct = s.form; // am/is/are

    // Distractores comunes para españoles: "have/has"
    const distractors = ['have', 'has'];
    if (s.form !== 'am') distractors.push('am');
    if (s.form !== 'is') distractors.push('is');
    if (s.form !== 'are') distractors.push('are');

    // Ensure unique distractors and remove correct if present (shouldnt be)
    const options = shuffleArray([correct, ...distractors.slice(0, 3)]);

    return {
        tipo: 'grammar',
        subtipo: 'verb_tobe_age',
        question_type: 'multiple_choice',
        pregunta: `Completa la frase (Edad): "${sentence}"`,
        opciones: options,
        correcta: correct,
        explicacion: `En inglés usamos el verbo TO BE para la edad, no Have. "${s.pronoun} ${correct} ${age}..."`,
        dificultad: 'facil',
        gramatica: 'verb_tobe_age',
        scope: ['GRAMMAR_VERB_TOBE', 'GRAMMAR_DESC_AGE']
    };
}

// ==========================================
// NIVEL FÁCIL: AFIRMATIVO (AM/IS/ARE)
// ==========================================

function generarAfirmativoChoice(categoria) {
    const s = getRandomSubject();
    const c = getRandomComplement(categoria);
    const cText = getCorrectComplement(s, c);

    // Frase: She ___ happy.
    const sentence = `${s.pronoun} ___ ${cText}.`;

    return {
        tipo: 'grammar',
        subtipo: 'tobe_affirmative',
        question_type: 'multiple_choice',
        pregunta: `Completa con el verbo To Be: "${sentence}"`,
        opciones: shuffleArray(['am', 'is', 'are']),
        correcta: s.form,
        explicacion: `"${s.pronoun}" va con "${s.form}".`,
        dificultad: 'facil',
        gramatica: 'verb_tobe_affirmative',
        scope: ['GRAMMAR_VERB_TOBE']
    };
}

// ==========================================
// NIVEL MEDIO: NEGATIVO E INTERROGATIVO
// ==========================================

function generarNegativoChoice(categoria) {
    const s = getRandomSubject();
    const c = getRandomComplement(categoria);
    const cText = getCorrectComplement(s, c);

    const sentence = `${s.pronoun} ___ ${cText}. (Negativo)`;

    // Distractores
    const options = [s.neg]; // Correct

    // Error 1: wrong auxiliary (isn't for they)
    options.push(s.form === 'is' ? 'aren\'t' : 'isn\'t');
    // Error 2: not + aux (not is) or aux + not (is not - correct but uncontracted)
    // We prefer contracted in 4th grade often, but let's include 'not is' as clear error.
    options.push('not ' + s.form);

    // Filler
    if (s.form !== 'am') options.push('am not');
    else options.push('aren\'t'); // filler

    return {
        tipo: 'grammar',
        subtipo: 'tobe_negative',
        question_type: 'multiple_choice',
        pregunta: `Elige la forma NEGATIVA correcta: "${sentence}"`,
        opciones: shuffleArray(options.slice(0, 4)),
        correcta: s.neg,
        explicacion: `El negativo de "${s.form}" es "${s.neg}".`,
        dificultad: 'medio',
        gramatica: 'verb_tobe_negative',
        scope: ['GRAMMAR_VERB_TOBE']
    };
}

function generarOrdenarPregunta(categoria) {
    const s = getRandomSubject();
    const c = getRandomComplement(categoria);
    const cText = getCorrectComplement(s, c);

    // Is she happy?
    const auxCap = s.form.charAt(0).toUpperCase() + s.form.slice(1);
    const subjLower = (s.pronoun === 'I' || /^[A-Z][a-z]+$/.test(s.pronoun)) ? s.pronoun : s.pronoun.toLowerCase();
    // ^ Simple heuristic for names, 'I'. 'My dad' -> 'my dad'

    const correct = `${auxCap} ${subjLower} ${cText}?`;

    const words = [auxCap, subjLower, ...cText.split(' '), '?']; // split complement words like 'at home'

    // Clean up '?' if it was separate logic
    // Mejor lógica words:
    const wordsList = [auxCap, subjLower, ...cText.split(' '), '?'];

    return {
        tipo: 'grammar',
        subtipo: 'tobe_question_order',
        question_type: 'word_order',
        pregunta: `Ordena para formar una pregunta:`,
        words: shuffleArray(wordsList),
        correcta: correct,
        correct_variations: [correct],
        explicacion: `Estructura preguntas: Verbo (Am/Is/Are) + Sujeto + Complemento.`,
        dificultad: 'medio',
        gramatica: 'verb_tobe_question',
        scope: ['GRAMMAR_VERB_TOBE']
    };
}

// ==========================================
// NIVEL DIFÍCIL: TRADUCCIÓN COMPLETA
// ==========================================

function generarTraducir(categoria) {
    const s = getRandomSubject();
    const c = getRandomComplement(categoria);
    const cText = getCorrectComplement(s, c);

    // Generamos español
    let esVerbo = (s.spanish === 'Yo' || s.spanish === 'Tú' || s.spanish === 'Nosotros') ? 'soy/estoy' : 'es/está';
    // Aproximación rápida. Mejor:
    switch (s.form) {
        case 'am': esVerbo = 'soy (o estoy)'; break;
        case 'is': esVerbo = 'es (o está)'; break;
        case 'are': esVerbo = 'eres (o sois/son/están)'; break;
    }
    // Para simplificar al usuario, damos la frase española directa si podemos, o genérica.
    // "Ella es feliz"
    const sentenceEs = `${s.spanish} ... (${c.es})`;
    const correct = `${s.pronoun} ${s.form} ${cText}`;

    return {
        tipo: 'grammar',
        subtipo: 'tobe_translate',
        question_type: 'text_input',
        pregunta: `Traduce al inglés: "${s.spanish} ${s.form === 'am' ? 'soy' : (s.form === 'is' ? 'es' : 'son')} ${c.es}"`,
        correcta: correct,
        accept_variations: [correct, correct + '.'],
        case_sensitive: false,
        explicacion: `Respuesta: ${correct}`,
        dificultad: 'dificil',
        gramatica: 'verb_tobe_translation',
        scope: ['GRAMMAR_VERB_TOBE']
    };
}

// ==========================================
// FUNCIÓN PRINCIPAL
// ==========================================

export function generarVerbToBe(nivel = 'facil', variedad = true, categoria = null) {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarAfirmativoChoice, peso: 80 },
            { func: generarAgeExercise, peso: 20 }
        ],
        medio: [
            { func: generarNegativoChoice, peso: 50 },
            { func: generarOrdenarPregunta, peso: 50 }
        ],
        dificil: [
            { func: generarTraducir, peso: 100 }
        ]
    };

    const tipos = tiposPorNivel[nivelNormalizado] || tiposPorNivel.facil;

    const total = tipos.reduce((acc, t) => acc + t.peso, 0);
    let rand = Math.random() * total;

    let selectedFunc = tipos[0].func;

    for (const t of tipos) {
        rand -= t.peso;
        if (rand <= 0) {
            selectedFunc = t.func;
            break;
        }
    }

    // Retry loop to avoid duplicates
    for (let i = 0; i < 10; i++) {
        const ex = selectedFunc(categoria);
        // Create unique key based on question and answer to catch variations
        const key = `${ex.pregunta}|${ex.correcta}`;

        if (!ejerciciosUsados.has(key)) {
            ejerciciosUsados.add(key);
            return ex;
        }
    }

    // Fallback if too many collision (unlikely with dynamic vocab)
    return selectedFunc(categoria);
}

export function resetearEjerciciosUsados() {
    ejerciciosUsados.clear();
}

export default {
    generarVerbToBe,
    resetearEjerciciosUsados
};
