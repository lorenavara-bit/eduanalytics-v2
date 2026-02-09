/**
 * GENERADOR DE THERE IS / THERE ARE - 4º PRIMARIA
 * 
 * Lógica dinámica combinada con Countable/Uncountable nouns.
 * 
 * Reglas:
 * 1. Countable Singular: There is a cat.
 * 2. Countable Plural: There are two cats / some cats.
 * 3. Uncountable: There is some water (Always singular verb).
 * 
 * Includes: Affirmative, Negative (There isn't/aren't), Questions (Is there/Are there).
 */

// ==========================================
// DATOS
// ==========================================

import vocabularyData from '../data/english-4primaria.json' with { type: 'json' };

// Helper to adapt JSON items to local format
function getDynamicItems() {
    const items = [];

    // Helper to process categories
    const addCat = (catName, type) => {
        if (vocabularyData.vocabulary[catName]) {
            vocabularyData.vocabulary[catName].forEach(wd => {
                items.push({
                    id: wd.english,
                    s: wd.english,
                    p: wd.english + 's', // Simple pluralization fallback
                    type: type,
                    es_s: wd.spanish,
                    es_p: wd.spanish + 's' // Simple pluralization fallback
                });
            });
        }
    };

    // Countables
    addCat('animals', 'countable');
    addCat('transport', 'countable');
    addCat('school_objects', 'countable');
    addCat('clothes', 'countable');

    // Uncountables / Mixed (Simplified)
    // Some food is countable (apple), some uncnt (water). 
    // We add specific reliable uncountables manually + dynamic list
    if (vocabularyData.vocabulary['food']) {
        vocabularyData.vocabulary['food'].forEach(wd => {
            // Heuristic: liquids or mass nouns usually U
            const uncountables = ['water', 'milk', 'bread', 'cheese', 'sugar', 'chocolate', 'rice', 'juice'];
            if (uncountables.includes(wd.english.toLowerCase())) {
                items.push({ id: wd.english, s: wd.english, type: 'uncountable', es_s: wd.spanish });
            } else {
                // Assume countable (apple, banana, egg...)
                items.push({
                    id: wd.english, s: wd.english, p: wd.english + 's',
                    type: 'countable', es_s: wd.spanish, es_p: wd.spanish + 's'
                });
            }
        });
    }

    // Add manual reliable defaults if list is empty
    if (items.length === 0) {
        return [
            { id: 'cat', s: 'cat', p: 'cats', type: 'countable', es_s: 'gato', es_p: 'gatos' },
            { id: 'water', s: 'water', type: 'uncountable', es_s: 'agua' }
        ];
    }

    return items;
}

const ITEMS = getDynamicItems();

