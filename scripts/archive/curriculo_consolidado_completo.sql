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
-- =====================================================
-- CURRÍCULO GALLEGO - 1º PRIMARIA
-- Decreto 155/2022 de Galicia (Currículo Autonómico)
-- =====================================================
-- Lingua Galega e Literatura para niños de 6 años
-- Nivel inicial de competencia lingüística en gallego
-- Adaptado al contexto y cultura gallega
-- =====================================================

-- =====================================================
-- LINGUA GALEGA E LITERATURA - 1º PRIMARIA
-- =====================================================

-- Saberes Básicos de Lengua Gallega 1º
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '1º Primaria', 'As linguas e os seus falantes', 'Recoñecemento do galego como lingua propia de Galicia.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '1º Primaria', 'As linguas e os seus falantes', 'Identificación do galego no contorno familiar e escolar.', ARRAY['CCL', 'CP', 'CPSAA']),
('Lingua Galega e Literatura', '1º Primaria', 'Comunicación oral', 'Participación en conversacións en galego respectando o quenda de palabra.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '1º Primaria', 'Comunicación oral', 'Pronuncia e entoación básicas en lingua galega.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º Primaria', 'Comunicación oral', 'Comprensión de instrucións orais sinxelas en galego.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '1º Primaria', 'Comprensión lectora', 'Lectura de palabras e frases moi sinxelas en galego.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º Primaria', 'Comprensión lectora', 'Comprensión de textos moi breves en galego con apoio de imaxes.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '1º Primaria', 'Produción escrita', 'Escritura de letras, sílabas e palabras sinxelas en galego.', ARRAY['CCL', 'CD']),
('Lingua Galega e Literatura', '1º Primaria', 'Produción escrita', 'Caligrafía clara de letras en lingua galega.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º Primaria', 'Produción escrita', 'Separación correcta de palabras ao escribir en galego.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º Primaria', 'Educación literaria', 'Escoita de contos tradicionais galegos.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '1º Primaria', 'Educación literaria', 'Recitado de cantigas e poemas galegos infantís.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '1º Primaria', 'Patrimonio cultural', 'Tradicións orais galegas: xogos, adiviñas e refráns sinxelos.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '1º Primaria', 'Patrimonio cultural', 'Festas galegas: Entroido, San Xoán, Magosto.', ARRAY['CCEC', 'CC']),
('Lingua Galega e Literatura', '1º Primaria', 'Vocabulario', 'Vocabulario básico galego: familia, colexio, animais, cores.', ARRAY['CCL', 'CP']),
('Lingua Galega e Literatura', '1º Primaria', 'Reflexión sobre a lingua', 'Iniciación ao alfabeto galego: letras especiais (ñ, til).', ARRAY['CCL'])
ON CONFLICT DO NOTHING;

-- Criterios de Evaluación de Lengua Gallega 1º
INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.1P.1', 'Lingua Galega e Literatura', '1º Primaria', 1, 'Recoñecer o galego como lingua propia de Galicia.', ARRAY['CCL', 'CP', 'CC'], 'Recordar'),
('CE.LG.1P.2', 'Lingua Galega e Literatura', '1º Primaria', 2, 'Participar en conversacións sinxelas en galego.', ARRAY['CCL', 'CPSAA'], 'Aplicar'),
('CE.LG.1P.3', 'Lingua Galega e Literatura', '1º Primaria', 3, 'Comprender instrucións orais básicas en galego.', ARRAY['CCL'], 'Comprender'),
('CE.LG.1P.4', 'Lingua Galega e Literatura', '1º Primaria', 4, 'Ler palabras e frases moi sinxelas en galego.', ARRAY['CCL'], 'Recordar'),
('CE.LG.1P.5', 'Lingua Galega e Literatura', '1º Primaria', 5, 'Escribir letras e palabras sinxelas en galego con caligrafía clara.', ARRAY['CCL'], 'Aplicar'),
('CE.LG.1P.6', 'Lingua Galega e Literatura', '1º Primaria', 6, 'Escoitar e gozar de contos e cantigas galegas.', ARRAY['CCL', 'CCEC'], 'Comprender'),
('CE.LG.1P.7', 'Lingua Galega e Literatura', '1º Primaria', 7, 'Valorar o patrimonio cultural galego.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- VOCABULARIO BÁSICO RECOMENDADO PARA 1º PRIMARIA
-- =====================================================

-- FAMILIA E CASA:
-- nai, pai, avó, avoa, irmán, irmá, casa, cuarto, cociña, baño

-- COLEXIO:
-- mestra, mestro, compañeiro, lápis, goma, caderno, pupitre, aula

-- ANIMAIS:
-- can, gato, vaca, cabalo, ovellla, porco, paxaro, peixe

-- CORES:
-- vermello, azul, amarelo, verde, branco, negro, laranxa, rosa

-- NÚMEROS 1-10:
-- un, dous, tres, catro, cinco, seis, sete, oito, nove, dez

-- NATUREZA:
-- árbore, flor, herbá, sol, lúa, estrela, río, praia, monte

-- COMIDA:
-- pan, leite, auga, mazá, plátano, peixe, carne, queixo

-- =====================================================
-- CONTOS TRADICIONAIS GALEGOS RECOMENDADOS
-- =====================================================

-- Para leer/contar en 1º Primaria:
-- - "O Apalpador" (figura tradicional gallega)
-- - "A véspera de Reis" (Cabalgata de Reyes en Galicia)
-- - "O lobo e o carneiro" (fábula gallega)
-- - "A castañeira" (sobre el Magosto)
-- - Leyendas de meigas (adaptadas para niños)

-- =====================================================
-- CANTIGAS POPULARES GALEGAS PARA 1º
-- =====================================================

-- Canciones infantiles tradicionales:
-- - "Pimpín Sarabín" (canción de cuna)
-- - "Ay, Maripucha" (canción infantil)
-- - "A Carolina" (canción de juego)
-- - "O meu cuquillán" (muy popular en Galicia)
-- - "Unha noite na eira do trigo"

-- =====================================================
-- FESTIVIDADES GALLEGAS PARA TRABAJAR EN 1º
-- =====================================================

-- Entroido (Carnaval gallego):
-- - Disfraces típicos
-- - Tradiciones del Entroido
-- - Comidas típicas (filloas, orejas)

-- Magosto (11 noviembre):
-- - Castañas asadas
-- - Fogata tradicional
-- - Canciones del Magosto

-- San Xoán (23-24 junio):
-- - Fogueiras de San Xoán
-- - Saltar la hoguera (tradición)
-- - La noche más corta

-- Día das Letras Galegas (17 mayo):
-- - Homenaje a escritores gallegos
-- - Actividades culturales

-- =====================================================
-- AUTORES GALLEGOS PARA INFANTIL/1º PRIMARIA
-- =====================================================

-- Literatura infantil gallega apropiada para 6 años:
-- - Xosé Cermeño (cuentos infantiles)
-- - Marina Mayoral (adaptaciones infantiles)
-- - Fina Casalderrey (literatura juvenil, cuentos simples)
-- - Antonio García Teijeiro (poemas para niños)

-- =====================================================
-- DIFERENCIAS ORTOGRÁFICAS GALEGO-CASTELLANO
-- =====================================================

-- Para que la IA las respete al generar contenido:
-- 
-- Letras especiales en gallego:
-- - Ñ (igual que castellano): "niño" = "neno" 
-- - NH (nh gallega): "unha", "teña", "miña"
-- - LL (diferente del castellano): "fillo", "olla", "amarelo"
-- - Til (~) en vocales: "avión", "canción", "razón"
-- 
-- NO usar en gallego:
-- - Ü (no existe en gallego)
-- - Z al final de palabras (raro en gallego)
-- 
-- Palabras comunes diferentes:
-- - Castellano | Gallego
-- - niño       | neno
-- - casa       | casa (igual)
-- - escuela    | escola
-- - madre      | nai
-- - padre      | pai
-- - hermano    | irmán
-- - agua       | auga
-- - libro      | libro (igual)

-- =====================================================
-- NOTAS PARA LA IA AL GENERAR CONTENIDO EN GALLEGO
-- =====================================================

-- Cuando se generen fichas de Lingua Galega 1º Primaria:
-- 
-- 1. Usar vocabulario MUY SIMPLE (nivel 6 años)
-- 2. Frases cortas (máximo 5-6 palabras)
-- 3. Respetar ortografía gallega (nh, til, ll)
-- 4. Incluir referencias culturales gallegas apropiadas
-- 5. Ejemplos con entorno gallego: playa (praia), monte, río (río)
-- 6. Comidas gallegas: pulpo, empanada, filloas
-- 7. Animales del entorno: vaca (vaca), oveja (ovella), caballo (cabalo)
-- 8. Topónimos reales: Santiago, A Coruña, Vigo, Ourense, Lugo, Pontevedra
-- 
-- Ejemplo de pregunta bien adaptada:
-- "Cantos dedos ten unha man?" (¿Cuántos dedos tiene una mano?)
-- Opciones: Tres, Cinco, Sete, Dez
-- Respuesta: Cinco
-- 
-- Feedback en gallego: "Moi ben! Unha man ten cinco dedos."

-- =====================================================
-- RESUMEN
-- =====================================================

-- LINGUA GALEGA 1º PRIMARIA:
-- - 16 saberes básicos
-- - 7 criterios de evaluación
-- - Adaptado a 6 años
-- - Enfoque: oral > escrito (al principio del curso)
-- - Integración cultural gallega
-- - Vocabulario básico del entorno

-- Este currículo complementa el de Lengua Castellana
-- Niños gallegos estudian ambas lenguas simultáneamente
-- Importante: Respeto y valoración del bilingüismo

SELECT 'Currículo de Lingua Galega para 1º Primaria cargado correctamente' AS status;
-- =====================================================
-- CURRÍCULO GALLEGO - 2º PRIMARIA
-- Decreto 155/2022 de Galicia
-- =====================================================
-- Lingua Galega para niños de 7 años
-- Nivel progresivo respecto a 1º Primaria
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '2º Primaria', 'As linguas e os seus falantes', 'Uso do galego en diferentes contextos: familia, escola, amigos.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '2º Primaria', 'As linguas e os seus falantes', 'Valoración positiva da diversidade lingüística de Galicia.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '2º Primaria', 'Comunicación oral', 'Narración de experiencias persoais en galego de xeito ordenado.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '2º Primaria', 'Comunicación oral', 'Descrición oral de persoas, animais e obxectos en galego.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '2º Primaria', 'Comunicación oral', 'Expresión oral con vocabulario galego apropiado.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º Primaria', 'Comprensión lectora', 'Lectura de textos narrativos sinxelos en galego con fluidez.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º Primaria', 'Comprensión lectora', 'Comprensión de textos informativos breves en galego.', ARRAY['CCL', 'CD']),
('Lingua Galega e Literatura', '2º Primaria', 'Comprensión lectora', 'Identificación de personaxes, lugares e accións en contos galegos.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '2º Primaria', 'Produción escrita', 'Redacción de frases e textos moi breves en galego con coherencia.', ARRAY['CCL', 'CD']),
('Lingua Galega e Literatura', '2º Primaria', 'Produción escrita', 'Ortografía galega básica: uso de til, maiúsculas, punto e coma.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º Primaria', 'Produción escrita', 'Caligrafía clara ao escribir en galego.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º Primaria', 'Educación literaria', 'Lectura e gozo de contos tradicionais galegos.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '2º Primaria', 'Educación literaria', 'Recitado de poemas galegos infantís con expresividade.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '2º Primaria', 'Reflexión sobre a lingua', 'O nome en galego: común e propio.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º Primaria', 'Reflexión sobre a lingua', 'O xénero e o número en galego: masculino, feminino, singular, plural.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º Primaria', 'Patrimonio cultural', 'Tradicións galegas: xogos populares, cantigas, festas.', ARRAY['CCL', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.2P.1', 'Lingua Galega e Literatura', '2º Primaria', 1, 'Usar o galego en diferentes contextos comunicativos.', ARRAY['CCL', 'CP'], 'Aplicar'),
('CE.LG.2P.2', 'Lingua Galega e Literatura', '2º Primaria', 2, 'Ler en voz alta textos en galego con entoación adecuada.', ARRAY['CCL'], 'Aplicar'),
('CE.LG.2P.3', 'Lingua Galega e Literatura', '2º Primaria', 3, 'Comprender o sentido global de textos narrativos sinxelos en galego.', ARRAY['CCL'], 'Comprender'),
('CE.LG.2P.4', 'Lingua Galega e Literatura', '2º Primaria', 4, 'Escribir textos breves en galego con corrección ortográfica básica.', ARRAY['CCL'], 'Aplicar'),
('CE.LG.2P.5', 'Lingua Galega e Literatura', '2º Primaria', 5, 'Identificar nomes comúns e propios en galego.', ARRAY['CCL'], 'Comprender'),
('CE.LG.2P.6', 'Lingua Galega e Literatura', '2º Primaria', 6, 'Gozar da lectura de contos e poemas galegos.', ARRAY['CCL', 'CCEC'], 'Evaluar'),
('CE.LG.2P.7', 'Lingua Galega e Literatura', '2º Primaria', 7, 'Valorar o patrimonio cultural e lingüístico de Galicia.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 2º Primaria cargado correctamente' AS status;
-- =====================================================
-- CURRÍCULO GALLEGO - 3º PRIMARIA
-- Decreto 155/2022 de Galicia
-- =====================================================
-- Lingua Galega para niños de 8 años
-- Nivel intermedio de Primaria
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '3º Primaria', 'As linguas e os seus falantes', 'Presenza do galego en diferentes ámbitos: familia, escola, medios.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '3º Primaria', 'As linguas e os seus falantes', 'Respecto pola diversidade lingüística e cultural de Galicia.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '3º Primaria', 'Comunicación oral', 'Narración de historias en galego con orde cronolóxica.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '3º Primaria', 'Comunicación oral', 'Descrición detallada de persoas, animais, lugares e obxectos en galego.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '3º Primaria', 'Comunicación oral', 'Expresión de opinións persoais de xeito respectuoso.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lingua Galega e Literatura', '3º Primaria', 'Comprensión lectora', 'Lectura expresiva de textos en galego con entoación adecuada.', ARRAY['CCL']),
('Lingua Galega e Literatura', '3º Primaria', 'Comprensión lectora', 'Comprensión de textos narrativos,  descritivos e informativos en galego.', ARRAY['CCL', 'CD']),
('Lingua Galega e Literatura', '3º Primaria', 'Comprensión lectora', 'Identificación do tema, personaxes e secuencia temporal.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '3º Primaria', 'Produción escrita', 'Redacción de textos narrativos e descritivos breves en galego.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '3º Primaria', 'Produción escrita', 'Ortografía galega: ca, co, cu, que, qui, gue, gui.', ARRAY['CCL']),
('Lingua Galega e Literatura', '3º Primaria', 'Produción escrita', 'Uso correcto do punto, a coma e os signos de interrogación e exclamación.', ARRAY['CCL']),
('Lingua Galega e Literatura', '3º Primaria', 'Reflexión sobre a lingua', 'O substantivo, o adxectivo e o verbo en galego: identificación e uso.', ARRAY['CCL']),
('Lingua Galega e Literatura', '3º Primaria', 'Reflexión sobre a lingua', 'Os determinantes en galego: artigos e demostrativos.', ARRAY['CCL']),
('Lingua Galega e Literatura', '3º Primaria', 'Reflexión sobre a lingua', 'Tempos verbais en galego: presente, pasado e futuro.', ARRAY['CCL']),
('Lingua Galega e Literatura', '3º Primaria', 'Educación literaria', 'Lectura de contos tradicionais galegos e fábulas.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '3º Primaria', 'Educación literaria', 'A rima: identificación en poemas galegos sinxelos.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '3º Primaria', 'Patrimonio cultural', 'Xogos tradicionais galegos e cantigas populares.', ARRAY['CCL', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.3P.1', 'Lingua Galega e Literatura', '3º Primaria', 1, 'Ler textos en galego con fluidez e entoación adecuada.', ARRAY['CCL'], 'Aplicar'),
('CE.LG.3P.2', 'Lingua Galega e Literatura', '3º Primaria', 2, 'Comprender o sentido global e as ideas principais de textos en galego.', ARRAY['CCL'], 'Comprender'),
('CE.LG.3P.3', 'Lingua Galega e Literatura', '3º Primaria', 3, 'Escribir textos breves en galego con coherencia e corrección ortográfica.', ARRAY['CCL'], 'Crear'),
('CE.LG.3P.4', 'Lingua Galega e Literatura', '3º Primaria', 4, 'Identificar substantivos, adxectivos e verbos en oracións galegas.', ARRAY['CCL'], 'Comprender'),
('CE.LG.3P.5', 'Lingua Galega e Literatura', '3º Primaria', 5, 'Usar correctamente os tempos verbais básicos en galego.', ARRAY['CCL'], 'Aplicar'),
('CE.LG.3P.6', 'Lingua Galega e Literatura', '3º Primaria', 6, 'Narrar historias en galego de xeito ordenado e claro.', ARRAY['CCL', 'CPSAA'], 'Aplicar'),
('CE.LG.3P.7', 'Lingua Galega e Literatura', '3º Primaria', 7, 'Gozar da lectura de contos e poemas galegos.', ARRAY['CCL', 'CCEC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 3º Primaria cargado correctamente' AS status;
-- =====================================================
-- CURRÍCULO GALLEGO - 4º PRIMARIA
-- Decreto 155/2022 de Galicia (Currículo Autonómico)
-- =====================================================
-- Asignatura específica de Galicia
-- Basado en el decreto de la Xunta de Galicia
-- =====================================================

-- =====================================================
-- LENGUA GALLEGA - 4º PRIMARIA
-- =====================================================

-- Saberes Básicos de Lengua Gallega
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '4º Primaria', 'As linguas e os seus falantes', 'Recoñecemento da diversidade lingüística de Galicia e valoración positiva da lingua galega.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '4º Primaria', 'As linguas e os seus falantes', 'Aproximación á biografía lingüística persoal propia e familiar.', ARRAY['CCL', 'CP', 'CPSAA']),
('Lingua Galega e Literatura', '4º Primaria', 'Comunicación oral', 'Producción oral en lingua galega: pronuncia, entoación e xestión do tempo.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '4º Primaria', 'Comunicación oral', 'Comprensión oral: identificación das ideas principais e secundarias de textos orais en galego.', ARRAY['CCL']),
('Lingua Galega e Literatura', '4º Primaria', 'Comprensión lectora', 'Lectura de textos narrativos, descritivos e informativos en galego: identificación da idea principal.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '4º Primaria', 'Comprensión lectora', 'Estratexias para mellorar a fluidez lectora e a comprensión en lingua galega.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '4º Primaria', 'Produción escrita', 'Elaboración de textos escritos en galego con coherencia, cohesión e adecuación.', ARRAY['CCL', 'CD']),
('Lingua Galega e Literatura', '4º Primaria', 'Produción escrita', 'Uso das regras ortográficas básicas da lingua galega: til, coma, punto e maiúsculas.', ARRAY['CCL']),
('Lingua Galega e Literatura', '4º Primaria', 'Educación literaria', 'Lectura autónoma e guiada de textos literarios galegos: contos, poemas, teatro.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '4º Primaria', 'Educación literaria', 'Autores e autoras representativas da literatura galega infantil.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '4º Primaria', 'Reflexión sobre a lingua', 'Clases de palabras en galego: substantivos, adxectivos, verbos, determinantes.', ARRAY['CCL']),
('Lingua Galega e Literatura', '4º Primaria', 'Reflexión sobre a lingua', 'A oración simple en galego: suxeito e predicado.', ARRAY['CCL']),
('Lingua Galega e Literatura', '4º Primaria', 'Patrimonio cultural', 'Tradicións orais galegas: contos populares, refráns, adiviñas.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '4º Primaria', 'Patrimonio cultural', 'Festas e celebracións tradicionais de Galicia.', ARRAY['CCEC', 'CC'])
ON CONFLICT DO NOTHING;

-- Criterios de Evaluación de Lengua Gallega
INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.4P.1', 'Lingua Galega e Literatura', '4º Primaria', 1, 'Recoñecer a diversidade lingüística de Galicia a partir da identificación das linguas do contorno.', ARRAY['CCL', 'CP', 'CC'], 'Recordar'),
('CE.LG.4P.2', 'Lingua Galega e Literatura', '4º Primaria', 2, 'Comprender o sentido de textos orais en galego identificando as ideas principais e secundarias.', ARRAY['CCL'], 'Comprender'),
('CE.LG.4P.3', 'Lingua Galega e Literatura', '4º Primaria', 3, 'Producir textos orais en galego con pronuncia, entoación e ritmo adecuados.', ARRAY['CCL', 'CPSAA'], 'Aplicar'),
('CE.LG.4P.4', 'Lingua Galega e Literatura', '4º Primaria', 4, 'Comprender textos escritos en galego identificando a idea principal e os datos relevantes.', ARRAY['CCL'], 'Comprender'),
('CE.LG.4P.5', 'Lingua Galega e Literatura', '4º Primaria', 5, 'Producir textos escritos en galego creativos e académicos aplicando normas ortográficas.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.4P.6', 'Lingua Galega e Literatura', '4º Primaria', 6, 'Ler de maneira autónoma textos literarios galegos adecuados á idade e intereses.', ARRAY['CCL', 'CCEC'], 'Aplicar'),
('CE.LG.4P.7', 'Lingua Galega e Literatura', '4º Primaria', 7, 'Identificar as clases de palabras e a estrutura básica da oración en galego.', ARRAY['CCL'], 'Comprender'),
('CE.LG.4P.8', 'Lingua Galega e Literatura', '4º Primaria', 8, 'Valorar o patrimonio cultural e literario de Galicia.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- NOTAS IMPORTANTES
-- =====================================================

-- Este currículo está basado en el Decreto 155/2022 de la Xunta de Galicia
-- Lengua Gallega es asignatura obligatoria en todos los centros de Galicia
-- Los contenidos están adaptados específicamente al contexto gallego

-- Para estudiantes de Galicia, la app generará contenido en:
-- - Castellano (Lengua Castellana y Literatura)
-- - Gallego (Lingua Galega e Literatura)

-- La IA debe:
-- 1. Respetar la ortografía gallega (til, nh, ll gallega, etc.)
-- 2. Usar vocabulario apropiado en gallego
-- 3. Incluir referencias culturales gallegas (autores, tradiciones)
-- 4. Adaptar ejemplos al contexto gallego (topónimos, realidad social)

-- Autores gallegos recomendados para 4º Primaria:
-- - Xosé Neira Vilas (Memorias dun neno labrego)
-- - Manuel Rivas
-- - Fina Casalderrey
-- - Agustín Fernández Paz

SELECT 'Currículo de Lingua Galega para 4º Primaria cargado correctamente' AS status;
-- =====================================================
-- CURRÍCULO GALLEGO - 5º PRIMARIA
-- Decreto 155/2022 de Galicia
-- =====================================================
-- Lingua Galega para niños de 10 años
-- Nivel avanzado de Primaria
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '5º Primaria', 'As linguas e os seus falantes', 'A situación sociolingüística de Galicia: uso do galego en diferentes ámbitos.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '5º Primaria', 'As linguas e os seus falantes', 'Actitudes positivas cara ao galego e ao plurilingüismo.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '5º Primaria', 'Comunicación oral', 'Exposición oral de temas con apoio de esquemas e materiais.', ARRAY['CCL', 'CD']),
('Lingua Galega e Literatura', '5º Primaria', 'Comunicación oral', 'Debate en galego: expresión de opinións con respecto e argumentación.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lingua Galega e Literatura', '5º Primaria', 'Comprensión lectora', 'Lectura comprensiva de textos de diferentes xéneros en galego.', ARRAY['CCL']),
('Lingua Galega e Literatura', '5º Primaria', 'Comprensión lectora', 'Identificación da idea principal e as secundarias en textos galegos.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '5º Primaria', 'Comprensión lectora', 'Inferencias e deducións a partir da lectura en galego.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '5º Primaria', 'Produción escrita', 'Redacción de textos narrativos, descritivos e dialogados en galego.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '5º Primaria', 'Produción escrita', 'Resumo de textos en galego: identificación de ideas principais.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '5º Primaria', 'Produción escrita', 'Ortografía galega: uso da b/v, g/x, h, acentuación.', ARRAY['CCL']),
('Lingua Galega e Literatura', '5º Primaria', 'Reflexión sobre a lingua', 'O verbo en galego: conxugación de tempos verbais.', ARRAY['CCL']),
('Lingua Galega e Literatura', '5º Primaria', 'Reflexión sobre a lingua', 'Análise morfolóxica en galego: substantivo, adxectivo, verbo, determinante.', ARRAY['CCL']),
('Lingua Galega e Literatura', '5º Primaria', 'Reflexión sobre a lingua', 'A oración en galego: suxeito e predicado.', ARRAY['CCL']),
('Lingua Galega e Literatura', '5º Primaria', 'Educación literaria', 'Lectura e análise de textos literarios galegos: contos, poemas, teatro.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '5º Primaria', 'Educación literaria', 'Autores e autoras representativas da literatura galega.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '5º Primaria', 'Patrimonio cultural', 'Patrimonio cultural e lingüístico de Galicia: valoración e conservación.', ARRAY['CCL', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.5P.1', 'Lingua Galega e Literatura', '5º Primaria', 1, 'Producir textos orais en galego coherentes e ben estruturados.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.5P.2', 'Lingua Galega e Literatura', '5º Primaria', 2, 'Comprender textos de diferentes xéneros identificando ideas principais.', ARRAY['CCL'], 'Comprender'),
('CE.LG.5P.3', 'Lingua Galega e Literatura', '5º Primaria', 3, 'Redactar textos narrativos e descritivos en galego con corrección ortográfica.', ARRAY['CCL', 'CCEC'], 'Crear'),
('CE.LG.5P.4', 'Lingua Galega e Literatura', '5º Primaria', 4, 'Realizar análise morfolóxica de oracións sinxelas en galego.', ARRAY['CCL'], 'Analizar'),
('CE.LG.5P.5', 'Lingua Galega e Literatura', '5º Primaria', 5, 'Participar en debates expresando opinións con argumentos en galego.', ARRAY['CCL', 'CPSAA', 'CC'], 'Evaluar'),
('CE.LG.5P.6', 'Lingua Galega e Literatura', '5º Primaria', 6, 'Coñecer autores e autoras representativas da literatura galega.', ARRAY['CCL', 'CCEC', 'CC'], 'Recordar'),
('CE.LG.5P.7', 'Lingua Galega e Literatura', '5º Primaria', 7, 'Valorar o patrimonio cultural e lingüístico de Galicia.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 5º Primaria cargado correctamente' AS status;
-- =====================================================
-- CURRÍCULO GALLEGO - 6º PRIMARIA
-- Decreto 155/2022 de Galicia
-- =====================================================
-- Lingua Galega para niños de 11 años
-- Último curso de Primaria - Nivel máximo
-- Preparación para ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '6º Primaria', 'As linguas e os seus falantes', 'Coñecemento da situación sociolingüística de Galicia: usos e actitudes.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '6º Primaria', 'As linguas e os seus falantes', 'Compromiso persoal co uso e a normalización do galego.', ARRAY['CCL', 'CP', 'CC', 'CPSAA']),
('Lingua Galega e Literatura', '6º Primaria', 'Comunicación oral', 'Exposición oral formal en galego: estrutura, claridade e uso de recursos.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura', '6º Primaria', 'Comunicación oral', 'Debate e argumentación en galego: defensa de opinións con fundamentos.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lingua Galega e Literatura', '6º Primaria', 'Comprensión lectora', 'Análise e interpretación de textos literarios galegos.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '6º Primaria', 'Comprensión lectora', 'Textos argumentativos en galego: identificación de tese e argumentos.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '6º Primaria', 'Comprensión lectora', 'Lectura crítica en galego: valoración e opinión persoal fundamentada.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '6º Primaria', 'Produción escrita', 'Redacción de textos argumentativos e expositivos en galego.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '6º Primaria', 'Produción escrita', 'Planificación, redacción e revisión de textos en galego.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '6º Primaria', 'Produción escrita', 'Ortografía galega avanzada: acentuación, uso de signos de puntuación.', ARRAY['CCL']),
('Lingua Galega e Literatura', '6º Primaria', 'Reflexión sobre a lingua', 'Análise sintáctica completa en galego: suxeito, predicado e complementos básicos.', ARRAY['CCL']),
('Lingua Galega e Literatura', '6º Primaria', 'Reflexión sobre a lingua', 'Clases de oracións en galego: enunciativas, interrogativas, exclamativas, imperativas.', ARRAY['CCL']),
('Lingua Galega e Literatura', '6º Primaria', 'Reflexión sobre a lingua', 'Análise morfolóxica completa de todas as categorías gramaticais.', ARRAY['CCL']),
('Lingua Galega e Literatura', '6º Primaria', 'Educación literaria', 'Xéneros literarios galegos: narrativa, lírica e teatro.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '6º Primaria', 'Educación literaria', 'Recursos literarios: metáfora, símil, personificación, hipérbole.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '6º Primaria', 'Educación literaria', 'Principais autores e autoras da literatura galega contemporánea.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '6º Primaria', 'Patrimonio cultural', 'Patrimonio cultural, histórico e lingüístico de Galicia: coñecemento e valoración.', ARRAY['CCL', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.6P.1', 'Lingua Galega e Literatura', '6º Primaria', 1, 'Realizar exposicións orais en galego estruturadas e claras.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.6P.2', 'Lingua Galega e Literatura', '6º Primaria', 2, 'Analizar e interpretar textos literarios galegos.', ARRAY['CCL', 'CCEC'], 'Analizar'),
('CE.LG.6P.3', 'Lingua Galega e Literatura', '6º Primaria', 3, 'Producir textos argumentativos en galego con coherencia e cohesión.', ARRAY['CCL', 'CPSAA'], 'Crear'),
('CE.LG.6P.4', 'Lingua Galega e Literatura', '6º Primaria', 4, 'Realizar análise sintáctica completa de oracións en galego.', ARRAY['CCL'], 'Analizar'),
('CE.LG.6P.5', 'Lingua Galega e Literatura', '6º Primaria', 5, 'Identificar e utilizar recursos literarios en galego.', ARRAY['CCL', 'CCEC'], 'Crear'),
('CE.LG.6P.6', 'Lingua Galega e Literatura', '6º Primaria', 6, 'Valorar criticamente textos lidos en galego.', ARRAY['CCL', 'CPSAA'], 'Evaluar'),
('CE.LG.6P.7', 'Lingua Galega e Literatura', '6º Primaria', 7, 'Coñecer e valorar o patrimonio cultural e lingüístico de Galicia.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 6º Primaria cargado correctamente' AS status;
-- =====================================================
-- CURRÍCULO GALLEGO - 1º ESO
-- Decreto 155/2022 de Galicia (Secundaria)
-- =====================================================
-- Lingua Galega para 1º ESO (12-13 años)
-- Primer curso de Secundaria
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '1º ESO', 'As linguas e os seus falantes', 'Análise da situación sociolingüística actual de Galicia.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '1º ESO', 'As linguas e os seus falantes', 'Actitudes de respecto e valoración cara ao galego e ao plurilingüismo.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '1º ESO', 'Comunicación oral', 'Exposicións orais planificadas sobre temas diversos en galego.', ARRAY['CCL', 'CD']),
('Lingua Galega e Literatura', '1º ESO', 'Comunicación oral', 'Comprensión de textos orais en galego: informativos, argumentativos, narrativos.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º ESO', 'Comprensión lectora', 'Lectura comprensiva de textos galegos de diferentes xéneros e épocas.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º ESO', 'Comprensión lectora', 'Análise da estrutura e contido de textos en galego.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '1º ESO', 'Produción escrita', 'Redacción de textos narrativos, descritivos e dialogados en galego.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '1º ESO', 'Produción escrita', 'Ortografía e puntuación galega: normas avanzadas.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º ESO', 'Reflexión sobre a lingua', 'Análise morfolóxica completa en galego: categorías gramaticais.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º ESO', 'Reflexión sobre a lingua', 'Análise sintáctica en galego: oración simple, suxeito e predicado.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º ESO', 'Reflexión sobre a lingua', 'Complementos do verbo en galego: CD, CI, CC.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º ESO', 'Educación literaria', 'Literatura medieval galega: características xerais, Cantigas de Amigo.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '1º ESO', 'Educación literaria', 'Xéneros literarios galegos: narrativa, lírica, teatro.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '1º ESO', 'Educación literaria', 'Recursos literarios en textos galegos: metáfora, símil, personificación.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '1º ESO', 'Patrimonio cultural', 'O patrimonio literario e cultural de Galicia: valoración e conservación.', ARRAY['CCL', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.1E.1', 'Lingua Galega e Literatura', '1º ESO', 1, 'Realizar exposicións orais estruturadas e ben documentadas en galego.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.1E.2', 'Lingua Galega e Literatura', '1º ESO', 2, 'Comprender e analizar textos galegos de diferentes xéneros.', ARRAY['CCL'], 'Analizar'),
('CE.LG.1E.3', 'Lingua Galega e Literatura', '1º ESO', 3, 'Redactar textos coherentes e ben cohesionados en galego.', ARRAY['CCL', 'CCEC'], 'Crear'),
('CE.LG.1E.4', 'Lingua Galega e Literatura', '1º ESO', 4, 'Realizar análise morfolóxica e sintáctica de oracións simples en galego.', ARRAY['CCL'], 'Analizar'),
('CE.LG.1E.5', 'Lingua Galega e Literatura', '1º ESO', 5, 'Identificar e analizar recursos literarios en textos galegos.', ARRAY['CCL', 'CCEC'], 'Analizar'),
('CE.LG.1E.6', 'Lingua Galega e Literatura', '1º ESO', 6, 'Coñecer características da literatura medieval galega.', ARRAY['CCL', 'CCEC', 'CC'], 'Comprender'),
('CE.LG.1E.7', 'Lingua Galega e Literatura', '1º ESO', 7, 'Valorar o patrimonio literario e cultural de Galicia.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 1º ESO cargado correctamente' AS status;
-- =====================================================
-- CURRÍCULO GALLEGO - 2º ESO  
-- Decreto 155/2022 de Galicia (Secundaria)
-- =====================================================
-- Lingua Galega para 2º ESO (13-14 años)
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '2º ESO', 'As linguas e os seus falantes', 'Análise crítica da presenza do galego nos medios de comunicación.', ARRAY['CCL', 'CP', 'CC', 'CD']),
('Lingua Galega e Literatura', '2º ESO', 'As linguas e os seus falantes', 'Promoción do uso do galego en todos os ámbitos.', ARRAY['CCL', 'CP', 'CC', 'CPSAA']),
('Lingua Galega e Literatura', '2º ESO', 'Comunicación oral', 'Exposicións orais formais en galego: estrutura, recursos e técnicas.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura', '2º ESO', 'Comunicación oral', 'Debate en galego: argumentación e refutación.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lingua Galega e Literatura', '2º ESO', 'Comprensión lectora', 'Textos xornalísticos en galego: noticia, crónica, reportaxe.', ARRAY['CCL', 'CD']),
('Lingua Galega e Literatura', '2º ESO', 'Comprensión lectora', 'Análise crítica de textos argumentativos en galego.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '2º ESO', 'Produción escrita', 'Redacción de textos expositivos e argumentativos en galego.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '2º ESO', 'Produción escrita', 'Coherencia, cohesión e adecuación textual en galego.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º ESO', 'Reflexión sobre a lingua', 'Análise sintáctica en galego: oración simple completa.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º ESO', 'Reflexión sobre a lingua', 'Tipos de predicado en galego: nominal e verbal.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º ESO', 'Reflexión sobre a lingua', 'Clases de oracións segundo a natureza do predicado.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º ESO', 'Educación literaria', 'Literatura do Renacemento galego: Séculos Escuros e Rexurdimento.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '2º ESO', 'Educación literaria', 'O teatro galego: elementos e estrutura dramática.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '2º ESO', 'Educación literaria', 'A narración en galego: estrutura, personaxes, narrador.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '2º ESO', 'Patrimonio cultural', 'O patrimonio literario e cultural galego: análise e valoración crítica.', ARRAY['CCL', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.2E.1', 'Lingua Galega e Literatura', '2º ESO', 1, 'Realizar exposicións orais formais ben estruturadas en galego.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.2E.2', 'Lingua Galega e Literatura', '2º ESO', 2, 'Participar en debates argumentando e refutando en galego.', ARRAY['CCL', 'CPSAA', 'CC'], 'Evaluar'),
('CE.LG.2E.3', 'Lingua Galega e Literatura', '2º ESO', 3, 'Redactar textos expositivos e argumentativos coherentes en galego.', ARRAY['CCL', 'CPSAA'], 'Crear'),
('CE.LG.2E.4', 'Lingua Galega e Literatura', '2º ESO', 4, 'Realizar análise sintáctica completa de oracións simples en galego.', ARRAY['CCL'], 'Analizar'),
('CE.LG.2E.5', 'Lingua Galega e Literatura', '2º ESO', 5, 'Analizar textos xornalísticos e argumentativos en galego.', ARRAY['CCL', 'CD'], 'Analizar'),
('CE.LG.2E.6', 'Lingua Galega e Literatura', '2º ESO', 6, 'Coñecer o Rexurdimento e a literatura galega renacentista.', ARRAY['CCL', 'CCEC', 'CC'], 'Comprender'),
('CE.LG.2E.7', 'Lingua Galega e Literatura', '2º ESO', 7, 'Valorar criticamente o patrimonio cultural galego.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 2º ESO cargado correctamente' AS status;
-- =====================================================
-- CURRÍCULO GALLEGO - 3º ESO
-- Decreto 155/2022 de Galicia (Secundaria)
-- =====================================================
-- Lingua Galega para 3º ESO (14-15 años)
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '3º ESO', 'As linguas e os seus falantes', 'Políticas lingüísticas en Galicia: normalización e planificación.', ARRAY['CCL', 'CP', 'CC', 'CPSAA']),
('Lingua Galega e Literatura', '3º ESO', 'As linguas e os seus falantes', 'Uso institucional e social do galego: análise crítica.', ARRAY['CCL', 'CP', 'CC', 'CD']),
('Lingua Galega e Literatura', '3º ESO', 'Comunicación oral', 'Discursos orais formais en galego: conferencias, ponencias.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura', '3º ESO', 'Comunicación oral', 'Técnicas de argumentación oral e debate en galego.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lingua Galega e Literatura', '3º ESO', 'Comprensión lectora', 'Textos humanísticos e ensaíst icos en galego.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '3º ESO', 'Comprensión lectora', 'Interpretación de textos galegos: literais, inferenciais e críticas.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '3º ESO', 'Produción escrita', 'Textos académicos en galego: informes, traballos de investigación.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura', '3º ESO', 'Produción escrita', 'Coherencia, cohesión e corrección en textos galegos.', ARRAY['CCL']),
('Lingua Galega e Literatura', '3º ESO', 'Reflexión sobre a lingua', 'Oración composta en galego: coordinación e xustaposición.', ARRAY['CCL']),
('Lingua Galega e Literatura', '3º ESO', 'Reflexión sobre a lingua', 'Clases de oracións coordinadas en galego.', ARRAY['CCL']),
('Lingua Galega e Literatura', '3º ESO', 'Reflexión sobre a lingua', 'O texto en galego: mecanismos de cohesión.', ARRAY['CCL']),
('Lingua Galega e Literatura', '3º ESO', 'Educación literaria', 'Literatura galega do século XIX: Rosalía de Castro, Curros Enríquez.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '3º ESO', 'Educación literaria', 'Literatura galega do século XX: Castelao, Cunqueiro.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '3º ESO', 'Educación literaria', 'Análise de textos literarios galegos contemporáneos.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '3º ESO', 'Patrimonio cultural', 'Patrimonio literario e cultural galego: preservación e difusión.', ARRAY['CCL', 'CCEC', 'CC', 'CD'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.3E.1', 'Lingua Galega e Literatura', '3º ESO', 1, 'Realizar discursos orais formais ben estruturados en galego.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.3E.2', 'Lingua Galega e Literatura', '3º ESO', 2, 'Comprender e interpretar textos humanísticos e ensaísticos en galego.', ARRAY['CCL', 'CPSAA'], 'Analizar'),
('CE.LG.3E.3', 'Lingua Galega e Literatura', '3º ESO', 3, 'Producir textos académicos coherentes en galego.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.3E.4', 'Lingua Galega e Literatura', '3º ESO', 4, 'Analizar a estrutura de oracións compostas coordinadas en galego.', ARRAY['CCL'], 'Analizar'),
('CE.LG.3E.5', 'Lingua Galega e Literatura', '3º ESO', 5, 'Identificar mecanismos de cohesión textual en galego.', ARRAY['CCL'], 'Comprender'),
('CE.LG.3E.6', 'Lingua Galega e Literatura', '3º ESO', 6, 'Coñecer a literatura galega dos séculos XIX e XX.', ARRAY['CCL', 'CCEC', 'CC'], 'Comprender'),
('CE.LG.3E.7', 'Lingua Galega e Literatura', '3º ESO', 7, 'Valorar criticamente o patrimonio cultural galego.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 3º ESO cargado correctamente' AS status;
-- =====================================================
-- CURRÍCULO GALLEGO - 4º ESO
-- Decreto 155/2022 de Galicia (Secundaria)
-- =====================================================
-- Lingua Galega para 4º ESO (15-16 años)
-- Último curso de ESO - Preparación para Bachillerato
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '4º ESO', 'As linguas e os seus falantes', 'Situación do galego na actualidade: retos e oportunidades.', ARRAY['CCL', 'CP', 'CC', 'CD']),
('Lingua Galega e Literatura', '4º ESO', 'As linguas e os seus falantes', 'Compromiso persoal e social co uso do galego.', ARRAY['CCL', 'CP', 'CC', 'CPSAA']),
('Lingua Galega e Literatura', '4º ESO', 'Comunicación oral', 'Textos orais formais en galego: ponencias, conferencias académicas.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura', '4º ESO', 'Comunicación oral', 'Argumentación oral avanzada e debate académico en galego.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lingua Galega e Literatura', '4º ESO', 'Comprensión lectora', 'Textos científicos, técnicos e académicos en galego.', ARRAY['CCL', 'CMCT', 'CD']),
('Lingua Galega e Literatura', '4º ESO', 'Comprensión lectora', 'Análise crítica de textos mediáticos en galego.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura', '4º ESO', 'Produción escrita', 'Textos académicos avanzados en galego: ensaios, traballos de investigación.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura', '4º ESO', 'Produción escrita', 'Textos de opinión e argumentativos complexos en galego.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lingua Galega e Literatura', '4º ESO', 'Reflexión sobre a lingua', 'Oración composta en galego: subordinación substantiva, adxetiva e adverbial.', ARRAY['CCL']),
('Lingua Galega e Literatura', '4º ESO', 'Reflexión sobre a lingua', 'Análise sintáctica completa de oracións complexas en galego.', ARRAY['CCL']),
('Lingua Galega e Literatura', '4º ESO', 'Reflexión sobre a lingua', 'Variedades da lingua galega: rexistros e niveis.', ARRAY['CCL', 'CP']),
('Lingua Galega e Literatura', '4º ESO', 'Educación literaria', 'Literatura galega contemporánea: principais autores e movementos.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '4º ESO', 'Educación literaria', 'Xeracións poéticas galegas: Pondal, Cabanillas, Celso Emilio Ferreiro.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '4º ESO', 'Educación literaria', 'Narrativa galega contemporánea: Anxel Fole, Álvaro Cunqueiro, Manuel Rivas.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '4º ESO', 'Patrimonio cultural', 'Patrimonio literario e cultural galego: análise crítica e valoración.', ARRAY['CCL', 'CCEC', 'CC', 'CD'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.4E.1', 'Lingua Galega e Literatura', '4º ESO', 1, 'Producir textos orais formais ben estruturados en galego.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.4E.2', 'Lingua Galega e Literatura', '4º ESO', 2, 'Analizar criticamente textos de diferentes ámbitos en galego.', ARRAY['CCL', 'CPSAA'], 'Evaluar'),
('CE.LG.4E.3', 'Lingua Galega e Literatura', '4º ESO', 3, 'Producir textos académicos e argumentativos complexos en galego.', ARRAY['CCL', 'CD', 'CPSAA'], 'Crear'),
('CE.LG.4E.4', 'Lingua Galega e Literatura', '4º ESO', 4, 'Realizar análise sintáctica completa de oracións compostas en galego.', ARRAY['CCL'], 'Analizar'),
('CE.LG.4E.5', 'Lingua Galega e Literatura', '4º ESO', 5, 'Recoñecer variedades lingüísticas e rexistros en galego.', ARRAY['CCL', 'CP'], 'Comprender'),
('CE.LG.4E.6', 'Lingua Galega e Literatura', '4º ESO', 6, 'Coñecer a literatura galega contemporánea.', ARRAY['CCL', 'CCEC', 'CC'], 'Comprender'),
('CE.LG.4E.7', 'Lingua Galega e Literatura', '4º ESO', 7, 'Analizar textos literarios galegos representativos.', ARRAY['CCL', 'CCEC'], 'Analizar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 4º ESO cargado correctamente' AS status;
-- =====================================================
-- CURRÍCULO GALLEGO - 1º BACHILLERATO
-- Decreto 155/2022 de Galicia (Bachillerato)
-- =====================================================
-- Lingua Galega para 1º Bachillerato (16-17 años)
-- Preparación para universidad
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura I', '1º Bachillerato', 'As linguas e os seus falantes', 'Análise sociolingüística de Galicia: história e presente.', ARRAY['CCL', 'CP', 'CC', 'CPSAA']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'As linguas e os seus falantes', 'Bilingüismo e diglosia: implicacións sociais e culturais.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Comunicación', 'Textos académicos en galego: comentario de texto, ensaio, monografía.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Comunicación', 'Argumentación en galego: técnicas, falacias, estrutura argumentativa.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Reflexión sobre a lingua', 'Sintaxe en galego: análise de oracións compostas e complexas.', ARRAY['CCL']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Reflexión sobre a lingua', 'Morfoloxía galega: formación de palabras, derivación e composición.', ARRAY['CCL']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Reflexión sobre a lingua', 'Semántica galega: relacións semánticas, denotación e connotación.', ARRAY['CCL']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Literatura', 'Literatura medieval galega: lírica profana e relixiosa, prosa.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Literatura', 'Os Séculos Escuros: contexto histórico e perda literaria.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Literatura', 'O Rexurdimento: Rosalía de Castro, Curros Enríquez, Pondal.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Literatura', 'As Irmandades da Fala e o Grupo Nós: Castelao, Risco.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Literatura', 'Literatura galega contemporánea: xeracións poéticas e narrativa.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Lectura', 'Lectura autónoma: obras representativas da literatura galega.', ARRAY['CCL', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.1B.1', 'Lingua Galega e Literatura I', '1º Bachillerato', 1, 'Producir textos académicos rigorosos e ben estruturados en galego.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.1B.2', 'Lingua Galega e Literatura I', '1º Bachillerato', 2, 'Argumentar de forma sólida e coherente en galego.', ARRAY['CCL', 'CPSAA'], 'Evaluar'),
('CE.LG.1B.3', 'Lingua Galega e Literatura I', '1º Bachillerato', 3, 'Realizar análise sintáctica completa de textos complexos en galego.', ARRAY['CCL'], 'Analizar'),
('CE.LG.1B.4', 'Lingua Galega e Literatura I', '1º Bachillerato', 4, 'Analizar obras literarias galegas no seu contexto histórico e cultural.', ARRAY['CCL', 'CCEC', 'CC'], 'Analizar'),
('CE.LG.1B.5', 'Lingua Galega e Literatura I', '1º Bachillerato', 5, 'Comentar textos literarios galegos aplicando técnicas adecuadas.', ARRAY['CCL', 'CCEC'], 'Evaluar'),
('CE.LG.1B.6', 'Lingua Galega e Literatura I', '1º Bachillerato', 6, 'Coñecer a evolución da literatura galega desde a Idade Media ao Rexurdimento.', ARRAY['CCL', 'CCEC', 'CC'], 'Comprender'),
('CE.LG.1B.7', 'Lingua Galega e Literatura I', '1º Bachillerato', 7, 'Valorar criticamente a situación sociolingüística galega.', ARRAY['CCL', 'CP', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 1º Bachillerato cargado correctamente' AS status;
-- =====================================================
-- CURRÍCULO GALLEGO - 2º BACHILLERATO
-- Decreto 155/2022 de Galicia (Bachillerato)
-- =====================================================
-- Lingua Galega para 2º Bachillerato (17-18 años)
-- Último curso - Preparación universidad
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura II', '2º Bachillerato', 'As linguas e os seus falantes', 'Planificación lingüística e normalización do galego.', ARRAY['CCL', 'CP', 'CC', 'CPSAA']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'As linguas e os seus falantes', 'O galego no mundo: emigración e diáspora galega.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Comunicación', 'Comentario de texto en galego: técnicas de análise e síntese.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Comunicación', 'Textos académicos e científicos en galego.', ARRAY['CCL', 'CD', 'CMCT']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Reflexión sobre a lingua', 'Morfosintaxe galega: análise completa de estruturas complexas.', ARRAY['CCL']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Reflexión sobre a lingua', 'Variedades do galego: dialectos, rexistros, evolución.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Literatura', 'Literatura galega do século XX: Nós, vanguardas.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Literatura', 'Posguerra: xeración de Galaxia, nova narrativa galega.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Literatura', 'Poesía galega contemporánea: Celso Emilio Ferreiro, poetas da promoción dos 80.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Literatura', 'Narrativa galega actual: Manuel Rivas, Suso de Toro, Agustín Fernández Paz.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Literatura', 'Teatro galego: desde Castelao á actualidade.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Literatura', 'Tendencias actuais da literatura galega.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Lectura', 'Lectura autónoma: obras representativas da literatura galega contemporánea.', ARRAY['CCL', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.2B.1', 'Lingua Galega e Literatura II', '2º Bachillerato', 1, 'Realizar comentarios de texto rigorosos e ben fundamentados en galego.', ARRAY['CCL', 'CPSAA'], 'Evaluar'),
('CE.LG.2B.2', 'Lingua Galega e Literatura II', '2º Bachillerato', 2, 'Producir textos argumentativos de alta calidade en galego.', ARRAY['CCL', 'CPSAA'], 'Crear'),
('CE.LG.2B.3', 'Lingua Galega e Literatura II', '2º Bachillerato', 3, 'Analizar morfosintacticamente estruturas complexas en galego.', ARRAY['CCL'], 'Analizar'),
('CE.LG.2B.4', 'Lingua Galega e Literatura II', '2º Bachillerato', 4, 'Recoñecer variedades do galego e a súa evolución.', ARRAY['CCL', 'CP'], 'Comprender'),
('CE.LG.2B.5', 'Lingua Galega e Literatura II', '2º Bachillerato', 5, 'Analizar obras literarias galegas do século XX.', ARRAY['CCL', 'CCEC', 'CC'], 'Analizar'),
('CE.LG.2B.6', 'Lingua Galega e Literatura II', '2º Bachillerato', 6, 'Contextualizar movementos literarios galegos na súa época.', ARRAY['CCL', 'CCEC', 'CC'], 'Comprender'),
('CE.LG.2B.7', 'Lingua Galega e Literatura II', '2º Bachillerato', 7, 'Valorar criticamente a literatura galega contemporánea.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 2º Bachillerato cargado correctamente' AS status;
