const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

async function deepClean() {
    console.log('🧹 Iniciando Operación "Tabla Rasa"...');

    // 1. BACKUP
    console.log('💾 Creando backup de seguridad...');
    const { data: backupData } = await supabase
        .from('question_bank_local')
        .select('*')
        .eq('subject', 'Inglés');

    if (backupData) {
        fs.writeFileSync('BACKUP_INGLES_OLD.json', JSON.stringify(backupData, null, 2));
        console.log(`✅ Backup guardado: ${backupData.length} ejercicios en BACKUP_INGLES_OLD.json`);
    }

    // 2. LIMPIEZA BANCO DE PREGUNTAS
    console.log('🗑️  Borrando ejercicios de Inglés antiguos...');
    const { error: err1 } = await supabase
        .from('question_bank_local')
        .delete()
        .eq('subject', 'Inglés');
    if (err1) console.error('❌ Error borrando banco:', err1.message);
    else console.log('✅ Banco de preguntas de Inglés vaciado.');

    // 3. LIMPIEZA CACHÉ (Evita que resurjan errores fantasma)
    console.log('⚡ Vaciando caché de ejercicios...');
    const { error: err2 } = await supabase
        .from('exercise_cache')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Truco para borrar todo
    if (err2) console.error('❌ Error vaciando caché:', err2.message);
    else console.log('✅ Caché de ejercicios eliminada.');

    // 4. LIMPIEZA LOG DE ERRORES (Flashcards nuevas)
    console.log('📇 Reseteando log de errores para nuevas Flashcards...');
    // Nota: Como el log no siempre tiene 'subject', borramos todo para asegurar pureza en 4º
    const { error: err3 } = await supabase
        .from('student_error_log')
        .delete()
        .neq('id', 0);
    if (err3) console.error('❌ Error reseteando errores:', err3.message);
    else console.log('✅ Log de errores reseteado.');

    console.log('🏁 Limpieza de Base de Datos FINALIZADA.');
}

deepClean();
