-- =====================================================
-- SCRIPT RÁPIDO: Solo completar lo que falta
-- Ejecuta esto si ya ejecutaste el SQL completo pero dio error
-- =====================================================

-- Asegurar que las políticas RLS estén configuradas como permisivas
-- (Esto es seguro ejecutar múltiples veces)

-- Eliminar políticas antiguas restrictivas (si existen)
DROP POLICY IF EXISTS "Users can view their own tutor sessions" ON tutor_sessions;
DROP POLICY IF EXISTS "Users can create their own tutor sessions" ON tutor_sessions;
DROP POLICY IF EXISTS "Users can update their own tutor sessions" ON tutor_sessions;
DROP POLICY IF EXISTS "Users can view messages from their sessions" ON tutor_messages;
DROP POLICY IF EXISTS "Users can create messages in their sessions" ON tutor_messages;
DROP POLICY IF EXISTS "Users can view their own error logs" ON student_error_log;
DROP POLICY IF EXISTS "System can create error logs" ON student_error_log;
DROP POLICY IF EXISTS "Users can view their own error patterns" ON student_error_patterns;
DROP POLICY IF EXISTS "System can manage error patterns" ON student_error_patterns;

-- Crear políticas PERMISIVAS (permiten todo)
DROP POLICY IF EXISTS "Allow all access to tutor_sessions" ON tutor_sessions;
CREATE POLICY "Allow all access to tutor_sessions"
    ON tutor_sessions FOR ALL
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to tutor_messages" ON tutor_messages;
CREATE POLICY "Allow all access to tutor_messages"
    ON tutor_messages FOR ALL
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to student_error_log" ON student_error_log;
CREATE POLICY "Allow all access to student_error_log"
    ON student_error_log FOR ALL
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to student_error_patterns" ON student_error_patterns;
CREATE POLICY "Allow all access to student_error_patterns"
    ON student_error_patterns FOR ALL
    USING (true)
    WITH CHECK (true);

-- Verificar que todo está OK
SELECT 
    schemaname,
    tablename,
    policyname
FROM pg_policies 
WHERE tablename IN ('tutor_sessions', 'tutor_messages', 'student_error_log', 'student_error_patterns')
ORDER BY tablename, policyname;

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
