-- =====================================================
-- DIAGNÓSTICO DEFINITIVO: Verificar TODO para el Tutor IA
-- =====================================================

-- TEST 1: ¿Existe el estudiante de prueba?
SELECT 
    'TEST 1: Estudiante' as test,
    CASE 
        WHEN COUNT(*) > 0 THEN '✅ PASS - Estudiante existe'
        ELSE '❌ FAIL - Estudiante NO existe'
    END as result,
    COUNT(*) as count
FROM students 
WHERE id = '11111111-1111-1111-1111-111111111111';

-- TEST 2: Ver los datos completos del estudiante
SELECT 
    'TEST 2: Datos del Estudiante' as test,
    id,
    full_name,
    name,
    grade_level,
    parent_id
FROM students 
WHERE id = '11111111-1111-1111-1111-111111111111';

-- TEST 3: ¿Existen todas las tablas del tutor?
SELECT 
    'TEST 3: Tablas del Tutor' as test,
    STRING_AGG(table_name, ', ') as tables_found,
    COUNT(*) as count,
    CASE 
        WHEN COUNT(*) = 4 THEN '✅ PASS - Las 4 tablas existen'
        ELSE '❌ FAIL - Faltan tablas'
    END as result
FROM information_schema.tables 
WHERE table_name IN ('tutor_sessions', 'tutor_messages', 'student_error_log', 'student_error_patterns');

-- TEST 4: ¿Se puede crear una sesión de prueba?
DO $$
DECLARE
    v_session_id UUID;
BEGIN
    -- Intentar crear una sesión
    INSERT INTO tutor_sessions (student_id, title)
    VALUES ('11111111-1111-1111-1111-111111111111', 'TEST SESSION - DELETE ME')
    RETURNING id INTO v_session_id;
    
    RAISE NOTICE '✅ TEST 4 PASS: Sesión creada con ID: %', v_session_id;
    
    -- Limpiar la sesión de prueba
    DELETE FROM tutor_sessions WHERE id = v_session_id;
    RAISE NOTICE '✅ Sesión de prueba eliminada';
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ TEST 4 FAIL: No se pudo crear sesión. Error: %', SQLERRM;
END $$;

-- TEST 5: ¿Las políticas RLS permiten lectura?
SELECT 
    'TEST 5: RLS Policies' as test,
    tablename,
    policyname,
    CASE 
        WHEN policyname LIKE 'Allow all%' THEN '✅ Política permisiva'
        ELSE '⚠️ Política restrictiva'
    END as status
FROM pg_policies 
WHERE tablename IN ('tutor_sessions', 'tutor_messages')
ORDER BY tablename;

-- TEST 6: ¿Existe la tabla learning_profiles para el estudiante?
SELECT 
    'TEST 6: Learning Profile' as test,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM learning_profiles 
            WHERE student_id = '11111111-1111-1111-1111-111111111111'
        ) THEN '✅ PASS - Perfil existe'
        ELSE '⚠️ WARNING - No hay perfil (opcional)'
    END as result;

-- TEST 7: Resumen final de todos los tests
SELECT 
    '=== RESUMEN DIAGNÓSTICO ===' as titulo,
    '' as spacer;

-- =====================================================
-- RESULTADOS ESPERADOS:
-- - TEST 1: ✅ PASS
-- - TEST 2: Debe mostrar datos del estudiante
-- - TEST 3: ✅ PASS (4 tablas)
-- - TEST 4: ✅ PASS (en los NOTICES)
-- - TEST 5: Todas con política "Allow all"
-- - TEST 6: ✅ o ⚠️ (ambos ok)
-- =====================================================
