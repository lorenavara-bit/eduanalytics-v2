/**
 * AI SANTILLANA GENERATOR (Step 3)
 * 
 * Este script utiliza IA (SambaNova/Llama) para generar contenido pedagógico
 * compatible con Santillana Go Far! 4 y lo sube directamente a Supabase.
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const aiKey = process.env.VITE_SAMBANOVA_API_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Faltan credenciales de Supabase en .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Configuración de la Unidad a generar
const TARGET_UNIT = 'Unit 2';
const TARGET_TOPIC = 'Daily Routines';
const GRADE = '4º Primaria';

/**
 * Prompt Maestro para generación de calidad
 */
const SYSTEM_PROMPT = `You are a Senior English Content Creator for Primary School (CEFR A1).
Your task is to generate high-quality exercises for the book "Santillana Go Far! 4".
Unit: ${TARGET_UNIT} - Subject: ${TARGET_TOPIC}.

You must return a JSON array of objects with this EXACT structure:
[
  {
    "question_text": "Texto de la pregunta. Para huecos usa ___. Para Word Order usa barras: Word / Order / ...",
    "correct_answer": "La respuesta exacta",
    "tipo": "Grammar" | "Vocabulary" | "Word Order",
    "explicacion": "Breve explicación pedagógica del error común."
  }
]

Quality Rules:
1. Grammar: Focus on Present Simple (he/she -s) and Adverbs of Frequency (always, sometimes, never).
2. Vocabulary: Daily activities (wake up, brush teeth, have breakfast, do homework, etc.).
3. Variety: Mix affirmative, negative, and questions.
4. Language: Natural English for 9-10 year olds.
`;

async function generateWithAI(count = 10) {
    if (!aiKey) {
        console.warn('⚠️ No se ha encontrado VITE_SAMBANOVA_API_KEY. Usando modo simulación para demostración.');
        return generateMockData(count);
    }

    console.log(`🤖 Generando ${count} preguntas con AI para ${TARGET_UNIT}...`);

    try {
        const response = await fetch('https://fast-api.snova.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${aiKey}`
            },
            body: JSON.stringify({
                model: "Meta-Llama-3.1-70B-Instruct",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: `Generate ${count} diverse and unique exercises. Output ONLY the JSON array.` }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        const content = data.choices[0].message.content.trim();
        // Limpiamos posibles backticks de markdown
        const jsonStr = content.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('❌ Error llamando a la AI:', error.message);
        return [];
    }
}

/**
 * Generador Offline (Por si no hay API Key)
 */
function generateMockData(count) {
    const pool = [
        { question_text: "I ____ (wake up) at seven o'clock.", correct_answer: "wake up", tipo: "Grammar", explicacion: "With 'I', we don't add -s to the verb." },
        { question_text: "She ____ (brush) her teeth after breakfast.", correct_answer: "brushes", tipo: "Grammar", explicacion: "With 'She/He', we add -es to verbs ending in -sh." },
        { question_text: "Translate: Desayunar", correct_answer: "have breakfast", tipo: "Vocabulary", explicacion: "In English, we use the verb 'have' for meals." },
        { question_text: "Order: always / I / my / do / homework", correct_answer: "I always do my homework", tipo: "Word Order", explicacion: "Frequency adverbs usually go before the main verb." },
        { question_text: "He ____ (not/watch) TV in the morning.", correct_answer: "does not watch", tipo: "Grammar", explicacion: "We use 'does not' for negatives with He/She." },
        { question_text: "Order: dinner / she / has / 8:00 / at", correct_answer: "She has dinner at 8:00", tipo: "Word Order", explicacion: "Place the subject first, then the verb." },
        { question_text: "Phrase: Ponerme el pijama", correct_answer: "put on my pyjamas", tipo: "Vocabulary", explicacion: "The phrasal verb 'put on' means to wear clothes." },
        { question_text: "Do you ____ (walk) to school?", correct_answer: "walk", tipo: "Grammar", explicacion: "In questions with 'Do', the verb stays in base form." },
        { question_text: "I sometimes ____ (wash) the dishes.", correct_answer: "wash", tipo: "Vocabulary", explicacion: "To clean plates is to 'wash the dishes'." },
        { question_text: "Order: get / what / do / you / time / up ?", correct_answer: "What time do you get up?", tipo: "Word Order", explicacion: "Question structure: Wh-word + do + subject + verb." }
    ];
    return pool.slice(0, count);
}

async function uploadToSupabase(questions) {
    console.log(`📤 Subiendo ${questions.length} preguntas a la base de datos...`);

    const records = questions.map(q => ({
        source: 'Santillana AI-Gen',
        topic: `${TARGET_UNIT}: ${TARGET_TOPIC}`,
        question_text: q.question_text,
        correct_answer: q.correct_answer,
        metadata: {
            unit: `U${TARGET_UNIT.match(/\d+/)[0]}`,
            tipo: q.tipo,
            explicacionDiamante: q.explicacion,
            success_pattern_id: `RULES_ENG_G4_U2_${q.tipo.toUpperCase()}`,
            generated_at: new Date().toISOString()
        }
    }));

    const { data, error } = await supabase
        .from('question_bank_local')
        .insert(records);

    if (error) {
        console.error('❌ Error subiendo a Supabase:', error);
    } else {
        console.log('✅ ¡Éxito! Base de datos actualizada.');
    }
}

async function main() {
    console.log('🚀 INICIANDO GENERADOR DE CONTENIDO INTELIGENTE');
    const questions = await generateWithAI(15);

    if (questions.length > 0) {
        await uploadToSupabase(questions);
    } else {
        console.log('❌ No se generaron preguntas.');
    }
}

main();
