# Esquema de Base de Datos: Tutor IA Conversacional

**Fecha:** 13 de Enero 2026  
**Versión:** 1.0  
**Base de Datos:** Supabase (PostgreSQL)

---

## 📋 Índice

1. [Tablas Nuevas](#tablas-nuevas)
2. [Tablas Existentes Modificadas](#tablas-existentes-modificadas)
3. [Relaciones y Claves Foráneas](#relaciones-y-claves-foráneas)
4. [Índices para Performance](#índices-para-performance)
5. [Políticas RLS](#políticas-rls)
6. [Scripts de Migración](#scripts-de-migración)

---

## 🆕 Tablas Nuevas

### 1. `tutor_sessions`

**Propósito:** Almacenar sesiones de conversación del Tutor IA.

```sql
CREATE TABLE IF NOT EXISTS public.tutor_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    
    -- Metadata de la sesión
    title TEXT, -- "Matemáticas - Ecuaciones" (generado por IA)
    mode TEXT NOT NULL DEFAULT 'academic', -- 'onboarding', 'academic', 'profile'
    
    -- Contexto académico
    subject TEXT, -- Asignatura principal de la sesión
    topic TEXT, -- Tema específico si aplica
    
    -- Estado
    is_active BOOLEAN DEFAULT true,
    message_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_tutor_sessions_student ON tutor_sessions(student_id);
CREATE INDEX idx_tutor_sessions_active ON tutor_sessions(is_active) WHERE is_active = true;
CREATE INDEX idx_tutor_sessions_last_message ON tutor_sessions(last_message_at DESC);

-- RLS
ALTER TABLE tutor_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions"
ON tutor_sessions FOR SELECT
USING (
    student_id IN (
        SELECT id FROM students WHERE parent_id = auth.uid()
    )
    OR student_id = auth.uid()
);

CREATE POLICY "Users can insert own sessions"
ON tutor_sessions FOR INSERT
WITH CHECK (
    student_id IN (
        SELECT id FROM students WHERE parent_id = auth.uid()
    )
    OR student_id = auth.uid()
);

CREATE POLICY "Users can update own sessions"
ON tutor_sessions FOR UPDATE
USING (
    student_id IN (
        SELECT id FROM students WHERE parent_id = auth.uid()
    )
    OR student_id = auth.uid()
);
```

### 2. `tutor_messages`

**Propósito:** Almacenar mensajes individuales de cada conversación.

```sql
CREATE TABLE IF NOT EXISTS public.tutor_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES tutor_sessions(id) ON DELETE CASCADE,
    
    -- Contenido del mensaje
    role TEXT NOT NULL, -- 'user' o 'assistant'
    content TEXT NOT NULL,
    
    -- Metadata
    message_type TEXT DEFAULT 'text', -- 'text', 'generated_content', 'evaluation', 'question'
    metadata JSONB, -- Información adicional según tipo
    
    -- Para perfilado pasivo
    is_profile_question BOOLEAN DEFAULT false,
    profile_question_type TEXT, -- 'MI', 'CHAEA', 'VARK'
    
    -- Timestamp
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_tutor_messages_session ON tutor_messages(session_id);
CREATE INDEX idx_tutor_messages_created ON tutor_messages(created_at DESC);
CREATE INDEX idx_tutor_messages_profile ON tutor_messages(is_profile_question) WHERE is_profile_question = true;

-- RLS
ALTER TABLE tutor_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages"
ON tutor_messages FOR SELECT
USING (
    session_id IN (
        SELECT id FROM tutor_sessions WHERE 
        student_id IN (SELECT id FROM students WHERE parent_id = auth.uid())
        OR student_id = auth.uid()
    )
);

CREATE POLICY "Users can insert own messages"
ON tutor_messages FOR INSERT
WITH CHECK (
    session_id IN (
        SELECT id FROM tutor_sessions WHERE 
        student_id IN (SELECT id FROM students WHERE parent_id = auth.uid())
        OR student_id = auth.uid()
    )
);
```

### 3. `student_error_log`

**Propósito:** Registrar errores del estudiante para detectar patrones.

```sql
CREATE TABLE IF NOT EXISTS public.student_error_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    session_id UUID REFERENCES tutor_sessions(id) ON DELETE SET NULL,
    
    -- Contexto académico
    subject TEXT,
    topic TEXT,
    
    -- Detalles del error
    question_text TEXT NOT NULL,
    student_answer TEXT NOT NULL,
    expected_answer TEXT,
    
    -- Clasificación
    error_type TEXT NOT NULL, -- 'conceptual', 'procedural', 'calculation', 'memory', 'orthography'
    error_description TEXT, -- Descripción generada por IA
    
    -- Feedback dado
    feedback TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_error_log_student ON student_error_log(student_id);
CREATE INDEX idx_error_log_created ON student_error_log(created_at DESC);
CREATE INDEX idx_error_log_type ON student_error_log(error_type);
CREATE INDEX idx_error_log_subject_topic ON student_error_log(subject, topic);

-- RLS
ALTER TABLE student_error_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own error logs"
ON student_error_log FOR SELECT
USING (
    student_id IN (
        SELECT id FROM students WHERE parent_id = auth.uid()
    )
    OR student_id = auth.uid()
);

CREATE POLICY "Users can insert own error logs"
ON student_error_log FOR INSERT
WITH CHECK (
    student_id IN (
        SELECT id FROM students WHERE parent_id = auth.uid()
    )
    OR student_id = auth.uid()
);
```

### 4. `student_error_patterns`

**Propósito:** Almacenar patrones de error detectados para personalización futura.

```sql
CREATE TABLE IF NOT EXISTS public.student_error_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    
    -- Patrón detectado
    error_type TEXT NOT NULL,
    subject TEXT,
    topic TEXT,
    
    -- Estadísticas
    frequency INTEGER DEFAULT 1, -- Número de veces que ha ocurrido
    last_occurrence TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    first_detected TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Estado
    is_active BOOLEAN DEFAULT true, -- false si ya se corrigió
    resolved_at TIMESTAMP WITH TIME ZONE,
    
    -- Adaptaciones aplicadas
    adaptations_applied JSONB, -- Qué se hizo para ayudar
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraint: Un pattern por estudiante/tipo/subject/topic
    UNIQUE(student_id, error_type, subject, topic)
);

-- Índices
CREATE INDEX idx_error_patterns_student ON student_error_patterns(student_id);
CREATE INDEX idx_error_patterns_active ON student_error_patterns(is_active) WHERE is_active = true;
CREATE INDEX idx_error_patterns_frequency ON student_error_patterns(frequency DESC);

-- RLS
ALTER TABLE student_error_patterns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own error patterns"
ON student_error_patterns FOR SELECT
USING (
    student_id IN (
        SELECT id FROM students WHERE parent_id = auth.uid()
    )
    OR student_id = auth.uid()
);

CREATE POLICY "Users can manage own error patterns"
ON student_error_patterns FOR ALL
USING (
    student_id IN (
        SELECT id FROM students WHERE parent_id = auth.uid()
    )
    OR student_id = auth.uid()
);
```

### 5. `profile_answers`

**Propósito:** Almacenar respuestas individuales a preguntas de perfilado (VARK, MI, CHAEA).

```sql
CREATE TABLE IF NOT EXISTS public.profile_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    
    -- Tipo de test
    test_type TEXT NOT NULL, -- 'VARK', 'MI', 'CHAEA', 'NEE'
    
    -- Pregunta y respuesta
    question_id TEXT NOT NULL, -- ID de la pregunta del banco
    question_text TEXT NOT NULL,
    answer TEXT NOT NULL,
    
    -- Modo de obtención
    acquisition_mode TEXT DEFAULT 'passive', -- 'onboarding', 'passive', 'manual'
    session_id UUID REFERENCES tutor_sessions(id) ON DELETE SET NULL,
    
    -- Timestamp
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraint: Una respuesta por pregunta por estudiante
    UNIQUE(student_id, test_type, question_id)
);

-- Índices
CREATE INDEX idx_profile_answers_student ON profile_answers(student_id);
CREATE INDEX idx_profile_answers_test_type ON profile_answers(test_type);
CREATE INDEX idx_profile_answers_mode ON profile_answers(acquisition_mode);

-- RLS
ALTER TABLE profile_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile answers"
ON profile_answers FOR SELECT
USING (
    student_id IN (
        SELECT id FROM students WHERE parent_id = auth.uid()
    )
    OR student_id = auth.uid()
);

CREATE POLICY "Users can manage own profile answers"
ON profile_answers FOR ALL
USING (
    student_id IN (
        SELECT id FROM students WHERE parent_id = auth.uid()
    )
    OR student_id = auth.uid()
);
```

### 6. `onboarding_state`

**Propósito:** Trackear progreso del onboarding si se interrumpe.

```sql
CREATE TABLE IF NOT EXISTS public.onboarding_state (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL UNIQUE REFERENCES students(id) ON DELETE CASCADE,
    
    -- Progreso
    current_step TEXT DEFAULT 'basic_info', -- 'basic_info', 'vark_test', 'nee_suggestion', 'completed'
    vark_answers_count INTEGER DEFAULT 0,
    
    -- Datos temporales (antes de completar)
    temp_name TEXT,
    temp_grade_level TEXT,
    temp_vark_answers JSONB,
    
    -- Estado
    is_completed BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_onboarding_student ON onboarding_state(student_id);
CREATE INDEX idx_onboarding_completed ON onboarding_state(is_completed) WHERE is_completed = false;

-- RLS
ALTER TABLE onboarding_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own onboarding state"
ON onboarding_state FOR SELECT
USING (
    student_id IN (
        SELECT id FROM students WHERE parent_id = auth.uid()
    )
    OR student_id = auth.uid()
);

CREATE POLICY "Users can manage own onboarding state"
ON onboarding_state FOR ALL
USING (
    student_id IN (
        SELECT id FROM students WHERE parent_id = auth.uid()
    )
    OR student_id = auth.uid()
);
```

---

## 🔄 Tablas Existentes Modificadas

### Modificaciones a `students`

```sql
-- Añadir campos nuevos
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS nee_screening_declined BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS nee_monitoring_active BOOLEAN DEFAULT false;

-- Índice para buscar estudiantes pendientes de onboarding
CREATE INDEX IF NOT EXISTS idx_students_onboarding 
ON students(onboarding_completed) 
WHERE onboarding_completed = false;
```

### Modificaciones a `learning_profiles`

```sql
-- Añadir campos de completitud y confianza
ALTER TABLE learning_profiles
ADD COLUMN IF NOT EXISTS profile_completion_percentage INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS vark_confidence DECIMAL(3,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS mi_completion_percentage INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS chaea_completion_percentage INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_profile_update TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Añadir scores detallados
ALTER TABLE learning_profiles
ADD COLUMN IF NOT EXISTS mi_scores JSONB,
ADD COLUMN IF NOT EXISTS chaea_scores JSONB;

-- Índice para perfiles incompletos (para perfilado pasivo)
CREATE INDEX IF NOT EXISTS idx_profiles_incomplete
ON learning_profiles(profile_completion_percentage)
WHERE profile_completion_percentage < 100;
```

### Modificaciones a `nee_screenings`

```sql
-- Añadir modo de detección
ALTER TABLE nee_screenings
ADD COLUMN IF NOT EXISTS detection_mode TEXT DEFAULT 'manual', -- 'manual', 'passive_monitoring'
ADD COLUMN IF NOT EXISTS confidence_level DECIMAL(3,2); -- 0.00-1.00

-- Añadir observaciones de comportamiento (para detección pasiva)
ALTER TABLE nee_screenings
ADD COLUMN IF NOT EXISTS behavior_observations JSONB;
```

---

## 🔗 Relaciones y Claves Foráneas

```
students (1) ──┬──> (*) tutor_sessions
               ├──> (*) student_error_log
               ├──> (*) student_error_patterns
               ├──> (*) profile_answers
               ├──> (1) onboarding_state
               └──> (1) learning_profiles

tutor_sessions (1) ──> (*) tutor_messages

tutor_sessions (1) ──> (*) student_error_log (opcional)
tutor_sessions (1) ──> (*) profile_answers (opcional)
```

**Cascadas de Eliminación:**

- Si eliminas `student` → Se eliminan TODAS sus sesiones, errores, respuestas
- Si eliminas `tutor_session` → Se eliminan TODOS sus mensajes
- Esto permite "olvidar" completamente a un estudiante si es necesario (GDPR compliant)

---

## ⚡ Índices para Performance

### Índices Compuestos

```sql
-- Buscar sesiones activas recientes de un estudiante
CREATE INDEX idx_sessions_student_active_recent 
ON tutor_sessions(student_id, is_active, last_message_at DESC)
WHERE is_active = true;

-- Buscar errores recientes de un estudiante por asignatura
CREATE INDEX idx_errors_student_subject_recent
ON student_error_log(student_id, subject, created_at DESC);

-- Buscar patrones activos de un estudiante
CREATE INDEX idx_patterns_student_active
ON student_error_patterns(student_id, is_active, frequency DESC)
WHERE is_active = true;

-- Buscar respuestas de perfil por tipo de test
CREATE INDEX idx_profile_answers_student_test
ON profile_answers(student_id, test_type, created_at);
```

### Índices GIN para JSONB

```sql
-- Buscar en metadata de mensajes
CREATE INDEX idx_messages_metadata_gin 
ON tutor_messages USING GIN (metadata);

-- Buscar en scores de MI y CHAEA
CREATE INDEX idx_learning_profiles_mi_gin
ON learning_profiles USING GIN (mi_scores);

CREATE INDEX idx_learning_profiles_chaea_gin
ON learning_profiles USING GIN (chaea_scores);

-- Buscar en observaciones de comportamiento NEE
CREATE INDEX idx_nee_observations_gin
ON nee_screenings USING GIN (behavior_observations);
```

---

## 🔒 Políticas RLS (Row Level Security)

### Política General

**Principio:** Los padres pueden ver/editar datos de sus hijos. Los estudiantes solo sus propios datos.

### Función Helper para RLS

```sql
CREATE OR REPLACE FUNCTION public.is_student_accessible(student_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM students
        WHERE id = student_uuid
        AND (
            parent_id = auth.uid()  -- Es mi hijo
            OR id = auth.uid()       -- Soy yo mismo
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Aplicación Global

```sql
-- Para todas las tablas relacionadas con estudiante
ALTER TABLE tutor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_error_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_error_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_state ENABLE ROW LEVEL SECURITY;

-- Políticas solo permiten acceso si is_student_accessible() retorna true
```

---

## 📊 Vistas Útiles

### Vista: Perfil Completo del Estudiante

```sql
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
                'type', error_type,
                'subject', subject,
                'frequency', frequency
            )
        )
        FROM student_error_patterns
        WHERE student_id = s.id AND is_active = true
        ORDER BY frequency DESC
        LIMIT 5
    ) AS top_error_patterns
FROM students s
LEFT JOIN learning_profiles lp ON lp.student_id = s.id;
```

### Vista: Estadísticas de Sesión

```sql
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
```

---

## 🔧 Scripts de Migración

### Script 1: Crear Tablas Nuevas

**Archivo:** `01_create_tutor_tables.sql`

```sql
-- Ejecutar en orden:
-- 1. tutor_sessions
-- 2. tutor_messages
-- 3. student_error_log
-- 4. student_error_patterns
-- 5. profile_answers
-- 6. onboarding_state

-- Ver código completo arriba en sección "Tablas Nuevas"
```

### Script 2: Modificar Tablas Existentes

**Archivo:** `02_modify_existing_tables.sql`

```sql
-- Modificaciones a students
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS nee_screening_declined BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS nee_monitoring_active BOOLEAN DEFAULT false;

-- Modificaciones a learning_profiles
ALTER TABLE learning_profiles
ADD COLUMN IF NOT EXISTS profile_completion_percentage INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS vark_confidence DECIMAL(3,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS mi_completion_percentage INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS chaea_completion_percentage INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_profile_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS mi_scores JSONB,
ADD COLUMN IF NOT EXISTS chaea_scores JSONB;

-- Modificaciones a nee_screenings
ALTER TABLE nee_screenings
ADD COLUMN IF NOT EXISTS detection_mode TEXT DEFAULT 'manual',
ADD COLUMN IF NOT EXISTS confidence_level DECIMAL(3,2),
ADD COLUMN IF NOT EXISTS behavior_observations JSONB;
```

### Script 3: Crear Índices

**Archivo:** `03_create_indexes.sql`

```sql
-- Ver sección "Índices para Performance" arriba
-- Ejecutar todos los CREATE INDEX
```

### Script 4: Crear Vistas

**Archivo:** `04_create_views.sql`

```sql
-- Ver sección "Vistas Útiles" arriba
-- Crear student_complete_profile
-- Crear session_stats
```

### Script 5: Configurar RLS

**Archivo:** `05_configure_rls.sql`

```sql
-- Habilitar RLS en todas las tablas
-- Crear políticas
-- Ver sección "Políticas RLS" arriba
```

---

## 📝 Notas de Implementación

### Triggers Automáticos

#### Actualizar `updated_at` automáticamente

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tutor_sessions_updated_at
BEFORE UPDATE ON tutor_sessions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_error_patterns_updated_at
BEFORE UPDATE ON student_error_patterns
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

#### Actualizar contador de mensajes

```sql
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

CREATE TRIGGER increment_session_message_count
AFTER INSERT ON tutor_messages
FOR EACH ROW
EXECUTE FUNCTION increment_message_count();
```

#### Actualizar profile_completion automáticamente

```sql
CREATE OR REPLACE FUNCTION update_profile_completion()
RETURNS TRIGGER AS $$
DECLARE
    vark_count INTEGER;
    mi_count INTEGER;
    chaea_count INTEGER;
    completion INTEGER;
BEGIN
    -- Contar respuestas por tipo
    SELECT COUNT(*) INTO vark_count 
    FROM profile_answers 
    WHERE student_id = NEW.student_id AND test_type = 'VARK';
    
    SELECT COUNT(*) INTO mi_count
    FROM profile_answers
    WHERE student_id = NEW.student_id AND test_type = 'MI';
    
    SELECT COUNT(*) INTO chaea_count
    FROM profile_answers
    WHERE student_id = NEW.student_id AND test_type = 'CHAEA';
    
    -- Calcular completitud (VARK=12, MI=40, CHAEA=20 clave de 80)
    completion := LEAST(100, 
        (LEAST(12, vark_count) * 100 / 12 * 0.30)::INTEGER +
        (LEAST(40, mi_count) * 100 / 40 * 0.35)::INTEGER +
        (LEAST(20, chaea_count) * 100 / 20 * 0.25)::INTEGER
    );
    
    -- Actualizar learning_profile
    UPDATE learning_profiles
    SET profile_completion_percentage = completion,
        mi_completion_percentage = LEAST(100, mi_count * 100 / 40),
        chaea_completion_percentage = LEAST(100, chaea_count * 100 / 20),
        last_profile_update = NOW()
    WHERE student_id = NEW.student_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profile_on_answer
AFTER INSERT OR UPDATE ON profile_answers
FOR EACH ROW
EXECUTE FUNCTION update_profile_completion();
```

---

## 🧪 Datos de Prueba

### Insertar Estudiante de Prueba

```sql
-- Crear estudiante de prueba
INSERT INTO students (parent_id, name, grade_level, autonomous_community, onboarding_completed)
VALUES (
    auth.uid(),
    'María Test',
    '4º Primaria',
    'Galicia',
    true
);

-- Crear perfil inicial
INSERT INTO learning_profiles (student_id, vark_dominant, vark_scores, profile_completion_percentage)
VALUES (
    (SELECT id FROM students WHERE name = 'María Test' LIMIT 1),
    'visual',
    '{"V": 7, "A": 2, "R": 1, "K": 2}'::jsonb,
    30
);

-- Crear sesión de prueba
INSERT INTO tutor_sessions (student_id, title, mode, subject)
VALUES (
    (SELECT id FROM students WHERE name = 'María Test' LIMIT 1),
    'Matemáticas - Ecuaciones',
    'academic',
    'Matemáticas'
);

-- Crear mensajes de prueba
INSERT INTO tutor_messages (session_id, role, content)
VALUES 
(
    (SELECT id FROM tutor_sessions WHERE title = 'Matemáticas - Ecuaciones' LIMIT 1),
    'user',
    'Hola, necesito ayuda con ecuaciones'
),
(
    (SELECT id FROM tutor_sessions WHERE title = 'Matemáticas - Ecuaciones' LIMIT 1),
    'assistant',
    '¡Hola María! Claro, ¿qué parte de ecuaciones no entiendes?'
);
```

---

## ✅ Checklist de Implementación

- [ ] Ejecutar `01_create_tutor_tables.sql`
- [ ] Ejecutar `02_modify_existing_tables.sql`
- [ ] Ejecutar `03_create_indexes.sql`
- [ ] Ejecutar `04_create_views.sql`
- [ ] Ejecutar `05_configure_rls.sql`
- [ ] Crear triggers automáticos
- [ ] Insertar datos de prueba
- [ ] Verificar que RLS funciona correctamente
- [ ] Testear queries de performance
- [ ] Documentar para equipo

---

**FIN DEL ESQUEMA DE BASE DE DATOS**

*Siguiente: Refinamiento de Prompts*
