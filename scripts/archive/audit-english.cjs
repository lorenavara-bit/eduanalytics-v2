const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Leer credenciales de .env.local (más fiable en tu entorno)
let envFile;
try {
    envFile = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf-8');
} catch (e) {
    envFile = fs.readFileSync(path.join(__dirname, '.env'), 'utf-8');
}

const url = envFile.match(/VITE_SUPABASE_URL=([^\s]+)/)?.[1];
const key = envFile.match(/VITE_SUPABASE_ANON_KEY=([^\s]+)/)?.[1];

if (!url || !key) {
    console.error('❌ No se encontraron credenciales en .env o .env.local');
    process.exit(1);
}

const supabase = createClient(url, key);

async function audit() {
    console.log('🔍 AUDITANDO CONTENIDO DE INGLÉS (SANTILLANA GO FAR! 4)...');

    // Traer todos los campos relevantes para clasificación
    const { data, error } = await supabase
        .from('question_bank_local')
        .select('topic, question_text, metadata, source')
        .or('source.ilike.%Santillana%,topic.ilike.%Unit%');

    if (error) {
        console.error('❌ Error fetching data:', error);
        return;
    }

    const summary = {};

    data.forEach(q => {
        // Detectar Unidad
        const topic = q.topic || 'Unknown';
        const unitMatch = topic.match(/Unit (\d+)/i) || (q.metadata?.unit && q.metadata.unit.match(/U(\d+)/i));
        const unitKey = unitMatch ? `Unit ${unitMatch[1]}` : 'Other/Global';

        if (!summary[unitKey]) {
            summary[unitKey] = { total: 0, grammar: 0, order: 0, vocab: 0, topics: new Set() };
        }

        summary[unitKey].total++;
        summary[unitKey].topics.add(topic);

        // Lógica de clasificación idéntica a la del motor
        const text = (q.question_text || '').toLowerCase();
        const type = (q.metadata?.tipo || '').toLowerCase();

        if (text.includes('order') || text.includes('orden') || type.includes('order')) {
            summary[unitKey].order++;
        } else if (text.includes('vocab') || type.includes('vocab') || type.includes('translate') || topic.toLowerCase().includes('vocab')) {
            summary[unitKey].vocab++;
        } else {
            summary[unitKey].grammar++;
        }
    });

    console.log('\n🔍 MUESTRA DE DATOS (UNIT 2):');
    data.filter(q => (q.topic || '').includes('Unit 2')).slice(0, 5).forEach(q => {
        console.log(`- Text: "${q.question_text.substring(0, 50)}..." | Topic: "${q.topic}"`);
    });

    console.log('\n📊 RESUMEN POR UNIDAD (SANTILLANA):');
    console.log('--------------------------------------------------------------------------------');
    console.log(' UNIDAD            | TOTAL | GRAMÁTICA | WORD ORDER | VOCABULARIO ');
    console.log('--------------------------------------------------------------------------------');

    Object.entries(summary).sort().forEach(([unit, stats]) => {
        console.log(`${unit.padEnd(18)} | ${stats.total.toString().padEnd(5)} | ${stats.grammar.toString().padEnd(9)} | ${stats.order.toString().padEnd(10)} | ${stats.vocab}`);
    });

    console.log('--------------------------------------------------------------------------------');
    console.log('\n💡 NOTA: Mínimo recomendado para "Selección Quirúrgica" (20 qs): G:8, O:6, V:6');
}

audit();
