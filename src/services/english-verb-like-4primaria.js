/**
 * GENERADOR DE VERBO LIKE - 4º PRIMARIA
 * 
 * Lógica dinámica para el verbo Like (Gustar).
 * 
 * Rules:
 * - Affirmative: I/You/We/They LIKE - He/She/It LIKES.
 * - Negative: I/You/We/They DON'T LIKE - He/She/It DOESN'T LIKE.
 * - Interrogative: DO you like...? - DOES she like...?
 * 
 * Structures:
 * - Like + Noun: I like pizza.
 * - Like + Verb-ing: I like playing football. (Gerund is standard for 4th grade 'hobbies')
 */

import vocabularyData from '../data/english-4primaria.json';

// ==========================================
// DATOS
// ==========================================

const SUBJECTS = {
    // 3rd Person Singular
    he: { pronoun: 'He', form: 'likes', aux: 'Does', neg: 'doesn\'t like', spanish: 'A él', spanish_pronoun: 'Él' },
    she: { pronoun: 'She', form: 'likes', aux: 'Does', neg: 'doesn\'t like', spanish: 'A ella', spanish_pronoun: 'Ella' },
    my_mum: { pronoun: 'My mum', form: 'likes', aux: 'Does', neg: 'doesn\'t like', spanish: 'A mi mamá', spanish_pronoun: 'Mi mamá' },

    // Others
    i: { pronoun: 'I', form: 'like', aux: 'Do', neg: 'don\'t like', spanish: 'A mí', spanish_pronoun: 'Yo' },
    we: { pronoun: 'We', form: 'like', aux: 'Do', neg: 'don\'t like', spanish: 'A nosotros', spanish_pronoun: 'Nosotros' },
    they: { pronoun: 'They', form: 'like', aux: 'Do', neg: 'don\'t like', spanish: 'A ellos', spanish_pronoun: 'Ellos' },
    you: { pronoun: 'You', form: 'like', aux: 'Do', neg: 'don\'t like', spanish: 'A ti', spanish_pronoun: 'Tú' }
};

function getDynamicActivities() {
    // Like + Verb-ing (e.g. from Hobbies)
    const acts = [
        { en: 'playing football', es: 'jugar al fútbol' },
        { en: 'reading books', es: 'leer libros' },
        { en: 'swimming', es: 'nadar' },
        { en: 'drawing', es: 'dibujar' }
    ];

    // Try to convert 'hobbies' from vocab: "reading" -> "reading" (already gerund usually)
    if (vocabularyData.vocabulary['hobbies']) {
        vocabularyData.vocabulary['hobbies'].forEach(h => {
            // Check if already in list
            if (!acts.some(a => a.en === h.english)) {
                acts.push({ en: h.english, es: h.spanish });
            }
        });
    }
    return acts;
}

const ACTIVITIES = getDynamicActivities();

function getDynamicItems() {
    // Like + Noun: Food, Animals, Sports, School Objects...
    const items = [];
    const validCats = ['food', 'animals', 'sports', 'school_objects', 'clothes', 'colors', 'space', 'transport'];

    validCats.forEach(cat => {
        if (vocabularyData.vocabulary[cat]) {
            vocabularyData.vocabulary[cat].forEach(wd => {
                // Pluralize heuristic for general likes: "I like dogs" (not 'a dog')
                // Uncountable (food) stays singular: "I like water"

                let en = wd.english;
                let es = wd.spanish;

                // Simple pluralization for countable-like things
                const isUncountable = ['water', 'milk', 'bread', 'cheese', 'sugar', 'chocolate', 'rain', 'snow'].includes(en);

                if (!isUncountable && ['animals', 'school_objects', 'clothes', 'transport'].includes(cat)) {
                    // Force plural for "I like..."
                    if (!en.endsWith('s')) en += 's';
                    // Spanish plural varies, keep generic or append s for simplicity or ignore artcile
                    // "Me gustan los gatos" (The Spanish logic below expects 'el/la/los' often omitted or hardcoded)
                    // Simplified: "cats" -> "gatos"
                    if (!es.endsWith('s')) es += 's';
                }

                items.push({ en: en, es: es });
            });
        }
    });

    if (items.length === 0) return [{ en: 'pizza', es: 'pizza' }];
    return items;
}

