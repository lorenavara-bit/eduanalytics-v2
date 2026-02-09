-- =====================================================
-- CURRÍCULO COMPLETO 3º DE PRIMARIA
-- Real Decreto 157/2022 - Enseñanzas Mínimas Primaria
-- =====================================================
-- Adaptado a niños de 8 años
-- Nivel intermedio de Primaria (entre 2º y 4º)
-- =====================================================

-- =====================================================
-- 1. MATEMÁTICAS - 3º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '3º Primaria', 'Sentido numérico', 'Números naturales hasta el 9999: lectura, escritura, comparación y ordenación.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '3º Primaria', 'Sentido numérico', 'Multiplicación por una cifra. División exacta por una cifra.', ARRAY['CMCT']),
('Matemáticas', '3º Primaria', 'Sentido numérico', 'Tablas de multiplicar del 1 al 10: memorización y aplicación.', ARRAY['CMCT']),
('Matemáticas', '3º Primaria', 'Sentido numérico', 'Problemas de dos operaciones: suma, resta y multiplicación.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '3º Primaria', 'Sentido de la medida', 'El metro, el litro y el kilo: unidades convencionales de medida.', ARRAY['CMCT', 'CE']),
('Matemáticas', '3º Primaria', 'Sentido de la medida', 'Múltiplos y submúltiplos: centímetro, decímetro, kilómetro.', ARRAY['CMCT']),
('Matemáticas', '3º Primaria', 'Sentido de la medida', 'El reloj: lectura de horas, minutos y segundos.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '3º Primaria', 'Sentido espacial', 'Polígonos: lados, vértices y ángulos. Clasificación básica.', ARRAY['CMCT']),
('Matemáticas', '3º Primaria', 'Sentido espacial', 'Tipos de líneas: recta, curva, ondulada, quebrada.', ARRAY['CMCT', 'CCEC']),
('Matemáticas', '3º Primaria', 'Sentido espacial', 'Tipos de ángulos: recto, agudo, obtuso.', ARRAY['CMCT']),
('Matemáticas', '3º Primaria', 'Sentido estocástico', 'Tablas de datos sencillas: elaboración e interpretación.', ARRAY['CMCT', 'CD'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.3P.1', 'Matemáticas', '3º Primaria', 1, 'Utilizar estrategias de cálculo mental y algoritmos para operaciones básicas.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.3P.2', 'Matemáticas', '3º Primaria', 2, 'Identificar y clasificar polígonos según sus características.', ARRAY['CMCT'], 'Comprender'),
('CE.MAT.3P.3', 'Matemáticas', '3º Primaria', 3, 'Medir longitudes, masas y capacidades con unidades convencionales.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.MAT.3P.4', 'Matemáticas', '3º Primaria', 4, 'Resolver problemas de dos operaciones.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.3P.5', 'Matemáticas', '3º Primaria', 5, 'Conocer y aplicar las tablas de multiplicar.', ARRAY['CMCT'], 'Recordar'),
('CE.MAT.3P.6', 'Matemáticas', '3º Primaria', 6, 'Leer la hora en diferentes formatos de reloj.', ARRAY['CMCT', 'CCL'], 'Aplicar'),
('CE.MAT.3P.7', 'Matemáticas', '3º Primaria', 7, 'Reconocer y clasificar tipos de ángulos.', ARRAY['CMCT'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. LENGUA CASTELLANA Y LITERATURA - 3º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura', '3º Primaria', 'Comunicación oral', 'Narración de historias con orden cronológico.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '3º Primaria', 'Comunicación oral', 'Descripción detallada de personas, animales, lugares y objetos.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '3º Primaria', 'Comunicación oral', 'Expresión de opiniones personales de forma respetuosa.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lengua Castellana y Literatura', '3º Primaria', 'Comprensión lectora', 'Lectura expresiva de textos con entonación adecuada.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '3º Primaria', 'Comprensión lectora', 'Comprensión de textos narrativos, descriptivos e informativos.', ARRAY['CCL', 'CD']),
('Lengua Castellana y Literatura', '3º Primaria', 'Comprensión lectora', 'Identificación del tema, personajes y secuencia temporal.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '3º Primaria', 'Escritura', 'Redacción de textos narrativos y descriptivos breves.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '3º Primaria', 'Escritura', 'Ortografía: ca, co, cu, que, qui, za, zo, zu, ce, ci.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '3º Primaria', 'Escritura', 'Uso correcto del punto, la coma y los signos de interrogación y exclamación.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '3º Primaria', 'Reflexión sobre la lengua', 'El sustantivo, el adjetivo y el verbo: identificación y uso.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '3º Primaria', 'Reflexión sobre la lengua', 'Los determinantes: artículos y demostrativos.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '3º Primaria', 'Reflexión sobre la lengua', 'Tiempos verbales: presente, pasado y futuro.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '3º Primaria', 'Educación literaria', 'Lectura de cuentos tradicionales y fábulas.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '3º Primaria', 'Educación literaria', 'La rima: identificación en poemas sencillos.', ARRAY['CCL', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.3P.1', 'Lengua Castellana y Literatura', '3º Primaria', 1, 'Leer textos con fluidez y entonación adecuada.', ARRAY['CCL'], 'Aplicar'),
('CE.LCL.3P.2', 'Lengua Castellana y Literatura', '3º Primaria', 2, 'Comprender el sentido global y las ideas principales de textos.', ARRAY['CCL'], 'Comprender'),
('CE.LCL.3P.3', 'Lengua Castellana y Literatura', '3º Primaria', 3, 'Escribir textos breves con coherencia y corrección ortográfica.', ARRAY['CCL'], 'Crear'),
('CE.LCL.3P.4', 'Lengua Castellana y Literatura', '3º Primaria', 4, 'Identificar sustantivos, adjetivos y verbos en oraciones.', ARRAY['CCL'], 'Comprender'),
('CE.LCL.3P.5', 'Lengua Castellana y Literatura', '3º Primaria', 5, 'Usar correctamente los tiempos verbales básicos.', ARRAY['CCL'], 'Aplicar'),
('CE.LCL.3P.6', 'Lengua Castellana y Literatura', '3º Primaria', 6, 'Narrar historias de forma ordenada y clara.', ARRAY['CCL', 'CPSAA'], 'Aplicar'),
('CE.LCL.3P.7', 'Lengua Castellana y Literatura', '3º Primaria', 7, 'Disfrutar de la lectura de cuentos y poemas.', ARRAY['CCL', 'CCEC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 3. CIENCIAS DE LA NATURALEZA - 3º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Ciencias de la Naturaleza', '3º Primaria', 'Seres vivos', 'Características de los seres vivos: nacen, crecen, se reproducen y mueren.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '3º Primaria', 'Seres vivos', 'Animales vertebrados e invertebrados: diferencias básicas.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '3º Primaria', 'Seres vivos', 'Las plantas: nutrición, relación y reproducción.', ARRAY['CMCT', 'CC']),
('Ciencias de la Naturaleza', '3º Primaria', 'Seres vivos', 'Cadenas alimentarias sencillas: productores, consumidores.', ARRAY['CMCT', 'CC']),
('Ciencias de la Naturaleza', '3º Primaria', 'Cuerpo humano', 'Aparato digestivo: proceso de la digestión.', ARRAY['CMCT', 'CPSAA']),
('Ciencias de la Naturaleza', '3º Primaria', 'Cuerpo humano', 'Aparato respiratorio: proceso de la respiración.', ARRAY['CMCT', 'CPSAA']),
('Ciencias de la Naturaleza', '3º Primaria', 'Cuerpo humano', 'Aparato circulatorio: corazón y circulación de la sangre.', ARRAY['CMCT', 'CPSAA']),
('Ciencias de la Naturaleza', '3º Primaria', 'Materia y energía', 'Los estados de la materia: sólido, líquido y gaseoso.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '3º Primaria', 'Materia y energía', 'El ciclo del agua: evaporación, condensación, precipitación.', ARRAY['CMCT', 'CC']),
('Ciencias de la Naturaleza', '3º Primaria', 'Medio ambiente', 'El paisaje: elementos naturales y humanizados.', ARRAY['CMCT', 'CC', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.CN.3P.1', 'Ciencias de la Naturaleza', '3º Primaria', 1, 'Diferenciar animales vertebrados de invertebrados.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.3P.2', 'Ciencias de la Naturaleza', '3º Primaria', 2, 'Explicar las funciones vitales de las plantas.', ARRAY['CMCT', 'CC'], 'Comprender'),
('CE.CN.3P.3', 'Ciencias de la Naturaleza', '3º Primaria', 3, 'Describir el proceso de la digestión, respiración y circulación.', ARRAY['CMCT', 'CPSAA'], 'Comprender'),
('CE.CN.3P.4', 'Ciencias de la Naturaleza', '3º Primaria', 4, 'Identificar los estados de la materia en ejemplos cotidianos.', ARRAY['CMCT'], 'Recordar'),
('CE.CN.3P.5', 'Ciencias de la Naturaleza', '3º Primaria', 5, 'Explicar el ciclo del agua.', ARRAY['CMCT', 'CC'], 'Comprender'),
('CE.CN.3P.6', 'Ciencias de la Naturaleza', '3º Primaria', 6, 'Construir cadenas alimentarias sencillas.', ARRAY['CMCT', 'CC'], 'Aplicar'),
('CE.CN.3P.7', 'Ciencias de la Naturaleza', '3º Primaria', 7, 'Diferenciar elementos naturales y humanizados del paisaje.', ARRAY['CMCT', 'CC'], 'Analizar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 4. CIENCIAS SOCIALES - 3º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Ciencias Sociales', '3º Primaria', 'Identidad y convivencia', 'La localidad: municipio, ayuntamiento y servicios municipales.', ARRAY['CC', 'CPSAA']),
('Ciencias Sociales', '3º Primaria', 'Identidad y convivencia', 'Participación ciudadana: derechos y deberes en la comunidad.', ARRAY['CC', 'CPSAA']),
('Ciencias Sociales', '3º Primaria', 'El entorno', 'Tipos de paisajes: de interior, de costa, de montaña.', ARRAY['CC', 'CMCT']),
('Ciencias Sociales', '3º Primaria', 'El entorno', 'Elementos del paisaje: relieve, vegetación, ríos.', ARRAY['CC', 'CMCT', 'CCL']),
('Ciencias Sociales', '3º Primaria', 'El entorno', 'Planos y mapas: interpretación de símbolos básicos.', ARRAY['CC', 'CMCT', 'CD']),
('Ciencias Sociales', '3º Primaria', 'El tiempo', 'Medida del tiempo: el calendario, décadas, siglos.', ARRAY['CC', 'CMCT', 'CCL']),
('Ciencias Sociales', '3º Primaria', 'El tiempo', 'Cambios en el tiempo: pasado, presente y futuro de la localidad.', ARRAY['CC', 'CCEC']),
('Ciencias Sociales', '3º Primaria', 'Trabajo', 'Trabajos en diferentes sectores: agricultura, industria, servicios.', ARRAY['CC', 'CE']),
('Ciencias Sociales', '3º Primaria', 'Cultura', 'Manifestaciones culturales de la localidad: fiestas, monumentos, tradiciones.', ARRAY['CC', 'CCEC']),
('Ciencias Sociales', '3º Primaria', 'Educación vial', 'El peatón: normas de circulación y señales de tráfico.', ARRAY['CC', 'CPSAA'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.CS.3P.1', 'Ciencias Sociales', '3º Primaria', 1, 'Conocer la organización del municipio y sus servicios.', ARRAY['CC', 'CPSAA'], 'Comprender'),
('CE.CS.3P.2', 'Ciencias Sociales', '3º Primaria', 2, 'Identificar diferentes tipos de paisajes.', ARRAY['CC', 'CMCT'], 'Recordar'),
('CE.CS.3P.3', 'Ciencias Sociales', '3º Primaria', 3, 'Interpretar planos sencillos usando símbolos.', ARRAY['CC', 'CMCT', 'CD'], 'Aplicar'),
('CE.CS.3P.4', 'Ciencias Sociales', '3º Primaria', 4, 'Describir cambios en la localidad a lo largo del tiempo.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.CS.3P.5', 'Ciencias Sociales', '3º Primaria', 5, 'Clasificar trabajos según los sectores económicos.', ARRAY['CC', 'CE'], 'Comprender'),
('CE.CS.3P.6', 'Ciencias Sociales', '3º Primaria', 6, 'Valorar manifestaciones culturales locales.', ARRAY['CC', 'CCEC'], 'Evaluar'),
('CE.CS.3P.7', 'Ciencias Sociales', '3º Primaria', 7, 'Aplicar normas de circulación como peatón.', ARRAY['CC', 'CPSAA'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 5. INGLÉS (LENGUA EXTRANJERA) - 3º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Inglés', '3º Primaria', 'Comprensión oral', 'Comprensión de diálogos sencillos sobre temas cotidianos.', ARRAY['CP', 'CCL']),
('Inglés', '3º Primaria', 'Comprensión oral', 'Seguimiento de cuentos narrados en inglés con apoyo visual.', ARRAY['CP', 'CCEC']),
('Inglés', '3º Primaria', 'Producción oral', 'Descripción de personas, animales y objetos con adjetivos básicos.', ARRAY['CP', 'CCL']),
('Inglés', '3º Primaria', 'Producción oral', 'Expresión de gustos y preferencias: I like / I don''t like.', ARRAY['CP', 'CPSAA']),
('Inglés', '3º Primaria', 'Producción oral', 'Preguntas y respuestas sobre información personal.', ARRAY['CP', 'CPSAA']),
('Inglés', '3º Primaria', 'Comprensión lectora', 'Lectura de textos muy breves: carteles, avisos, cuentos cortos.', ARRAY['CP', 'CCL']),
('Inglés', '3º Primaria', 'Producción escrita', 'Escritura de frases sencillas sobre temas familiares.', ARRAY['CP', 'CCL', 'CD']),
('Inglés', '3º Primaria', 'Vocabulario', 'Días de la semana, meses del año en inglés.', ARRAY['CP']),
('Inglés', '3º Primaria', 'Vocabulario', 'El tiempo atmosférico en inglés.', ARRAY['CP']),
('Inglés', '3º Primaria', 'Vocabulario', 'Acciones cotidianas (verbos de acción).', ARRAY['CP']),
('Inglés', '3º Primaria', 'Gramática básica', 'Presente simple: afirmativa, negativa, interrogativa.', ARRAY['CP', 'CCL'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.3P.1', 'Inglés', '3º Primaria', 1, 'Comprender diálogos sencillos en inglés.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.3P.2', 'Inglés', '3º Primaria', 2, 'Describir personas, animales y objetos en inglés.', ARRAY['CP', 'CCL'], 'Aplicar'),
('CE.ING.3P.3', 'Inglés', '3º Primaria', 3, 'Expresar gustos y preferencias en inglés.', ARRAY['CP', 'CPSAA'], 'Aplicar'),
('CE.ING.3P.4', 'Inglés', '3º Primaria', 4, 'Leer y comprender textos muy breves en inglés.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.3P.5', 'Inglés', '3º Primaria', 5, 'Escribir frases sencillas en inglés.', ARRAY['CP', 'CCL', 'CD'], 'Aplicar'),
('CE.ING.3P.6', 'Inglés', '3º Primaria', 6, 'Usar el presente simple en inglés correctamente.', ARRAY['CP', 'CCL'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- RESUMEN - 3º PRIMARIA
-- =====================================================

-- TOTAL: 56 saberes básicos + 34 criterios de evaluación
-- 5 asignaturas académicas principales
-- Nivel: 8 años - Mitad de Primaria
-- Base legal: Real Decreto 157/2022

SELECT 'Currículo completo de 3º Primaria cargado correctamente - 5 asignaturas' AS status;
