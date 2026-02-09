/**
 * GENERADOR DE ROUTINES GRAMMAR (DAILY ROUTINES & FREQUENCY) - 4º PRIMARIA
 * 
 * Includes:
 * 1. Time prepositions: at 7 o'clock, in the morning.
 * 2. Routine Verbs: get up, go to school, have breakfast.
 * 3. Frequency Adverbs: always, sometimes, never (Position rules).
 */

import vocabularyData from '../data/english-4primaria.json';

// ==========================================
// DATOS
// ==========================================

const ROUTINES = [
    { text: 'get up', es: 'levantarse' },
    { text: 'have breakfast', es: 'desayunar' },
    { text: 'go to school', es: 'ir al colegio' },
    { text: 'have lunch', es: 'comer/almorzar' },
    { text: 'do homework', es: 'hacer deberes' },
    { text: 'watch TV', es: 'ver la tele' },
    { text: 'go to bed', es: 'irse a dormir' },
    { text: 'brush my teeth', es: 'lavarse los dientes' },
    { text: 'have a shower', es: 'ducharse' }
];

const TIMES = [
    { en: 'at 7 o\'clock', prep: 'at' },
    { en: 'at half past eight', prep: 'at' },
    { en: 'in the morning', prep: 'in' },
    { en: 'in the afternoon', prep: 'in' },
    { en: 'at night', prep: 'at' },
    { en: 'on Mondays', prep: 'on' } // Routine on specific day
];

const ADVERBS = [
    { en: 'always', es: 'siempre', pos: 100 },
    { en: 'usually', es: 'habitualmente', pos: 80 },
    { en: 'often', es: 'a menudo', pos: 60 },
    { en: 'sometimes', es: 'a veces', pos: 40 },
    { en: 'never', es: 'nunca', pos: 0 }
];

const SUBJECTS = ['I', 'You', 'He', 'She', 'We', 'They'];

let ejerciciosUsados = new Set();

// ==========================================
// HELPERS
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
// NIVEL FÁCIL: ROUTINE + TIME PREPOSITION
// ==========================================

function generarRoutinePrep() {
    const sub = getRandomItem(SUBJECTS);
    const rout = getRandomItem(ROUTINES);
    const time = getRandomItem(TIMES);

    // Conjugate simple present 3rd person
    let verb = rout.text;
    if (sub === 'He' || sub === 'She') {
        if (verb === 'have breakfast') verb = 'has breakfast';
        else if (verb === 'have lunch') verb = 'has lunch';
        else if (verb === 'have a shower') verb = 'has a shower';
        else if (verb === 'go to school') verb = 'goes to school';
        else if (verb === 'go to bed') verb = 'goes to bed';
        else if (verb === 'watch TV') verb = 'watches TV';
        else if (verb === 'do homework') verb = 'does homework';
        else verb = verb + 's';
    }

    // I get up ___ 7 o'clock.
    // Strip prep from time string for the gap
    const timeTextWithoutPrep = time.en.replace(/^(at|in|on)\s/, '');
    const sentence = `${sub} ${verb} ___ ${timeTextWithoutPrep}.`;

    return {
        tipo: 'grammar',
        subtipo: 'routine_prep_choice',
        question_type: 'multiple_choice',
        pregunta: `Elige la preposición de TIEMPO correcta: "${sentence}"`,
        opciones: shuffleArray(['at', 'in', 'on', 'to']),
        correcta: time.prep,
        explicacion: `Usamos "${time.prep}" con "${timeTextWithoutPrep}".`,
        dificultad: 'facil',
        gramatica: 'routines_prepositions',
        feedback_card: {
            title: "Guía de Preposiciones",
            rules: [
                { label: "AT", explanation: "Horas (at 7:00), 'at night'", icon: "🕒" },
                { label: "IN", explanation: "Partes del día (morning), Meses", icon: "🌅" },
                { label: "ON", explanation: "Días (on Monday, on Sunday)", icon: "📅" }
            ],
            info: "Truco: Usa 'at' para horas exactas y 'on' para días concretos."
        }
    };
}

// ==========================================
// NIVEL MEDIO: ADVERB POSITION
// ==========================================

