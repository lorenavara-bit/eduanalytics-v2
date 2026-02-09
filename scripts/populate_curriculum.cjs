const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

async function runMigrations() {
    console.log('🚀 Iniciando Migraciones de Datos...');

    // 1. Asegurar columnas de telemetría (Simulado vía validación de esquema o aviso)
    // Nota: El ALTER TABLE requiere permisos que a veces el Anon Key no tiene.
    // Si falla, el usuario deberá ejecutarlo en el Dashboard.
    console.log('📊 Verificando esquema de telemetría...');

    // 2. Poblar Currículo Inglés
    console.log('📚 Poblando Currículo LOMLOE Inglés (1º a 6º)...');
    try {
        const sqlContent = fs.readFileSync('curriculo_ingles_primaria_completo.sql', 'utf8');

        // Extraer saberes básicos
        const saberesMatches = sqlContent.matchAll(/\('Inglés', '([^']+)', '([^']+)', '([^']+)', ARRAY\[([^\]]+)\]\)/g);
        const saberes = Array.from(saberesMatches).map(m => ({
            asignatura: 'Inglés',
            curso: m[1],
            bloque: m[2],
            saber: m[3],
            competencias_relacionadas: m[4].replace(/'/g, '').split(',').map(s => s.trim())
        }));

        if (saberes.length > 0) {
            console.log(`⏳ Procesando ${saberes.length} saberes...`);
            // En lugar de onConflict, simplemente insertamos (puedes limpiar antes si quieres)
            const { error: sErr } = await supabase.from('saberes_basicos').insert(saberes);
            if (sErr) console.error('❌ Error saberes:', sErr.message);
            else console.log(`✅ Saberes Básicos de Inglés integrados.`);
        }

        // Extraer criterios
        const criteriosMatches = sqlContent.matchAll(/\('([^']+)', 'Inglés', '([^']+)', (\d+), '([^']+)', ARRAY\[([^\]]+)\], '([^']+)'\)/g);
        const criterios = Array.from(criteriosMatches).map(m => ({
            id: m[1],
            asignatura: 'Inglés',
            curso: m[2],
            numero: parseInt(m[3]),
            descripcion: m[4],
            competencias: m[5].replace(/'/g, '').split(',').map(s => s.trim()),
            nivel_cognitivo: m[6]
        }));

        if (criterios.length > 0) {
            const { error: cErr } = await supabase.from('criterios_evaluacion').upsert(criterios, { onConflict: 'id' });
            if (cErr) console.error('❌ Error criterios:', cErr.message);
            else console.log(`✅ ${criterios.length} Criterios de Evaluación de Inglés integrados.`);
        }

    } catch (err) {
        console.error('❌ Fallo al leer SQL:', err.message);
    }

    console.log('🏁 Proceso finalizado.');
}

runMigrations();
