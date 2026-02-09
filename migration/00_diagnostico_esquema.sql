-- =====================================================
-- DIAGNÓSTICO COMPLETO: Analizar el esquema de la base de datos
-- Ejecuta esto PRIMERO para saber qué tienes
-- =====================================================

-- 1. ¿Qué tablas existen?
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- 2. ¿Qué columnas tiene la tabla 'profiles'?
SELECT 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- 3. ¿Qué columnas tiene la tabla 'students'?
SELECT 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'students'
ORDER BY ordinal_position;

-- 4. ¿Hay algún profile en la base de datos?
SELECT COUNT(*) as total_profiles FROM profiles;

-- 5. Mostrar los primeros profiles (con todas sus columnas)
SELECT * FROM profiles LIMIT 3;

-- 6. ¿Hay estudiantes?
SELECT COUNT(*) as total_students FROM students;

-- 7. ¿Existen las tablas del tutor?
SELECT table_name 
FROM information_schema.tables 
WHERE table_name IN ('tutor_sessions', 'tutor_messages', 'student_error_log', 'student_error_patterns');

-- 8. ¿Existe la tabla learning_profiles?
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'learning_profiles';

-- =====================================================
-- Copia los resultados de estos queries y compártelos
-- para crear un script 100% personalizado a tu esquema
-- =====================================================
