-- ============================================================================
-- SCRIPT COMPLETO PARA NUEVO PROYECTO SUPABASE - EDUANALYTICS V2
-- ============================================================================
-- Ejecutar TODO este script en el SQL Editor del proyecto NUEVO
-- Orden: Tablas base → Tablas LOMLOE → Tablas Tutor IA → Índices → RLS
-- ============================================================================

-- ============================================================================
-- PARTE 1: TABLAS BASE (Estudiantes, Perfiles, etc.)
-- ============================================================================

-- Tabla de Estudiantes
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    grade_level TEXT,
    birth_date DATE,
    autonomous_community TEXT,
    interests TEXT,
    onboarding_completed BOOLEAN DEFAULT false,
    nee_screening_declined BOOLEAN DEFAULT false,
    nee_monitoring_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Perfiles de Aprendizaje
CREATE TABLE IF NOT EXISTS learning_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID UNIQUE REFERENCES students(id) ON DELETE CASCADE,
    vark_dominant TEXT,
    vark_scores JSONB,
    vark_confidence DECIMAL(3,2) DEFAULT 0.00,
    mi_scores JSONB,
    mi_completion_percentage INTEGER DEFAULT 0,
    chaea_scores JSONB,
    chaea_completion_percentage INTEGER DEFAULT 0,
    profile_completion_percentage INTEGER DEFAULT 0,
    ai_summary TEXT,
    last_profile_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Asignaturas del Usuario
CREATE TABLE IF NOT EXISTS user_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    textbook_info TEXT,
    teacher_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Biblioteca de Recursos (Mochila)
CREATE TABLE IF NOT EXISTS resource_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    resource_type TEXT,
    subject TEXT,
    topic TEXT,
    difficulty_level TEXT,
    content JSONB,
    metadata JSONB,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Detección NEE (Screening)
CREATE TABLE IF NOT EXISTS nee_screenings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    screening_type TEXT NOT NULL,
    responses JSONB,
    score INTEGER,
    risk_level TEXT,
    recommendations TEXT,
    detection_mode TEXT DEFAULT 'manual',
    confidence_level DECIMAL(3,2),
    behavior_observations JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Hojas de Ruta de Exámenes
CREATE TABLE IF NOT EXISTS exam_roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    exam_date DATE NOT NULL,
    topics TEXT[],
    daily_plan JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- PARTE 2: TABLAS LOMLOE (Currículo Oficial)
-- ============================================================================

-- Tabla de Competencias Clave
CREATE TABLE IF NOT EXISTS competencias_clave (
    id TEXT PRIMARY KEY,
    nombre TEXT,
    descripcion TEXT
);

-- Tabla de Saberes Básicos
CREATE TABLE IF NOT EXISTS saberes_basicos (
    id BIGSERIAL PRIMARY KEY,
    asignatura TEXT,
    curso TEXT,
    bloque TEXT,
    saber TEXT,
    competencia_id TEXT REFERENCES competencias_clave(id)
);

-- Tabla de Criterios de Evaluación
CREATE TABLE IF NOT EXISTS criterios_evaluacion (
    id TEXT PRIMARY KEY,
    asignatura TEXT,
    curso TEXT,
    descripcion TEXT,
    competencias TEXT[]
);

-- ============================================================================
-- PARTE 3: TABLAS DEL TUTOR IA
-- ============================================================================

-- Tabla de Sesiones del Tutor
CREATE TABLE IF NOT EXISTS tutor_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    title TEXT,
    mode TEXT NOT NULL DEFAULT 'academic',
    subject TEXT,
    topic TEXT,
    is_active BOOLEAN DEFAULT true,
    message_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Mensajes del Tutor
CREATE TABLE IF NOT EXISTS tutor_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES tutor_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    message_type TEXT DEFAULT 'text',
    metadata JSONB,
    is_profile_question BOOLEAN DEFAULT false,
    profile_question_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Registro de Errores del Estudiante
