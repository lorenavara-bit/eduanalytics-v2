-- ============================================================================
-- ARREGLO CRÍTICO: Añadir columnas faltantes a resultados_evaluacion
-- ============================================================================
-- VERSIÓN SEGURA: No falla si las políticas ya existen.
-- ============================================================================

-- 1. Añadir columnas a RESULTADOS_EVALUACION
ALTER TABLE resultados_evaluacion
ADD COLUMN IF NOT EXISTS correct_questions INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_questions INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS time_spent_seconds INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS perfil_cognitivo_id UUID REFERENCES learning_profiles(id),
ADD COLUMN IF NOT EXISTS subject_name TEXT,
ADD COLUMN IF NOT EXISTS topic TEXT;

-- 2. Asegurar que existe EVALUACION_DETALLADA con sus columnas
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

-- 3. Habilitar RLS (siempre seguro de ejecutar)
ALTER TABLE resultados_evaluacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluacion_detallada ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Seguridad (Borrar anteriores para evitar conflictos y recrear)
DROP POLICY IF EXISTS "Enable all access for anon" ON resultados_evaluacion;
DROP POLICY IF EXISTS "Enable all access for anon details" ON evaluacion_detallada;

CREATE POLICY "Enable all access for anon" ON resultados_evaluacion FOR ALL USING (true);
CREATE POLICY "Enable all access for anon details" ON evaluacion_detallada FOR ALL USING (true);

-- 5. Verificar
SELECT '✅ Tablas de evaluación reparadas y columnas añadidas' as message;
