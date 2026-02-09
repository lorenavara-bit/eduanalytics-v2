-- =====================================================
-- CURRÍCULO COMPLETO 5º DE PRIMARIA
-- Real Decreto 157/2022 - Enseñanzas Mínimas Primaria
-- =====================================================
-- Adaptado a niños de 10 años
-- Nivel avanzado de Primaria
-- =====================================================

-- =====================================================
-- 1. MATEMÁTICAS - 5º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '5º Primaria', 'Sentido numérico', 'Números naturales hasta el millón: lectura, escritura, comparación y ordenación.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '5º Primaria', 'Sentido numérico', 'Números decimales con hasta tres cifras decimales: lectura, escritura y comparación.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '5º Primaria', 'Sentido numérico', 'Fracciones: concepto, representación, equivalencia y comparación.', ARRAY['CMCT']),
('Matemáticas', '5º Primaria', 'Sentido numérico', 'Operaciones con números decimales: suma, resta, multiplicación y división sencilla.', ARRAY['CMCT', 'CE']),
('Matemáticas', '5º Primaria', 'Sentido numérico', 'Suma y resta de fracciones con igual denominador.', ARRAY['CMCT']),
('Matemáticas', '5º Primaria', 'Sentido de la medida', 'Unidades de longitud: metro, centímetro, milímetro, kilómetro.', ARRAY['CMCT']),
('Matemáticas', '5º Primaria', 'Sentido de la medida', 'Unidades de masa: kilogramo, gramo, tonelada.', ARRAY['CMCT', 'CE']),
('Matemáticas', '5º Primaria', 'Sentido de la medida', 'Unidades de capacidad: litro, mililitro.', ARRAY['CMCT']),
('Matemáticas', '5º Primaria', 'Sentido espacial', 'Área y perímetro de figuras planas: cuadrado, rectángulo, triángulo.', ARRAY['CMCT']),
('Matemáticas', '5º Primaria', 'Sentido espacial', 'Elementos geométricos: rectas paralelas, perpendiculares y secantes.', ARRAY['CMCT', 'CCEC']),
('Matemáticas', '5º Primaria', 'Sentido algebraico', 'Expresiones algebraicas sencillas. Ecuaciones de primer grado con una incógnita.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '5º Primaria', 'Sentido estocástico', 'Media aritmética y moda: cálculo e interpretación.', ARRAY['CMCT', 'CD']),
('Matemáticas', '5º Primaria', 'Sentido estocástico', 'Gráficos de barras, líneas y pictogramas: interpretación y construcción.', ARRAY['CMCT', 'CD'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.5P.1', 'Matemáticas', '5º Primaria', 1, 'Operar con números decimales en situaciones de la vida cotidiana.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.MAT.5P.2', 'Matemáticas', '5º Primaria', 2, 'Resolver problemas utilizando fracciones.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.5P.3', 'Matemáticas', '5º Primaria', 3, 'Calcular el área y perímetro de figuras planas.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.5P.4', 'Matemáticas', '5º Primaria', 4, 'Convertir entre diferentes unidades de medida.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.5P.5', 'Matemáticas', '5º Primaria', 5, 'Resolver ecuaciones sencillas de primer grado.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.5P.6', 'Matemáticas', '5º Primaria', 6, 'Calcular e interpretar la media y la moda de un conjunto de datos.', ARRAY['CMCT', 'CD'], 'Analizar'),
('CE.MAT.5P.7', 'Matemáticas', '5º Primaria', 7, 'Interpretar y construir diferentes tipos de gráficos.', ARRAY['CMCT', 'CD'], 'Crear')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. LENGUA CASTELLANA Y LITERATURA - 5º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura', '5º Primaria', 'Comunicación oral', 'Exposición oral de temas con apoyo de esquemas y materiales.', ARRAY['CCL', 'CD']),
('Lengua Castellana y Literatura', '5º Primaria', 'Comunicación oral', 'Debate: expresión de opiniones con respeto y argumentación.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lengua Castellana y Literatura', '5º Primaria', 'Comprensión lectora', 'Lectura comprensiva de textos de diferentes géneros: narrativos, descriptivos, expositivos.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '5º Primaria', 'Comprensión lectora', 'Identificación de la idea principal y las secundarias.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '5º Primaria', 'Comprensión lectora', 'Inferencias y deducciones a partir de la lectura.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '5º Primaria', 'Producción escrita', 'Redacción de textos narrativos, descriptivos y dialogados con coherencia y cohesión.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '5º Primaria', 'Producción escrita', 'Resumen de textos: identificación de ideas principales.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '5º Primaria', 'Producción escrita', 'Ortografía: uso de la b/v, g/j, h, acentuación de palabras.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '5º Primaria', 'Reflexión sobre la lengua', 'El verbo: conjugación de tiempos verbales (presente, pasado, futuro).', ARRAY['CCL']),
('Lengua Castellana y Literatura', '5º Primaria', 'Reflexión sobre la lengua', 'Análisis morfológico: sustantivo, adjetivo, verbo, determinante, pronombre.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '5º Primaria', 'Reflexión sobre la lengua', 'La oración: sujeto y predicado. Tipos de oraciones.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '5º Primaria', 'Educación literaria', 'Lectura y análisis de textos literarios: cuentos, poemas, teatro.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '5º Primaria', 'Educación literaria', 'Recursos literarios básicos: comparación, metáfora, personificación.', ARRAY['CCL', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.5P.1', 'Lengua Castellana y Literatura', '5º Primaria', 1, 'Producir textos orales coherentes y bien estructurados.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LCL.5P.2', 'Lengua Castellana y Literatura', '5º Primaria', 2, 'Comprender textos de diferentes géneros identificando ideas principales.', ARRAY['CCL'], 'Comprender'),
('CE.LCL.5P.3', 'Lengua Castellana y Literatura', '5º Primaria', 3, 'Redactar textos narrativos y descriptivos con corrección ortográfica.', ARRAY['CCL', 'CCEC'], 'Crear'),
('CE.LCL.5P.4', 'Lengua Castellana y Literatura', '5º Primaria', 4, 'Realizar análisis morfológico de oraciones sencillas.', ARRAY['CCL'], 'Analizar'),
('CE.LCL.5P.5', 'Lengua Castellana y Literatura', '5º Primaria', 5, 'Conjugar verbos en diferentes tiempos verbales.', ARRAY['CCL'], 'Aplicar'),
('CE.LCL.5P.6', 'Lengua Castellana y Literatura', '5º Primaria', 6, 'Identificar recursos literarios en textos poéticos.', ARRAY['CCL', 'CCEC'], 'Comprender'),
('CE.LCL.5P.7', 'Lengua Castellana y Literatura', '5º Primaria', 7, 'Participar en debates expresando opiniones con argumentos.', ARRAY['CCL', 'CPSAA', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 3. CIENCIAS DE LA NATURALEZA - 5º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Ciencias de la Naturaleza', '5º Primaria', 'Seres vivos', 'La célula: unidad de vida. Tipos de células: animal y vegetal.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '5º Primaria', 'Seres vivos', 'La función de nutrición: digestión, respiración, circulación y excreción.', ARRAY['CMCT', 'CPSAA']),
('Ciencias de la Naturaleza', '5º Primaria', 'Seres vivos', 'La función de relación: los sentidos y el sistema nervioso.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '5º Primaria', 'Seres vivos', 'La función de reproducción: reproducción humana básica.', ARRAY['CMCT', 'CPSAA']),
('Ciencias de la Naturaleza', '5º Primaria', 'Seres vivos', 'Los ecosistemas: componentes y relaciones entre seres vivos.', ARRAY['CMCT', 'CC']),
('Ciencias de la Naturaleza', '5º Primaria', 'Materia y energía', 'La materia: estados, cambios de estado y mezclas.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '5º Primaria', 'Materia y energía', 'La energía: formas de energía y transformaciones.', ARRAY['CMCT', 'CE']),
('Ciencias de la Naturaleza', '5º Primaria', 'Materia y energía', 'Fuentes de energía renovables y no renovables.', ARRAY['CMCT', 'CC', 'CE']),
('Ciencias de la Naturaleza', '5º Primaria', 'Tecnología', 'Máquinas y aparatos: tipos y aplicaciones.', ARRAY['CMCT', 'CD', 'CE']),
('Ciencias de la Naturaleza', '5º Primaria', 'Medio ambiente', 'Conservación del medio ambiente: reciclaje y ahorro energético.', ARRAY['CMCT', 'CC', 'CPSAA'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.CN.5P.1', 'Ciencias de la Naturaleza', '5º Primaria', 1, 'Describir la célula y sus tipos básicos.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.5P.2', 'Ciencias de la Naturaleza', '5º Primaria', 2, 'Explicar las funciones vitales de nutrición, relación y reproducción.', ARRAY['CMCT', 'CPSAA'], 'Comprender'),
('CE.CN.5P.3', 'Ciencias de la Naturaleza', '5º Primaria', 3, 'Identificar los componentes de un ecosistema y sus relaciones.', ARRAY['CMCT', 'CC'], 'Analizar'),
('CE.CN.5P.4', 'Ciencias de la Naturaleza', '5º Primaria', 4, 'Diferenciar formas de energía y sus transformaciones.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.5P.5', 'Ciencias de la Naturaleza', '5º Primaria', 5, 'Valorar la importancia de las energías renovables.', ARRAY['CMCT', 'CC', 'CE'], 'Evaluar'),
('CE.CN.5P.6', 'Ciencias de la Naturaleza', '5º Primaria', 6, 'Practicar hábitos de conservación del medio ambiente.', ARRAY['CMCT', 'CC', 'CPSAA'], 'Aplicar'),
('CE.CN.5P.7', 'Ciencias de la Naturaleza', '5º Primaria', 7, 'Explicar el funcionamiento de máquinas y aparatos sencillos.', ARRAY['CMCT', 'CD'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 4. CIENCIAS SOCIALES - 5º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Ciencias Sociales', '5º Primaria', 'Geografía', 'España: relieve, ríos, costas y clima.', ARRAY['CC', 'CCL']),
('Ciencias Sociales', '5º Primaria', 'Geografía', 'Las comunidades autónomas de España: ubicación y capitales.', ARRAY['CC', 'CCL']),
('Ciencias Sociales', '5º Primaria', 'Geografía', 'Europa: países, capitales y características básicas.', ARRAY['CC', 'CCL', 'CP']),
('Ciencias Sociales', '5º Primaria', 'Geografía', 'Mapas: interpretación de escalas, símbolos y coordenadas.', ARRAY['CC', 'CMCT', 'CD']),
('Ciencias Sociales', '5º Primaria', 'Historia', 'La Prehistoria: Paleolítico, Neolítico y Edad de los Metales.', ARRAY['CC', 'CCEC']),
('Ciencias Sociales', '5º Primaria', 'Historia', 'Edad Antigua en España: pueblos prerromanos, romanos y visigodos.', ARRAY['CC', 'CCEC']),
('Ciencias Sociales', '5º Primaria', 'Economía', 'Sectores económicos: primario, secundario y terciario.', ARRAY['CC', 'CE']),
('Ciencias Sociales', '5º Primaria', 'Economía', 'El dinero: uso responsable y ahorro.', ARRAY['CC', 'CE', 'CPSAA']),
('Ciencias Sociales', '5º Primaria', 'Cultura', 'Patrimonio cultural de España: monumentos, tradiciones y lenguas.', ARRAY['CC', 'CCEC']),
('Ciencias Sociales', '5º Primaria', 'Ciudadanía', 'Organización del Estado español: monarquía parlamentaria.', ARRAY['CC', 'CPSAA'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.CS.5P.1', 'Ciencias Sociales', '5º Primaria', 1, 'Localizar en mapas el relieve, ríos y costas de España.', ARRAY['CC', 'CMCT'], 'Aplicar'),
('CE.CS.5P.2', 'Ciencias Sociales', '5º Primaria', 2, 'Identificar las comunidades autónomas y sus capitales.', ARRAY['CC', 'CCL'], 'Recordar'),
('CE.CS.5P.3', 'Ciencias Sociales', '5º Primaria', 3, 'Explicar las características de los períodos de la Prehistoria.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.CS.5P.4', 'Ciencias Sociales', '5º Primaria', 4, 'Describir los tres sectores económicos y sus actividades.', ARRAY['CC', 'CE'], 'Comprender'),
('CE.CS.5P.5', 'Ciencias Sociales', '5º Primaria', 5, 'Interpretar mapas usando escalas y coordenadas.', ARRAY['CC', 'CMCT', 'CD'], 'Aplicar'),
('CE.CS.5P.6', 'Ciencias Sociales', '5º Primaria', 6, 'Valorar el patrimonio cultural español.', ARRAY['CC', 'CCEC'], 'Evaluar'),
('CE.CS.5P.7', 'Ciencias Sociales', '5º Primaria', 7, 'Conocer la organización política de España.', ARRAY['CC', 'CPSAA'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 5. INGLÉS (LENGUA EXTRANJERA) - 5º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Inglés', '5º Primaria', 'Comprensión oral', 'Comprensión de conversaciones y diálogos en inglés sobre temas cotidianos.', ARRAY['CP', 'CCL']),
('Inglés', '5º Primaria', 'Comprensión oral', 'Comprensión de textos orales informativos y narrativos.', ARRAY['CP', 'CCL']),
('Inglés', '5º Primaria', 'Producción oral', 'Descripción de personas, lugares y objetos con detalle.', ARRAY['CP', 'CCL']),
('Inglés', '5º Primaria', 'Producción oral', 'Expresión de gustos, preferencias y opiniones en inglés.', ARRAY['CP', 'CPSAA']),
('Inglés', '5º Primaria', 'Producción oral', 'Participación en conversaciones sobre temas familiares.', ARRAY['CP', 'CPSAA', 'CC']),
('Inglés', '5º Primaria', 'Comprensión lectora', 'Lectura comprensiva de textos adaptados: cuentos, artículos, instrucciones.', ARRAY['CP', 'CCL']),
('Inglés', '5º Primaria', 'Producción escrita', 'Redacción de textos breves: cartas, emails, descripciones.', ARRAY['CP', 'CCL', 'CD']),
('Inglés', '5º Primaria', 'Gramática', 'Tiempos verbales: presente simple, presente continuo, pasado simple.', ARRAY['CP', 'CCL']),
('Inglés', '5º Primaria', 'Gramática', 'Adjetivos comparativos y superlativos.', ARRAY['CP', 'CCL']),
('Inglés', '5º Primaria', 'Vocabulario', 'Vocabulario temático: deportes, hobbies, viajes, tecnología.', ARRAY['CP']),
('Inglés', '5º Primaria', 'Cultura', 'Aspectos culturales de países anglosajones: costumbres, geografía básica.', ARRAY['CP', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.5P.1', 'Inglés', '5º Primaria', 1, 'Comprender textos orales sobre temas cotidianos.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.5P.2', 'Inglés', '5º Primaria', 2, 'Describir personas, lugares y objetos en inglés.', ARRAY['CP', 'CCL'], 'Aplicar'),
('CE.ING.5P.3', 'Inglés', '5º Primaria', 3, 'Expresar gustos y preferencias en conversaciones.', ARRAY['CP', 'CPSAA'], 'Aplicar'),
('CE.ING.5P.4', 'Inglés', '5º Primaria', 4, 'Leer y comprender textos adaptados en inglés.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.5P.5', 'Inglés', '5º Primaria', 5, 'Escribir textos breves con corrección gramatical básica.', ARRAY['CP', 'CCL', 'CD'], 'Crear'),
('CE.ING.5P.6', 'Inglés', '5º Primaria', 6, 'Usar correctamente tiempos verbales básicos en inglés.', ARRAY['CP', 'CCL'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- RESUMEN - 5º PRIMARIA
-- =====================================================

-- TOTAL: 61 saberes básicos + 34 criterios de evaluación
-- 5 asignaturas académicas principales
-- Nivel: 10 años - Penúltimo curso de Primaria
-- Base legal: Real Decreto 157/2022

SELECT 'Currículo completo de 5º Primaria cargado correctamente - 5 asignaturas' AS status;