const ITEMS = getDynamicItems();

/**
 * Filter items by category if provided
 */
function getItemsByCategory(category) {
    if (!category || !vocabularyData.vocabulary[category]) return ITEMS;

    // Create items for this specific category
    const specificItems = [];
    vocabularyData.vocabulary[category].forEach(wd => {
        let en = wd.english;
        let es = wd.spanish;

        // Simple pluralization logic similar to main function
        const isUncountable = ['water', 'milk', 'bread', 'cheese', 'sugar', 'chocolate', 'rain', 'snow', 'food'].includes(category) || ['water', 'milk'].includes(en);

        if (!isUncountable && !en.endsWith('s')) en += 's';
        if (!isUncountable && !es.endsWith('s')) es += 's';

        specificItems.push({ en, es });
    });

    return specificItems.length > 0 ? specificItems : ITEMS;
}

let ejerciciosUsados = new Set();

// ==========================================
// UTILIDADES
// ==========================================

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomSubject() {
    const keys = Object.keys(SUBJECTS);
    const key = getRandomItem(keys);
    return SUBJECTS[key];
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
// NIVEL FÁCIL: LIKE vs LIKES
// ==========================================

function generarLikeLikesChoice(categoria) {
    const s = getRandomSubject();

    // Determine if we use activity or object based on category
    let obj;
    if (categoria === 'hobbies') {
        obj = getRandomItem(ACTIVITIES);
    } else if (categoria) {
        // Specific category requested
        obj = getRandomItem(getItemsByCategory(categoria));
    } else {
        // Random mix
        const isActivity = Math.random() > 0.5;
        obj = isActivity ? getRandomItem(ACTIVITIES) : getRandomItem(ITEMS);
    }

    // She ___ pizza.
    const sentence = `${s.pronoun} ___ ${obj.en}.`;
    const correct = s.form; // like or likes

    return {
        tipo: 'grammar',
        subtipo: 'verb_like_choice',
        question_type: 'multiple_choice',
        pregunta: `Elige la forma correcta: "${sentence}"`,
        opciones: shuffleArray(['like', 'likes', 'liking', 'is like']),
        correcta: correct,
        explicacion: `Con "${s.pronoun}" usamos "${correct}".`,
        dificultad: 'facil',
        gramatica: 'verb_like_affirmative'
    };
}

// ==========================================
// NIVEL MEDIO: NEGATIVE & QUESTIONS
// ==========================================

function generarNegativeChoice(categoria) {
    const s = getRandomSubject();
    const obj = categoria ? getRandomItem(getItemsByCategory(categoria)) : getRandomItem(ITEMS);

    // He ___ like cats. (doesn't / don't)
    // Or full sentence choice: "He doesn't like cats"

    const sentence = `${s.pronoun} ___ ${obj.en}. (Negativo)`;
    const correct = s.neg; // don't like / doesn't like

    // Distractores
    const error1 = s.neg === 'don\'t like' ? 'doesn\'t like' : 'don\'t like';
    const error2 = 'not like';
    const error3 = 'no likes';

    return {
        tipo: 'grammar',
        subtipo: 'verb_like_negative',
        question_type: 'multiple_choice',
        pregunta: `Elige el negativo correcto: "${sentence}"`,
        opciones: shuffleArray([correct, error1, error2, error3]),
        correcta: correct,
        explicacion: `Negativo de "${s.pronoun}" es "${correct}".`,
        dificultad: 'medio',
        gramatica: 'verb_like_negative'
    };
}

function generarQuestionAuxChoice() {
    const s = getRandomSubject();
    const obj = getRandomItem(ACTIVITIES);

    // ___ you like reading?
    const sentence = `___ ${s.pronoun.toLowerCase()} like ${obj.en}?`;
    const correct = s.aux; // Do or Does

    return {
        tipo: 'grammar',
        subtipo: 'verb_like_question',
        question_type: 'multiple_choice',
        pregunta: `Completa la pregunta: "${sentence}"`,
        opciones: shuffleArray(['Do', 'Does', 'Are', 'Is']),
        correcta: correct,
        explicacion: `Preguntas con "${s.pronoun}" empiezan por "${correct}".`,
        dificultad: 'medio',
        gramatica: 'verb_like_question'
    };
}

// ==========================================
// NIVEL DIFÍCIL: TRADUCCIÓN
// ==========================================

// ==========================================

function generarTraducir(categoria) {
    const s = getRandomSubject();

    let obj;
    if (categoria === 'hobbies') {
        obj = getRandomItem(ACTIVITIES);
    } else if (categoria) {
        obj = getRandomItem(getItemsByCategory(categoria));
    } else {
        const isActivity = Math.random() > 0.5;
        obj = isActivity ? getRandomItem(ACTIVITIES) : getRandomItem(ITEMS);
    }

    const isNegative = Math.random() > 0.3; // 30% negative sentences

    // "A ella le gusta nadar" -> "She likes swimming"
    let es, en;

    if (!isNegative) {
        // Affirmative
        // Spanish logic simplified: "Le gusta" vs "Me gusta".
        // Using helper 'spanish' field: "A ella le gusta..."
        let gustarForm = 'le gusta';
        if (s.pronoun === 'I') gustarForm = 'me gusta';
        if (s.pronoun === 'You') gustarForm = 'te gusta'; // Simplified informal
        if (s.pronoun === 'We') gustarForm = 'nos gusta';
        if (s.pronoun === 'They') gustarForm = 'les gusta';

        // Sometimes "A ella..." is redundant in Spanish but clear for learners.
        // Let's use simplified: "Ella le gusta..." (not perfect Spanish grammar, better: "A ella le gusta").
        // "Me gusta el chocolate"

        // Correct spanish construction for prompt
        if (s.pronoun === 'I') es = `Me gusta ${obj.es}`;
        else if (s.pronoun === 'You') es = `Te gusta ${obj.es}`;
        else if (s.pronoun === 'We') es = `Nos gusta ${obj.es}`;
        else if (s.pronoun === 'They') es = `Les gusta ${obj.es}`;
        else es = `Le gusta ${obj.es} (${s.spanish_pronoun})`; // Le gusta ... (Ella)

        en = `${s.pronoun} ${s.form} ${obj.en}`;
    } else {
        // Negative
        let gustarForm = 'no le gusta';
        if (s.pronoun === 'I') es = `No me gusta ${obj.es}`;
        else if (s.pronoun === 'You') es = `No te gusta ${obj.es}`;
        else if (s.pronoun === 'We') es = `No nos gusta ${obj.es}`;
        else if (s.pronoun === 'They') es = `No les gusta ${obj.es}`;

        else es = `No le gusta ${obj.es} (${s.spanish_pronoun})`;

        en = `${s.pronoun} ${s.neg} ${obj.en}`;
    }

    return {
        tipo: 'grammar',
        subtipo: 'verb_like_translate',
        question_type: 'text_input',
        pregunta: `Traduce al inglés: "${es}"`,
        correcta: en,
        accept_variations: [en, en + '.', en.toLowerCase()],
        case_sensitive: false,
        explicacion: `Respuesta: ${en}`,
        dificultad: 'dificil',
        gramatica: 'verb_like_translation'
    };
}

// ==========================================
// PRINCIPAL
// ==========================================

// PRINCIPAL
// ==========================================

export function generarVerbLike(nivel = 'facil', variedad = true, categoria = null) {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarLikeLikesChoice, peso: 100 }
        ],
        medio: [
            { func: generarNegativeChoice, peso: 50 },
            { func: generarQuestionAuxChoice, peso: 50 }
        ],
        dificil: [
            { func: generarTraducir, peso: 100 }
        ]
    };

    const tipos = tiposPorNivel[nivelNormalizado] || tiposPorNivel.facil;

    const total = tipos.reduce((acc, t) => acc + t.peso, 0);
    let rand = Math.random() * total;

    for (const t of tipos) {
        rand -= t.peso;
        if (rand <= 0) return t.func(categoria);
    }
    return tipos[0].func(categoria);
}

export function resetearEjerciciosUsados() {
    ejerciciosUsados.clear();
}

export default {
    generarVerbLike,
    resetearEjerciciosUsados
};
