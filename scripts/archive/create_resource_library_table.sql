// Migración para crear la tabla 'resource_library' para el Crawler INTEF y Wikibooks
// Esta tabla almacenará enlaces y metadatos de recursos externos para no tener que "scrapear" en vivo siempre.

CREATE TABLE IF NOT EXISTS resource_library (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    source VARCHAR(50) NOT NULL, -- 'INTEF', 'WIKIBOOKS', 'KHAN', 'YOUTUBE'
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(500) NOT NULL,
    
    -- Clasificación
    subject VARCHAR(100), -- 'Matemáticas', 'Ciencias Naturales'...
    grade_level VARCHAR(50), -- '4º Primaria', '2º ESO'...
    topic VARCHAR(255), -- 'Ciclo del Agua', 'Fracciones'...
    
    -- Metadatos Técnicos
    content_type VARCHAR(50), -- 'video', 'pdf', 'interactive', 'text'
    license VARCHAR(50), -- 'CC-BY-SA', 'Copyright', 'Public Domain'
    thumbnail_url VARCHAR(500),
    
    -- Calidad y Validación
    quality_score FLOAT DEFAULT 0, -- 0-10
    verified_by_teacher BOOLEAN DEFAULT FALSE,
    
    -- Metadatos JSON (para guardar info específica de la API de origen)
    raw_metadata JSONB DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsqueda rápida
CREATE INDEX IF NOT EXISTS idx_resource_library_topic ON resource_library(topic);
CREATE INDEX IF NOT EXISTS idx_resource_library_subject ON resource_library(subject);
CREATE INDEX IF NOT EXISTS idx_resource_library_source ON resource_library(source);

-- RLS
ALTER TABLE resource_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Resources" ON resource_library FOR SELECT USING (true);
CREATE POLICY "Public Insert Resources" ON resource_library FOR INSERT WITH CHECK (true);
