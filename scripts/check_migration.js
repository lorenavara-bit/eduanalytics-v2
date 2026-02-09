
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

// Load env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, '../.env');

if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMigration() {
    console.log("Checking Supabase for Santillana content...");

    // Unique questions to look for (from santillana-4-primaria-INGLES.js)
    const targets = [
        "What is the Present Simple?",
        "Complete: I ____ (play) football every day",
        "A nurse works ____ (at/in) a hospital.",
        "A simple car is ____ (cheap) than a Ferrari."
    ];

    let foundCount = 0;

    for (const qText of targets) {
        // Try searching in question_bank_local
        const { data, error } = await supabase
            .from('question_bank_local')
            .select('*')
            .ilike('question_text', qText) // Case insensitive match
            .limit(1);

        if (error) {
            console.error(`Error searching for "${qText}":`, error.message);
        } else if (data && data.length > 0) {
            console.log(`✅ Found: "${qText}" in question_bank_local`);
            foundCount++;
        } else {
            // Also try 'questions' table if it exists
            const { data: data2 } = await supabase
                .from('questions') // Hypothetical alternative table
                .select('*')
                .ilike('question', qText)
                .limit(1);

            if (data2 && data2.length > 0) {
                console.log(`✅ Found: "${qText}" in questions table`);
                foundCount++;
            } else {
                console.log(`❌ NOT FOUND: "${qText}"`);
            }
        }
    }

    console.log(`\nSummary: Found ${foundCount} out of ${targets.length} sample questions.`);

    // Check total count of Santillana items if possible
    const { count, error: countError } = await supabase
        .from('question_bank_local')
        .select('*', { count: 'exact', head: true })
        .ilike('source', '%Santillana%');

    if (!countError) {
        console.log(`Total items with source 'Santillana' in question_bank_local: ${count}`);
    }
}

checkMigration();
