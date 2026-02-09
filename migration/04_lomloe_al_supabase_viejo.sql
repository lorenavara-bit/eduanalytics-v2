-- ============================================================================
-- MIGRACIÓN COMPLETA: CURRÍCULO LOMLOE AL SUPABASE VIEJO
-- ============================================================================
-- Ejecutar en: https://kbgkgoxwwlpszyfidufa.supabase.co
-- ============================================================================

-- PASO PREVIO: Limpiar tablas si existen
DROP TABLE IF EXISTS criterios_evaluacion CASCADE;
DROP TABLE IF EXISTS saberes_basicos CASCADE;
DROP TABLE IF EXISTS competencias_clave CASCADE;

-- ============================================================================
-- PARTE 1: CREAR TABLAS LOMLOE
-- ============================================================================

-- Tabla de Competencias Clave LOMLOE
CREATE TABLE competencias_clave (
    id SERIAL PRIMARY KEY,
    codigo TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Saberes Básicos
CREATE TABLE saberes_basicos (
    id SERIAL PRIMARY KEY,
    asignatura TEXT NOT NULL,
    curso TEXT NOT NULL,
    bloque TEXT,
    saber TEXT NOT NULL,
    competencias_relacionadas TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Criterios de Evaluación
CREATE TABLE criterios_evaluacion (
    id TEXT PRIMARY KEY,
    asignatura TEXT NOT NULL,
    curso TEXT NOT NULL,
    numero INTEGER,
    descripcion TEXT NOT NULL,
    competencias TEXT[],
    nivel_cognitivo TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para rendimiento
CREATE INDEX idx_saberes_asignatura ON saberes_basicos(asignatura);
CREATE INDEX idx_saberes_curso ON saberes_basicos(curso);
CREATE INDEX idx_criterios_asignatura ON criterios_evaluacion(asignatura);
CREATE INDEX idx_criterios_curso ON criterios_evaluacion(curso);

-- Desactivar RLS
ALTER TABLE competencias_clave DISABLE ROW LEVEL SECURITY;
ALTER TABLE saberes_basicos DISABLE ROW LEVEL SECURITY;
ALTER TABLE criterios_evaluacion DISABLE ROW LEVEL SECURITY;

SELECT '✅ PARTE 1 COMPLETADA: Tablas LOMLOE creadas' as status;

-- ============================================================================
-- PARTE 2: INSERTAR COMPETENCIAS CLAVE
-- ============================================================================

INSERT INTO competencias_clave (codigo, nombre, descripcion) VALUES
('CCL', 'Competencia en Comunicación Lingüística', 'Habilidad para expresarse y comprender mensajes orales y escritos'),
('CP', 'Competencia Plurilingüe', 'Utilizar diferentes lenguas de forma efectiva'),
('STEM', 'Competencia Matemática y en Ciencia, Tecnología e Ingeniería', 'Comprender el mundo desde la perspectiva científica'),
('CD', 'Competencia Digital', 'Uso seguro y crítico de tecnologías digitales'),
('CPSAA', 'Competencia Personal, Social y de Aprender a Aprender', 'Reflexionar sobre uno mismo y gestionar el aprendizaje'),
('CC', 'Competencia Ciudadana', 'Participar plenamente en la vida social y cívica'),
('CE', 'Competencia Emprendedora', 'Identificar oportunidades y poner en marcha proyectos'),
('CCEC', 'Competencia en Conciencia y Expresión Culturales', 'Apreciar y respetar la diversidad cultural');

SELECT '✅ PARTE 2 COMPLETADA: 8 Competencias insertadas' as status;

-- ============================================================================
-- FIN DEL SCRIPT DE TABLAS
-- ============================================================================
