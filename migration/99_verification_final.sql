-- =====================================================
-- VERIFICACIÓN Y PRUEBA FINAL
-- =====================================================

-- 1. Ver todas las tablas que existen ahora
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 2. Ver el estudiante de prueba que creamos
SELECT 
    id,
    full_name,
    name,
    grade_level,
    parent_id
FROM students 
WHERE id = '11111111-1111-1111-1111-111111111111';

-- 3. Ver las tablas del tutor (si existen)
SELECT 
    t.table_name,
    (SELECT count(*) FROM information_schema.columns WHERE table_name = t.table_name) as columns
FROM information_schema.tables t
WHERE table_name IN ('tutor_sessions', 'tutor_messages', 'student_error_log', 'student_error_patterns')
ORDER BY table_name;

-- 4. Si las tablas del tutor NO existen, ejecuta esto:
-- Si YA existen, salta al paso 5

/*
CREATE TABLE IF NOT EXISTS tutor_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    title TEXT DEFAULT 'Nueva conversación',
    mode TEXT DEFAULT 'academic',
    subject TEXT,
    topic TEXT,
    is_active BOOLEAN DEFAULT true,
    message_count INTEGER DEFAULT 0,
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tutor_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES tutor_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    message_type TEXT DEFAULT 'text',
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE tutor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_messages ENABLE ROW LEVEL SECURITY;

-- Políticas permisivas
DROP POLICY IF EXISTS "Allow all" ON tutor_sessions;
CREATE POLICY "Allow all" ON tutor_sessions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all" ON tutor_messages;
CREATE POLICY "Allow all" ON tutor_messages FOR ALL USING (true) WITH CHECK (true);
*/

-- 5. RESUMEN FINAL
SELECT 
    '✅ Tabla students existe' as status 
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'students')
UNION ALL
SELECT 
    '✅ Estudiante de prueba existe' as status
WHERE EXISTS (SELECT 1 FROM students WHERE id = '11111111-1111-1111-1111-111111111111')
UNION ALL
SELECT 
    '✅ Tablas del tutor existen' as status
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tutor_sessions');

-- =====================================================
-- Si ves los 3 checkmarks verdes, todo está listo!
-- Accede a: http://localhost:5173/tutor/11111111-1111-1111-1111-111111111111
-- =====================================================
