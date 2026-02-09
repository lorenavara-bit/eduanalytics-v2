const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

let envFile;
try {
    envFile = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf-8');
} catch (e) {
    envFile = fs.readFileSync(path.join(__dirname, '.env'), 'utf-8');
}

const url = envFile.match(/VITE_SUPABASE_URL=([^\s]+)/)?.[1];
const key = envFile.match(/VITE_SUPABASE_ANON_KEY=([^\s]+)/)?.[1];

if (!url || !key) {
    console.error('❌ Credentials missing');
    process.exit(1);
}

const supabase = createClient(url, key);

async function cleanNuclar() {
    console.log('🚀 INICIANDO LIMPIEZA NUCLEAR DE DUPLICADOS...');

    // 1. Obtener todos los registros de Santillana
    const { data, error } = await supabase
        .from('question_bank_local')
        .select('id, question_text, topic')
        .or('source.ilike.%Santillana%,topic.ilike.%Unit%');

    if (error) {
        console.error('❌ Error al leer datos:', error);
        return;
    }

    console.log(`📊 Registros totales encontrados: ${data.length}`);

    const seen = new Set();
    const toDelete = [];

    data.forEach(q => {
        // Normalizamos el texto para comparar (sin espacios extra, minúsculas)
        const normalizedText = q.question_text.trim().toLowerCase();
        // Usamos combo de Texto + Tema para ser precisos
        const signature = `${normalizedText} ||| ${q.topic}`;

        if (seen.has(signature)) {
            toDelete.push(q.id);
        } else {
            seen.add(signature);
        }
    });

    console.log(`🧹 Duplicados detectados: ${toDelete.length}`);

    if (toDelete.length > 0) {
        // Borramos en bloques de 50 para no saturar Supabase
        const chunkSize = 50;
        for (let i = 0; i < toDelete.length; i += chunkSize) {
            const chunk = toDelete.slice(i, i + chunkSize);
            const { error: delError } = await supabase
                .from('question_bank_local')
                .delete()
                .in('id', chunk);

            if (delError) {
                console.error(`❌ Error borrando bloque ${i}:`, delError);
            } else {
                console.log(`✅ Bloque ${i / chunkSize + 1} borrado (${chunk.length} filas).`);
            }
        }
    }

    console.log('✨ LIMPIEZA COMPLETADA. Registros únicos restantes:', seen.size);

    // 2. Informe rápido por unidad
    console.log('\n📊 ESTADO ACTUAL DE LA BASE DE DATOS (ÚNICOS):');
    const unitCounts = {};
    seen.forEach(sig => {
        const topic = sig.split(' ||| ')[1];
        const unit = topic.match(/Unit \d+/i)?.[0] || 'Otras';
        unitCounts[unit] = (unitCounts[unit] || 0) + 1;
    });

    Object.entries(unitCounts).forEach(([unit, count]) => {
        console.log(`- ${unit}: ${count} ejercicios únicos`);
    });
}

cleanNuclar();
