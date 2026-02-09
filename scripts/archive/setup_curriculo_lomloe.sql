-- =====================================================
-- SETUP COMPLETO DEL CURRÍCULO LOMLOE
-- Este script crea la base de datos del currículo oficial español
-- para generar fichas 100% alineadas con LOMLOE
-- =====================================================

-- 1. COMPETENCIAS CLAVE (Las 8 oficiales de LOMLOE)
CREATE TABLE IF NOT EXISTS competencias_clave (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    icono TEXT -- Emoji para UI
);

INSERT INTO competencias_clave (id, nombre, descripcion, icono) VALUES
('CCL', 'Competencia en Comunicación Lingüística', 'Habilidad para expresarse oralmente, por escrito y gestualmente.', '💬'),
('CP', 'Competencia Plurilingüe', 'Uso de diferentes lenguas de forma apropiada y eficaz.', '🌍'),
('CMCT', 'Competencia Matemática y en Ciencia, Tecnología e Ingeniería', 'Razonamiento matemático y científico para resolver problemas.', '🔬'),
('CD', 'Competencia Digital', 'Uso seguro, crítico y responsable de las tecnologías digitales.', '💻'),
('CPSAA', 'Competencia Personal, Social y de Aprender a Aprender', 'Reflexión sobre uno mismo, gestión del tiempo y la información.', '🧠'),
('CC', 'Competencia Ciudadana', 'Participación plena en la vida social y cívica.', '🤝'),
('CE', 'Competencia Emprendedora', 'Desarrollo de ideas y oportunidades, creatividad.', '💡'),
('CCEC', 'Competencia en Conciencia y Expresión Culturales', 'Aprecio de la diversidad cultural y artística.', '🎨')
ON CONFLICT (id) DO NOTHING;