CREATE TABLE IF NOT EXISTS student_error_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    session_id UUID REFERENCES tutor_sessions(id) ON DELETE SET NULL,
    subject TEXT,
    topic TEXT,
    question_text TEXT NOT NULL,
    student_answer TEXT NOT NULL,
    expected_answer TEXT,
    error_type TEXT NOT NULL,
    error_description TEXT,
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Patrones de Error
CREATE TABLE IF NOT EXISTS student_error_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    error_type TEXT NOT NULL,
    subject TEXT,
    topic TEXT,
    frequency INTEGER DEFAULT 1,
    last_occurrence TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    first_detected TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    resolved_at TIMESTAMP WITH TIME ZONE,
    adaptations_applied JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, error_type, subject, topic)
);

-- Tabla de Respuestas de Perfilado
CREATE TABLE IF NOT EXISTS profile_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    test_type TEXT NOT NULL,
    question_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    answer TEXT NOT NULL,
    acquisition_mode TEXT DEFAULT 'passive',
    session_id UUID REFERENCES tutor_sessions(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, test_type, question_id)
);

-- Tabla de Estado del Onboarding
CREATE TABLE IF NOT EXISTS onboarding_state (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL UNIQUE REFERENCES students(id) ON DELETE CASCADE,
    current_step TEXT DEFAULT 'basic_info',
    vark_answers_count INTEGER DEFAULT 0,
    temp_name TEXT,
    temp_grade_level TEXT,
    temp_vark_answers JSONB,
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- PARTE 4: ÍNDICES PARA PERFORMANCE
-- ============================================================================

-- Índices para students
CREATE INDEX IF NOT EXISTS idx_students_parent ON students(parent_id);
CREATE INDEX IF NOT EXISTS idx_students_onboarding ON students(onboarding_completed) WHERE onboarding_completed = false;

-- Índices para learning_profiles
CREATE INDEX IF NOT EXISTS idx_learning_profiles_student ON learning_profiles(student_id);
CREATE INDEX IF NOT EXISTS idx_profiles_incomplete ON learning_profiles(profile_completion_percentage) WHERE profile_completion_percentage < 100;

-- Índices para tutor_sessions
CREATE INDEX IF NOT EXISTS idx_tutor_sessions_student ON tutor_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_tutor_sessions_active ON tutor_sessions(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_tutor_sessions_last_message ON tutor_sessions(last_message_at DESC);

-- Índices para tutor_messages
CREATE INDEX IF NOT EXISTS idx_tutor_messages_session ON tutor_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_tutor_messages_created ON tutor_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tutor_messages_profile ON tutor_messages(is_profile_question) WHERE is_profile_question = true;

-- Índices para student_error_log
CREATE INDEX IF NOT EXISTS idx_error_log_student ON student_error_log(student_id);
CREATE INDEX IF NOT EXISTS idx_error_log_created ON student_error_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_error_log_type ON student_error_log(error_type);
CREATE INDEX IF NOT EXISTS idx_error_log_subject_topic ON student_error_log(subject, topic);

-- Índices para student_error_patterns
CREATE INDEX IF NOT EXISTS idx_error_patterns_student ON student_error_patterns(student_id);
CREATE INDEX IF NOT EXISTS idx_error_patterns_active ON student_error_patterns(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_error_patterns_frequency ON student_error_patterns(frequency DESC);

-- Índices para profile_answers
CREATE INDEX IF NOT EXISTS idx_profile_answers_student ON profile_answers(student_id);
CREATE INDEX IF NOT EXISTS idx_profile_answers_test_type ON profile_answers(test_type);
CREATE INDEX IF NOT EXISTS idx_profile_answers_mode ON profile_answers(acquisition_mode);

-- Índices para onboarding_state
CREATE INDEX IF NOT EXISTS idx_onboarding_student ON onboarding_state(student_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_completed ON onboarding_state(is_completed) WHERE is_completed = false;

-- Índices GIN para JSONB
CREATE INDEX IF NOT EXISTS idx_messages_metadata_gin ON tutor_messages USING GIN (metadata);
CREATE INDEX IF NOT EXISTS idx_learning_profiles_mi_gin ON learning_profiles USING GIN (mi_scores);
CREATE INDEX IF NOT EXISTS idx_learning_profiles_chaea_gin ON learning_profiles USING GIN (chaea_scores);

-- ============================================================================
-- PARTE 5: TRIGGERS AUTOMÁTICOS
-- ============================================================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para students
CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON students
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger para learning_profiles
CREATE TRIGGER update_learning_profiles_updated_at
BEFORE UPDATE ON learning_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger para tutor_sessions
CREATE TRIGGER update_tutor_sessions_updated_at
BEFORE UPDATE ON tutor_sessions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger para student_error_patterns
CREATE TRIGGER update_student_error_patterns_updated_at
BEFORE UPDATE ON student_error_patterns
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Función para incrementar contador de mensajes
CREATE OR REPLACE FUNCTION increment_message_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE tutor_sessions
    SET message_count = message_count + 1,
        last_message_at = NEW.created_at
    WHERE id = NEW.session_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para conteo de mensajes
CREATE TRIGGER increment_session_message_count
AFTER INSERT ON tutor_messages
FOR EACH ROW
EXECUTE FUNCTION increment_message_count();

-- ============================================================================
-- PARTE 6: ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE nee_screenings ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_error_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_error_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_state ENABLE ROW LEVEL SECURITY;

-- Función helper para RLS
CREATE OR REPLACE FUNCTION public.is_student_accessible(student_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM students
        WHERE id = student_uuid
        AND (
            parent_id = auth.uid()
            OR id = auth.uid()
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Políticas para students
CREATE POLICY "Users can view own students"
ON students FOR SELECT
USING (parent_id = auth.uid() OR id = auth.uid());

CREATE POLICY "Users can insert own students"
ON students FOR INSERT
WITH CHECK (parent_id = auth.uid() OR id = auth.uid());

CREATE POLICY "Users can update own students"
ON students FOR UPDATE
USING (parent_id = auth.uid() OR id = auth.uid());

CREATE POLICY "Users can delete own students"
ON students FOR DELETE
USING (parent_id = auth.uid());

-- Políticas para learning_profiles
CREATE POLICY "Users can view own profiles"
ON learning_profiles FOR SELECT
USING (is_student_accessible(student_id));

CREATE POLICY "Users can manage own profiles"
ON learning_profiles FOR ALL
USING (is_student_accessible(student_id));

-- Políticas para tutor_sessions
CREATE POLICY "Users can view own sessions"
ON tutor_sessions FOR SELECT
USING (is_student_accessible(student_id));

CREATE POLICY "Users can insert own sessions"
ON tutor_sessions FOR INSERT
WITH CHECK (is_student_accessible(student_id));

CREATE POLICY "Users can update own sessions"
ON tutor_sessions FOR UPDATE
USING (is_student_accessible(student_id));

-- Políticas para tutor_messages
CREATE POLICY "Users can view own messages"
ON tutor_messages FOR SELECT
USING (
    session_id IN (
        SELECT id FROM tutor_sessions WHERE is_student_accessible(student_id)
    )
);

CREATE POLICY "Users can insert own messages"
ON tutor_messages FOR INSERT
WITH CHECK (
    session_id IN (
        SELECT id FROM tutor_sessions WHERE is_student_accessible(student_id)
    )
);

-- Políticas para student_error_log
CREATE POLICY "Users can view own error logs"
ON student_error_log FOR SELECT
USING (is_student_accessible(student_id));

CREATE POLICY "Users can insert own error logs"
ON student_error_log FOR INSERT
WITH CHECK (is_student_accessible(student_id));

-- Políticas para student_error_patterns
CREATE POLICY "Users can view own error patterns"
ON student_error_patterns FOR SELECT
USING (is_student_accessible(student_id));

CREATE POLICY "Users can manage own error patterns"
ON student_error_patterns FOR ALL
USING (is_student_accessible(student_id));

-- Políticas para profile_answers
CREATE POLICY "Users can view own profile answers"
ON profile_answers FOR SELECT
USING (is_student_accessible(student_id));

CREATE POLICY "Users can manage own profile answers"
ON profile_answers FOR ALL
USING (is_student_accessible(student_id));

-- Políticas para onboarding_state
CREATE POLICY "Users can view own onboarding state"
ON onboarding_state FOR SELECT
USING (is_student_accessible(student_id));

CREATE POLICY "Users can manage own onboarding state"
ON onboarding_state FOR ALL
USING (is_student_accessible(student_id));

-- Políticas para resource_library
CREATE POLICY "Users can view own resources"
ON resource_library FOR SELECT
USING (is_student_accessible(student_id) OR is_public = true);

CREATE POLICY "Users can manage own resources"
ON resource_library FOR ALL
USING (is_student_accessible(student_id));

-- Políticas para user_subjects
CREATE POLICY "Users can view own subjects"
ON user_subjects FOR SELECT
USING (is_student_accessible(student_id));

CREATE POLICY "Users can manage own subjects"
ON user_subjects FOR ALL
USING (is_student_accessible(student_id));

-- Políticas para nee_screenings
CREATE POLICY "Users can view own screenings"
ON nee_screenings FOR SELECT
USING (is_student_accessible(student_id));

CREATE POLICY "Users can manage own screenings"
ON nee_screenings FOR ALL
USING (is_student_accessible(student_id));

-- Políticas para exam_roadmaps
CREATE POLICY "Users can view own roadmaps"
ON exam_roadmaps FOR SELECT
USING (is_student_accessible(student_id));

CREATE POLICY "Users can manage own roadmaps"
ON exam_roadmaps FOR ALL
USING (is_student_accessible(student_id));

-- ============================================================================
-- PARTE 7: VISTAS ÚTILES
-- ============================================================================

-- Vista de perfil completo del estudiante
CREATE OR REPLACE VIEW student_complete_profile AS
SELECT 
    s.id AS student_id,
    s.name,
    s.grade_level,
    s.autonomous_community,
    s.onboarding_completed,
    lp.vark_dominant,
    lp.vark_scores,
    lp.mi_scores,
    lp.chaea_scores,
    lp.profile_completion_percentage,
    (
        SELECT COUNT(*) 
        FROM student_error_patterns 
        WHERE student_id = s.id AND is_active = true
    ) AS active_error_patterns_count,
    (
        SELECT json_agg(
            json_build_object(
                'type', ep.error_type,
                'subject', ep.subject,
                'frequency', ep.frequency
            )
        )
        FROM (
            SELECT error_type, subject, frequency
            FROM student_error_patterns
            WHERE student_id = s.id AND is_active = true
            ORDER BY frequency DESC
            LIMIT 5
        ) ep
    ) AS top_error_patterns
FROM students s
LEFT JOIN learning_profiles lp ON lp.student_id = s.id;

-- Vista de estadísticas de sesiones
CREATE OR REPLACE VIEW session_stats AS
SELECT 
    s.id AS session_id,
    s.student_id,
    s.title,
    s.subject,
    s.created_at,
    s.message_count,
    (
        SELECT COUNT(*)
        FROM tutor_messages
        WHERE session_id = s.id
        AND is_profile_question = true
    ) AS profile_questions_asked,
    (
        SELECT COUNT(*)
        FROM student_error_log
        WHERE session_id = s.id
    ) AS errors_detected
FROM tutor_sessions s;

-- ============================================================================
-- FIN DEL SCRIPT
-- ============================================================================

-- Verificar que todo se creó correctamente
SELECT 'Tablas creadas:' as resultado, COUNT(*)::text as cantidad
FROM information_schema.tables 
WHERE table_schema = 'public';

SELECT 'Índices creados:' as resultado, COUNT(*)::text as cantidad
FROM pg_indexes 
WHERE schemaname = 'public';

SELECT 'Triggers creados:' as resultado, COUNT(*)::text as cantidad
FROM information_schema.triggers 
WHERE trigger_schema = 'public';