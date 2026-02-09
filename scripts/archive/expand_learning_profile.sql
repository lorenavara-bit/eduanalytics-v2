-- EXPANSIÓN DE PERFIL DE APRENDIZAJE PROFUNDO
-- Añade soporte para Inteligencias Múltiples, Ciclo de Kolb y Rasgos Cognitivos

ALTER TABLE public.learning_profiles 
ADD COLUMN IF NOT EXISTS multiple_intelligences JSONB DEFAULT '{}'::JSONB,
ADD COLUMN IF NOT EXISTS kolb_cycle JSONB DEFAULT '{}'::JSONB,
ADD COLUMN IF NOT EXISTS cognitive_traits JSONB DEFAULT '{"attention": "normal", "processing_speed": "normal", "persistence": "normal"}'::JSONB,
ADD COLUMN IF NOT EXISTS confidence_score DECIMAL(3,2) DEFAULT 0.50;

-- Comentarios para documentación
COMMENT ON COLUMN public.learning_profiles.multiple_intelligences IS 'Puntuaciones en las 8 inteligencias de Gardner';
COMMENT ON COLUMN public.learning_profiles.kolb_cycle IS 'Posición en el ciclo de aprendizaje de Kolb';
COMMENT ON COLUMN public.learning_profiles.cognitive_traits IS 'Rasgos detectados por comportamiento (atención, velocidad, etc)';

-- Notificar recarga de esquema
NOTIFY pgrst, 'reload schema';
