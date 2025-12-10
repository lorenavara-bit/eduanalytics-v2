-- =====================================================
-- CURRÍCULO COMPLETO 4º DE ESO
-- Real Decreto 217/2022 - Enseñanzas Mínimas ESO
-- =====================================================
-- Adaptado a estudiantes de 15-16 años
-- Último curso de Educación Secundaria Obligatoria
-- Preparación para Bachillerato o FP
-- =====================================================

-- =====================================================
-- 1. MATEMÁTICAS - 4º ESO (Opción Académicas)
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '4º ESO', 'Sentido numérico', 'Números reales: operaciones y propiedades. Radicales.', ARRAY['CMCT']),
('Matemáticas', '4º ESO', 'Sentido numérico', 'Logaritmos: concepto y propiedades básicas.', ARRAY['CMCT']),
('Matemáticas', '4º ESO', 'Sentido algebraico', 'Ecuaciones de segundo grado: resolución y aplicaciones.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '4º ESO', 'Sentido algebraico', 'Ecuaciones bicuadradas, irracionales y con radicales.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '4º ESO', 'Sentido algebraico', 'Sistemas de ecuaciones no lineales.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '4º ESO', 'Sentido algebraico', 'Inecuaciones de primer y segundo grado.', ARRAY['CMCT']),
('Matemáticas', '4º ESO', 'Sentido funcional', 'Funciones: propiedades globales (dominio, recorrido, crecimiento, extremos, simetría).', ARRAY['CMCT', 'CD']),
('Matemáticas', '4º ESO', 'Sentido funcional', 'Funciones polinómicas, racionales, exponenciales y logarítmicas.', ARRAY['CMCT', 'CD']),
('Matemáticas', '4º ESO', 'Sentido espacial', 'Trigonometría: razones trigonométricas, resolución de triángulos.', ARRAY['CMCT']),
('Matemáticas', '4º ESO', 'Sentido espacial', 'Vectores en el plano: operaciones básicas.', ARRAY['CMCT']),
('Matemáticas', '4º ESO', 'Sentido estocástico', 'Estadística: medidas de dispersión (varianza, desviación típica).', ARRAY['CMCT', 'CD']),
('Matemáticas', '4º ESO', 'Sentido estocástico', 'Combinatoria: variaciones, permutaciones y combinaciones.', ARRAY['CMCT'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.4E.1', 'Matemáticas', '4º ESO', 1, 'Operar con números reales y radicales.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.4E.2', 'Matemáticas', '4º ESO', 2, 'Resolver todo tipo de ecuaciones y sistemas.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.4E.3', 'Matemáticas', '4º ESO', 3, 'Resolver inecuaciones y representar soluciones.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.4E.4', 'Matemáticas', '4º ESO', 4, 'Analizar y representar funciones de diferentes tipos.', ARRAY['CMCT', 'CD'], 'Analizar'),
('CE.MAT.4E.5', 'Matemáticas', '4º ESO', 5, 'Resolver problemas geométricos con trigonometría.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.4E.6', 'Matemáticas', '4º ESO', 6, 'Calcular medidas de dispersión estadística.', ARRAY['CMCT', 'CD'], 'Aplicar'),
('CE.MAT.4E.7', 'Matemáticas', '4º ESO', 7, 'Resolver problemas de combinatoria.', ARRAY['CMCT'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. LENGUA CASTELLANA Y LITERATURA - 4º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura', '4º ESO', 'Comunicación oral', 'Textos orales formales: ponencias, conferencias académicas.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lengua Castellana y Literatura', '4º ESO', 'Comunicación oral', 'Argumentación oral avanzada y debate académico.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lengua Castellana y Literatura', '4º ESO', 'Comprensión lectora', 'Textos científicos, técnicos y académicos.', ARRAY['CCL', 'CMCT', 'CD']),
('Lengua Castellana y Literatura', '4º ESO', 'Comprensión lectora', 'Análisis crítico de textos mediáticos.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lengua Castellana y Literatura', '4º ESO', 'Producción escrita', 'Textos académicos avanzados: ensayos, trabajos de investigación.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lengua Castellana y Literatura', '4º ESO', 'Producción escrita', 'Textos de opinión y argumentativos complejos.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lengua Castellana y Literatura', '4º ESO', 'Reflexión sobre la lengua', 'Oración compuesta: subordinación sustantiva, adjetiva y adverbial.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '4º ESO', 'Reflexión sobre la lengua', 'Análisis sintáctico completo de oraciones complejas.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '4º ESO', 'Reflexión sobre la lengua', 'Variedades de la lengua: registros y niveles.', ARRAY['CCL', 'CP']),
('Lengua Castellana y Literatura', '4º ESO', 'Educación literaria', 'Literatura española del siglo XVIII: Ilustración, Neoclasicismo.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '4º ESO', 'Educación literaria', 'Literatura del siglo XIX: Romanticismo, Realismo, Naturalismo.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '4º ESO', 'Educación literaria', 'Literatura del siglo XX: Generación del 98, del 27, posguerra.', ARRAY['CCL', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.4E.1', 'Lengua Castellana y Literatura', '4º ESO', 1, 'Producir textos orales formales bien estructurados.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LCL.4E.2', 'Lengua Castellana y Literatura', '4º ESO', 2, 'Analizar críticamente textos de diferentes ámbitos.', ARRAY['CCL', 'CPSAA'], 'Evaluar'),
('CE.LCL.4E.3', 'Lengua Castellana y Literatura', '4º ESO', 3, 'Producir textos académicos y argumentativos complejos.', ARRAY['CCL', 'CD', 'CPSAA'], 'Crear'),
('CE.LCL.4E.4', 'Lengua Castellana y Literatura', '4º ESO', 4, 'Realizar análisis sintáctico completo de oraciones compuestas.', ARRAY['CCL'], 'Analizar'),
('CE.LCL.4E.5', 'Lengua Castellana y Literatura', '4º ESO', 5, 'Reconocer variedades lingüísticas y registros.', ARRAY['CCL', 'CP'], 'Comprender'),
('CE.LCL.4E.6', 'Lengua Castellana y Literatura', '4º ESO', 6, 'Conocer la literatura española de los siglos XVIII, XIX y XX.', ARRAY['CCL', 'CCEC'], 'Comprender'),
('CE.LCL.4E.7', 'Lengua Castellana y Literatura', '4º ESO', 7, 'Analizar textos literarios representativos.', ARRAY['CCL', 'CCEC'], 'Analizar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 3. GEOGRAFÍA E HISTORIA - 4º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Geografía e Historia', '4º ESO', 'Historia', 'El siglo XVIII: la Ilustración y el despotismo ilustrado.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '4º ESO', 'Historia', 'Revoluciones liberales: Revolución Francesa y era napoleónica.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '4º ESO', 'Historia', 'Revolución Industrial: causas, desarrollo y consecuencias.', ARRAY['CC', 'CCEC', 'CE']),
('Geografía e Historia', '4º ESO', 'Historia', 'El imperialismo y la Primera Guerra Mundial.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '4º ESO', 'Historia', 'El período de entreguerras: crisis de 1929, fascismos.', ARRAY['CC', 'CCEC', 'CPSAA']),
('Geografía e Historia', '4º ESO', 'Historia', 'La Segunda Guerra Mundial y el Holocausto.', ARRAY['CC', 'CCEC', 'CPSAA']),
('Geografía e Historia', '4º ESO', 'Historia', 'La Guerra Fría: bloques, conflictos y descolonización.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '4º ESO', 'Historia de España', 'España en el siglo XIX: Guerra de Independencia, reinado de Isabel II, Restauración.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '4º ESO', 'Historia de España', 'España en el siglo XX: II República, Guerra Civil, franquismo, transición democrática.', ARRAY['CC', 'CCEC', 'CPSAA']),
('Geografía e Historia', '4º ESO', 'Mundo actual', 'El mundo actual: globalización, desigualdades, conflictos.', ARRAY['CC', 'CE', 'CD'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.GH.4E.1', 'Geografía e Historia', '4º ESO', 1, 'Explicar las causas y consecuencias de la Revolución Industrial.', ARRAY['CC', 'CCEC', 'CE'], 'Analizar'),
('CE.GH.4E.2', 'Geografía e Historia', '4º ESO', 2, 'Analizar las causas de la Primera y Segunda Guerra Mundial.', ARRAY['CC', 'CCEC'], 'Analizar'),
('CE.GH.4E.3', 'Geografía e Historia', '4º ESO', 3, 'Comprender el fenómeno del imperialismo del siglo XIX.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.GH.4E.4', 'Geografía e Historia', '4º ESO', 4, 'Explicar el desarrollo de la Guerra Fría.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.GH.4E.5', 'Geografía e Historia', '4º ESO', 5, 'Conocer la historia de España en los siglos XIX y XX.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.GH.4E.6', 'Geografía e Historia', '4º ESO', 6, 'Valorar la importancia de la transición democrática española.', ARRAY['CC', 'CCEC', 'CPSAA'], 'Evaluar'),
('CE.GH.4E.7', 'Geografía e Historia', '4º ESO', 7, 'Analizar problemas del mundo actual.', ARRAY['CC', 'CE', 'CD'], 'Analizar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 4. FÍSICA Y QUÍMICA - 4º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Física y Química', '4º ESO', 'Química', 'El átomo: estructura y modelos atómicos.', ARRAY['CMCT']),
('Física y Química', '4º ESO', 'Química', 'Sistema periódico: configuración electrónica y propiedades periódicas.', ARRAY['CMCT']),
('Física y Química', '4º ESO', 'Química', 'Enlaces químicos: iónico, covalente, metálico.', ARRAY['CMCT']),
('Física y Química', '4º ESO', 'Química', 'Formulación y nomenclatura inorgánica completa.', ARRAY['CMCT', 'CCL']),
('Física y Química', '4º ESO', 'Química', 'Reacciones químicas: cálculos estequiométricos.', ARRAY['CMCT']),
('Física y Química', '4º ESO', 'Química', 'Química orgánica: hidrocarburos y grupos funcionales.', ARRAY['CMCT']),
('Física y Química', '4º ESO', 'Física', 'Cinemática: movimiento rectilíneo uniforme y uniformemente acelerado.', ARRAY['CMCT']),
('Física y Química', '4º ESO', 'Física', 'Dinámica: fuerzas, leyes de Newton, aplicaciones.', ARRAY['CMCT']),
('Física y Química', '4º ESO', 'Física', 'Trabajo y energía: energía mecánica, cinética, potencial.', ARRAY['CMCT', 'CE']),
('Física y Química', '4º ESO', 'Física', 'Física nuclear: radiactividad, fisión y fusión.', ARRAY['CMCT', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.FQ.4E.1', 'Física y Química', '4º ESO', 1, 'Describir modelos atómicos y configuración electrónica.', ARRAY['CMCT'], 'Comprender'),
('CE.FQ.4E.2', 'Física y Química', '4º ESO', 2, 'Formular y nombrar compuestos inorgánicos.', ARRAY['CMCT', 'CCL'], 'Aplicar'),
('CE.FQ.4E.3', 'Física y Química', '4º ESO', 3, 'Realizar cálculos estequiométricos en reacciones químicas.', ARRAY['CMCT'], 'Aplicar'),
('CE.FQ.4E.4', 'Física y Química', '4º ESO', 4, 'Identificar hidrocarburos y grupos funcionales.', ARRAY['CMCT'], 'Comprender'),
('CE.FQ.4E.5', 'Física y Química', '4º ESO', 5, 'Resolver problemas de cinemática y dinámica.', ARRAY['CMCT'], 'Aplicar'),
('CE.FQ.4E.6', 'Física y Química', '4º ESO', 6, 'Aplicar el principio de conservación de la energía.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.FQ.4E.7', 'Física y Química', '4º ESO', 7, 'Explicar fenómenos nucleares y sus aplicaciones.', ARRAY['CMCT', 'CC'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 5. INGLÉS (LENGUA EXTRANJERA) - 4º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Inglés', '4º ESO', 'Comprensión oral', 'Comprensión de discursos académicos y profesionales.', ARRAY['CP', 'CCL', 'CD']),
('Inglés', '4º ESO', 'Comprensión oral', 'Comprensión de películas, documentales y programas en inglés.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés', '4º ESO', 'Producción oral', 'Presentaciones académicas formales con soporte multimedia.', ARRAY['CP', 'CCL', 'CD']),
('Inglés', '4º ESO', 'Producción oral', 'Participación en debates formales sobre temas controvertidos.', ARRAY['CP', 'CPSAA', 'CC']),
('Inglés', '4º ESO', 'Comprensión lectora', 'Textos literarios contemporáneos: novelas, relatos.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés', '4º ESO', 'Comprensión lectora', 'Textos especializados: científicos, técnicos, periodísticos.', ARRAY['CP', 'CCL', 'CMCT']),
('Inglés', '4º ESO', 'Producción escrita', 'Ensayos académicos y textos de investigación.', ARRAY['CP', 'CCL', 'CD']),
('Inglés', '4º ESO', 'Producción escrita', 'Escritura creativa: cuentos, poemas, guiones.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés', '4º ESO', 'Gramática', 'Tiempos verbales avanzados: present perfect continuous, past perfect.', ARRAY['CP', 'CCL']),
('Inglés', '4º ESO', 'Gramática', 'Condicionales mixtas y wish.', ARRAY['CP', 'CCL']),
('Inglés', '4º ESO', 'Gramática', 'Oraciones de relativo especificativas y explicativas.', ARRAY['CP', 'CCL']),
('Inglés', '4º ESO', 'Cultura', 'Literatura anglófona: autores clásicos y contemporáneos.', ARRAY['CP', 'CCL', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.4E.1', 'Inglés', '4º ESO', 1, 'Comprender discursos académicos y medios audiovisuales.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.4E.2', 'Inglés', '4º ESO', 2, 'Realizar presentaciones formales efectivas.', ARRAY['CP', 'CCL', 'CD'], 'Crear'),
('CE.ING.4E.3', 'Inglés', '4º ESO', 3, 'Leer y comprender textos literarios y especializados.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.4E.4', 'Inglés', '4º ESO', 4, 'Escribir ensayos y textos creativos de calidad.', ARRAY['CP', 'CCL'], 'Crear'),
('CE.ING.4E.5', 'Inglés', '4º ESO', 5, 'Usar correctamente estructuras gramaticales avanzadas.', ARRAY['CP', 'CCL'], 'Aplicar'),
('CE.ING.4E.6', 'Inglés', '4º ESO', 6, 'Conocer autores y obras de la literatura anglófona.', ARRAY['CP', 'CCL', 'CCEC'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- RESUMEN - 4º ESO
-- =====================================================

-- TOTAL: 56 saberes básicos + 34 criterios de evaluación
-- 5 asignaturas principales de 4º ESO
-- Nivel: 15-16 años - Último curso ESO
-- Preparación para Bachillerato
-- Base legal: Real Decreto 217/2022

SELECT 'Currículo completo de 4º ESO cargado correctamente - 5 asignaturas' AS status;
