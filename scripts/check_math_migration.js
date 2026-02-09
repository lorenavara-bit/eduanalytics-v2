
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

async function checkMathMigration() {
    console.log("Checking Supabase for Santillana MATH content...");

    // Generic check for source 'Santillana'
    const { count, error } = await supabase
        .from('question_bank_local')
        .select('*', { count: 'exact', head: true })
        .ilike('source', '%Santillana%');

    if (error) {
        console.error("Error checking count:", error);
    } else {
        console.log(`Total questions with source 'Santillana': ${count}`);
    }

    // Check specific Math topic if known, or just look for "Mates" related concepts
    const { data, error: searchError } = await supabase
        .from('question_bank_local')
        .select('question_text, topic')
        .ilike('subject', '%Matemáticas%')
        .ilike('source', '%Santillana%')
        .limit(5);

    if (searchError) {
        console.error("Error searching math:", searchError);
    } else if (data && data.length > 0) {
        console.log("✅ Found Santillana Math questions:");
        data.forEach(q => console.log(`- [${q.topic}] ${q.question_text}`));
    } else {
        console.log("❌ No Santillana Math questions found.");
    }
}

checkMathMigration();
