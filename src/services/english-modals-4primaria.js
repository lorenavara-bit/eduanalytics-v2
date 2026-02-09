/**
 * GENERADOR DE MODALES (CAN, MUST, HAVE TO) - 4º PRIMARIA
 * 
 * Includes:
 * - CAN / CAN'T (Ability, Permission)
 * - MUST / MUSTN'T (Obligation, Prohibition)
 * - HAVE TO / HAS TO (Obligation) -- NEW
 * - DON'T HAVE TO / DOESN'T HAVE TO (No obligation) -- NEW
 * 
 * Structure: Subject + Modal + Verb (base form)
 */

// ==========================================
// DATOS
// ==========================================

const VERBS_CAN = [
    { en: 'swim', es: 'nadar' },
    { en: 'fly', es: 'volar' },
    { en: 'run fast', es: 'correr rápido' },
    { en: 'speak English', es: 'hablar inglés' },
    { en: 'play the piano', es: 'tocar el piano' },
    { en: 'ride a bike', es: 'montar en bici' },
    { en: 'drive a car', es: 'conducir un coche' },
    { en: 'cook', es: 'cocinar' }
];

const VERBS_MUST = [
    { en: 'do homework', es: 'hacer los deberes', type: 'obl' },
    { en: 'listen to the teacher', es: 'escuchar al profesor', type: 'obl' },
    { en: 'study', es: 'estudiar', type: 'obl' },
    { en: 'clean my room', es: 'limpiar mi habitación', type: 'obl' },
    { en: 'shout in class', es: 'gritar en clase', type: 'prohib' },
    { en: 'run in the corridors', es: 'correr en los pasillos', type: 'prohib' },
    { en: 'eat in class', es: 'comer en clase', type: 'prohib' },
    { en: 'be late', es: 'llegar tarde', type: 'prohib' }
];

const VERBS_HAVE_TO = [
    { en: 'get up early', es: 'levantarse temprano' },
    { en: 'wear a uniform', es: 'llevar uniforme' },
    { en: 'go to school', es: 'ir al colegio' },
    { en: 'help at home', es: 'ayudar en casa' },
    { en: 'wash the dishes', es: 'lavar los platos' }
];

const SUBJECTS = ['I', 'You', 'He', 'She', 'We', 'They', 'The bird', 'Fish'];

