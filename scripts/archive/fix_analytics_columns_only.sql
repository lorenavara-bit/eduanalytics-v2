-- =========================================================
-- SOLO AÑADIR COLUMNAS (Sin tocar políticas para evitar errores)
-- =========================================================

ALTER TABLE resultados_evaluacion
ADD COLUMN IF NOT EXISTS correct_questions INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_questions INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS time_spent_seconds INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS perfil_cognitivo_id UUID, -- Removing FK constraint temporarily if table issues exist, simplified for safety
ADD COLUMN IF NOT EXISTS subject_name TEXT,
ADD COLUMN IF NOT EXISTS topic TEXT;

-- Aseguramos que la tabla evaluacion_detallada exista
CREATE TABLE IF NOT EXISTS evaluacion_detallada (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resultado_id UUID REFERENCES resultados_evaluacion(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    question_id TEXT,
    criterio_evaluacion TEXT,
    competencias TEXT[],
    es_correcto BOOLEAN,
    respuesta_estudiante TEXT,
    respuesta_correcta TEXT,
    feedback_ia TEXT,
    tiempo_respuesta_segundos INTEGER,
    tags JSONB
);

-- Verificar que se han creado
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'resultados_evaluacion';
