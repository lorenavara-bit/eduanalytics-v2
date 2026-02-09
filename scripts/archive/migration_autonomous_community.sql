-- MIGRACIÓN: Añadir campo Comunidad Autónoma
-- Fecha: 2025-12-09
-- Propósito: Adaptar contenido generado al currículo autonómico específico

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS autonomous_community TEXT;

COMMENT ON COLUMN profiles.autonomous_community IS 'Comunidad Autónoma del estudiante para adaptar currículo (ej: Galicia, Madrid, Cataluña)';

-- Opcional: Crear índice para consultas rápidas por comunidad
CREATE INDEX IF NOT EXISTS idx_profiles_autonomous_community 
ON profiles(autonomous_community);
