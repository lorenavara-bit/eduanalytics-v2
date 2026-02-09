-- ============================================================================
-- AÑADIR TABLAS DEL TUTOR IA AL SUPABASE VIEJO
-- ============================================================================
-- Ejecutar en: https://kbgkgoxwwlpszyfidufa.supabase.co
-- ============================================================================

-- Tabla de Sesiones del Tutor
CREATE TABLE IF NOT EXISTS tutor_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    title TEXT DEFAULT 'Nueva conversación',
    mode TEXT DEFAULT 'academic',
    subject TEXT,
    topic TEXT,
    is_active BOOLEAN DEFAULT true,
    message_count INTEGER DEFAULT 0,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Mensajes del Tutor
CREATE TABLE IF NOT EXISTS tutor_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES tutor_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    message_type TEXT DEFAULT 'text',
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para rendimiento
CREATE INDEX IF NOT EXISTS idx_tutor_sessions_student ON tutor_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_tutor_sessions_active ON tutor_sessions(is_active);
CREATE INDEX IF NOT EXISTS idx_tutor_messages_session ON tutor_messages(session_id);

-- Desactivar RLS para testing
ALTER TABLE tutor_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_messages DISABLE ROW LEVEL SECURITY;

-- Verificar
SELECT 'Tablas creadas correctamente' as status;
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename LIKE 'tutor_%';
