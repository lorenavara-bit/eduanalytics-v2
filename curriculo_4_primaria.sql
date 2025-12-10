-- =====================================================
-- CURRÍCULO COMPLETO PARA 4º DE PRIMARIA
-- Real Decreto 157/2022 - Enseñanzas Mínimas
-- Creado específicamente para un estudiante de 4º de Primaria
-- =====================================================

-- =====================================================
-- 1. MATEMÁTICAS - 4º PRIMARIA
-- =====================================================

-- Saberes Básicos de Matemáticas
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '4º Primaria', 'Sentido numérico', 'Números naturales hasta el millón: lectura, escritura, comparación y ordenación.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '4º Primaria', 'Sentido numérico', 'Fracciones propias con denominador menor que 12: representación y comparación.', ARRAY['CMCT']),
('Matemáticas', '4º Primaria', 'Sentido numérico', 'Operaciones con números naturales: multiplicación por dos y tres cifras, división por una cifra.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '4º Primaria', 'Sentido de la medida', 'Medidas de longitud, masa y capacidad: estimación y medida con instrumentos.', ARRAY['CMCT', 'CE']),
('Matemáticas', '4º Primaria', 'Sentido de la medida', 'Comparación y ordenación de distancias, masas y capacidades.', ARRAY['CMCT']),
('Matemáticas', '4º Primaria', 'Sentido espacial', 'Figuras geométricas planas: triángulos, cuadriláteros, polígonos regulares.', ARRAY['CMCT', 'CCEC']),
('Matemáticas', '4º Primaria', 'Sentido espacial', 'Localización y descripción de posiciones y movimientos en mallas y planos.', ARRAY['CMCT', 'CD']),
('Matemáticas', '4º Primaria', 'Sentido algebraico', 'Patrones y regularidades numéricas: identificación y extensión.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '4º Primaria', 'Sentido estocástico', 'Gráficos de barras y pictogramas: lectura e interpretación.', ARRAY['CMCT', 'CD']),
('Matemáticas', '4º Primaria', 'Sentido estocástico', 'Recogida, organización y representación de datos del entorno.', ARRAY['CMCT', 'CD', 'CE'])
ON CONFLICT DO NOTHING;

-- Criterios de Evaluación de Matemáticas
INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.4P.1', 'Matemáticas', '4º Primaria', 1, 'Comprender problemas de la vida cotidiana planteados en diferentes formatos y proponer estrategias de resolución.', ARRAY['CMCT', 'CCL', 'CE'], 'Comprender'),
('CE.MAT.4P.2', 'Matemáticas', '4º Primaria', 2, 'Realizar cálculos mentales y con algoritmos de operaciones con números naturales.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.4P.3', 'Matemáticas', '4º Primaria', 3, 'Utilizar las relaciones entre fracciones sencillas y los números decimales en situaciones de la vida cotidiana.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.MAT.4P.4', 'Matemáticas', '4º Primaria', 4, 'Utilizar el sistema métrico decimal para estimar, medir y comparar longitudes, masas y capacidades.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.MAT.4P.5', 'Matemáticas', '4º Primaria', 5, 'Identificar y clasificar figuras geométricas planas según sus propiedades.', ARRAY['CMCT'], 'Comprender'),
('CE.MAT.4P.6', 'Matemáticas', '4º Primaria', 6, 'Interpretar datos presentados en gráficos de barras y pictogramas del entorno cercano.', ARRAY['CMCT', 'CD'], 'Analizar'),
('CE.MAT.4P.7', 'Matemáticas', '4º Primaria', 7, 'Reconocer y continuar patrones numéricos en secuencias y series.', ARRAY['CMCT', 'CPSAA'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. LENGUA CASTELLANA Y LITERATURA - 4º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura', '4º Primaria', 'Las lenguas y sus hablantes', 'Reconocimiento de la diversidad lingüística del entorno y valoración positiva.', ARRAY['CCL', 'CP', 'CC']),
('Lengua Castellana y Literatura', '4º Primaria', 'Comunicación oral', 'Producción oral: pronunciación, entonación, gestión del tiempo y contacto visual.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '4º Primaria', 'Comunicación oral', 'Comprensión oral: identificación de las ideas principales y secundarias de textos orales.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '4º Primaria', 'Comprensión lectora', 'Lectura de textos narrativos, descriptivos e informativos: identificación de la idea principal.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '4º Primaria', 'Comprensión lectora', 'Estrategias para mejorar la fluidez lectora y la comprensión.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '4º Primaria', 'Producción escrita', 'Elaboración de textos escritos con coherencia, cohesión y adecuación.', ARRAY['CCL', 'CD']),
('Lengua Castellana y Literatura', '4º Primaria', 'Producción escrita', 'Uso de las reglas ortográficas básicas: uso de la coma, punto y mayúsculas.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '4º Primaria', 'Educación literaria', 'Lectura autónoma y guiada de textos literarios variados: cuentos, poemas, teatro.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '4º Primaria', 'Reflexión sobre la lengua', 'Clases de palabras: sustantivos, adjetivos, verbos, determinantes.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '4º Primaria', 'Reflexión sobre la lengua', 'La oración simple: sujeto y predicado.', ARRAY['CCL'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.4P.1', 'Lengua Castellana y Literatura', '4º Primaria', 1, 'Reconocer la diversidad lingüística del mundo a partir de la identificación de lenguas del entorno.', ARRAY['CCL', 'CP', 'CC'], 'Recordar'),
('CE.LCL.4P.2', 'Lengua Castellana y Literatura', '4º Primaria', 2, 'Comprender el sentido de textos orales identificando las ideas principales y secundarias.', ARRAY['CCL'], 'Comprender'),
('CE.LCL.4P.3', 'Lengua Castellana y Literatura', '4º Primaria', 3, 'Producir textos orales con pronunciación, entonación y ritmo adecuados.', ARRAY['CCL', 'CPSAA'], 'Aplicar'),
('CE.LCL.4P.4', 'Lengua Castellana y Literatura', '4º Primaria', 4, 'Comprender textos escritos identificando la idea principal y los datos relevantes.', ARRAY['CCL'], 'Comprender'),
('CE.LCL.4P.5', 'Lengua Castellana y Literatura', '4º Primaria', 5, 'Producir textos escritos creativos y académicos aplicando normas ortográficas y gramaticales.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LCL.4P.6', 'Lengua Castellana y Literatura', '4º Primaria', 6, 'Leer de manera autónoma textos literarios adecuados a la edad e intereses.', ARRAY['CCL', 'CCEC'], 'Aplicar'),
('CE.LCL.4P.7', 'Lengua Castellana y Literatura', '4º Primaria', 7, 'Identificar las clases de palabras y la estructura básica de la oración.', ARRAY['CCL'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 3. CIENCIAS DE LA NATURALEZA - 4º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Ciencias de la Naturaleza', '4º Primaria', 'Seres vivos', 'La célula como unidad de vida: observación y descripción básica.', ARRAY['CMCT', 'CCL']),
('Ciencias de la Naturaleza', '4º Primaria', 'Seres vivos', 'Clasificación de animales vertebrados e invertebrados según criterios científicos.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '4º Primaria', 'Seres vivos', 'Las plantas: nutrición, relación y reproducción. Fotosíntesis.', ARRAY['CMCT', 'CPSAA']),
('Ciencias de la Naturaleza', '4º Primaria', 'Cuerpo humano', 'El sistema digestivo: órganos y funciones.', ARRAY['CMCT', 'CPSAA']),
('Ciencias de la Naturaleza', '4º Primaria', 'Cuerpo humano', 'El sistema respiratorio: órganos y funcionamiento.', ARRAY['CMCT', 'CPSAA']),
('Ciencias de la Naturaleza', '4º Primaria', 'Cuerpo humano', 'Hábitos saludables: alimentación equilibrada, higiene, ejercicio físico y descanso.', ARRAY['CMCT', 'CPSAA', 'CC']),
('Ciencias de la Naturaleza', '4º Primaria', 'Materia y energía', 'Estados de la materia: sólido, líquido y gas. Cambios de estado.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '4º Primaria', 'Materia y energía', 'Fuentes de energía renovables y no renovables: identificación y uso responsable.', ARRAY['CMCT', 'CC', 'CE']),
('Ciencias de la Naturaleza', '4º Primaria', 'Ecosistemas', 'Ecosistemas terrestres y acuáticos: características, flora y fauna.', ARRAY['CMCT', 'CC']),
('Ciencias de la Naturaleza', '4º Primaria', 'Ecosistemas', 'La biodiversidad y su importancia. Acciones para su conservación.', ARRAY['CMCT', 'CC', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.CN.4P.1', 'Ciencias de la Naturaleza', '4º Primaria', 1, 'Identificar la célula como unidad básica de los seres vivos y describir sus componentes.', ARRAY['CMCT', 'CCL'], 'Comprender'),
('CE.CN.4P.2', 'Ciencias de la Naturaleza', '4º Primaria', 2, 'Clasificar animales en vertebrados e invertebrados según sus características.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.4P.3', 'Ciencias de la Naturaleza', '4º Primaria', 3, 'Explicar las funciones vitales de nutrición, relación y reproducción en seres vivos.', ARRAY['CMCT', 'CCL'], 'Comprender'),
('CE.CN.4P.4', 'Ciencias de la Naturaleza', '4º Primaria', 4, 'Identificar los principales órganos del sistema digestivo y respiratorio y sus funciones.', ARRAY['CMCT'], 'Recordar'),
('CE.CN.4P.5', 'Ciencias de la Naturaleza', '4º Primaria', 5, 'Reconocer los estados de la materia y los cambios entre ellos.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.4P.6', 'Ciencias de la Naturaleza', '4º Primaria', 6, 'Diferenciar fuentes de energía renovables y no renovables valorando su impacto ambiental.', ARRAY['CMCT', 'CC'], 'Evaluar'),
('CE.CN.4P.7', 'Ciencias de la Naturaleza', '4º Primaria', 7, 'Describir ecosistemas terrestres y acuáticos identificando su biodiversidad.', ARRAY['CMCT', 'CC'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 4. CIENCIAS SOCIALES - 4º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Ciencias Sociales', '4º Primaria', 'Geografía', 'El relieve de España: cordilleras, mesetas, costas e islas.', ARRAY['CC', 'CCL', 'CMCT']),
('Ciencias Sociales', '4º Primaria', 'Geografía', 'Los ríos de España: vertientes atlántica y mediterránea.', ARRAY['CC', 'CCL']),
('Ciencias Sociales', '4º Primaria', 'Geografía', 'El clima de España: zonas climáticas y características.', ARRAY['CC', 'CMCT']),
('Ciencias Sociales', '4º Primaria', 'Geografía', 'Las comunidades autónomas de España: localización y capitales.', ARRAY['CC', 'CCL']),
('Ciencias Sociales', '4º Primaria', 'Historia', 'La Prehistoria en la Península Ibérica: Paleolítico, Neolítico y Edad de los Metales.', ARRAY['CC', 'CCEC']),
('Ciencias Sociales', '4º Primaria', 'Historia', 'Las civilizaciones antiguas: fenicios, griegos, cartagineses y romanos en España.', ARRAY['CC', 'CCEC', 'CCL']),
('Ciencias Sociales', '4º Primaria', 'Sociedad', 'El gobierno de España: instituciones democráticas básicas.', ARRAY['CC', 'CCL']),
('Ciencias Sociales', '4º Primaria', 'Sociedad', 'La organización territorial: municipios, provincias y comunidades autónomas.', ARRAY['CC']),
('Ciencias Sociales', '4º Primaria', 'Educación vial', 'Normas de seguridad vial como peatón y como pasajero.', ARRAY['CC', 'CPSAA']),
('Ciencias Sociales', '4º Primaria', 'Economía', 'Actividades económicas: sector primario, secundario y terciario.', ARRAY['CC', 'CE'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.CS.4P.1', 'Ciencias Sociales', '4º Primaria', 1, 'Localizar en un mapa las principales unidades de relieve, ríos y climas de España.', ARRAY['CC', 'CMCT'], 'Aplicar'),
('CE.CS.4P.2', 'Ciencias Sociales', '4º Primaria', 2, 'Identificar las comunidades autónomas de España y sus capitales.', ARRAY['CC', 'CCL'], 'Recordar'),
('CE.CS.4P.3', 'Ciencias Sociales', '4º Primaria', 3, 'Describir las características principales de la Prehistoria en la Península Ibérica.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.CS.4P.4', 'Ciencias Sociales', '4º Primaria', 4, 'Reconocer la influencia de las civilizaciones antiguas en la Península Ibérica.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.CS.4P.5', 'Ciencias Sociales', '4º Primaria', 5, 'Explicar la organización política y territorial de España.', ARRAY['CC', 'CCL'], 'Comprender'),
('CE.CS.4P.6', 'Ciencias Sociales', '4º Primaria', 6, 'Conocer y aplicar las normas básicas de seguridad vial.', ARRAY['CC', 'CPSAA'], 'Aplicar'),
('CE.CS.4P.7', 'Ciencias Sociales', '4º Primaria', 7, 'Distinguir las actividades económicas de los tres sectores.', ARRAY['CC', 'CE'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 5. INGLÉS (LENGUA EXTRANJERA) - 4º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Inglés', '4º Primaria', 'Comprensión oral', 'Comprensión de instrucciones, conversaciones breves y narraciones sencillas.', ARRAY['CP', 'CCL']),
('Inglés', '4º Primaria', 'Comprensión oral', 'Estrategias básicas para la comprensión oral: contexto, lenguaje no verbal.', ARRAY['CP', 'CPSAA']),
('Inglés', '4º Primaria', 'Producción oral', 'Reproducción de textos orales breves sobre temas familiares.', ARRAY['CP', 'CCL']),
('Inglés', '4º Primaria', 'Producción oral', 'Estrategias básicas de planificación y ejecución de producciones orales.', ARRAY['CP', 'CPSAA']),
('Inglés', '4º Primaria', 'Comprensión escrita', 'Lectura y comprensión de textos breves y contextualizados.', ARRAY['CP', 'CCL']),
('Inglés', '4º Primaria', 'Producción escrita', 'Redacción de textos breves y sencillos sobre temas conocidos.', ARRAY['CP', 'CCL', 'CD']),
('Inglés', '4º Primaria', 'Vocabulario', 'Léxico elemental relacionado con la familia, el colegio, los hobbies y el entorno.', ARRAY['CP']),
('Inglés', '4º Primaria', 'Gramática', 'Estructuras sintácticas básicas: presente simple, presente continuo, pasado simple.', ARRAY['CP', 'CCL']),
('Inglés', '4º Primaria', 'Cultura', 'Aspectos socioculturales básicos de países angloparlantes: festividades, costumbres.', ARRAY['CP', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.4P.1', 'Inglés', '4º Primaria', 1, 'Comprender el sentido general de textos orales breves sobre temas familiares.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.4P.2', 'Inglés', '4º Primaria', 2, 'Participar en conversaciones breves y sencillas en situaciones cotidianas.', ARRAY['CP', 'CCL', 'CPSAA'], 'Aplicar'),
('CE.ING.4P.3', 'Inglés', '4º Primaria', 3, 'Comprender textos escritos breves identificando información específica.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.4P.4', 'Inglés', '4º Primaria', 4, 'Escribir textos breves y sencillos sobre temas conocidos con estructuras básicas.', ARRAY['CP', 'CCL', 'CD'], 'Crear'),
('CE.ING.4P.5', 'Inglés', '4º Primaria', 5, 'Utilizar estructuras sintácticas básicas en contextos comunicativos simples.', ARRAY['CP'], 'Aplicar'),
('CE.ING.4P.6', 'Inglés', '4º Primaria', 6, 'Mostrar interés por aspectos socioculturales de países de habla inglesa.', ARRAY['CP', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- COMENTARIOS FINALES
-- =====================================================

-- Este currículo está basado en el Real Decreto 157/2022 de Primaria
-- Incluye las 5 asignaturas principales de 4º de Primaria
-- Total: ~40 saberes básicos y ~30 criterios de evaluación
-- Cobertura ideal para un estudiante de este nivel

-- Para verificar los datos cargados:
-- SELECT * FROM saberes_basicos WHERE curso = '4º Primaria';
-- SELECT * FROM criterios_evaluacion WHERE curso = '4º Primaria';
