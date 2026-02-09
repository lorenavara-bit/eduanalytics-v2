-- =====================================================
-- CURRÍCULO COMPLETO 6º DE PRIMARIA
-- Real Decreto 157/2022 - Enseñanzas Mínimas Primaria
-- =====================================================
-- Último curso de Primaria - Niños de 11 años
-- Preparación para la ESO
-- Nivel máximo de complejidad en Primaria
-- =====================================================

-- =====================================================
-- 1. MATEMÁTICAS - 6º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '6º Primaria', 'Sentido numérico', 'Números enteros: representación en la recta numérica, orden y operaciones básicas.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '6º Primaria', 'Sentido numérico', 'Potencias: concepto, cuadrados y cubos. Raíz cuadrada.', ARRAY['CMCT']),
('Matemáticas', '6º Primaria', 'Sentido numérico', 'Divisibilidad: múltiplos, divisores, números primos y compuestos.', ARRAY['CMCT']),
('Matemáticas', '6º Primaria', 'Sentido numérico', 'Porcentajes: cálculo y aplicación en problemas cotidianos.', ARRAY['CMCT', 'CE']),
('Matemáticas', '6º Primaria', 'Sentido numérico', 'Fracciones y decimales: equivalencias y operaciones.', ARRAY['CMCT']),
('Matemáticas', '6º Primaria', 'Sentido de la medida', 'Sistema métrico decimal: conversión entre unidades.', ARRAY['CMCT']),
('Matemáticas', '6º Primaria', 'Sentido de la medida', 'El tiempo: unidades y operaciones con tiempo.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '6º Primaria', 'Sentido espacial', 'Volumen de cuerpos geométricos: cubo, ortoedro, cilindro.', ARRAY['CMCT']),
('Matemáticas', '6º Primaria', 'Sentido espacial', 'Circunferencia y círculo: elementos, perímetro y área.', ARRAY['CMCT']),
('Matemáticas', '6º Primaria', 'Sentido espacial', 'Construcción de figuras geométricas con instrumentos.', ARRAY['CMCT', 'CCEC']),
('Matemáticas', '6º Primaria', 'Sentido algebraico', 'Ecuaciones de primer grado: resolución y aplicación.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '6º Primaria', 'Sentido estocástico', 'Probabilidad: experimentos aleatorios, sucesos seguros, posibles e imposibles.', ARRAY['CMCT', 'CD']),
('Matemáticas', '6º Primaria', 'Sentido estocástico', 'Estadística: medidas de centralización y dispersión básicas.', ARRAY['CMCT', 'CD'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.6P.1', 'Matemáticas', '6º Primaria', 1, 'Resolver problemas con números enteros y decimales.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.6P.2', 'Matemáticas', '6º Primaria', 2, 'Calcular porcentajes en contextos reales.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.MAT.6P.3', 'Matemáticas', '6º Primaria', 3, 'Identificar y calcular probabilidades básicas.', ARRAY['CMCT'], 'Analizar'),
('CE.MAT.6P.4', 'Matemáticas', '6º Primaria', 4, 'Calcular el volumen de cuerpos geométricos sencillos.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.6P.5', 'Matemáticas', '6º Primaria', 5, 'Resolver ecuaciones de primer grado con una incógnita.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.6P.6', 'Matemáticas', '6º Primaria', 6, 'Identificar múltiplos, divisores y números primos.', ARRAY['CMCT'], 'Comprender'),
('CE.MAT.6P.7', 'Matemáticas', '6º Primaria', 7, 'Interpretar y construir gráficos estadísticos complejos.', ARRAY['CMCT', 'CD'], 'Analizar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. LENGUA CASTELLANA Y LITERATURA - 6º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura', '6º Primaria', 'Comunicación oral', 'Exposición oral formal: estructura, claridad y uso de recursos.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lengua Castellana y Literatura', '6º Primaria', 'Comunicación oral', 'Debate y argumentación: defensa de opiniones con fundamentos.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lengua Castellana y Literatura', '6º Primaria', 'Comprensión lectora', 'Análisis e interpretación de textos literarios.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '6º Primaria', 'Comprensión lectora', 'Textos argumentativos: identificación de tesis y argumentos.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '6º Primaria', 'Comprensión lectora', 'Lectura crítica: valoración y opinión personal fundamentada.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '6º Primaria', 'Producción escrita', 'Redacción de textos argumentativos y expositivos.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '6º Primaria', 'Producción escrita', 'Planificación, redacción y revisión de textos.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '6º Primaria', 'Producción escrita', 'Ortografía avanzada: acentuación, uso de signos de puntuación.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '6º Primaria', 'Reflexión sobre la lengua', 'Análisis sintáctico completo: sujeto, predicado y complementos básicos.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '6º Primaria', 'Reflexión sobre la lengua', 'Clases de oraciones: enunciativas, interrogativas, exclamativas, imperativas.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '6º Primaria', 'Reflexión sobre la lengua', 'Análisis morfológico completo de todas las categorías gramaticales.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '6º Primaria', 'Educación literaria', 'Géneros literarios: narrativa, lírica y teatro.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '6º Primaria', 'Educación literaria', 'Recursos literarios: metáfora, símil, personificación, hipérbole.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '6º Primaria', 'Educación literaria', 'Creación de textos literarios propios.', ARRAY['CCL', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.6P.1', 'Lengua Castellana y Literatura', '6º Primaria', 1, 'Realizar exposiciones orales estructuradas y claras.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LCL.6P.2', 'Lengua Castellana y Literatura', '6º Primaria', 2, 'Analizar e interpretar textos literarios.', ARRAY['CCL', 'CCEC'], 'Analizar'),
('CE.LCL.6P.3', 'Lengua Castellana y Literatura', '6º Primaria', 3, 'Producir textos argumentativos con coherencia y cohesión.', ARRAY['CCL', 'CPSAA'], 'Crear'),
('CE.LCL.6P.4', 'Lengua Castellana y Literatura', '6º Primaria', 4, 'Realizar análisis sintáctico completo de oraciones.', ARRAY['CCL'], 'Analizar'),
('CE.LCL.6P.5', 'Lengua Castellana y Literatura', '6º Primaria', 5, 'Identificar y utilizar recursos literarios.', ARRAY['CCL', 'CCEC'], 'Crear'),
('CE.LCL.6P.6', 'Lengua Castellana y Literatura', '6º Primaria', 6, 'Aplicar correctamente normas ortográficas avanzadas.', ARRAY['CCL'], 'Aplicar'),
('CE.LCL.6P.7', 'Lengua Castellana y Literatura', '6º Primaria', 7, 'Valorar críticamente textos leídos.', ARRAY['CCL', 'CPSAA'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 3. CIENCIAS DE LA NATURALEZA - 6º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Ciencias de la Naturaleza', '6º Primaria', 'Seres vivos', 'Organización de los seres vivos: células, tejidos, órganos y aparatos.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '6º Primaria', 'Seres vivos', 'Los aparatos y sistemas del cuerpo humano: funcionamiento integrado.', ARRAY['CMCT', 'CPSAA']),
('Ciencias de la Naturaleza', '6º Primaria', 'Seres vivos', 'La salud: prevención de enfermedades y hábitos saludables.', ARRAY['CMCT', 'CPSAA', 'CC']),
('Ciencias de la Naturaleza', '6º Primaria', 'Seres vivos', 'Clasificación de los seres vivos: reinos.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '6º Primaria', 'Seres vivos', 'Biodiversidad: importancia y conservación.', ARRAY['CMCT', 'CC']),
('Ciencias de la Naturaleza', '6º Primaria', 'Materia y energía', 'Propiedades de la materia: masa, volumen, densidad.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '6º Primaria', 'Materia y energía', 'Mezclas y sustancias puras: separación de mezclas.', ARRAY['CMCT', 'CE']),
('Ciencias de la Naturaleza', '6º Primaria', 'Materia y energía', 'La luz: propagación, reflexión y refracción.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '6º Primaria', 'Materia y energía', 'El sonido: propagación y características.', ARRAY['CMCT', 'CCEC']),
('Ciencias de la Naturaleza', '6º Primaria', 'Tecnología', 'Electricidad: circuitos eléctricos básicos.', ARRAY['CMCT', 'CD', 'CE']),
('Ciencias de la Naturaleza', '6º Primaria', 'Tecnología', 'Avances tecnológicos y su impacto en la sociedad.', ARRAY['CMCT', 'CD', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.CN.6P.1', 'Ciencias de la Naturaleza', '6º Primaria', 1, 'Explicar la organización del cuerpo humano en niveles.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.6P.2', 'Ciencias de la Naturaleza', '6º Primaria', 2, 'Describir el funcionamiento de aparatos y sistemas.', ARRAY['CMCT', 'CPSAA'], 'Comprender'),
('CE.CN.6P.3', 'Ciencias de la Naturaleza', '6º Primaria', 3, 'Clasificar seres vivos según los reinos.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.6P.4', 'Ciencias de la Naturaleza', '6º Primaria', 4, 'Explicar las propiedades de la materia.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.6P.5', 'Ciencias de la Naturaleza', '6º Primaria', 5, 'Diseñar y construir circuitos eléctricos sencillos.', ARRAY['CMCT', 'CD', 'CE'], 'Crear'),
('CE.CN.6P.6', 'Ciencias de la Naturaleza', '6º Primaria', 6, 'Valorar la importancia de la biodiversidad.', ARRAY['CMCT', 'CC'], 'Evaluar'),
('CE.CN.6P.7', 'Ciencias de la Naturaleza', '6º Primaria', 7, 'Analizar el impacto de los avances tecnológicos.', ARRAY['CMCT', 'CD', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 4. CIENCIAS SOCIALES - 6º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Ciencias Sociales', '6º Primaria', 'Historia', 'Edad Media en España: Al-Ándalus y los reinos cristianos.', ARRAY['CC', 'CCEC']),
('Ciencias Sociales', '6º Primaria', 'Historia', 'Edad Moderna: los Reyes Católicos, descubrimiento de América.', ARRAY['CC', 'CCEC', 'CP']),
('Ciencias Sociales', '6º Primaria', 'Historia', 'Edad Contemporánea: Revolución Industrial, siglos XIX y XX en España.', ARRAY['CC', 'CCEC']),
('Ciencias Sociales', '6º Primaria', 'Historia', 'España en el siglo XX: Guerra Civil, dictadura y democracia.', ARRAY['CC', 'CCEC', 'CPSAA']),
('Ciencias Sociales', '6º Primaria', 'Geografía', 'La Unión Europea: países, instituciones y funcionamiento básico.', ARRAY['CC', 'CP']),
('Ciencias Sociales', '6º Primaria', 'Geografía', 'Los continentes: características físicas, políticas y culturales.', ARRAY['CC', 'CCL', 'CP']),
('Ciencias Sociales', '6º Primaria', 'Economía', 'El mundo globalizado: comercio internacional y interdependencia.', ARRAY['CC', 'CE', 'CD']),
('Ciencias Sociales', '6º Primaria', 'Economía', 'Desarrollo sostenible: economía y medio ambiente.', ARRAY['CC', 'CE', 'CPSAA']),
('Ciencias Sociales', '6º Primaria', 'Ciudadanía', 'Los Derechos Humanos: declaración universal y aplicación.', ARRAY['CC', 'CPSAA']),
('Ciencias Sociales', '6º Primaria', 'Ciudadanía', 'Igualdad de género y no discriminación.', ARRAY['CC', 'CPSAA'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.CS.6P.1', 'Ciencias Sociales', '6º Primaria', 1, 'Explicar las principales etapas de la Historia de España.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.CS.6P.2', 'Ciencias Sociales', '6º Primaria', 2, 'Describir la organización y funcionamiento de la Unión Europea.', ARRAY['CC', 'CP'], 'Comprender'),
('CE.CS.6P.3', 'Ciencias Sociales', '6º Primaria', 3, 'Localizar y caracterizar los continentes.', ARRAY['CC', 'CCL'], 'Aplicar'),
('CE.CS.6P.4', 'Ciencias Sociales', '6º Primaria', 4, 'Analizar el fenómeno de la globalización.', ARRAY['CC', 'CE', 'CD'], 'Analizar'),
('CE.CS.6P.5', 'Ciencias Sociales', '6º Primaria', 5, 'Comprender la importancia del desarrollo sostenible.', ARRAY['CC', 'CE', 'CPSAA'], 'Evaluar'),
('CE.CS.6P.6', 'Ciencias Sociales', '6º Primaria', 6, 'Valorar los Derechos Humanos y su aplicación.', ARRAY['CC', 'CPSAA'], 'Evaluar'),
('CE.CS.6P.7', 'Ciencias Sociales', '6º Primaria', 7, 'Promover la igualdad y la no discriminación.', ARRAY['CC', 'CPSAA'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 5. INGLÉS (LENGUA EXTRANJERA) - 6º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Inglés', '6º Primaria', 'Comprensión oral', 'Comprensión de conversaciones, diálogos y presentaciones en inglés.', ARRAY['CP', 'CCL']),
('Inglés', '6º Primaria', 'Comprensión oral', 'Identificación de información específica en textos orales diversos.', ARRAY['CP', 'CCL', 'CD']),
('Inglés', '6º Primaria', 'Producción oral', 'Descripción detallada de experiencias, hechos y planes futuros.', ARRAY['CP', 'CCL', 'CPSAA']),
('Inglés', '6º Primaria', 'Producción oral', 'Participación activa en conversaciones sobre temas variados.', ARRAY['CP', 'CPSAA', 'CC']),
('Inglés', '6º Primaria', 'Producción oral', 'Pronunciación clara y entonación adecuada.', ARRAY['CP', 'CCL']),
('Inglés', '6º Primaria', 'Comprensión lectora', 'Lectura comprensiva de textos auténticos adaptados.', ARRAY['CP', 'CCL']),
('Inglés', '6º Primaria', 'Comprensión lectora', 'Análisis de textos literarios sencillos en inglés.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés', '6º Primaria', 'Producción escrita', 'Redacción de textos variados: cartas, emails, descripciones, narraciones.', ARRAY['CP', 'CCL', 'CD']),
('Inglés', '6º Primaria', 'Gramática', 'Tiempos verbales: presente perfecto, futuro con will y going to.', ARRAY['CP', 'CCL']),
('Inglés', '6º Primaria', 'Gramática', 'Oraciones condicionales de tipo 0 y 1.', ARRAY['CP', 'CCL']),
('Inglés', '6º Primaria', 'Vocabulario', 'Vocabulario amplio: medio ambiente, tecnología, salud, cultura.', ARRAY['CP', 'CD', 'CC']),
('Inglés', '6º Primaria', 'Cultura', 'Países anglosajones: geografía, cultura, costumbres y celebraciones.', ARRAY['CP', 'CCEC', 'CC', 'CP'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.6P.1', 'Inglés', '6º Primaria', 1, 'Comprender información específica de textos orales variados.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.6P.2', 'Inglés', '6º Primaria', 2, 'Participar activamente en conversaciones sobre temas diversos.', ARRAY['CP', 'CPSAA'], 'Aplicar'),
('CE.ING.6P.3', 'Inglés', '6º Primaria', 3, 'Leer y comprender textos auténticos adaptados.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.6P.4', 'Inglés', '6º Primaria', 4, 'Escribir textos coherentes con corrección gramatical.', ARRAY['CP', 'CCL', 'CD'], 'Crear'),
('CE.ING.6P.5', 'Inglés', '6º Primaria', 5, 'Usar correctamente tiempos verbales complejos.', ARRAY['CP', 'CCL'], 'Aplicar'),
('CE.ING.6P.6', 'Inglés', '6º Primaria', 6, 'Conocer aspectos culturales de países anglosajones.', ARRAY['CP', 'CCEC', 'CC'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- RESUMEN - 6º PRIMARIA
-- =====================================================

-- TOTAL: 60 saberes básicos + 34 criterios de evaluación
-- 5 asignaturas académicas principales
-- Nivel: 11 años - Último curso de Primaria (preparación ESO)
-- Base legal: Real Decreto 157/2022

SELECT 'Currículo completo de 6º Primaria cargado correctamente - 5 asignaturas' AS status;
