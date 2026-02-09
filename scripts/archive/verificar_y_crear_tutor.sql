-- =====================================================
-- PASO 1: Verificar si las tablas del tutor existen
-- =====================================================

SELECT 
    table_name,
    (SELECT count(*) FROM information_schema.columns WHERE table_name = t.table_name) as columnas
FROM information_schema.tables t
WHERE table_schema = 'public' 
AND table_name IN ('tutor_sessions', 'tutor_messages', 'student_error_log', 'student_error_patterns')
ORDER BY table_name;

-- ⚠️ Si NO aparece ninguna fila arriba, copia y pega TODO el código de abajo
-- ⚠️ Si SÍ aparecen las 4 tablas, entonces el problema es otro (dímelo)

-- =====================================================
-- PASO 2: Si no existen, crear las tablas
-- =====================================================

-- 1. Tabla de Sesiones del Tutor
CREATE TABLE IF NOT EXISTS tutor_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    title TEXT DEFAULT 'Nueva conversación',
    mode TEXT DEFAULT 'academic' CHECK (mode IN ('onboarding', 'academic', 'profile')),
    subject TEXT,
    topic TEXT,
    is_active BOOLEAN DEFAULT true,
    message_count INTEGER DEFAULT 0,
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de Mensajes del Tutor
CREATE TABLE IF NOT EXISTS tutor_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES tutor_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'game', 'file')),
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabla de Registro de Errores
CREATE TABLE IF NOT EXISTS student_error_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    session_id UUID REFERENCES tutor_sessions(id) ON DELETE SET NULL,
    subject TEXT NOT NULL,
    topic TEXT,
    question_text TEXT,
    student_answer TEXT,
    expected_answer TEXT,
    error_type TEXT,
    error_description TEXT,
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabla de Patrones de Error
CREATE TABLE IF NOT EXISTS student_error_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    error_type TEXT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT,
    frequency INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    first_occurrence TIMESTAMPTZ DEFAULT NOW(),
    last_occurrence TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, error_type, subject, topic)
);

-- =====================================================
-- ÍNDICES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_tutor_sessions_student ON tutor_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_tutor_sessions_active ON tutor_sessions(student_id, is_active);
CREATE INDEX IF NOT EXISTS idx_tutor_messages_session ON tutor_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_student_errors_student ON student_error_log(student_id);
CREATE INDEX IF NOT EXISTS idx_error_patterns_student ON student_error_patterns(student_id, is_active);

-- =====================================================
-- TRIGGERS
-- =====================================================

CREATE OR REPLACE FUNCTION update_session_on_message()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE tutor_sessions
    SET 
        last_message_at = NEW.created_at,
        message_count = message_count + 1,
        updated_at = NOW()
    WHERE id = NEW.session_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_session_on_message ON tutor_messages;
CREATE TRIGGER trigger_update_session_on_message
    AFTER INSERT ON tutor_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_session_on_message();

-- =====================================================
-- RLS (Políticas permisivas para desarrollo)
-- =====================================================

ALTER TABLE tutor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_error_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_error_patterns ENABLE ROW LEVEL SECURITY;

-- Limpiar políticas anteriores
DROP POLICY IF EXISTS "Allow all access to tutor_sessions" ON tutor_sessions;
DROP POLICY IF EXISTS "Allow all access to tutor_messages" ON tutor_messages;
DROP POLICY IF EXISTS "Allow all access to student_error_log" ON student_error_log;
DROP POLICY IF EXISTS "Allow all access to student_error_patterns" ON student_error_patterns;

-- Crear políticas permisivas
CREATE POLICY "Allow all access to tutor_sessions"
    ON tutor_sessions FOR ALL
    USING (true) WITH CHECK (true);

CREATE POLICY "Allow all access to tutor_messages"
    ON tutor_messages FOR ALL
    USING (true) WITH CHECK (true);

CREATE POLICY "Allow all access to student_error_log"
    ON student_error_log FOR ALL
    USING (true) WITH CHECK (true);

CREATE POLICY "Allow all access to student_error_patterns"
    ON student_error_patterns FOR ALL
    USING (true) WITH CHECK (true);

-- =====================================================
-- VERIFICACIÓN FINAL
-- =====================================================

SELECT 
    table_name,
    (SELECT count(*) FROM information_schema.columns WHERE table_name = t.table_name) as columnas
FROM information_schema.tables t
WHERE table_schema = 'public' 
AND table_name IN ('tutor_sessions', 'tutor_messages', 'student_error_log', 'student_error_patterns')
ORDER BY table_name;

-- ✅ Deberías ver 4 tablas con sus columnas
