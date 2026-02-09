-- ═══════════════════════════════════════════════════════════
-- MIGRACIÓN: AGREGAR TELEMETRÍA AVANZADA A RESULTADOS
-- ═══════════════════════════════════════════════════════════

-- Agrega la columna advanced_metrics para guardar el perfil cognitivo detallado
ALTER TABLE public.resultados_evaluacion 
ADD COLUMN IF NOT EXISTS advanced_metrics JSONB DEFAULT '{}';

COMMENT ON COLUMN public.resultados_evaluacion.advanced_metrics 
IS 'Telemetría neuro-pedagógica: totalInseguridad, totalDudas, latenciaMediaVoz, etc.';

-- También nos aseguramos de que evaluaciones_detalladas tenga el campo tags
ALTER TABLE public.evaluacion_detallada 
ADD COLUMN IF NOT EXISTS tags TEXT[];

COMMENT ON COLUMN public.evaluacion_detallada.tags 
IS 'Etiquetas neuro-educativas (VARK, Foco, Pattern) capturadas durante el ejercicio.';
