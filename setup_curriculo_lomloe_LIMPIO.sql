-- =====================================================
-- SETUP LIMPIO - CURRÍCULO LOMLOE
-- Elimina tablas existentes y las recrea desde cero
-- =====================================================

-- PASO 1: Eliminar tablas existentes (con CASCADE)
DROP TABLE IF EXISTS resultados_evaluacion CASCADE;
DROP TABLE IF EXISTS criterios_evaluacion CASCADE;
DROP TABLE IF EXISTS saberes_basicos CASCADE;
DROP TABLE IF EXISTS competencias_clave CASCADE;

-- PASO 2: Crear tabla de competencias clave
CREATE TABLE competencias_clave (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PASO 3: Insertar las 8 competencias clave LOMLOE
INSERT INTO competencias_clave (id, nombre, descripcion) VALUES
('CCL', 'Competencia en Comunicación Lingüística', 'Habilidad para expresar e interpretar conceptos, pensamientos, sentimientos, hechos y opiniones de forma oral, escrita y multimodal.'),
('CP', 'Competencia Plurilingüe', 'Uso adecuado y respetuoso de diferentes lenguas, así como el reconocimiento y respeto de la diversidad lingüística.'),
('CMCT', 'Competencia Matemática y en Ciencia, Tecnología e Ingeniería', 'Comprensión del mundo utilizando el método científico, pensamiento matemático y tecnología.'),
('CD', 'Competencia Digital', 'Uso seguro, saludable, sostenible, crítico y responsable de las tecnologías digitales.'),
('CPSAA', 'Competencia Personal, Social y de Aprender a Aprender', 'Reflexión sobre uno mismo, gestión del tiempo y la información, colaboración, resiliencia y gestión del aprendizaje.'),
('CC', 'Competencia Ciudadana', 'Participación activa, responsable y democrática en la vida social y cívica.'),
('CE', 'Competencia Emprendedora', 'Desarrollo de un enfoque vital dirigido a actuar sobre oportunidades e ideas, transformándolas en valores para los demás.'),
('CCEC', 'Competencia en Conciencia y Expresión Culturales', 'Comprensión y respeto del modo en que las ideas, las opiniones, los sentimientos y las emociones se expresan y se comunican de forma creativa.');

-- PASO 4: Crear tabla de saberes básicos
CREATE TABLE saberes_basicos (
    id SERIAL PRIMARY KEY,
    asignatura TEXT NOT NULL,
    curso TEXT NOT NULL,
    bloque TEXT NOT NULL,
    saber TEXT NOT NULL,
    competencias_relacionadas TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_saberes_asignatura_curso ON saberes_basicos(asignatura, curso);
CREATE INDEX idx_saberes_bloque ON saberes_basicos(bloque);

-- PASO 5: Crear tabla de criterios de evaluación
CREATE TABLE criterios_evaluacion (
    id TEXT PRIMARY KEY,
    asignatura TEXT NOT NULL,
    curso TEXT NOT NULL,
    numero INTEGER NOT NULL,
    descripcion TEXT NOT NULL,
    competencias TEXT[] DEFAULT '{}',
    nivel_cognitivo TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_criterios_asignatura_curso ON criterios_evaluacion(asignatura, curso);

-- PASO 6: Crear tabla de resultados de evaluación
CREATE TABLE resultados_evaluacion (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    worksheet_data JSONB NOT NULL,
    student_answers JSONB NOT NULL,
    correction_result JSONB NOT NULL,
    score DECIMAL(5,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_resultados_user ON resultados_evaluacion(user_id);
CREATE INDEX idx_resultados_created ON resultados_evaluacion(created_at DESC);

-- PASO 7: Habilitar Row Level Security
ALTER TABLE saberes_basicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE criterios_evaluacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE resultados_evaluacion ENABLE ROW LEVEL SECURITY;

-- PASO 8: Políticas RLS (públicas para lectura de currículo)
CREATE POLICY "Saberes son públicos" ON saberes_basicos FOR SELECT USING (true);
CREATE POLICY "Criterios son públicos" ON criterios_evaluacion FOR SELECT USING (true);
CREATE POLICY "Competencias son públicas" ON competencias_clave FOR SELECT USING (true);

-- Políticas para resultados (solo el usuario puede ver los suyos)
CREATE POLICY "Ver propios resultados" ON resultados_evaluacion 
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Insertar propios resultados" ON resultados_evaluacion 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Comentarios
COMMENT ON TABLE competencias_clave IS 'Las 8 competencias clave LOMLOE (RD 157/2022)';
COMMENT ON TABLE saberes_basicos IS 'Saberes básicos del currículo oficial por asignatura y curso';
COMMENT ON TABLE criterios_evaluacion IS 'Criterios de evaluación oficiales vinculados a competencias';
COMMENT ON TABLE resultados_evaluacion IS 'Resultados de correcciones de fichas de estudiantes';

SELECT 'Setup completado - Tablas creadas correctamente' AS status;