function generarAdverbPosition() {
    const sub = getRandomItem(SUBJECTS);
    const adv = getRandomItem(ADVERBS);
    const rout = getRandomItem(ROUTINES);

    // Rule: Subject + ADVERB + Verb (Main verb)
    // Contrast: Subject + BE + ADVERB (But routines here are main verbs mostly)

    let verb = rout.text;
    // Conjugate
    if (sub === 'He' || sub === 'She') {
        if (verb.startsWith('have')) verb = verb.replace('have', 'has');
        else if (verb.startsWith('go')) verb = verb.replace('go', 'goes');
        else if (verb.startsWith('do')) verb = verb.replace('do', 'does');
        else if (verb.startsWith('watch')) verb = verb.replace('watch', 'watches');
        else if (verb.startsWith('brush')) verb = verb.replace('brush', 'brushes');
        else verb = verb + 's'; // simple s
    }

    const correct = `${sub} ${adv.en} ${verb}`;
    const wrong1 = `${sub} ${verb} ${adv.en}`; // Verb + Adverb (Wrong for frequency)
    const wrong2 = `${adv.en} ${sub} ${verb}`; // Adverb at start (Sometimes ok, but strict rule prefers mid)

    // Unique distraction logic
    return {
        tipo: 'grammar',
        subtipo: 'routine_adverb_pos',
        question_type: 'multiple_choice',
        pregunta: `Elige el orden correcto (${adv.es}):`,
        opciones: shuffleArray([
            `${sub} ${adv.en} ${verb}.`, // Correct
            `${sub} ${verb} ${adv.en}.`, // Wrong
            `${adv.en} ${verb} ${sub}.`, // Wrong
            `${sub} is ${adv.en} ${verb}.` // Wrong nonsense
        ]),
        correcta: `${sub} ${adv.en} ${verb}.`,
        explicacion: `El adverbio de frecuencia va DELANTE del verbo principal.`,
        dificultad: 'medio',
        gramatica: 'frequency_adverbs',
        feedback_card: {
            title: "Orden de la Frase",
            rules: [
                { label: "1º PERSONA", explanation: "I, You, She, My friend...", icon: "👤" },
                { label: "2º ADVERBIO", explanation: "always, never, sometimes", icon: "⚡" },
                { label: "3º VERBO", explanation: "play, eat, study", icon: "🏃" }
            ],
            info: "El adverbio va SIEMPRE antes de la acción (verbo principal)."
        }
    };
}

// ==========================================
// NIVEL DIFÍCIL: REWRITE / TRANSLATE
// ==========================================

function generarPosicionAdverbioEscritura() {
    const sub = getRandomItem(SUBJECTS);
    const adv = getRandomItem(ADVERBS);
    const rout = getRandomItem(ROUTINES);

    // Rule: Subject + ADVERB + Verb (Main verb)
    // Conjugate
    let verb = rout.text;
    if (sub === 'He' || sub === 'She') {
        if (verb.startsWith('have')) verb = verb.replace('have', 'has');
        else if (verb.startsWith('go')) verb = verb.replace('go', 'goes');
        else if (verb.startsWith('do')) verb = verb.replace('do', 'does');
        else if (verb.startsWith('watch')) verb = verb.replace('watch', 'watches');
        else if (verb.startsWith('brush')) verb = verb.replace('brush', 'brushes');
        else if (verb.startsWith('get')) verb = verb.replace('get', 'gets');
        else verb = verb + 's';
    }

    const correct = `${sub} ${adv.en} ${verb}.`;
    // Base sentence without adverb
    const base = `${sub} ${verb}.`;

    return {
        tipo: 'grammar',
        subtipo: 'routine_adverb_write',
        question_type: 'text_input',
        pregunta: `Reescribe la frase poniendo el adverbio (${adv.en}) en su lugar correcto: "${base}"`,
        correcta: correct,
        accept_variations: [correct, correct.replace(/\.$/, ''), correct.toLowerCase(), correct.toLowerCase().replace(/\.$/, '')],
        case_sensitive: false,
        explicacion: `El adverbio de frecuencia se coloca DELANTE del verbo principal.\nCorrecto: "${correct}"`,
        dificultad: 'dificil',
        gramatica: 'frequency_adverbs_write',
        feedback_card: {
            title: "Posición del Adverbio",
            content: "Recuerda: **Sujeto + Adverbio + Verbo**.\nEjemplo: I *always* get up."
        }
    };
}

