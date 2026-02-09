-- Tabla de caché para bibliotecas digitales (OpenLibrary + Gutenberg)
-- Reduce llamadas repetidas a APIs externas y mejora performance

-- 1. Crear tabla de caché
CREATE TABLE IF NOT EXISTS bibliotecas_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Identificación de la búsqueda
  query_hash TEXT NOT NULL UNIQUE, -- Hash único de los parámetros de búsqueda
  fuentes TEXT[] NOT NULL DEFAULT ARRAY['openlibrary', 'gutenberg'], -- Fuentes consultadas
  tipo_recurso TEXT NOT NULL DEFAULT 'libro', -- 'libro', 'fragmento', 'ejercicio'
  
  -- Parámetros de búsqueda originales
  query_params JSONB, -- {query, asignatura, nivel, tema}
  
  -- Contenido cacheado
  contenido JSONB NOT NULL, -- Array de libros normalizados
  
  -- Metadatos
  num_resultados INTEGER GENERATED ALWAYS AS (jsonb_array_length(contenido)) STORED,
  
  -- Timestamps
  cached_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ, -- Fecha de expiración del caché
  last_accessed TIMESTAMPTZ DEFAULT NOW(),
  access_count INTEGER DEFAULT 1,
  
  -- Auditoría
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Índices para optimizar búsquedas
CREATE INDEX IF NOT EXISTS idx_bibliotecas_cache_query_hash 
  ON bibliotecas_cache(query_hash);

CREATE INDEX IF NOT EXISTS idx_bibliotecas_cache_fuentes 
  ON bibliotecas_cache USING GIN(fuentes);

CREATE INDEX IF NOT EXISTS idx_bibliotecas_cache_tipo 
  ON bibliotecas_cache(tipo_recurso);

CREATE INDEX IF NOT EXISTS idx_bibliotecas_cache_expires 
  ON bibliotecas_cache(expires_at) 
  WHERE expires_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_bibliotecas_cache_cached_at 
  ON bibliotecas_cache(cached_at DESC);

-- Índice para búsqueda en query_params
CREATE INDEX IF NOT EXISTS idx_bibliotecas_cache_params 
  ON bibliotecas_cache USING GIN(query_params);

-- 3. Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_bibliotecas_cache_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Trigger para updated_at
DROP TRIGGER IF EXISTS trigger_update_bibliotecas_cache_timestamp ON bibliotecas_cache;
CREATE TRIGGER trigger_update_bibliotecas_cache_timestamp
  BEFORE UPDATE ON bibliotecas_cache
  FOR EACH ROW
  EXECUTE FUNCTION update_bibliotecas_cache_timestamp();

-- 5. Función para limpiar caché expirado automáticamente
CREATE OR REPLACE FUNCTION clean_expired_bibliotecas_cache()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM bibliotecas_cache
  WHERE expires_at < NOW();
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  RAISE NOTICE 'Eliminadas % entradas de caché expiradas', deleted_count;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- 6. Comentarios para documentación
COMMENT ON TABLE bibliotecas_cache IS 
  'Caché de búsquedas en bibliotecas digitales (OpenLibrary, Gutenberg) para reducir llamadas a APIs externas';

COMMENT ON COLUMN bibliotecas_cache.query_hash IS 
  'Hash único generado a partir de los parámetros de búsqueda';

COMMENT ON COLUMN bibliotecas_cache.contenido IS 
  'Array de libros normalizados al formato interno de la aplicación';

COMMENT ON COLUMN bibliotecas_cache.expires_at IS 
  'Fecha de expiración del caché (por defecto 7 días)';

-- 7. Row Level Security (RLS)
ALTER TABLE bibliotecas_cache ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden leer el caché (es público)
CREATE POLICY "Caché de bibliotecas es público para lectura"
  ON bibliotecas_cache
  FOR SELECT
  TO public
  USING (true);

