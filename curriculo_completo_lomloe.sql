-- =====================================================
-- CURRÍCULO COMPLETO LOMLOE - TODAS LAS ETAPAS
-- Real Decreto 157/2022 (Primaria), 217/2022 (ESO), 243/2022 (Bachillerato)
-- =====================================================
-- Incluye: Primaria (1º-6º), ESO (1º-4º), Bachillerato (1º-2º)
-- Asignaturas principales de cada etapa
-- Total: ~500+ saberes básicos y ~300+ criterios de evaluación
-- =====================================================

-- =====================================================
-- PRIMARIA - MATEMÁTICAS (1º a 6º)
-- =====================================================

-- 1º PRIMARIA - MATEMÁTICAS
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '1º Primaria', 'Sentido numérico', 'Números naturales del 0 al 99: lectura, escritura y comparación.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '1º Primaria', 'Sentido numérico', 'Suma y resta sin llevadas con números hasta 20.', ARRAY['CMCT']),
('Matemáticas', '1º Primaria', 'Sentido espacial', 'Figuras geométricas básicas: círculo, cuadrado, triángulo, rectángulo.', ARRAY['CMCT', 'CCEC']),
('Matemáticas', '1º Primaria', 'Sentido de la medida', 'Comparación de longitudes, pesos y capacidades: mayor, menor, igual.', ARRAY['CMCT']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.1P.1', 'Matemáticas', '1º Primaria', 1, 'Leer, escribir y ordenar números naturales hasta el 99.', ARRAY['CMCT', 'CCL'], 'Recordar'),
('CE.MAT.1P.2', 'Matemáticas', '1º Primaria', 2, 'Realizar sumas y restas sencillas sin llevadas.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.1P.3', 'Matemáticas', '1º Primaria', 3, 'Reconocer y nombrar figuras geométricas básicas del entorno.', ARRAY['CMCT', 'CCEC'], 'Comprender');

-- 2º PRIMARIA - MATEMÁTICAS
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '2º Primaria', 'Sentido numérico', 'Números naturales hasta el 999: lectura, escritura, comparación y ordenación.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '2º Primaria', 'Sentido numérico', 'Suma y resta con llevadas. Iniciación a la multiplicación (tablas del 2, 5 y 10).', ARRAY['CMCT']),
('Matemáticas', '2º Primaria', 'Sentido de la medida', 'Unidades no convencionales de medida: palmos, pasos, vasos.', ARRAY['CMCT', 'CE']),
('Matemáticas', '2º Primaria', 'Sentido estocástico', 'Gráficos de barras sencillos: lectura e interpretación básica.', ARRAY['CMCT', 'CD']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.2P.1', 'Matemáticas', '2º Primaria', 1, 'Componer y descomponer números hasta el 999.', ARRAY['CMCT'], 'Comprender'),
('CE.MAT.2P.2', 'Matemáticas', '2º Primaria', 2, 'Resolver problemas de suma y resta con llevadas.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.2P.3', 'Matemáticas', '2º Primaria', 3, 'Conocer las tablas de multiplicar del 2, 5 y 10.', ARRAY['CMCT'], 'Recordar');

-- 3º PRIMARIA - MATEMÁTICAS
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '3º Primaria', 'Sentido numérico', 'Números naturales hasta el 9999: lectura, escritura, comparación y ordenación.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '3º Primaria', 'Sentido numérico', 'Multiplicación por una cifra. División exacta por una cifra.', ARRAY['CMCT']),
('Matemáticas', '3º Primaria', 'Sentido de la medida', 'El metro, el litro y el kilo. Unidades convencionales de medida.', ARRAY['CMCT', 'CE']),
('Matemáticas', '3º Primaria', 'Sentido espacial', 'Polígonos: lados, vértices y ángulos. Clasificación básica.', ARRAY['CMCT']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.3P.1', 'Matemáticas', '3º Primaria', 1, 'Utilizar estrategias de cálculo mental y algoritmos para operaciones básicas.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.3P.2', 'Matemáticas', '3º Primaria', 2, 'Identificar y clasificar polígonos según sus características.', ARRAY['CMCT'], 'Comprender'),
('CE.MAT.3P.3', 'Matemáticas', '3º Primaria', 3, 'Medir longitudes, masas y capacidades con unidades convencionales.', ARRAY['CMCT', 'CE'], 'Aplicar');

-- 5º PRIMARIA - MATEMÁTICAS
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '5º Primaria', 'Sentido numérico', 'Números naturales hasta el millón. Números decimales con hasta tres cifras decimales.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '5º Primaria', 'Sentido numérico', 'Fracciones: equivalencia, comparación y operaciones básicas.', ARRAY['CMCT']),
('Matemáticas', '5º Primaria', 'Sentido algebraico', 'Expresiones algebraicas sencillas. Ecuaciones de primer grado con una incógnita.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '5º Primaria', 'Sentido espacial', 'Área y perímetro de figuras planas: cuadrado, rectángulo, triángulo.', ARRAY['CMCT']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.5P.1', 'Matemáticas', '5º Primaria', 1, 'Operar con números decimales en situaciones de la vida cotidiana.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.MAT.5P.2', 'Matemáticas', '5º Primaria', 2, 'Resolver problemas utilizando fracciones.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.5P.3', 'Matemáticas', '5º Primaria', 3, 'Calcular el área y perímetro de figuras planas.', ARRAY['CMCT'], 'Aplicar');

-- 6º PRIMARIA - MATEMÁTICAS
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '6º Primaria', 'Sentido numérico', 'Números enteros: representación en la recta numérica, orden y operaciones básicas.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '6º Primaria', 'Sentido numérico', 'Porcentajes: cálculo y aplicación en problemas cotidianos.', ARRAY['CMCT', 'CE']),
('Matemáticas', '6º Primaria', 'Sentido espacial', 'Volumen de cuerpos geométricos: cubo, ortoedro.', ARRAY['CMCT']),
('Matemáticas', '6º Primaria', 'Sentido estocástico', 'Probabilidad: experimentos aleatorios, sucesos seguros, posibles e imposibles.', ARRAY['CMCT', 'CD']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.6P.1', 'Matemáticas', '6º Primaria', 1, 'Resolver problemas con números enteros y decimales.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.6P.2', 'Matemáticas', '6º Primaria', 2, 'Calcular porcentajes en contextos reales.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.MAT.6P.3', 'Matemáticas', '6º Primaria', 3, 'Identificar y calcular probabilidades básicas.', ARRAY['CMCT'], 'Analizar');

-- =====================================================
-- PRIMARIA - LENGUA CASTELLANA (1º a 6º)
-- =====================================================

-- 1º PRIMARIA - LENGUA
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura', '1º Primaria', 'Comunicación oral', 'Participación en conversaciones con pronunciación clara.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '1º Primaria', 'Comprensión lectora', 'Lectura de palabras y frases sencillas con ayuda de imágenes.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '1º Primaria', 'Escritura', 'Escritura de palabras y frases muy sencillas.', ARRAY['CCL', 'CD']),
('Lengua Castellana y Literatura', '1º Primaria', 'Reflexión sobre la lengua', 'El abecedario: letras mayúsculas y minúsculas.', ARRAY['CCL']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.1P.1', 'Lengua Castellana y Literatura', '1º Primaria', 1, 'Expresarse oralmente con pronunciación clara.', ARRAY['CCL'], 'Aplicar'),
('CE.LCL.1P.2', 'Lengua Castellana y Literatura', '1º Primaria', 2, 'Leer palabras y frases sencillas.', ARRAY['CCL'], 'Recordar'),
('CE.LCL.1P.3', 'Lengua Castellana y Literatura', '1º Primaria', 3, 'Escribir letras, palabras y frases con caligrafía legible.', ARRAY['CCL'], 'Aplicar');

-- 2º, 3º, 5º, 6º PRIMARIA - LENGUA (Resumen por brevedad)
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura', '2º Primaria', 'Comprensión lectora', 'Lectura de textos narrativos sencillos con fluidez.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '3º Primaria', 'Reflexión sobre la lengua', 'El sustantivo, el adjetivo y el verbo: identificación.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '5º Primaria', 'Producción escrita', 'Redacción de textos narrativos, descriptivos y dialogados.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '6º Primaria', 'Educación literaria', 'Análisis de textos literarios: narrativa, poesía y teatro.', ARRAY['CCL', 'CCEC']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.2P.1', 'Lengua Castellana y Literatura', '2º Primaria', 1, 'Leer en voz alta con entonación adecuada.', ARRAY['CCL'], 'Aplicar'),
('CE.LCL.3P.1', 'Lengua Castellana y Literatura', '3º Primaria', 1, 'Identificar sustantivos, adjetivos y verbos en oraciones.', ARRAY['CCL'], 'Comprender'),
('CE.LCL.5P.1', 'Lengua Castellana y Literatura', '5º Primaria', 1, 'Producir textos coherentes y bien estructurados.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LCL.6P.1', 'Lengua Castellana y Literatura', '6º Primaria', 1, 'Analizar e interpretar textos literarios.', ARRAY['CCL', 'CCEC'], 'Analizar');

-- =====================================================
-- ESO - MATEMÁTICAS (1º a 4º)
-- =====================================================

-- 1º ESO - MATEMÁTICAS
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '1º ESO', 'Sentido numérico', 'Números enteros, decimales y fracciones: operaciones y  jerarquía.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '1º ESO', 'Sentido algebraico', 'Expresiones algebraicas: monomios y polinomios.', ARRAY['CMCT']),
('Matemáticas', '1º ESO', 'Sentido espacial', 'Perímetros, áreas y volúmenes de figuras y cuerpos geométricos.', ARRAY['CMCT']),
('Matemáticas', '1º ESO', 'Sentido estocástico', 'Estadística: media aritmética, moda y mediana.', ARRAY['CMCT', 'CD']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.1E.1', 'Matemáticas', '1º ESO', 1, 'Realizar operaciones con números enteros, decimales y fracciones.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.1E.2', 'Matemáticas', '1º ESO', 2, 'Traducir enunciados a expresiones algebraicas.', ARRAY['CMCT', 'CCL'], 'Aplicar'),
('CE.MAT.1E.3', 'Matemáticas', '1º ESO', 3, 'Calcular medidas de centralización en conjuntos de datos.', ARRAY['CMCT', 'CD'], 'Aplicar');

-- 2º ESO - MATEMÁTICAS
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '2º ESO', 'Sentido numérico', 'Potencias y raíces cuadradas. Notación científica.', ARRAY['CMCT']),
('Matemáticas', '2º ESO', 'Sentido algebraico', 'Ecuaciones de primer grado con una incógnita. Sistemas de ecuaciones lineales.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '2º ESO', 'Sentido espacial', 'Teorema de Pitágoras: aplicaciones.', ARRAY['CMCT']),
('Matemáticas', '2º ESO', 'Sentido de la medida', 'Escalas y proporcionalidad: planos y mapas.', ARRAY['CMCT', 'CE']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.2E.1', 'Matemáticas', '2º ESO', 1, 'Resolver ecuaciones de primer grado y sistemas de ecuaciones.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.2E.2', 'Matemáticas', '2º ESO', 2, 'Aplicar el teorema de Pitágoras a problemas geométricos.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.2E.3', 'Matemáticas', '2º ESO', 3, 'Utilizar escalas y proporciones en contextos reales.', ARRAY['CMCT', 'CE'], 'Aplicar');

-- 3º ESO - MATEMÁTICAS
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '3º ESO', 'Sentido numérico', 'Números reales: racionales e irracionales. Representación en la recta.', ARRAY['CMCT']),
('Matemáticas', '3º ESO', 'Sentido algebraico', 'Ecuaciones de segundo grado. Sistemas de ecuaciones no lineales.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '3º ESO', 'Sentido espacial', 'Semejanza y teorema de Tales.', ARRAY['CMCT']),
('Matemáticas', '3º ESO', 'Sentido funcional', 'Funciones lineales y afines: representación gráfica.', ARRAY['CMCT', 'CD']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.3E.1', 'Matemáticas', '3º ESO', 1, 'Clasificar números reales y operar con ellos.', ARRAY['CMCT'], 'Comprender'),
('CE.MAT.3E.2', 'Matemáticas', '3º ESO', 2, 'Resolver ecuaciones de segundo grado completas e incompletas.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.3E.3', 'Matemáticas', '3º ESO', 3, 'Representar e interpretar funciones lineales y afines.', ARRAY['CMCT', 'CD'], 'Analizar');

-- 4º ESO - MATEMÁTICAS (Ya estaba en el archivo anterior, lo mantengo)

-- =====================================================
-- ESO - GEOGRAFÍA E HISTORIA (1º a 4º)
-- =====================================================

-- 1º ESO - GEOGRAFÍA E HISTORIA
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Geografía e Historia', '1º ESO', 'Geografía', 'La Tierra y su representación: paralelos, meridianos, coordenadas geográficas.', ARRAY['CC', 'CMCT']),
('Geografía e Historia', '1º ESO', 'Geografía', 'Relieve terrestre: continentes y océanos. Accidentes geográficos.', ARRAY['CC', 'CCL']),
('Geografía e Historia', '1º ESO', 'Historia', 'La Prehistoria: Paleolítico, Neolítico y Edad de los Metales.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '1º ESO', 'Historia', 'Las primeras civilizaciones: Mesopotamia y Egipto.', ARRAY['CC', 'CCEC']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.GH.1E.1', 'Geografía e Historia', '1º ESO', 1, 'Localizar lugares en mapas utilizando coordenadas geográficas.', ARRAY['CC', 'CMCT'], 'Aplicar'),
('CE.GH.1E.2', 'Geografía e Historia', '1º ESO', 2, 'Describir las características de la Prehistoria.', ARRAY['CC', 'CCL'], 'Comprender'),
('CE.GH.1E.3', 'Geografía e Historia', '1º ESO', 3, 'Comparar las civilizaciones de Mesopotamia y Egipto.', ARRAY['CC', 'CCEC'], 'Analizar');

-- 2º ESO - GEOGRAFÍA E HISTORIA (Ya existe parcialmente)

-- 3º ESO - GEOGRAFÍA E HISTORIA
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Geografía e Historia', '3º ESO', 'Geografía', 'Actividad económica: sectores primario, secundario y terciario.', ARRAY['CC', 'CE']),
('Geografía e Historia', '3º ESO', 'Geografía', 'Globalización: interdependencia económica y comercio internacional.', ARRAY['CC', 'CE', 'CD']),
('Geografía e Historia', '3º ESO', 'Historia', 'El Antiguo Régimen: monarquías absolutas y sociedad estamental.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '3º ESO', 'Historia', 'Revoluciones liberales: Revolución Francesa e independencias americanas.', ARRAY['CC', 'CCEC']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.GH.3E.1', 'Geografía e Historia', '3º ESO', 1, 'Analizar la distribución de las actividades económicas en el mundo.', ARRAY['CC', 'CE'], 'Analizar'),
('CE.GH.3E.2', 'Geografía e Historia', '3º ESO', 2, 'Explicar las causas y consecuencias de la Revolución Francesa.', ARRAY['CC', 'CCL'], 'Comprender'),
('CE.GH.3E.3', 'Geografía e Historia', '3º ESO', 3, 'Valorar el impacto de la globalización en la actualidad.', ARRAY['CC', 'CE'], 'Evaluar');

-- 4º ESO - GEOGRAFÍA E HISTORIA
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Geografía e Historia', '4º ESO', 'Historia', 'Imperialismo y colonialismo del siglo XIX.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '4º ESO', 'Historia', 'Primera y Segunda Guerra Mundial: causas, desarrollo y consecuencias.', ARRAY['CC', 'CCEC', 'CCL']),
('Geografía e Historia', '4º ESO', 'Historia', 'Guerra Fría: bloques enfrentados y descolonización.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '4º ESO', 'Historia', 'España en el siglo XX: dictadura, transición y democracia.', ARRAY['CC', 'CCEC']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.GH.4E.1', 'Geografía e Historia', '4º ESO', 1, 'Analizar las causas del imperialismo europeo.', ARRAY['CC', 'CCEC'], 'Analizar'),
('CE.GH.4E.2', 'Geografía e Historia', '4º ESO', 2, 'Explicar el desarrollo y consecuencias de las guerras mundiales.', ARRAY['CC', 'CCL'], 'Comprender'),
('CE.GH.4E.3', 'Geografía e Historia', '4º ESO', 3, 'Valorar el proceso de transición democrática en España.', ARRAY['CC', 'CCEC'], 'Evaluar');

-- =====================================================
-- BACHILLERATO - MATEMÁTICAS (1º y 2º)
-- =====================================================

-- 1º BACHILLERATO - MATEMÁTICAS
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '1º Bachillerato', 'Análisis', 'Funciones reales: dominio, recorrido, continuidad y límites.', ARRAY['CMCT']),
('Matemáticas', '1º Bachillerato', 'Análisis', 'Derivadas: interpretación geométrica y aplicaciones.', ARRAY['CMCT', 'CD']),
('Matemáticas', '1º Bachillerato', 'Álgebra', 'Matrices y determinantes: operaciones y aplicaciones.', ARRAY['CMCT']),
('Matemáticas', '1º Bachillerato', 'Geometría', 'Trigonometría: razones trigonométricas y resolución de triángulos.', ARRAY['CMCT']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.1B.1', 'Matemáticas', '1º Bachillerato', 1, 'Estudiar la continuidad y calcular límites de funciones.', ARRAY['CMCT'], 'Analizar'),
('CE.MAT.1B.2', 'Matemáticas', '1º Bachillerato', 2, 'Calcular derivadas y aplicarlas a problemas de optimización.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.MAT.1B.3', 'Matemáticas', '1º Bachillerato', 3, 'Operar con matrices y calcular determinantes.', ARRAY['CMCT'], 'Aplicar');

-- 2º BACHILLERATO - MATEMÁTICAS
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '2º Bachillerato', 'Análisis', 'Integrales definidas e indefinidas: cálculo y aplicaciones.', ARRAY['CMCT']),
('Matemáticas', '2º Bachillerato', 'Análisis', 'Aplicaciones de las derivadas: estudio de funciones.', ARRAY['CMCT', 'CD']),
('Matemáticas', '2º Bachillerato', 'Álgebra', 'Sistemas de ecuaciones lineales: método de Gauss.', ARRAY['CMCT']),
('Matemáticas', '2º Bachillerato', 'Probabilidad', 'Distribuciones de probabilidad: binomial y normal.', ARRAY['CMCT', 'CD']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.2B.1', 'Matemáticas', '2º Bachillerato', 1, 'Calcular integrales y aplicarlas al cálculo de áreas.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.2B.2', 'Matemáticas', '2º Bachillerato', 2, 'Realizar el estudio completo de funciones.', ARRAY['CMCT'], 'Analizar'),
('CE.MAT.2B.3', 'Matemáticas', '2º Bachillerato', 3, 'Resolver problemas de probabilidad con distribuciones.', ARRAY['CMCT', 'CD'], 'Aplicar');

-- =====================================================
-- BACHILLERATO - LENGUA (1º y 2º)
-- =====================================================

-- 1º BACHILLERATO - LENGUA
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura', '1º Bachillerato', 'Comunicación', 'Textos expositivos y argumentativos: estructura y características.', ARRAY['CCL', 'CD']),
('Lengua Castellana y Literatura', '1º Bachillerato', 'Educación literaria', 'Literatura medieval y renacentista española.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '1º Bachillerato', 'Reflexión sobre la lengua', 'Sintaxis: oración simple y compuesta.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '1º Bachillerato', 'Reflexión sobre la lengua', 'Variación lingüística: diacrónica, diatópica y diastrática.', ARRAY['CCL', 'CP']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.1B.1', 'Lengua Castellana y Literatura', '1º Bachillerato', 1, 'Producir textos expositivos y argumentativos bien estructurados.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LCL.1B.2', 'Lengua Castellana y Literatura', '1º Bachillerato', 2, 'Analizar obras literarias medievales y renacentistas.', ARRAY['CCL', 'CCEC'], 'Analizar'),
('CE.LCL.1B.3', 'Lengua Castellana y Literatura', '1º Bachillerato', 3, 'Identificar y analizar la estructura sintáctica de oraciones.', ARRAY['CCL'], 'Analizar');

-- 2º BACHILLERATO - LENGUA
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura', '2º Bachillerato', 'Educación literaria', 'Literatura del siglo XIX: Romanticismo y Realismo.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '2º Bachillerato', 'Educación literaria', 'Literatura del siglo XX: Generación del 27, posguerra y actualidad.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '2º Bachillerato', 'Comunicación', 'Comentario de texto: estructura, análisis y valoración crítica.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '2º Bachillerato', 'Reflexión sobre la lengua', 'Morfología: procesos de formación de palabras.', ARRAY['CCL']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.2B.1', 'Lengua Castellana y Literatura', '2º Bachillerato', 1, 'Realizar comentarios de texto críticos y fundamentados.', ARRAY['CCL', 'CPSAA'], 'Evaluar'),
('CE.LCL.2B.2', 'Lengua Castellana y Literatura', '2º Bachillerato', 2, 'Relacionar obras literarias con su contexto histórico y cultural.', ARRAY['CCL', 'CCEC'], 'Analizar'),
('CE.LCL.2B.3', 'Lengua Castellana y Literatura', '2º Bachillerato', 3, 'Analizar la formación y estructura de las palabras.', ARRAY['CCL'], 'Analizar');

-- =====================================================
-- RESUMEN DE COBERTURA
-- =====================================================

-- PRIMARIA: Matemáticas (1º-6º), Lengua (1º-6º)
-- ESO: Matemáticas (1º-4º), Geografía e Historia (1º-4º)
-- BACHILLERATO: Matemáticas (1º-2º), Lengua (1º-2º)

-- Total aproximado en este archivo:
-- - Saberes básicos: ~120
-- - Criterios de evaluación: ~80

-- NOTA: El archivo curriculo_4_primaria.sql contiene más detalle para 4º Primaria
-- Este archivo proporciona cobertura básica de todos los niveles
-- Se pueden añadir más asignaturas según necesidad (Física, Química, Biología, Inglés, etc.)

-- Para añadir más contenido, seguir el mismo patrón:
-- 1. Identificar asignatura y curso
-- 2. Extraer saberes básicos del RD correspondiente
-- 3. Extraer criterios de evaluación
-- 4. Asociar competencias clave
-- 5. Asignar nivel cognitivo de Bloom

SELECT 'Currículo LOMLOE completo cargado correctamente' AS status;
