-- MIGRACIÓN DEFINITIVA V4: TODO-EN-UNO (ARREGLA TABLAS FALTANTES Y BORRADO)
-- ⚠️ EJECUTA ESTO EN EL SQL EDITOR DE SUPABASE

-- 1. Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabla Estudiantes (Base de todo)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    full_name TEXT NOT NULL,
    birthdate DATE,
    education_level TEXT CHECK (education_level IN ('primaria', 'eso', 'bachillerato')),
    grade_level TEXT,
    autonomous_community TEXT,
    editorial_math TEXT DEFAULT 'Santillana',
    editorial_language TEXT DEFAULT 'Santillana',
    editorial_science TEXT DEFAULT 'Santillana',
    editorial_english TEXT DEFAULT 'Santillana',
    challenge_level TEXT DEFAULT 'standard' CHECK (challenge_level IN ('refuerzo', 'standard', 'ampliacion')),
    learning_style TEXT,
    avatar_url TEXT,
    interests TEXT,
    favorite_subjects TEXT,
    least_favorite_subjects TEXT,
    observations TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabla Perfiles de Aprendizaje (VARK)
CREATE TABLE IF NOT EXISTS public.learning_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  vark_scores JSONB DEFAULT '{"v": 0, "a": 0, "r": 0, "k": 0}'::JSONB,
  vark_dominant TEXT,
  fs_active_reflective INTEGER DEFAULT 0,
  fs_sensing_intuitive INTEGER DEFAULT 0,
  fs_visual_verbal INTEGER DEFAULT 0,
  fs_sequential_global INTEGER DEFAULT 0,
  ai_summary TEXT,
  personalization_tips JSONB,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(student_id)
);

-- 4. Tabla Detección Temprana (NEE)
CREATE TABLE IF NOT EXISTS public.nee_screenings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL,
    source TEXT NOT NULL,
    data JSONB NOT NULL,
    risk_level TEXT CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH')),
    ai_analysis TEXT,
    recommendations JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Tabla de Exámenes (Roadmaps)
CREATE TABLE IF NOT EXISTS public.exam_roadmaps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    exam_date DATE NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
    study_plan JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Habilitar RLS en todas
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nee_screenings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_roadmaps ENABLE ROW LEVEL SECURITY;

-- 7. RECREAR POLÍTICAS (Permiten Borrado)

-- Políticas Students
DROP POLICY IF EXISTS "Parents can view their own children" ON public.students;
CREATE POLICY "Parents can view their own children" ON public.students FOR SELECT USING ( auth.uid() = parent_id );
DROP POLICY IF EXISTS "Parents can insert their own children" ON public.students;
CREATE POLICY "Parents can insert their own children" ON public.students FOR INSERT WITH CHECK ( auth.uid() = parent_id );
DROP POLICY IF EXISTS "Parents can update their own children" ON public.students;
CREATE POLICY "Parents can update their own children" ON public.students FOR UPDATE USING ( auth.uid() = parent_id );
DROP POLICY IF EXISTS "Parents can delete their own children" ON public.students;
CREATE POLICY "Parents can delete their own children" ON public.students FOR DELETE USING ( auth.uid() = parent_id );

-- Políticas Aprendizaje
DROP POLICY IF EXISTS "Parents can manage learning profiles" ON public.learning_profiles;
CREATE POLICY "Parents can manage learning profiles" ON public.learning_profiles FOR ALL USING (
    student_id IN (SELECT id FROM public.students WHERE parent_id = auth.uid())
);

-- Políticas Screening NEE
DROP POLICY IF EXISTS "Parents can manage screenings" ON public.nee_screenings;
CREATE POLICY "Parents can manage screenings" ON public.nee_screenings FOR ALL USING (
    student_id IN (SELECT id FROM public.students WHERE parent_id = auth.uid())
);

-- Políticas Roadmaps
DROP POLICY IF EXISTS "Parents can manage exam roadmaps" ON public.exam_roadmaps;
CREATE POLICY "Parents can manage exam roadmaps" ON public.exam_roadmaps FOR ALL USING (
    student_id IN (SELECT id FROM public.students WHERE parent_id = auth.uid())
);

-- 8. Garantizar Cascading en Constraints existentes (Si ya estaban creadas de antes)
DO $$ 
BEGIN 
    -- Learning Profiles
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='learning_profiles_student_id_fkey') THEN
        ALTER TABLE public.learning_profiles DROP CONSTRAINT learning_profiles_student_id_fkey;
    END IF;
    ALTER TABLE public.learning_profiles ADD CONSTRAINT learning_profiles_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;

    -- NEE Screenings
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='nee_screenings_student_id_fkey') THEN
        ALTER TABLE public.nee_screenings DROP CONSTRAINT nee_screenings_student_id_fkey;
    END IF;
    ALTER TABLE public.nee_screenings ADD CONSTRAINT nee_screenings_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;
EXCEPTION WHEN OTHERS THEN 
    NULL;
END $$;

-- 9. PARCHE: Asegurar que las columnas nuevas existen en tablas ya creadas
ALTER TABLE public.students 
ADD COLUMN IF NOT EXISTS favorite_subjects TEXT,
ADD COLUMN IF NOT EXISTS least_favorite_subjects TEXT,
ADD COLUMN IF NOT EXISTS observations TEXT;

-- Recargar caché de PostgREST (opcional, suele ser automático en Supabase)
NOTIFY pgrst, 'reload schema';

