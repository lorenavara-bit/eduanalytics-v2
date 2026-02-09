/**
 * GENERADOR DE CONTENIDO UNIT 2 - DAILY ROUTINES
 * 
 * Este script inserta 30 preguntas de alta calidad para completar la Unit 2.
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const QUESTIONS = [
    // Grammar - Present Simple
    { question_text: "He ____ (wake up) at 7:30.", correct_answer: "wakes up", tipo: "Grammar", explicacion: "Remember: He/She/It + verb with -s." },
    { question_text: "They ____ (not/have) breakfast in the garden.", correct_answer: "do not have", tipo: "Grammar", explicacion: "With 'They', we use 'do not' for negative sentences." },
    { question_text: "Does she ____ (brush) her teeth after dinner?", correct_answer: "brush", tipo: "Grammar", explicacion: "In questions with 'Does', the main verb doesn't have an -s." },
    { question_text: "I ____ (get dressed) in my bedroom.", correct_answer: "get dressed", tipo: "Grammar", explicacion: "With 'I', the verb stays in its base form." },
    { question_text: "My brother ____ (go) to bed at 9 o'clock.", correct_answer: "goes", tipo: "Grammar", explicacion: "Verbs ending in -o add -es for He/She/It." },
    { question_text: "We ____ (clean) the house on Saturdays.", correct_answer: "clean", tipo: "Grammar", explicacion: "With 'We', we use the base form of the verb." },
    { question_text: "It ____ (start) raining in the morning.", correct_answer: "starts", tipo: "Grammar", explicacion: "With 'It', add -s to the verb." },
    { question_text: "Do you ____ (like) doing homework?", correct_answer: "like", tipo: "Grammar", explicacion: "In questions with 'Do', the verb stays the same." },
    { question_text: "She ____ (not/wash) her face in the kitchen.", correct_answer: "does not wash", tipo: "Grammar", explicacion: "Use 'does not' for negative sentences with She." },
    { question_text: "They ____ (play) football after school.", correct_answer: "play", tipo: "Grammar", explicacion: "Base form for 'They'." },

    // Vocabulary - Daily Activities
    { question_text: "Translate: Me lavo los dientes", correct_answer: "brush my teeth", tipo: "Vocabulary", explicacion: "We use 'brush' for teeth and hair." },
    { question_text: "Translate: Desayuno a las ocho.", correct_answer: "I have breakfast at eight", tipo: "Vocabulary", explicacion: "Meals use the verb 'have'." },
    { question_text: "Phrase: Hacer los deberes", correct_answer: "do homework", tipo: "Vocabulary", explicacion: "Homework always uses the verb 'do'." },
    { question_text: "Translate: Me pongo el pijama", correct_answer: "I put on my pyjamas", tipo: "Vocabulary", explicacion: "The expression is 'put on'." },
    { question_text: "Phrase: Ir al colegio", correct_answer: "go to school", tipo: "Vocabulary", explicacion: "Movement towards a place uses 'go to'." },
    { question_text: "Translate: Cenar", correct_answer: "have dinner", tipo: "Vocabulary", explicacion: "In English we 'have dinner', not 'eat dinner' usually." },
    { question_text: "Phrase: Salir del colegio", correct_answer: "leave school", tipo: "Vocabulary", explicacion: "To go out of school is to 'leave'." },
    { question_text: "Translate: Ducharse", correct_answer: "have a shower", tipo: "Vocabulary", explicacion: "A common expression is 'have a shower'." },
    { question_text: "Phrase: Peinarse", correct_answer: "comb my hair", tipo: "Vocabulary", explicacion: "To fix your hair is 'comb' or 'brush'." },
    { question_text: "Translate: Despertarse", correct_answer: "wake up", tipo: "Vocabulary", explicacion: "To stop sleeping is 'wake up'." },

    // Word Order
    { question_text: "always / she / her / homework / does", correct_answer: "She always does her homework", tipo: "Word Order", explicacion: "Adverbs of frequency go before the verb." },
    { question_text: "I / never / breakfast / at / school / have", correct_answer: "I never have breakfast at school", tipo: "Word Order", explicacion: "Subject + Adverb + Verb." },
    { question_text: "time / you / what / wake / do / up ?", correct_answer: "What time do you wake up?", tipo: "Word Order", explicacion: "Question structure: Wh-word + do + subject + verb." },
    { question_text: "he / usually / at / goes / bed / to / 10:00", correct_answer: "He usually goes to bed at 10:00", tipo: "Word Order", explicacion: "Check the position of usually." },
    { question_text: "brush / I / my / teeth / morning / the / in", correct_answer: "I brush my teeth in the morning", tipo: "Word Order", explicacion: "Place the time expression at the end." },
    { question_text: "you / do / breakfast / have / garden / the / in ?", correct_answer: "Do you have breakfast in the garden?", tipo: "Word Order", explicacion: "Do + subject + verb + rest." },
    { question_text: "sometimes / we / football / play / school / after", correct_answer: "We sometimes play football after school", tipo: "Word Order", explicacion: "Adverb before the verb." },
    { question_text: "my / clothes / I / in / put / closet / the", correct_answer: "I put my clothes in the closet", tipo: "Word Order", explicacion: "Verb + object." },
    { question_text: "lunch / has / school / at / she", correct_answer: "She has lunch at school", tipo: "Word Order", explicacion: "Subject + verb + object." },
    { question_text: "don't / I / watch / TV / morning / the / in", correct_answer: "I don't watch TV in the morning", tipo: "Word Order", explicacion: "Negative structure." }
];

async function run() {
    console.log(`📤 Insertando ${QUESTIONS.length} preguntas de alta fidelidad para Unit 2...`);

    const records = QUESTIONS.map(q => ({
        source: 'Santillana Gold VIP',
        topic: 'Unit 2: Daily Routines',
        question_text: q.question_text,
        correct_answer: q.correct_answer,
        metadata: {
            unit: 'U2',
            tipo: q.tipo,
            explicacionDiamante: q.explicacion,
            success_pattern_id: `RULES_ENG_G4_U2_${q.tipo.toUpperCase()}`,
            quality: 'VIP'
        }
    }));

    const { data, error } = await supabase
        .from('question_bank_local')
        .insert(records);

    if (error) {
        console.error('❌ Error:', error);
    } else {
        console.log('✅ ¡Unidad 2 Reforzada con éxito! Ahora tienes 30 preguntas premium adicionales.');
    }
}

run();