-- 2. SABERES BÁSICOS (Contenidos oficiales por asignatura y curso)
CREATE TABLE IF NOT EXISTS saberes_basicos (
    id BIGSERIAL PRIMARY KEY,
    asignatura TEXT NOT NULL,
    curso TEXT NOT NULL,
    bloque TEXT, -- Ej: "Álgebra", "Geografía física"
    saber TEXT NOT NULL,
    competencias_relacionadas TEXT[], -- Array de IDs de competencias
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_saberes_asignatura_curso ON saberes_basicos(asignatura, curso);

-- 3. CRITERIOS DE EVALUACIÓN (Los objetivos medibles del currículo)
CREATE TABLE IF NOT EXISTS criterios_evaluacion (
    id TEXT PRIMARY KEY, -- Formato: CE.M.4.1 (Criterio Eval. Matemáticas. 4º ESO. Núm 1)
    asignatura TEXT NOT NULL,
    curso TEXT NOT NULL,
    numero INTEGER,
    descripcion TEXT NOT NULL,
    competencias TEXT[], -- Competencias que evalúa
    nivel_cognitivo TEXT, -- Bloom: Recordar, Comprender, Aplicar, Analizar, Evaluar, Crear
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. RESULTADOS DE EVALUACIÓN (Para Analytics)
CREATE TABLE IF NOT EXISTS resultados_evaluacion (
    id BIGSERIAL PRIMARY KEY,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    worksheet_id BIGINT,
    question_id TEXT,
    criterio_evaluacion TEXT,
    competencias TEXT[],
    es_correcto BOOLEAN,
    nivel_desempeno INTEGER CHECK (nivel_desempeno BETWEEN 1 AND 5), -- 1=Insuf, 5=Sobres
    respuesta_estudiante TEXT,
    respuesta_correcta TEXT,
    feedback_ia TEXT,
    tiempo_respuesta_segundos INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resultados_student ON resultados_evaluacion(student_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_resultados_criterio ON resultados_evaluacion(criterio_evaluacion);
CREATE INDEX IF NOT EXISTS idx_resultados_competencias ON resultados_evaluacion USING GIN(competencias);

-- RLS para resultados_evaluacion
ALTER TABLE resultados_evaluacion ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own results" ON resultados_evaluacion;
CREATE POLICY "Users can view own results" ON resultados_evaluacion
    FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can insert own results" ON resultados_evaluacion;
CREATE POLICY "Users can insert own results" ON resultados_evaluacion
    FOR INSERT WITH CHECK (auth.uid() = student_id);

-- =====================================================
-- DATOS PILOTO: MATEMÁTICAS 4º ESO
-- =====================================================

-- Saberes Básicos: Matemáticas 4º ESO
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '4º ESO', 'Números y Álgebra', 'Números racionales e irracionales: aproximación, representación en la recta numérica.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '4º ESO', 'Números y Álgebra', 'Resolución de ecuaciones de segundo grado y sistemas de ecuaciones lineales.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '4º ESO', 'Números y Álgebra', 'Interpretación de fórmulas y expresiones algebraicas.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '4º ESO', 'Geometría', 'Teorema de Pitágoras: aplicaciones en problemas geométricos y de la vida cotidiana.', ARRAY['CMCT', 'CE']),
('Matemáticas', '4º ESO', 'Geometría', 'Semejanza de triángulos: criterios y aplicaciones.', ARRAY['CMCT']),
('Matemáticas', '4º ESO', 'Funciones', 'Funciones lineales y cuadráticas: representación gráfica e interpretación.', ARRAY['CMCT', 'CD']),
('Matemáticas', '4º ESO', 'Funciones', 'Análisis de gráficas: crecimiento, decrecimiento, máximos y mínimos.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '4º ESO', 'Estadística y Probabilidad', 'Parámetros estadísticos: media, mediana, moda, desviación típica.', ARRAY['CMCT', 'CD']),
('Matemáticas', '4º ESO', 'Estadística y Probabilidad', 'Probabilidad simple y compuesta: regla de Laplace.', ARRAY['CMCT', 'CPSAA'])
ON CONFLICT DO NOTHING;

-- Criterios de Evaluación: Matemáticas 4º ESO
INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.M.4.1', 'Matemáticas', '4º ESO', 1, 'Interpretar, modelizar y resolver problemas de la vida cotidiana y propios de las matemáticas, aplicando diferentes estrategias y formas de razonamiento.', ARRAY['CMCT', 'CE', 'CPSAA'], 'Aplicar'),
('CE.M.4.2', 'Matemáticas', '4º ESO', 2, 'Resolver problemas mediante ecuaciones de segundo grado y sistemas de ecuaciones lineales, interpretando las soluciones en su contexto.', ARRAY['CMCT', 'CCL'], 'Aplicar'),
('CE.M.4.3', 'Matemáticas', '4º ESO', 3, 'Utilizar el Teorema de Pitágoras para resolver problemas geométricos y aplicarlo a situaciones reales.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.M.4.4', 'Matemáticas', '4º ESO', 4, 'Representar e interpretar funciones lineales y cuadráticas, analizando sus características.', ARRAY['CMCT', 'CD'], 'Analizar'),
('CE.M.4.5', 'Matemáticas', '4º ESO', 5, 'Analizar e interpretar gráficas relacionadas con fenómenos del entorno cotidiano.', ARRAY['CMCT', 'CCL', 'CD'], 'Analizar'),
('CE.M.4.6', 'Matemáticas', '4º ESO', 6, 'Calcular e interpretar parámetros estadísticos a partir de conjuntos de datos.', ARRAY['CMCT', 'CD'], 'Comprender'),
('CE.M.4.7', 'Matemáticas', '4º ESO', 7, 'Resolver problemas de probabilidad aplicando la regla de Laplace y reconociendo su utilidad.', ARRAY['CMCT', 'CPSAA'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- DATOS PILOTO: CIENCIAS NATURALES 4º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Ciencias Naturales', '4º Primaria', 'Los seres vivos', 'La célula como unidad de vida: estructura básica (membrana, citoplasma, núcleo).', ARRAY['CMCT', 'CCL']),
('Ciencias Naturales', '4º Primaria', 'Los seres vivos', 'Clasificación de los seres vivos: animales vertebrados e invertebrados.', ARRAY['CMCT']),
('Ciencias Naturales', '4º Primaria', 'Los seres vivos', 'La nutrición en plantas y animales: diferencias y semejanzas.', ARRAY['CMCT', 'CPSAA']),
('Ciencias Naturales', '4º Primaria', 'El cuerpo humano', 'Los sistemas del cuerpo humano: digestivo, respiratorio, circulatorio.', ARRAY['CMCT', 'CPSAA']),
('Ciencias Naturales', '4º Primaria', 'El cuerpo humano', 'Hábitos saludables: alimentación equilibrada, ejercicio físico, higiene.', ARRAY['CMCT', 'CPSAA', 'CC']),
('Ciencias Naturales', '4º Primaria', 'Materia y energía', 'Estados de la materia: sólido, líquido, gaseoso. Cambios de estado.', ARRAY['CMCT']),
('Ciencias Naturales', '4º Primaria', 'Materia y energía', 'Fuentes de energía: renovables y no renovables.', ARRAY['CMCT', 'CC', 'CE']),
('Ciencias Naturales', '4º Primaria', 'Ecosistemas', 'Ecosistemas terrestres y acuáticos: características y biodiversidad.', ARRAY['CMCT', 'CC', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.CN.4.1', 'Ciencias Naturales', '4º Primaria', 1, 'Identificar la célula como unidad básica de los seres vivos y describir sus partes principales.', ARRAY['CMCT', 'CCL'], 'Comprender'),
('CE.CN.4.2', 'Ciencias Naturales', '4º Primaria', 2, 'Clasificar animales en vertebrados e invertebrados según sus características.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.4.3', 'Ciencias Naturales', '4º Primaria', 3, 'Explicar las funciones vitales de nutrición, relación y reproducción en seres vivos.', ARRAY['CMCT', 'CCL'], 'Comprender'),
('CE.CN.4.4', 'Ciencias Naturales', '4º Primaria', 4, 'Identificar los principales sistemas del cuerpo humano y sus funciones.', ARRAY['CMCT', 'CPSAA'], 'Recordar'),
('CE.CN.4.5', 'Ciencias Naturales', '4º Primaria', 5, 'Reconocer los estados de la materia y los cambios entre ellos.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.4.6', 'Ciencias Naturales', '4º Primaria', 6, 'Identificar fuentes de energía renovables y no renovables, valorando su impacto ambiental.', ARRAY['CMCT', 'CC'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- DATOS PILOTO: GEOGRAFÍA E HISTORIA 2º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Geografía e Historia', '2º ESO', 'Edad Media', 'La caída del Imperio Romano y la formación de los reinos germánicos.', ARRAY['CC', 'CCL', 'CCEC']),
('Geografía e Historia', '2º ESO', 'Edad Media', 'El feudalismo: estructura social y económica.', ARRAY['CC', 'CCL']),
('Geografía e Historia', '2º ESO', 'Edad Media', 'Al-Ándalus: legado cultural y convivencia de culturas.', ARRAY['CC', 'CCEC', 'CP']),
('Geografía e Historia', '2º ESO', 'Edad Moderna', 'Descubrimientos geográficos: causas y consecuencias.', ARRAY['CC', 'CCL', 'CMCT']),
('Geografía e Historia', '2º ESO', 'Edad Moderna', 'El Renacimiento: características culturales y artísticas.', ARRAY['CCEC', 'CCL'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.GH.2.1', 'Geografía e Historia', '2º ESO', 1, 'Explicar las características del feudalismo medieval y su impacto en la sociedad.', ARRAY['CC', 'CCL'], 'Comprender'),
('CE.GH.2.2', 'Geografía e Historia', '2º ESO', 2, 'Valorar el legado cultural de Al-Ándalus en la península ibérica.', ARRAY['CC', 'CCEC'], 'Evaluar'),
('CE.GH.2.3', 'Geografía e Historia', '2º ESO', 3, 'Analizar las causas y consecuencias de los descubrimientos geográficos del siglo XV-XVI.', ARRAY['CC', 'CCL', 'CMCT'], 'Analizar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- VISTAS ÚTILES PARA LA APP
-- =====================================================

-- Vista: Resumen de progreso por competencia
CREATE OR REPLACE VIEW progreso_competencias AS
SELECT 
    r.student_id,
    unnest(r.competencias) as competencia_id,
    c.nombre as competencia_nombre,
    COUNT(*) as total_preguntas,
    SUM(CASE WHEN r.es_correcto THEN 1 ELSE 0 END) as aciertos,
    ROUND(AVG(r.nivel_desempeno), 2) as nivel_promedio,
    MAX(r.created_at) as ultima_practica
FROM resultados_evaluacion r
JOIN competencias_clave c ON c.id = unnest(r.competencias)
GROUP BY r.student_id, competencia_id, c.nombre;

-- Vista: Criterios con más errores (para recomendaciones)
CREATE OR REPLACE VIEW criterios_dificiles AS
SELECT 
    r.student_id,
    r.criterio_evaluacion,
    ce.descripcion,
    COUNT(*) as intentos,
    SUM(CASE WHEN NOT r.es_correcto THEN 1 ELSE 0 END) as errores,
    ROUND(100.0 * SUM(CASE WHEN NOT r.es_correcto THEN 1 ELSE 0 END) / COUNT(*), 1) as tasa_error
FROM resultados_evaluacion r
JOIN criterios_evaluacion ce ON ce.id = r.criterio_evaluacion
GROUP BY r.student_id, r.criterio_evaluacion, ce.descripcion
HAVING SUM(CASE WHEN NOT r.es_correcto THEN 1 ELSE 0 END) > 0
ORDER BY tasa_error DESC;

-- =====================================================
-- GRANT PERMISSIONS (si usas roles específicos)
-- =====================================================
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
-- GRANT INSERT ON resultados_evaluacion TO authenticated;

COMMENT ON TABLE competencias_clave IS 'Las 8 competencias clave oficiales de LOMLOE';
COMMENT ON TABLE saberes_basicos IS 'Contenidos curriculares oficiales por asignatura y curso';
COMMENT ON TABLE criterios_evaluacion IS 'Criterios de evaluación del BOE para medir el aprendizaje';
COMMENT ON TABLE resultados_evaluacion IS 'Historial de respuestas del estudiante con metadatos LOMLOE';