-- Política: Solo usuarios autenticados pueden escribir/actualizar
CREATE POLICY "Solo usuarios autenticados pueden escribir en caché"
  ON bibliotecas_cache
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Solo usuarios autenticados pueden actualizar caché"
  ON bibliotecas_cache
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política: Solo usuarios autenticados pueden eliminar del caché
CREATE POLICY "Solo usuarios autenticados pueden eliminar del caché"
  ON bibliotecas_cache
  FOR DELETE
  TO authenticated
  USING (true);

-- 8. Crear vista para estadísticas de caché
CREATE OR REPLACE VIEW bibliotecas_cache_stats 
WITH (security_invoker = true) AS
SELECT 
  tipo_recurso,
  COUNT(*) as total_entradas,
  COUNT(CASE WHEN expires_at > NOW() THEN 1 END) as entradas_validas,
  COUNT(CASE WHEN expires_at <= NOW() THEN 1 END) as entradas_expiradas,
  AVG(num_resultados) as promedio_resultados,
  SUM(access_count) as total_accesos,
  MAX(cached_at) as ultima_actualizacion
FROM bibliotecas_cache
GROUP BY tipo_recurso;

COMMENT ON VIEW bibliotecas_cache_stats IS 
  'Estadísticas de uso del caché de bibliotecas digitales';

-- 9. Función para obtener estadísticas generales
CREATE OR REPLACE FUNCTION get_bibliotecas_stats()
RETURNS TABLE(
  stat_name TEXT,
  stat_value TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 'Total entradas'::TEXT, COUNT(*)::TEXT FROM bibliotecas_cache
  UNION ALL
  SELECT 'Entradas válidas'::TEXT, COUNT(*)::TEXT FROM bibliotecas_cache WHERE expires_at > NOW()
  UNION ALL
  SELECT 'Entradas expiradas'::TEXT, COUNT(*)::TEXT FROM bibliotecas_cache WHERE expires_at <= NOW()
  UNION ALL
  SELECT 'Total accesos'::TEXT, SUM(access_count)::TEXT FROM bibliotecas_cache
  UNION ALL
  SELECT 'Última actualización'::TEXT, MAX(cached_at)::TEXT FROM bibliotecas_cache;
END;
$$ LANGUAGE plpgsql;

-- 10. Insertar datos de ejemplo (opcional, para testing)
-- Esto se puede eliminar en producción
INSERT INTO bibliotecas_cache (
  query_hash,
  fuentes,
  tipo_recurso,
  query_params,
  contenido,
  expires_at
) VALUES (
  'bibliotecas_test_12345',
  ARRAY['gutenberg'],
  'libro',
  '{"query": "Don Quijote", "asignatura": "Lengua Castellana", "nivel": "ESO"}'::jsonb,
  '[
    {
      "id": "gutenberg_2000",
      "fuente": "gutenberg",
      "tipo": "libro",
      "titulo": "Don Quijote de la Mancha",
      "autor": "Miguel de Cervantes",
      "licencia": "dominio_publico",
      "nivel_educativo": ["ESO", "Bachillerato"]
    }
  ]'::jsonb,
  NOW() + INTERVAL '7 days'
) ON CONFLICT (query_hash) DO NOTHING;

-- 11. Verificación final
DO $$
BEGIN
  RAISE NOTICE '✅ Tabla bibliotecas_cache creada correctamente';
  RAISE NOTICE '✅ % índices creados', (SELECT COUNT(*) FROM pg_indexes WHERE tablename = 'bibliotecas_cache');
  RAISE NOTICE '✅ RLS habilitado con % políticas', (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'bibliotecas_cache');
  RAISE NOTICE '✅ Vista de estadísticas disponible: bibliotecas_cache_stats';
  RAISE NOTICE '📊 Ejecuta: SELECT * FROM get_bibliotecas_stats() para ver estadísticas';
END $$;

-- 12. Información útil
SELECT 
  '📚 BIBLIOTECAS CACHE - INSTALACIÓN COMPLETA' as mensaje,
  (SELECT COUNT(*) FROM bibliotecas_cache) as total_entradas,
  (SELECT COUNT(*) FROM pg_indexes WHERE tablename = 'bibliotecas_cache') as indices,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'bibliotecas_cache') as politicas_rls;
