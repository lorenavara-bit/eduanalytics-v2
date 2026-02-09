-- =====================================================
-- CURRÍCULO COMPLETO 1º DE ESO
-- Real Decreto 217/2022 - Enseñanzas Mínimas ESO
-- =====================================================
-- Adaptado a estudiantes de 12-13 años
-- Primer curso de Educación Secundaria Obligatoria
-- =====================================================

-- =====================================================
-- 1. MATEMÁTICAS - 1º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '1º ESO', 'Sentido numérico', 'Números enteros, decimales y fracciones: operaciones y jerarquía.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '1º ESO', 'Sentido numérico', 'Divisibilidad: múltiplos, divisores, números primos, mcm y mcd.', ARRAY['CMCT']),
('Matemáticas', '1º ESO', 'Sentido numérico', 'Potencias de exponente natural. Notación científica básica.', ARRAY['CMCT']),
('Matemáticas', '1º ESO', 'Sentido numérico', 'Números racionales: representación en la recta numérica.', ARRAY['CMCT']),
('Matemáticas', '1º ESO', 'Sentido algebraico', 'Expresiones algebraicas: monomios y polinomios.', ARRAY['CMCT']),
('Matemáticas', '1º ESO', 'Sentido algebraico', 'Ecuaciones de primer grado con una incógnita.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '1º ESO', 'Sentido espacial', 'Perímetros, áreas y volúmenes de figuras y cuerpos geométricos.', ARRAY['CMCT']),
('Matemáticas', '1º ESO', 'Sentido espacial', 'Teorema de Pitágoras: introducción y aplicaciones básicas.', ARRAY['CMCT']),
('Matemáticas', '1º ESO', 'Sentido de la medida', 'Sistema métrico decimal: conversiones entre unidades.', ARRAY['CMCT']),
('Matemáticas', '1º ESO', 'Sentido estocástico', 'Estadística: media aritmética, moda y mediana.', ARRAY['CMCT', 'CD']),
('Matemáticas', '1º ESO', 'Sentido estocástico', 'Gráficos estadísticos: barras, sectores, líneas.', ARRAY['CMCT', 'CD']),
('Matemáticas', '1º ESO', 'Sentido estocástico', 'Probabilidad: cálculo de probabilidades sencillas.', ARRAY['CMCT'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.1E.1', 'Matemáticas', '1º ESO', 1, 'Realizar operaciones con números enteros, decimales y fracciones.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.1E.2', 'Matemáticas', '1º ESO', 2, 'Traducir enunciados a expresiones algebraicas.', ARRAY['CMCT', 'CCL'], 'Aplicar'),
('CE.MAT.1E.3', 'Matemáticas', '1º ESO', 3, 'Resolver ecuaciones de primer grado.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.1E.4', 'Matemáticas', '1º ESO', 4, 'Calcular áreas y volúmenes de figuras geométricas.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.1E.5', 'Matemáticas', '1º ESO', 5, 'Aplicar el teorema de Pitágoras a problemas geométricos.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.1E.6', 'Matemáticas', '1º ESO', 6, 'Calcular medidas de centralización en conjuntos de datos.', ARRAY['CMCT', 'CD'], 'Aplicar'),
('CE.MAT.1E.7', 'Matemáticas', '1º ESO', 7, 'Interpretar y construir gráficos estadísticos.', ARRAY['CMCT', 'CD'], 'Analizar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. LENGUA CASTELLANA Y LITERATURA - 1º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura', '1º ESO', 'Comunicación oral', 'Exposiciones orales planificadas sobre temas diversos.', ARRAY['CCL', 'CD']),
('Lengua Castellana y Literatura', '1º ESO', 'Comunicación oral', 'Comprensión de textos orales: informativos, argumentativos, narrativos.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '1º ESO', 'Comprensión lectora', 'Lectura comprensiva de textos de diferentes géneros y épocas.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '1º ESO', 'Comprensión lectora', 'Análisis de la estructura y contenido de textos.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '1º ESO', 'Producción escrita', 'Redacción de textos narrativos, descriptivos y dialogados.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '1º ESO', 'Producción escrita', 'Ortografía y puntuación: normas avanzadas.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '1º ESO', 'Reflexión sobre la lengua', 'Análisis morfológico completo: categorías gramaticales.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '1º ESO', 'Reflexión sobre la lengua', 'Análisis sintáctico: oración simple, sujeto y predicado.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '1º ESO', 'Reflexión sobre la lengua', 'Complementos del verbo: CD, CI, CC.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '1º ESO', 'Educación literaria', 'Literatura medieval: características generales, El Cantar de Mio Cid.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '1º ESO', 'Educación literaria', 'Géneros literarios: narrativa, lírica, teatro.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '1º ESO', 'Educación literaria', 'Recursos literarios: metáfora, símil, personificación, hipérbole, ironía.', ARRAY['CCL', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.1E.1', 'Lengua Castellana y Literatura', '1º ESO', 1, 'Realizar exposiciones orales estructuradas y bien documentadas.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LCL.1E.2', 'Lengua Castellana y Literatura', '1º ESO', 2, 'Comprender y analizar textos de diferentes géneros.', ARRAY['CCL'], 'Analizar'),
('CE.LCL.1E.3', 'Lengua Castellana y Literatura', '1º ESO', 3, 'Redactar textos coherentes y bien cohesionados.', ARRAY['CCL', 'CCEC'], 'Crear'),
('CE.LCL.1E.4', 'Lengua Castellana y Literatura', '1º ESO', 4, 'Realizar análisis morfológico y sintáctico de oraciones simples.', ARRAY['CCL'], 'Analizar'),
('CE.LCL.1E.5', 'Lengua Castellana y Literatura', '1º ESO', 5, 'Identificar y analizar recursos literarios en textos.', ARRAY['CCL', 'CCEC'], 'Analizar'),
('CE.LCL.1E.6', 'Lengua Castellana y Literatura', '1º ESO', 6, 'Conocer características de la literatura medieval.', ARRAY['CCL', 'CCEC'], 'Comprender'),
('CE.LCL.1E.7', 'Lengua Castellana y Literatura', '1º ESO', 7, 'Aplicar correctamente normas ortográficas y de puntuación.', ARRAY['CCL'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 3. GEOGRAFÍA E HISTORIA - 1º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Geografía e Historia', '1º ESO', 'Geografía', 'La Tierra y su representación: paralelos, meridianos, coordenadas geográficas.', ARRAY['CC', 'CMCT']),
('Geografía e Historia', '1º ESO', 'Geografía', 'Relieve terrestre: continentes y océanos. Principales accidentes geográficos.', ARRAY['CC', 'CCL']),
('Geografía e Historia', '1º ESO', 'Geografía', 'Climas de la Tierra: factores y elementos climáticos.', ARRAY['CC', 'CMCT']),
('Geografía e Historia', '1º ESO', 'Geografía', 'Zonas climáticas y paisajes naturales.', ARRAY['CC', 'CMCT', 'CCEC']),
('Geografía e Historia', '1º ESO', 'Geografía', 'Cartografía: interpretación de mapas, escalas y símbolos.', ARRAY['CC', 'CMCT', 'CD']),
('Geografía e Historia', '1º ESO', 'Historia', 'La Prehistoria: Paleolítico, Neolítico y Edad de los Metales.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '1º ESO', 'Historia', 'Las primeras civilizaciones: Mesopotamia, Egipto, Grecia, Roma.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '1º ESO', 'Historia', 'El legado de las civilizaciones clásicas: arte, filosofía, derecho.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '1º ESO', 'Historia', 'La Península Ibérica en la Antigüedad: pueblos prerromanos y romanización.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '1º ESO', 'Metodología', 'Fuentes históricas: primarias y secundarias.', ARRAY['CC', 'CD'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.GH.1E.1', 'Geografía e Historia', '1º ESO', 1, 'Localizar lugares en mapas utilizando coordenadas geográficas.', ARRAY['CC', 'CMCT'], 'Aplicar'),
('CE.GH.1E.2', 'Geografía e Historia', '1º ESO', 2, 'Describir las características de diferentes climas y paisajes.', ARRAY['CC', 'CMCT'], 'Comprender'),
('CE.GH.1E.3', 'Geografía e Historia', '1º ESO', 3, 'Explicar las características de la Prehistoria y sus etapas.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.GH.1E.4', 'Geografía e Historia', '1º ESO', 4, 'Comparar las civilizaciones de Mesopotamia, Egipto, Grecia y Roma.', ARRAY['CC', 'CCEC'], 'Analizar'),
('CE.GH.1E.5', 'Geografía e Historia', '1º ESO', 5, 'Valorar el legado cultural de las civilizaciones clásicas.', ARRAY['CC', 'CCEC'], 'Evaluar'),
('CE.GH.1E.6', 'Geografía e Historia', '1º ESO', 6, 'Interpretar mapas usando escalas y simbología.', ARRAY['CC', 'CMCT', 'CD'], 'Aplicar'),
('CE.GH.1E.7', 'Geografía e Historia', '1º ESO', 7, 'Distinguir entre fuentes históricas primarias y secundarias.', ARRAY['CC', 'CD'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 4. BIOLOGÍA Y GEOLOGÍA - 1º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Biología y Geología', '1º ESO', 'La Tierra', 'El universo y el sistema solar: componentes y características.', ARRAY['CMCT']),
('Biología y Geología', '1º ESO', 'La Tierra', 'La Tierra: estructura interna (corteza, manto, núcleo).', ARRAY['CMCT']),
('Biología y Geología', '1º ESO', 'Geología', 'Minerales y rocas: clasificación y propiedades.', ARRAY['CMCT']),
('Biología y Geología', '1º ESO', 'Geología', 'El ciclo de las rocas.', ARRAY['CMCT', 'CC']),
('Biología y Geología', '1º ESO', 'La atmósfera', 'Composición y estructura de la atmósfera terrestre.', ARRAY['CMCT']),
('Biología y Geología', '1º ESO', 'La hidrosfera', 'El agua en la Tierra: distribución y ciclo del agua.', ARRAY['CMCT', 'CC']),
('Biología y Geología', '1º ESO', 'La biosfera', 'Características de los seres vivos: funciones vitales.', ARRAY['CMCT']),
('Biología y Geología', '1º ESO', 'La biosfera', 'Niveles de organización de la materia viva.', ARRAY['CMCT']),
('Biología y Geología', '1º ESO', 'La biosfera', 'La célula: estructura y tipos (procariota, eucariota).', ARRAY['CMCT']),
('Biología y Geología', '1º ESO', 'Biodiversidad', 'Clasificación de los seres vivos: los cinco reinos.', ARRAY['CMCT', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.BG.1E.1', 'Biología y Geología', '1º ESO', 1, 'Describir la estructura de la Tierra y del sistema solar.', ARRAY['CMCT'], 'Comprender'),
('CE.BG.1E.2', 'Biología y Geología', '1º ESO', 2, 'Clasificar minerales y rocas según sus características.', ARRAY['CMCT'], 'Comprender'),
('CE.BG.1E.3', 'Biología y Geología', '1º ESO', 3, 'Explicar el ciclo del agua y su importancia.', ARRAY['CMCT', 'CC'], 'Comprender'),
('CE.BG.1E.4', 'Biología y Geología', '1º ESO', 4, 'Describir la estructura de la célula y sus tipos.', ARRAY['CMCT'], 'Comprender'),
('CE.BG.1E.5', 'Biología y Geología', '1º ESO', 5, 'Clasificar seres vivos según los cinco reinos.', ARRAY['CMCT', 'CC'], 'Comprender'),
('CE.BG.1E.6', 'Biología y Geología', '1º ESO', 6, 'Explicar las funciones vitales de los seres vivos.', ARRAY['CMCT'], 'Comprender'),
('CE.BG.1E.7', 'Biología y Geología', '1º ESO', 7, 'Valorar la importancia de la conservación del medio ambiente.', ARRAY['CMCT', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 5. INGLÉS (LENGUA EXTRANJERA) - 1º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Inglés', '1º ESO', 'Comprensión oral', 'Comprensión de conversaciones y textos orales sobre temas variados.', ARRAY['CP', 'CCL']),
('Inglés', '1º ESO', 'Comprensión oral', 'Identificación de información específica y general en textos orales.', ARRAY['CP', 'CCL']),
('Inglés', '1º ESO', 'Producción oral', 'Participación en conversaciones sobre temas cotidianos y de interés.', ARRAY['CP', 'CPSAA']),
('Inglés', '1º ESO', 'Producción oral', 'Descripción y narración de hechos, experiencias y planes.', ARRAY['CP', 'CCL']),
('Inglés', '1º ESO', 'Comprensión lectora', 'Lectura y comprensión de textos adaptados de diversos géneros.', ARRAY['CP', 'CCL']),
('Inglés', '1º ESO', 'Comprensión lectora', 'Estrategias de comprensión lectora: predicción, inferencia.', ARRAY['CP', 'CCL', 'CPSAA']),
('Inglés', '1º ESO', 'Producción escrita', 'Redacción de textos breves: cartas, emails, descripciones, narraciones.', ARRAY['CP', 'CCL', 'CD']),
('Inglés', '1º ESO', 'Gramática', 'Tiempos verbales: presente simple, presente continuo, pasado simple, futuro.', ARRAY['CP', 'CCL']),
('Inglés', '1º ESO', 'Gramática', 'Adjetivos comparativos y superlativos.', ARRAY['CP', 'CCL']),
('Inglés', '1º ESO', 'Gramática', 'Pronombres personales, posesivos y demostrativos.', ARRAY['CP', 'CCL']),
('Inglés', '1º ESO', 'Vocabulario', 'Vocabulario temático: vida cotidiana, hobbies, viajes, tecnología.', ARRAY['CP']),
('Inglés', '1º ESO', 'Cultura', 'Aspectos culturales de países anglófonos.', ARRAY['CP', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.1E.1', 'Inglés', '1º ESO', 1, 'Comprender información específica en textos orales.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.1E.2', 'Inglés', '1º ESO', 2, 'Participar activamente en conversaciones en inglés.', ARRAY['CP', 'CPSAA'], 'Aplicar'),
('CE.ING.1E.3', 'Inglés', '1º ESO', 3, 'Leer y comprender textos adaptados.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.1E.4', 'Inglés', '1º ESO', 4, 'Escribir textos breves con corrección gramatical.', ARRAY['CP', 'CCL', 'CD'], 'Crear'),
('CE.ING.1E.5', 'Inglés', '1º ESO', 5, 'Usar correctamente los tiempos verbales básicos.', ARRAY['CP', 'CCL'], 'Aplicar'),
('CE.ING.1E.6', 'Inglés', '1º ESO', 6, 'Conocer aspectos culturales de países anglófonos.', ARRAY['CP', 'CCEC', 'CC'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- RESUMEN - 1º ESO
-- =====================================================

-- TOTAL: 56 saberes básicos + 34 criterios de evaluación
-- 5 asignaturas principales de 1º ESO
-- Nivel: 12-13 años - Primer curso de Secundaria
-- Base legal: Real Decreto 217/2022

SELECT 'Currículo completo de 1º ESO cargado correctamente - 5 asignaturas' AS status;
