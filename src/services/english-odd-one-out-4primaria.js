import vocabularyData from '../data/english-4primaria.json';
import { generarIdentificadorUnico, seleccionarElementoAleatorio, mezcladorDeArray } from './english-utils.js';

// ==========================================
// ODD ONE OUT CHALLENGE GENERATOR
// ==========================================

// Map keys to readable names
const CATEGORY_NAMES = {
    'sports': 'Sports',
    'animals': 'Animals',
    'food': 'Food',
    'clothes': 'Clothes',
    'school_objects': 'School Objects',
    'house': 'House',
    'city': 'City / Places',
    'professions': 'Jobs / Professions',
    'family': 'Family',
    'body': 'Body Parts',
    'verbs': 'Verbs',
    'adjectives': 'Adjectives',
    'daily_routines': 'Daily Routines',
    'irregular_verbs': 'Verbs'
};

const VOCABULARY = vocabularyData.vocabulary;
const CATEGORIES = Object.keys(VOCABULARY).filter(cat => VOCABULARY[cat].length >= 4); // Need at least 4 items to be a target category if we wanted 4 items, but here we need 3.

let ejerciciosUsados = [];

export const resetearEjerciciosUsados = () => {
    ejerciciosUsados = [];
    console.log("🔄 Historial de ODD ONE OUT reseteado.");
};

export const generarOddOneOut = (nivel = 'medio') => {
    // 1. Select Target Category (must have at least 3 items)
    // Filter categories that have enough items
    const validCategories = CATEGORIES.filter(c => VOCABULARY[c].length >= 3);
    const targetCatKey = seleccionarElementoAleatorio(validCategories, []);

    // 2. Select Intruder Category (different from target)
    const otherCategories = validCategories.filter(c => c !== targetCatKey);
    const intruderCatKey = seleccionarElementoAleatorio(otherCategories, []);

    // 3. Get words
    const targetWords = [...VOCABULARY[targetCatKey]]; // Clone
    const intruderWords = [...VOCABULARY[intruderCatKey]]; // Clone

    // Shuffle and pick 3 target words
    const targets = mezcladorDeArray(targetWords).slice(0, 3);

    // Pick 1 intruder word
    const intruder = mezcladorDeArray(intruderWords)[0];

    // 4. Construct Options
    // Since this is a specialized logic, we need to adapt it to the multiple_choice structure.
    // The "options" usually have text and check for correctness.

    const optionsData = [
        ...targets.map(w => ({ text: w.english, correct: false, category: targetCatKey, meaning: w.spanish })),
        { text: intruder.english, correct: true, category: intruderCatKey, meaning: intruder.spanish }
    ];

    const shuffledOptions = mezcladorDeArray(optionsData);

    const targetCatName = CATEGORY_NAMES[targetCatKey] || targetCatKey;
    const intruderCatName = CATEGORY_NAMES[intruderCatKey] || intruderCatKey;

    const uniqueId = generarIdentificadorUnico();

    return {
        id: uniqueId,
        tipo: 'grammar',
        subtipo: 'odd_one_out',
        question_type: 'multiple_choice',
        pregunta: `Find the ODD ONE OUT (encuentra el intruso):`,
        opciones: shuffledOptions.map(o => o.text),
        correcta: intruder.english,
        explicacion: `**${intruder.english}** (${intruder.spanish}) is the odd one out because it is a **${intruderCatName}** word.\n\nThe others are **${targetCatName}**: ${targets.map(t => `${t.english} (${t.spanish})`).join(', ')}.`,
        dificultad: nivel,
        gramatica: 'odd_one_out',
        feedback_card: {
            title: "Vocabulary Tip",
            content: `Group words by category to remember them better! \nTarget Group: **${targetCatName}**.`
        }
    };
};
