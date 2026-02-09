
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || fs.readFileSync('.env', 'utf8').match(/VITE_SUPABASE_URL=(.*)/)?.[1]?.trim();
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || fs.readFileSync('.env', 'utf8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)?.[1]?.trim();

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupInitialData() {
    console.log('🧠 Inyectando inteligencia inicial en Feedback Diamante...');

    // 1. Insertar Regla Gramatical Maestra
    const { error: ruleError } = await supabase
        .from('grammar_rules')
        .upsert([
            {
                id: 'RULES_ENG_G4_U1_3RD_PERSON_S',
                category: 'Present Simple',
                priority: 1,
                error_pattern: '\\b(he|she|it|my dad|my mom|the teacher)\\s+[a-z]+(?<!s)\\b', // Simplificado
                feedback_bronze: '¡Cuidado! Te falta la **-S-** mágica al final del verbo.',
                feedback_silver: 'Recuerda: en Presente Simple, cuando hablamos de **He, She o It**, añadimos **-s** al verbo. Ej: *She plays*.',
                feedback_gold: '¡Nivel Diamante! 💎 Has olvidado que la 3ª persona del singular es especial. El verbo necesita la **-s** (o **-es**) para sonar natural. Sin ella, el mensaje pierde claridad.'
            }
        ]);

    if (ruleError) console.error('❌ Error insertando regla:', ruleError.message);
    else console.log('✅ Regla "3rd Person -S-" inyectada.');

    // 2. Migrar un ejercicio de muestra (Unit 2: Daily Routines)
    // Buscamos uno real de Santillana
    const { data: legacyEx } = await supabase
        .from('question_bank_local')
        .select('*')
        .ilike('topic', '%Unit 2%')
        .limit(1)
        .single();

    if (legacyEx) {
        const { error: exError } = await supabase
            .from('exercises_santillana')
            .upsert([
                {
                    unit: 'Unit 2',
                    topic: 'Daily Routines',
                    exercise_type: 'fill_blank',
                    instruction: 'Complete the sentence with the correct form of the verb.',
                    sentence_context: 'She ___ (wake) up at 8:00.',
                    correct_answer: 'wakes',
                    accepted_variations: ['Wakes'],
                    linked_rules: ['RULES_ENG_G4_U1_3RD_PERSON_S'],
                    lomloe_criteria: ['CCL1', 'CP1'],
                    difficulty: 'medio'
                }
            ]);

        if (exError) console.error('❌ Error migrando ejercicio:', exError.message);
        else console.log('✅ Ejercicio de muestra migrado a exercises_santillana.');
    }
}

setupInitialData();
