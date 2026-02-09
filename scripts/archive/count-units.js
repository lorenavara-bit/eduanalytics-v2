
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

let url = supabaseUrl;
let key = supabaseAnonKey;

if (!url || !key) {
    const envFile = fs.readFileSync('.env', 'utf8');
    url = envFile.match(/VITE_SUPABASE_URL=(.*)/)?.[1]?.trim();
    key = envFile.match(/VITE_SUPABASE_ANON_KEY=(.*)/)?.[1]?.trim();
}

const supabase = createClient(url, key);

async function countUnits() {
    const { data, error } = await supabase
        .from('question_bank_local')
        .select('topic')
        .or('topic.ilike.%Unit%, topic.ilike.%Vocabulary%, topic.ilike.%Grammar%');

    if (error) {
        console.error('❌ Error:', error.message);
        return;
    }

    const counts = {};
    data.forEach(q => {
        const topic = q.topic || 'Sin tema';
        counts[topic] = (counts[topic] || 0) + 1;
    });

    console.log('\n📊 TEMAS DE INGLÉS (UNITS/VOCAB/GRAMMAR) EN SUPABASE:');
    const sorted = Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
    sorted.forEach(([topic, count]) => {
        console.log(`${topic.padEnd(45)} | ${count} ejercicios`);
    });
}

countUnits();