function generarTraducirRoutine() {
    const sub = getRandomItem(SUBJECTS);
    const adv = getRandomItem(ADVERBS);
    const rout = getRandomItem(ROUTINES);

    // Mapeo Sujeto -> Español
    const subMap = {
        'I': 'Yo', 'You': 'Tú', 'He': 'Él', 'She': 'Ella', 'We': 'Nosotros', 'They': 'Ellos'
    };
    const subEs = subMap[sub] || sub;

    // Conjugación Manual para Rutinas (Solo 9 verbos, se puede hacer hardcoded para precisión perfecta)
    // Routines: get up, have breakfast, go to school, have lunch, do homework, watch TV, go to bed, brush my teeth, have a shower
    // Base Spanish: levantarse, desayunar, ir al colegio, comer, hacer deberes, ver la tele, irse a dormir, lavarse los dientes, ducharse

    let verbEsBase = rout.es; // e.g., "desayunar"
    let verbEsConjugado = verbEsBase;

    // Helper micro-conjugador para este set específico de rutinas
    const conjugateRoutineEs = (vBase, subj) => {
        // Reflexivos: levantarse, irse, lavarse, ducharse
        const isReflexive = vBase.endsWith('se') || vBase.includes('lavarse');
        let root = vBase.replace('se', '').trim(); // levantar

        // Pronombres reflexivos
        const refl = { 'Yo': 'me', 'Tú': 'te', 'Él': 'se', 'Ella': 'se', 'Nosotros': 'nos', 'Ellos': 'se' };

        // Verbos concretos
        if (vBase.includes('desayunar')) {
            if (subj === 'Yo') return 'desayuno';
            if (subj === 'Tú') return 'desayunas';
            if (subj === 'Nosotros') return 'desayunamos';
            if (subj === 'Ellos') return 'desayunan';
            return 'desayuna';
        }
        if (vBase.includes('comer') || vBase.includes('almorzar')) {
            if (subj === 'Yo') return 'como';
            if (subj === 'Tú') return 'comes';
            if (subj === 'Nosotros') return 'comemos';
            if (subj === 'Ellos') return 'comen';
            return 'come';
        }
        if (vBase.includes('ir al colegio')) {
            if (subj === 'Yo') return 'voy al colegio';
            if (subj === 'Tú') return 'vas al colegio';
            if (subj === 'Nosotros') return 'vamos al colegio';
            if (subj === 'Ellos') return 'van al colegio';
            return 'va al colegio';
        }
        if (vBase.includes('hacer deberes')) {
            if (subj === 'Yo') return 'hago los deberes';
            if (subj === 'Tú') return 'haces los deberes';
            if (subj === 'Nosotros') return 'hacemos los deberes';
            if (subj === 'Ellos') return 'hacen los deberes';
            return 'hace los deberes';
        }
        if (vBase.includes('ver la tele')) {
            if (subj === 'Yo') return 'veo la tele';
            if (subj === 'Tú') return 'ves la tele';
            if (subj === 'Nosotros') return 'vemos la tele';
            if (subj === 'Ellos') return 'ven la tele';
            return 've la tele';
        }

        // Reflexivos
        if (vBase.includes('levantarse')) { // levantarse
            if (subj === 'Yo') return 'me levanto';
            if (subj === 'Tú') return 'te levantas';
            if (subj === 'Nosotros') return 'nos levantamos';
            if (subj === 'Ellos') return 'se levantan';
            return 'se levanta';
        }
        if (vBase.includes('ducharse')) { // ducharse
            if (subj === 'Yo') return 'me ducho';
            if (subj === 'Tú') return 'te duchas';
            if (subj === 'Nosotros') return 'nos duchamos';
            if (subj === 'Ellos') return 'se duchan';
            return 'se ducha';
        }
        if (vBase.includes('lavarse')) { // lavarse los dientes
            if (subj === 'Yo') return 'me lavo los dientes';
            if (subj === 'Tú') return 'te lavas los dientes';
            if (subj === 'Nosotros') return 'nos lavamos los dientes';
            if (subj === 'Ellos') return 'se lavan los dientes';
            return 'se lava los dientes';
        }
        if (vBase.includes('irse')) { // irse a dormir
            if (subj === 'Yo') return 'me voy a dormir';
            if (subj === 'Tú') return 'te vas a dormir';
            if (subj === 'Nosotros') return 'nos vamos a dormir';
            if (subj === 'Ellos') return 'se van a dormir';
            return 'se va a dormir';
        }

        return vBase; // Fallback
    };

    verbEsConjugado = conjugateRoutineEs(verbEsBase, subEs);

    // Construcción Frase Español: "Yo habitualmente desayuno" vs "Yo me levanto habitualmente"
    // Regla natural español: Sujeto + (Adverbio) + Verbo o Sujeto + (Se) + (Adverbio) + Verbo
    // Simple: Yo siempre desayuno.
    const es = `${subEs} ${adv.es} ${verbEsConjugado}`;

    // Conjugate English
    let verb = rout.text;
    if (sub === 'He' || sub === 'She') {
        if (verb.startsWith('have')) verb = verb.replace('have', 'has');
        else if (verb.startsWith('go')) verb = verb.replace('go', 'goes');
        else if (verb.startsWith('do')) verb = verb.replace('do', 'does');
        else if (verb.startsWith('watch')) verb = verb.replace('watch', 'watches');
        else if (verb.startsWith('brush')) {
            verb = verb.replace('brush', 'brushes');
            verb = verb.replace('my', 'his/her'); // Handle possessive
        }
        else if (verb.startsWith('get')) verb = verb.replace('get', 'gets');
        else verb = verb + 's';
    }

    // Fix possessive for other persons if brush my teeth
    if (rout.text.includes('my teeth')) {
        if (sub === 'He') verb = verb.replace('my', 'his');
        else if (sub === 'She') verb = verb.replace('my', 'her');
        else if (sub === 'We') verb = verb.replace('my', 'our');
        else if (sub === 'They') verb = verb.replace('my', 'their');
        else if (sub === 'You') verb = verb.replace('my', 'your');
    }

    const en = `${sub} ${adv.en} ${verb}`;

    return {
        tipo: 'grammar',
        subtipo: 'routine_translate',
        question_type: 'text_input',
        pregunta: `Traduce: "${es}"`,
        correcta: en,
        accept_variations: [en, en + '.', en.toLowerCase(), en.toLowerCase() + '.'],
        case_sensitive: false,
        explicacion: `Respuesta: ${en} (Sujeto + Adverbio + Verbo)`,
        dificultad: 'dificil',
        gramatica: 'routines_translation_hard',
        feedback_card: {
            title: "Orden de la Frase",
            rules: [
                { label: "1º PERSONA", explanation: "I, You, She, My friend...", icon: "👤" },
                { label: "2º ADVERBIO", explanation: "always, never, sometimes", icon: "⚡" },
                { label: "3º VERBO", explanation: "play, eat, study", icon: "🏃" }
            ],
            info: "El adverbio va SIEMPRE antes de la acción (verbo principal)."
        }
    };
}

// ==========================================
// EXPORT
// ==========================================

export function generarRoutinesGrammar(nivel = 'facil') {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarRoutinePrep, peso: 50 },
            { func: generarAdverbPosition, peso: 50 }
        ],
        medio: [
            { func: generarRoutinePrep, peso: 30 },
            { func: generarAdverbPosition, peso: 70 }
        ],
        dificil: [
            { func: generarPosicionAdverbioEscritura, peso: 40 },
            { func: generarTraducirRoutine, peso: 60 }
        ]
    };

    const tipos = tiposPorNivel[nivelNormalizado] || tiposPorNivel.facil;

    let selectedFunc = tipos[0].func;
    const total = tipos.reduce((acc, t) => acc + t.peso, 0);
    let rand = Math.random() * total;

    for (const t of tipos) {
        rand -= t.peso;
        if (rand <= 0) {
            selectedFunc = t.func;
            break;
        }
    }

    // Anti-repeat
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
    generarRoutinesGrammar,
    resetearEjerciciosUsados
};
