-- =====================================================
-- CREAR SOLO LA TABLA STUDENTS
-- (profiles ya existe)
-- =====================================================

-- Crear tabla students
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    full_name TEXT,
    first_name TEXT,
    name TEXT,
    grade_level TEXT,
    learning_style TEXT,
    editorial_math TEXT,
    editorial_language TEXT,
    autonomous_community TEXT,
    challenge_level TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Políticas RLS permisivas (para desarrollo)
CREATE POLICY "Allow all access to students"
    ON students FOR ALL
    USING (true)
    WITH CHECK (true);

-- Índice para mejorar queries por parent_id
CREATE INDEX IF NOT EXISTS idx_students_parent 
    ON students(parent_id);

-- Comentario
COMMENT ON TABLE students IS 'Tabla de estudiantes/hijos vinculados a perfiles de padres';

-- Verificar que se creó
SELECT 
    table_name,
    (SELECT count(*) FROM information_schema.columns WHERE table_name = 'students') as total_columns
FROM information_schema.tables 
WHERE table_name = 'students';

-- =====================================================
-- AHORA SÍ: Insertar estudiante de prueba
-- =====================================================

-- Buscar un profile existente para usar como parent
DO $$
DECLARE
    v_parent_id UUID;
BEGIN
    -- Buscar el primer profile
    SELECT id INTO v_parent_id FROM profiles LIMIT 1;
    
    IF v_parent_id IS NULL THEN
        RAISE EXCEPTION '❌ No hay profiles. Necesitas crear un usuario primero accediendo a la app.';
    END IF;
    
    -- Insertar estudiante de prueba
    INSERT INTO students (
        id,
        parent_id,
        full_name,
        name,
        grade_level
    )
    VALUES (
        '11111111-1111-1111-1111-111111111111',
        v_parent_id,
        'Demo Student',
        'Demo Student',
        '4º Primaria'
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = 'Demo Student',
        name = 'Demo Student',
        grade_level = '4º Primaria';
    
    RAISE NOTICE '✅ Estudiante creado con parent_id: %', v_parent_id;
END $$;

-- Verificar
SELECT * FROM students 
WHERE id = '11111111-1111-1111-1111-111111111111';

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
