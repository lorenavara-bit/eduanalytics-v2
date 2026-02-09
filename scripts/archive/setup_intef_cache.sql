-- TABLA DE CACHE PARA CONTENIDO INTEF
-- Sistema de caché agresivo para recursos educativos oficiales

-- Crear tabla de cache para contenido INTEF
CREATE TABLE IF NOT EXISTS intef_content_cache (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cache_key TEXT UNIQUE NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,  -- NULL = never expires
    metadata JSONB,
    
    -- Índices para búsqueda rápida
    CONSTRAINT unique_cache_key UNIQUE(cache_key)
);

-- Índices para optimizar búsquedas
CREATE INDEX IF NOT EXISTS idx_intef_cache_key ON intef_content_cache(cache_key);
CREATE INDEX IF NOT EXISTS idx_intef_expires_at ON intef_content_cache(expires_at);
CREATE INDEX IF NOT EXISTS idx_intef_created_at ON intef_content_cache(created_at);

-- Índice GIN para búsquedas en metadata JSON
CREATE INDEX IF NOT EXISTS idx_intef_metadata ON intef_content_cache USING gin(metadata);

-- Comentarios
COMMENT ON TABLE intef_content_cache IS 'Cache de contenido educativo oficial de INTEF/Procomún';
COMMENT ON COLUMN intef_content_cache.cache_key IS 'Clave única de cache (asignatura_curso_tema)';
COMMENT ON COLUMN intef_content_cache.content IS 'Contenido INTEF en formato JSON';
COMMENT ON COLUMN intef_content_cache.expires_at IS 'Fecha de expiración (NULL = nunca expira)';
COMMENT ON COLUMN intef_content_cache.metadata IS 'Metadatos adicionales (fuente, etiquetas, etc)';

-- RLS (Row Level Security)
ALTER TABLE intef_content_cache ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden LEER (contenido público)
CREATE POLICY "Public read access to INTEF cache"
    ON intef_content_cache
    FOR SELECT
    USING (true);

-- Política: Solo usuarios autenticados pueden INSERTAR/ACTUALIZAR
CREATE POLICY "Authenticated users can insert/update INTEF cache"
    ON intef_content_cache
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Función para limpiar cache expirado (opcional, ejecutar periódicamente)
CREATE OR REPLACE FUNCTION clean_expired_intef_cache()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM intef_content_cache
    WHERE expires_at IS NOT NULL 
    AND expires_at < NOW();
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Comentario sobre la función
COMMENT ON FUNCTION clean_expired_intef_cache IS 'Limpia entradas de cache que han expirado. Retorna número de filas eliminadas.';

-- Función para obtener estadísticas de cache
CREATE OR REPLACE FUNCTION get_intef_cache_stats()
RETURNS TABLE (
    total_entries BIGINT,
    permanent_entries BIGINT,
    expiring_entries BIGINT,
    expired_entries BIGINT,
    cache_size_mb NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_entries,
        COUNT(*) FILTER (WHERE expires_at IS NULL) as permanent_entries,
        COUNT(*) FILTER (WHERE expires_at IS NOT NULL AND expires_at > NOW()) as expiring_entries,
        COUNT(*) FILTER (WHERE expires_at IS NOT NULL AND expires_at <= NOW()) as expired_entries,
        ROUND(pg_total_relation_size('intef_content_cache')::NUMERIC / 1024 / 1024, 2) as cache_size_mb
    FROM intef_content_cache;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_intef_cache_stats IS 'Retorna estadísticas sobre el cache de INTEF';

-- Grant permissions
GRANT SELECT ON intef_content_cache TO anon, authenticated;
GRANT ALL ON intef_content_cache TO authenticated;

-- Verificar creación
SELECT 'Tabla intef_content_cache creada exitosamente' as status;
SELECT * FROM get_intef_cache_stats();
