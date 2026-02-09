-- Tabla para almacenar los resultados de cribado NEE (Detección Temprana)
-- Basado en cuestionarios de padres y juegos de cribado

CREATE TABLE IF NOT EXISTS public.nee_screenings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Tipo de cribado: DYSLEXIA, TDAH, AACC, GENERAL
    type TEXT NOT NULL,
    
    -- Fuente: PARENT_QUESTIONNAIRE, STUDENT_GAME, TEACHER_REPORT
    source TEXT NOT NULL,
    
    -- Resultados detallados (respuestas, métricas de juego, etc.)
    data JSONB NOT NULL,
    
    -- Nivel de riesgo detectado: LOW, MEDIUM, HIGH
    risk_level TEXT CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH')),
    
    -- Análisis cualitativo (puede ser generado por IA)
    ai_analysis TEXT,
    
    -- Recomendaciones específicas generadas
    recommendations JSONB,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.nee_screenings ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Users can view their own screenings"
    ON public.nee_screenings FOR SELECT
    USING ( auth.uid() = student_id );

CREATE POLICY "Users can insert their own screenings"
    ON public.nee_screenings FOR INSERT
    WITH CHECK ( auth.uid() = student_id );

COMMENT ON TABLE public.nee_screenings IS 'Almacena resultados de pruebas de cribado para necesidades educativas especiales';
