-- =====================================================
-- ESTRUCTURA BETA/PREMIUM
-- Agregar campo de plan a usuarios
-- =====================================================

-- 1. Agregar columna 'plan' a la tabla profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'beta';

-- 2. Agregar comentario explicativo
COMMENT ON COLUMN profiles.plan IS 'Plan del usuario: beta (gratis) o premium (de pago)';

-- 3. Crear índice para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_profiles_plan ON profiles(plan);

-- 4. Verificar que se agregó correctamente
SELECT id, name, plan FROM profiles LIMIT 5;

-- =====================================================
-- NOTAS:
-- - Por defecto todos los usuarios son 'beta' (gratis)
-- - Para hacer un usuario premium: UPDATE profiles SET plan = 'premium' WHERE id = 'user-id';
-- - Para volver a beta: UPDATE profiles SET plan = 'beta' WHERE id = 'user-id';
-- =====================================================
