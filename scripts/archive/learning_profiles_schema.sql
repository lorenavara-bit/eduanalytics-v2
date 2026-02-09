-- Tablas para el modelo de aprendizaje adaptativo (VARK + Felder-Silverman)

CREATE TABLE IF NOT EXISTS public.learning_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Modelo VARK (Visual, Aural, Read/Write, Kinesthetic)
  vark_scores JSONB DEFAULT '{"v": 0, "a": 0, "r": 0, "k": 0}'::JSONB,
  vark_dominant TEXT, -- 'visual', 'aural', 'read_write', 'kinesthetic', 'multimodal'
  
  -- Modelo Felder-Silverman (4 dimensiones)
  -- Escala de -11 a +11 (según el test original)
  fs_active_reflective INTEGER DEFAULT 0, -- Negativo: Reflective, Positivo: Active
  fs_sensing_intuitive INTEGER DEFAULT 0, -- Negativo: Intuitive, Positivo: Sensing
  fs_visual_verbal INTEGER DEFAULT 0,     -- Negativo: Verbal, Positivo: Visual
  fs_sequential_global INTEGER DEFAULT 0,  -- Negativo: Global, Positivo: Sequential
  
  -- Interpretación de la IA
  ai_summary TEXT,
  personalization_tips JSONB, -- Consejos específicos para el estudiante
  
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Un perfil por estudiante
  UNIQUE(student_id)
);

-- Políticas de seguridad (RLS)
ALTER TABLE public.learning_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own learning profile"
  ON public.learning_profiles FOR SELECT
  USING ( auth.uid() = student_id );

CREATE POLICY "Users can insert/update their own learning profile"
  ON public.learning_profiles FOR INSERT
  WITH CHECK ( auth.uid() = student_id );

CREATE POLICY "Users can update their own learning profile"
  ON public.learning_profiles FOR UPDATE
  USING ( auth.uid() = student_id );
