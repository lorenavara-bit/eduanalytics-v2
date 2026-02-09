const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf-8');
const urlMatch = envFile.match(/VITE_SUPABASE_URL=([^\s]+)/);
const keyMatch = envFile.match(/VITE_SUPABASE_ANON_KEY=([^\s]+)/);

const supabase = createClient(urlMatch[1], keyMatch[1]);

async function run() {
    const { data, error } = await supabase
        .from('resultados_evaluacion')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Columns:', Object.keys(data[0] || {}));
    }
}

run();