const LOCATIONS = [
    { en: 'on the table', es: 'en la mesa' },
    { en: 'in the box', es: 'en la caja' },
    { en: 'in the fridge', es: 'en la nevera' }, // good for food
    { en: 'under the chair', es: 'debajo de la silla' },
    { en: 'here', es: 'aquí' },
    { en: 'in the classroom', es: 'en la clase' }
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
// NIVEL FÁCIL: THERE IS vs THERE ARE (Choice)
// ==========================================

function generarThereIsAreChoice() {
    const item = getRandomItem(ITEMS);
    const loc = getRandomItem(LOCATIONS);

    let sentence, correct, options, spanish;

    // Decidir estructura aleatoria
    if (item.type === 'uncountable') {
        // ALWAYS Singular
        // There ___ some water.
        sentence = `There ___ some ${item.s} ${loc.en}.`;
        correct = 'is';
        options = ['is', 'are'];
        spanish = item.es_s;
    } else {
        // 50% Singular, 50% Plural
        if (Math.random() > 0.5) {
            // Singular
            sentence = `There ___ a ${item.s} ${loc.en}.`;
            correct = 'is';
            options = ['is', 'are'];
            spanish = `un ${item.es_s}`;
        } else {
            // Plural
            const num = Math.random() > 0.5 ? 'two' : 'somes'; // 'some' usually triggers ARE too
            const quantifier = num === 'two' ? 'two' : 'some';
            sentence = `There ___ ${quantifier} ${item.p} ${loc.en}.`;
            correct = 'are';
            options = ['are', 'is'];
            spanish = `${quantifier === 'two' ? 'dos' : 'algunos'} ${item.es_p}`;
        }
    }

    return {
        tipo: 'grammar',
        subtipo: 'there_is_are_choice',
        question_type: 'multiple_choice',
        pregunta: `Completa con Is o Are: "${sentence}" (${spanish})`,
        opciones: shuffleArray(['is', 'are', 'am', 'be']),
        correcta: correct,
        explicacion: `Usamos "${correct}" porque hablamos de "${spanish}".`,
        dificultad: 'facil',
        gramatica: 'there_is_are_simple',
        scope: ['GRAMMAR_THERE_IS_ARE']
    };
}

// ==========================================
// NIVEL MEDIO: SOME/ANY + NEGATIVO
// ==========================================

function generarSomeAnyChoice() {
    const item = getRandomItem(ITEMS);

    // Regla: SOME affirmative, ANY negative/question.
    const isNegative = Math.random() > 0.5;

    let sentence, correct, expl;

    if (isNegative) {
        // Negative -> ANY
        const verb = (item.type === 'uncountable' || Math.random() > 0.5 && item.type === 'countable') ? "There isn't" : "There aren't";
        // Si usamos 'aren't', forzamos plural. Si 'isn't', singular/uncountable.
        // Simplificación para generador robusto:
        if (item.type === 'uncountable') {
            sentence = `There isn't ___ ${item.s}.`;
        } else {
            // Plural countables only for 'any' logic usually in 4th grade (There isn't a cat vs There aren't any cats)
            sentence = `There aren't ___ ${item.p}.`;
        }
        correct = 'any';
        expl = 'En frases negativas usamos "any".';
    } else {
        // Affirmative -> SOME
        if (item.type === 'uncountable') {
            sentence = `There is ___ ${item.s}.`;
        } else {
            sentence = `There are ___ ${item.p}.`;
        }
        correct = 'some';
        expl = 'En frases afirmativas (plural/incontable) usamos "some".';
    }

    return {
        tipo: 'grammar',
        subtipo: 'there_is_are_quantifier',
        question_type: 'multiple_choice',
        pregunta: `Elige 'some' o 'any': "${sentence}"`,
        opciones: shuffleArray(['some', 'any', 'a', 'an']),
        correcta: correct,
        explicacion: expl,
        dificultad: 'medio',
        gramatica: 'quantifiers_some_any',
        scope: ['GRAMMAR_QUANTIFIERS', 'GRAMMAR_THERE_IS_ARE']
    };
}

function generarFullQuantifierChoice() {
    // Advanced: A / An / Some / Any
    const item = getRandomItem(ITEMS);
    const isNegative = Math.random() > 0.4; // 40% negative

    let sentence, correct;

    if (item.type === 'countable') {
        const isSingular = Math.random() > 0.5;

        if (isSingular) {
            // Singular Countable -> A / AN
            // Neg: There isn't a cat. Aff: There is a cat.
            const verb = isNegative ? "There isn't" : "There is";
            sentence = `${verb} ___ ${item.s}.`;

            // Check vowel
            const vowel = ['a', 'e', 'i', 'o', 'u'].includes(item.s[0].toLowerCase());
            correct = vowel ? 'an' : 'a';
        } else {
            // Plural Countable -> SOME / ANY
            const verb = isNegative ? "There aren't" : "There are";
            sentence = `${verb} ___ ${item.p}.`;
            correct = isNegative ? 'any' : 'some';
        }
    } else {
        // Uncountable -> SOME / ANY
        const verb = isNegative ? "There isn't" : "There is";
        sentence = `${verb} ___ ${item.s}.`; // There is some water / isn't any water
        correct = isNegative ? 'any' : 'some';
    }

    return {
        tipo: 'grammar',
        subtipo: 'there_is_are_full_quantifier',
        question_type: 'multiple_choice',
        pregunta: `Elige la opción correcta (a/an/some/any): "${sentence}"`,
        opciones: shuffleArray(['a', 'an', 'some', 'any']),
        correcta: correct,
        explicacion: `Regla de cuantificadores con There Is/Are.`,
        dificultad: 'medio',
        gramatica: 'quantifiers_full',
        scope: ['GRAMMAR_QUANTIFIERS', 'GRAMMAR_THERE_IS_ARE']
    };
}

function generarOrdenarPregunta() {
    const item = getRandomItem(ITEMS);
    const loc = getRandomItem(LOCATIONS);

    let correct, s, words;

    if (item.type === 'uncountable') {
        // Is there any water?
        correct = `Is there any ${item.s}?`;
        words = ['Is', 'there', 'any', item.s, '?'];
        s = item.es_s;
    } else {
        // Are there any apples?
        correct = `Are there any ${item.p}?`;
        words = ['Are', 'there', 'any', item.p, '?'];
        s = item.es_p;
    }

    return {
        tipo: 'grammar',
        subtipo: 'there_is_are_question',
        question_type: 'word_order',
        pregunta: `Ordena la pregunta:`,
        words: shuffleArray(words),
        correcta: correct,
        correct_variations: [correct],
        explicacion: `Preguntas: Verbo + there + any + nombre?`,
        dificultad: 'medio',
        gramatica: 'there_is_are_question',
        scope: ['GRAMMAR_THERE_IS_ARE']
    };
}

// ==========================================
// NIVEL DIFÍCIL: TRADUCCIÓN
// ==========================================

function generarTraducir() {
    const item = getRandomItem(ITEMS);
    const loc = getRandomItem(LOCATIONS);

    const isQuestion = Math.random() > 0.3; // 30% questions
    let es, en;

    if (item.type === 'uncountable') {
        if (isQuestion) {
            es = `¿Hay ${item.es_s}?`;
            en = `Is there any ${item.s}?`; // Or "Is there some water" (offering), but "Is there water" is standard
            // Standard school grammar prefers "Is there any..."
        } else {
            es = `Hay ${item.es_s} ${loc.es}`;
            en = `There is some ${item.s} ${loc.en}`;
        }
    } else {
        // Countable
        if (isQuestion) {
            es = `¿Hay ${item.es_p}?`;
            en = `Are there any ${item.p}?`;
        } else {
            // Singular or Plural? Let's do Plural as it's harder/more common for this topic
            es = `Hay ${item.es_p} ${loc.es}`;
            en = `There are some ${item.p} ${loc.en}`;
        }
    }

    const enVar = [en, en.replace('any ', ''), en.replace('some ', '')];
    if (en.includes('any')) enVar.push(en.replace('any', 'some')); // Allow mistakes in strictness if configured, but better correct

    // Add logic for difficult translations to enforce SOME/ANY explicitly

    return {
        tipo: 'grammar',
        subtipo: 'there_is_are_translate',
        question_type: 'text_input',
        pregunta: `Traduce al inglés (usa some/any): "${es}"`,
        correcta: en,
        accept_variations: [en, en + '.', en.replace('There is', "There's"), en.replace('There is not', "There isn't"), en.replace('There are not', "There aren't")],
        case_sensitive: false,
        explicacion: `Respuesta: ${en} (Recordad: some en afirmativas, any en negativas/preguntas)`,
        dificultad: 'dificil',
        gramatica: 'there_is_are_translation',
        scope: ['GRAMMAR_THERE_IS_ARE']
    };
}

function generarComplexQuantifierFill() {
    // Fill in the blanks text input for difficult level
    // There ___ ___ apples on the table. (negativo) -> aren't any

    const item = getRandomItem(ITEMS);
    const loc = getRandomItem(LOCATIONS);
    const isNegative = Math.random() > 0.5;

    let sentence, correct, hint;

    if (item.type === 'countable') {
        if (isNegative) {
            sentence = `There _______ _______ ${item.p} ${loc.en}. (negativo)`;
            correct = "aren't any";
            hint = "Verbo negativo + any";
        } else {
            sentence = `There _______ _______ ${item.p} ${loc.en}. (afirmativo)`;
            correct = "are some";
            hint = "Verbo afirmativo + some";
        }
    } else {
        if (isNegative) {
            sentence = `There _______ _______ ${item.s} ${loc.en}. (negativo)`;
            correct = "isn't any";
            hint = "Verbo negativo + any";
        } else {
            sentence = `There _______ _______ ${item.s} ${loc.en}. (afirmativo)`;
            correct = "is some";
            hint = "Verbo afirmativo + some";
        }
    }

    return {
        tipo: 'grammar',
        subtipo: 'there_is_are_gapfill_hard',
        question_type: 'text_input',
        pregunta: `Completa los huecos: "${sentence}"`,
        correcta: correct,
        accept_variations: [correct, correct.replace("isn't", "is not"), correct.replace("aren't", "are not")],
        case_sensitive: false,
        explicacion: `Solución: ${correct}. (${hint})`,
        dificultad: 'dificil',
        gramatica: 'quantifiers_gapfill',
        scope: ['GRAMMAR_QUANTIFIERS', 'GRAMMAR_THERE_IS_ARE']
    };
}

// ==========================================
// FUNCIÓN PRINCIPAL
// ==========================================

export function generarThereIsAre(nivel = 'facil') {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarThereIsAreChoice, peso: 100 }
        ],
        medio: [
            { func: generarSomeAnyChoice, peso: 40 },
            { func: generarFullQuantifierChoice, peso: 30 },
            { func: generarOrdenarPregunta, peso: 30 }
        ],
        dificil: [
            { func: generarTraducir, peso: 60 },
            { func: generarComplexQuantifierFill, peso: 40 }
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

    // Loop anti-repetición
    for (let i = 0; i < 10; i++) {
        const ex = selectedFunc();
        const key = `${ex.pregunta}|${ex.correcta}`;
        if (!ejerciciosUsados.has(key)) {
            ejerciciosUsados.add(key);
            return ex;
        }
    }
    return selectedFunc();
}

export function resetearEjerciciosUsados() {
    ejerciciosUsados.clear();
}

export default {
    generarThereIsAre,
    resetearEjerciciosUsados
};
