const { createClient } = require('@supabase/supabase-client');
const fs = require('fs');
const path = require('path');

// Mocking some env vars if possible or reading from file
const envFile = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf-8');
const urlMatch = envFile.match(/VITE_SUPABASE_URL=([^\s]+)/);
const keyMatch = envFile.match(/VITE_SUPABASE_ANON_KEY=([^\s]+)/);

if (!urlMatch || !keyMatch) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(urlMatch[1], keyMatch[1]);

async function run() {
    console.log('--- FETCHING ENGLISH QUESTIONS ---');
    const { data, error } = await supabase
        .from('question_bank_local')
        .select('*')
        .or('source.ilike.%Santillana%,topic.ilike.%Order%')
        .limit(10);

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    data.forEach((q, i) => {
        console.log(`Q${i + 1}:`);
        console.log(`  Topic: ${q.topic}`);
        console.log(`  Text: ${q.question_text}`);
        console.log(`  Answer: ${q.correct_answer}`);
        console.log(`  Metadata: ${JSON.stringify(q.metadata)}`);
        console.log('---');
    });
}

run();
