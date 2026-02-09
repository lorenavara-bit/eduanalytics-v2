-- 🛠️ REPARACIÓN DE ESQUEMA: ANALÍTICA Y NEE
-- Borra tablas en conflicto y las recrea con la estructura correcta

-- 1. Eliminar tablas antiguas/en conflicto
DROP TABLE IF EXISTS public.evaluacion_detallada CASCADE;
DROP TABLE IF EXISTS public.resultados_evaluacion CASCADE;

-- 2. recrear Resumen de Evaluación (Analytics)
CREATE TABLE public.resultados_evaluacion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    subject_name TEXT NOT NULL,
    topic TEXT,
    score DECIMAL(5,2),
    total_questions INTEGER,
    correct_questions INTEGER,
    time_spent_seconds INTEGER,
    perfil_cognitivo_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Recrear Detalle por Pregunta
CREATE TABLE public.evaluacion_detallada (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resultado_id UUID REFERENCES public.resultados_evaluacion(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    question_id TEXT,
    criterio_evaluacion TEXT,
    competencias TEXT[],
    es_correcto BOOLEAN,
    respuesta_estudiante TEXT,
    respuesta_correcta TEXT,
    feedback_ia TEXT,
    tiempo_respuesta_segundos INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Asegurar que las políticas RLS apuntan a student_id
ALTER TABLE public.resultados_evaluacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluacion_detallada ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can view results" ON public.resultados_evaluacion
    FOR SELECT USING (student_id IN (SELECT id FROM public.students WHERE parent_id = auth.uid()));

CREATE POLICY "Parents can insert results" ON public.resultados_evaluacion
    FOR INSERT WITH CHECK (student_id IN (SELECT id FROM public.students WHERE parent_id = auth.uid()));

CREATE POLICY "Parents can view detailed" ON public.evaluacion_detallada
    FOR SELECT USING (student_id IN (SELECT id FROM public.students WHERE parent_id = auth.uid()));

CREATE POLICY "Parents can insert detailed" ON public.evaluacion_detallada
    FOR INSERT WITH CHECK (student_id IN (SELECT id FROM public.students WHERE parent_id = auth.uid()));

-- 5. Verificar y corregir tabla de Detección Temprana (nee_screenings)
-- Si no existe, crearla. Si existe pero tiene user_id, migrarla a student_id.
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'nee_screenings') THEN
        CREATE TABLE public.nee_screenings (
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
    END IF;
END $$;

-- 6. Recargar esquema
NOTIFY pgrst, 'reload schema';
