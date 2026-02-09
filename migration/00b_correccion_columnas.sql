-- ============================================================================
-- CORRECCIÓN: Añadir columna competencias_relacionadas a saberes_basicos
-- ============================================================================
-- Los archivos de currículo usan competencias_relacionadas (array)
-- pero la tabla tiene competencia_id (text single)
-- ============================================================================

ALTER TABLE saberes_basicos 
ADD COLUMN IF NOT EXISTS competencias_relacionadas TEXT[];

-- También añadir campos faltantes en criterios_evaluacion
ALTER TABLE criterios_evaluacion
ADD COLUMN IF NOT EXISTS numero INTEGER,
ADD COLUMN IF NOT EXISTS nivel_cognitivo TEXT;

-- Verificar estructura
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'saberes_basicos' 
ORDER BY ordinal_position;

SELECT '✅ Columnas añadidas correctamente' as estado;