// 3rd Person Logic for Have To
const SUBJECTS_HAVETO = [
    { p: 'I', form: 'have to', neg: 'don\'t have to', es: 'Yo' },
    { p: 'You', form: 'have to', neg: 'don\'t have to', es: 'Tú' },
    { p: 'He', form: 'has to', neg: 'doesn\'t have to', es: 'Él' },
    { p: 'She', form: 'has to', neg: 'doesn\'t have to', es: 'Ella' },
    { p: 'We', form: 'have to', neg: 'don\'t have to', es: 'Nosotros' },
    { p: 'They', form: 'have to', neg: 'don\'t have to', es: 'Ellos' }
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
// NIVEL FÁCIL: CHOICE CAN/MUST/HAVE TO
// ==========================================

function generarCanChoice() {
    const v = getRandomItem(VERBS_CAN);
    const s = getRandomItem(SUBJECTS);

    const sentence = `${s} ___ ${v.en}.`;
    const options = ['can', 'cans', 'to can', 'is can'];

    return {
        tipo: 'grammar',
        subtipo: 'modal_can_choice',
        question_type: 'multiple_choice',
        pregunta: `Elige la forma correcta: "${sentence}"`,
        opciones: shuffleArray(options),
        correcta: 'can',
        explicacion: `El verbo modal 'Can' nunca cambia (no añade -s).`,
        dificultad: 'facil',
        gramatica: 'modal_can_grammar'
    };
}

function generarMustChoice() {
    const v = getRandomItem(VERBS_MUST);

    let correct = v.type === 'obl' ? 'must' : 'mustn\'t';
    let sentence = `You ___ ${v.en}. (${v.type === 'obl' ? 'Debes' : 'No debes'})`;

    return {
        tipo: 'grammar',
        subtipo: 'modal_must_choice',
        question_type: 'multiple_choice',
        pregunta: `Completa con Must o Mustn't: "${sentence}"`,
        opciones: shuffleArray(['must', 'mustn\'t', 'can', 'don\'t']),
        correcta: correct,
        explicacion: `Usamos ${correct} para ${v.type === 'obl' ? 'obligaciones' : 'prohibiciones'}.`,
        dificultad: 'facil',
        gramatica: 'modal_must_logic'
    };
}

function generarHaveToChoice() {
    const s = getRandomItem(SUBJECTS_HAVETO);
    const v = getRandomItem(VERBS_HAVE_TO);

    // He ___ go to school.
    const sentence = `${s.p} ___ ${v.en}.`;
    const correct = s.form; // have to / has to

    // Distractores
    const options = ['have to', 'has to', 'having to', 'haves to'];

    return {
        tipo: 'grammar',
        subtipo: 'modal_haveto_choice',
        question_type: 'multiple_choice',
        pregunta: `Completa la frase: "${sentence}"`,
        opciones: shuffleArray(options),
        correcta: correct,
        explicacion: `Con ${s.p} usamos "${correct}".`,
        dificultad: 'facil',
        gramatica: 'modal_haveto_grammar'
    };
}

// ==========================================
// NIVEL MEDIO: NEGATIVE / QUESTIONS / REORDER
// ==========================================

function generarQuestionMix() {
    // Generate questions for Can / Have to (Must doesn't usually have questions in 4th grade, "Must I...?" is rare/formal)
    const type = Math.random() > 0.5 ? 'can' : 'have_to';

    if (type === 'can') {
        const v = getRandomItem(VERBS_CAN);
        const s = getRandomItem(SUBJECTS);
        const sentence = `___ ${s.toLowerCase()} ${v.en}?`;

        return {
            tipo: 'grammar',
            subtipo: 'modal_can_question',
            question_type: 'multiple_choice',
            pregunta: `Completa la pregunta: "${sentence}"`,
            opciones: shuffleArray(['Can', 'Do', 'Must', 'Is']),
            correcta: 'Can',
            explicacion: `Preguntas de habilidad empiezan por Can.`,
            dificultad: 'medio',
            gramatica: 'modal_can_question'
        };
    } else {
        // Have to questions: Do you have to...? Does she have to...?
        const s = getRandomItem(SUBJECTS_HAVETO);
        const v = getRandomItem(VERBS_HAVE_TO);

        // Do/Does ___ have to...?
        const aux = (s.p === 'I' || s.p === 'You' || s.p === 'We' || s.p === 'They') ? 'Do' : 'Does';
        const sentence = `___ ${s.p.toLowerCase()} have to ${v.en}?`;

        return {
            tipo: 'grammar',
            subtipo: 'modal_haveto_question',
            question_type: 'multiple_choice',
            pregunta: `Completa la pregunta de obligación: "${sentence}"`,
            opciones: shuffleArray(['Do', 'Does', 'Is', 'Have']),
            correcta: aux,
            explicacion: `Con ${s.p} usamos el auxiliar ${aux} para preguntar con 'have to'.`,
            dificultad: 'medio',
            gramatica: 'modal_haveto_question'
        };
    }
}

function generarOrdenarCan() {
    const v = getRandomItem(VERBS_CAN);
    const s = getRandomItem(SUBJECTS);

    const correct = `Can ${s.toLowerCase()} ${v.en}?`;
    const words = ['Can', s.toLowerCase(), ...v.en.split(' '), '?'];
    if (s === 'I') words[1] = 'I';

    return {
        tipo: 'grammar',
        subtipo: 'modal_can_order',
        question_type: 'word_order',
        pregunta: `Ordena la pregunta:`,
        words: shuffleArray(words),
        correcta: correct,
        correct_variations: [correct],
        explicacion: `Preguntas con Can: Can + Sujeto + Verbo?`,
        dificultad: 'medio',
        gramatica: 'modal_can_question'
    };
}

function generarNegativeMix() {
    const type = Math.floor(Math.random() * 3); // 0: Can, 1: Must, 2: Have to

    if (type === 0) {
        const v = getRandomItem(VERBS_CAN);
        const s = getRandomItem(SUBJECTS);
        return {
            tipo: 'grammar',
            subtipo: 'modal_can_negative',
            question_type: 'multiple_choice',
            pregunta: `Elige el negativo: "${s} ___ ${v.en}."`,
            opciones: shuffleArray(['can\'t', 'no can', 'don\'t can', 'not can']),
            correcta: 'can\'t',
            explicacion: `El negativo de can es cannot o can't.`,
            dificultad: 'medio',
            gramatica: 'modal_can_negative'
        };
    } else if (type === 1) {
        const v = getRandomItem(VERBS_MUST);
        const correctNeg = 'mustn\'t';

        return {
            tipo: 'grammar',
            subtipo: 'modal_must_negative',
            question_type: 'multiple_choice',
            pregunta: `¿Cuál es el negativo de Must?`,
            opciones: shuffleArray(['mustn\'t', 'don\'t must', 'not must', 'no must']),
            correcta: 'mustn\'t',
            explicacion: `Negativo de must = mustn't.`,
            dificultad: 'medio',
            gramatica: 'modal_must_form'
        };
    } else {
        // Have to Negative
        const s = getRandomItem(SUBJECTS_HAVETO);
        const v = getRandomItem(VERBS_HAVE_TO);
        // He doesn't have to...
        const sentence = `${s.p} ___ ${v.en} (No tiene que...)`;

        return {
            tipo: 'grammar',
            subtipo: 'modal_haveto_negative',
            question_type: 'multiple_choice',
            pregunta: `Completa en negativo: ${sentence}`,
            opciones: shuffleArray(['don\'t have to', 'doesn\'t have to', 'not have to', 'hasn\'t to']),
            correcta: s.neg, // don't / doesn't have to
            explicacion: `Negativo de ${s.form} es ${s.neg}.`,
            dificultad: 'medio',
            gramatica: 'modal_haveto_negative'
        };
    }
}

// ==========================================
// NIVEL DIFÍCIL: TRANSLATION
// ==========================================

function generarTraducir() {
    const type = Math.floor(Math.random() * 3); // 0: Can, 1: Must, 2: Have to

    if (type === 0) {
        const v = getRandomItem(VERBS_CAN);
        const s = getRandomItem(SUBJECTS);
        let s_es = s === 'I' ? 'Yo' : (s === 'She' ? 'Ella' : (s === 'He' ? 'Él' : (s === 'We' ? 'Nosotros' : (s === 'They' ? 'Ellos' : s))));
        if (s === 'You') s_es = 'Tú';

        let poderEs = 'puede';
        if (s === 'I') poderEs = 'puedo';
        if (s === 'You') poderEs = 'puedes';
        if (s === 'We') poderEs = 'podemos';
        if (s === 'They') poderEs = 'pueden';

        const es = `${s_es} ${poderEs} ${v.es}`;
        const en = `${s} can ${v.en}`;

        return {
            tipo: 'grammar',
            subtipo: 'modal_translate',
            question_type: 'text_input',
            pregunta: `Traduce: "${es}"`,
            correcta: en,
            accept_variations: [en, en + '.', en.toLowerCase()],
            case_sensitive: false,
            explicacion: `Respuesta: ${en}`,
            dificultad: 'dificil',
            gramatica: 'modal_can_translate'
        };
    } else if (type === 1) {
        const v = getRandomItem(VERBS_MUST);
        const es = `Debes ${v.es}`;
        const en = `You must ${v.en}`;

        return {
            tipo: 'grammar',
            subtipo: 'modal_translate',
            question_type: 'text_input',
            pregunta: `Traduce: "${es}"`,
            correcta: en,
            accept_variations: [en, en + '.', en.toLowerCase()],
            case_sensitive: false,
            explicacion: `Respuesta: ${en}`,
            dificultad: 'dificil',
            gramatica: 'modal_must_translate'
        };
    } else {
        // Have to translation
        const s = getRandomItem(SUBJECTS_HAVETO);
        const v = getRandomItem(VERBS_HAVE_TO);

        const tieneQue = s.p === 'I' ? 'Tengo que' : (s.p === 'You' ? 'Tienes que' : (s.p === 'We' ? 'Tenemos que' : (s.p === 'They' ? 'Tienen que' : 'Tiene que')));
        const es = `${tieneQue} ${v.es}`;
        const en = `${s.p} ${s.form} ${v.en}`;

        return {
            tipo: 'grammar',
            subtipo: 'modal_haveto_translate',
            question_type: 'text_input',
            pregunta: `Traduce: "${es}" (${s.p})`,
            correcta: en,
            accept_variations: [en, en + '.', en.toLowerCase()],
            case_sensitive: false,
            explicacion: `Respuesta: ${en}`,
            dificultad: 'dificil',
            gramatica: 'modal_haveto_translate'
        };
    }
}

// ==========================================
// PRINCIPAL
// ==========================================

export function generarModals(nivel = 'facil') {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarCanChoice, peso: 40 },
            { func: generarMustChoice, peso: 30 },
            { func: generarHaveToChoice, peso: 30 }
        ],
        medio: [
            { func: generarOrdenarCan, peso: 30 },
            { func: generarNegativeMix, peso: 40 },
            { func: generarQuestionMix, peso: 30 }
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
    generarModals,
    resetearEjerciciosUsados
};
