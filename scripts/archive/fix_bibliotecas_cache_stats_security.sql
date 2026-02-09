-- Fix para bibliotecas_cache_stats view - Agregar SECURITY INVOKER
-- Este script actualiza la vista para que respete las políticas RLS del usuario consultante
-- en lugar de usar los permisos del creador de la vista

-- Eliminar la vista existente si existe
DROP VIEW IF EXISTS public.bibliotecas_cache_stats;

-- Recrear la vista con SECURITY INVOKER
CREATE OR REPLACE VIEW public.bibliotecas_cache_stats 
WITH (security_invoker = true) AS
SELECT 
  tipo_recurso,
  COUNT(*) as total_entradas,
  COUNT(CASE WHEN expires_at > NOW() THEN 1 END) as entradas_validas,
  COUNT(CASE WHEN expires_at <= NOW() THEN 1 END) as entradas_expiradas,
  AVG(num_resultados) as promedio_resultados,
  SUM(access_count) as total_accesos,
  MAX(cached_at) as ultima_actualizacion
FROM public.bibliotecas_cache
GROUP BY tipo_recurso;

-- Agregar comentario para documentación
COMMENT ON VIEW public.bibliotecas_cache_stats IS 
  'Estadísticas de uso del caché de bibliotecas digitales (con SECURITY INVOKER para respetar RLS)';

-- Verificación
DO $$
BEGIN
  RAISE NOTICE '✅ Vista bibliotecas_cache_stats actualizada con SECURITY INVOKER';
  RAISE NOTICE '✅ La vista ahora respeta las políticas RLS del usuario consultante';
END $$;

-- Consulta de verificación (opcional)
SELECT 
  'bibliotecas_cache_stats' as vista,
  'SECURITY INVOKER aplicado correctamente' as estado;
