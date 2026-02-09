-- =====================================================
-- CURRÍCULO COMPLETO 2º DE PRIMARIA
-- Real Decreto 157/2022 - Enseñanzas Mínimas Primaria
-- =====================================================
-- Adaptado a niños de 7 años
-- 6 asignaturas académicas principales
-- Nivel intermedio entre 1º y 3º
-- =====================================================

-- =====================================================
-- 1. MATEMÁTICAS - 2º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '2º Primaria', 'Sentido numérico', 'Números naturales hasta el 999: lectura, escritura, comparación y ordenación.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '2º Primaria', 'Sentido numérico', 'Suma y resta con llevadas. Iniciación a la multiplicación (tablas del 2, 5 y 10).', ARRAY['CMCT']),
('Matemáticas', '2º Primaria', 'Sentido numérico', 'Composición y descomposición de números: unidades, decenas y centenas.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '2º Primaria', 'Sentido numérico', 'Problemas sencillos de suma y resta en contextos cotidianos.', ARRAY['CMCT', 'CE']),
('Matemáticas', '2º Primaria', 'Sentido de la medida', 'Unidades no convencionales de medida: palmos, pasos, vasos.', ARRAY['CMCT', 'CE']),
('Matemáticas', '2º Primaria', 'Sentido de la medida', 'El reloj: lectura de horas en punto y medias horas.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '2º Primaria', 'Sentido de la medida', 'El calendario: días de la semana, meses del año.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '2º Primaria', 'Sentido espacial', 'Figuras geométricas planas: círculo, cuadrado, triángulo, rectángulo, óvalo.', ARRAY['CMCT', 'CCEC']),
('Matemáticas', '2º Primaria', 'Sentido espacial', 'Simetría básica: identificación de figuras simétricas.', ARRAY['CMCT', 'CCEC']),
('Matemáticas', '2º Primaria', 'Sentido estocástico', 'Gráficos de barras sencillos: lectura e interpretación básica.', ARRAY['CMCT', 'CD']),
('Matemáticas', '2º Primaria', 'Sentido algebraico', 'Series y patrones numéricos: continuación y creación.', ARRAY['CMCT', 'CPSAA'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.2P.1', 'Matemáticas', '2º Primaria', 1, 'Componer y descomponer números hasta el 999.', ARRAY['CMCT'], 'Comprender'),
('CE.MAT.2P.2', 'Matemáticas', '2º Primaria', 2, 'Resolver problemas de suma y resta con llevadas.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.2P.3', 'Matemáticas', '2º Primaria', 3, 'Conocer las tablas de multiplicar del 2, 5 y 10.', ARRAY['CMCT'], 'Recordar'),
('CE.MAT.2P.4', 'Matemáticas', '2º Primaria', 4, 'Leer la hora en relojes analógicos y digitales (horas en punto y medias).', ARRAY['CMCT', 'CCL'], 'Aplicar'),
('CE.MAT.2P.5', 'Matemáticas', '2º Primaria', 5, 'Reconocer y clasificar figuras geométricas planas.', ARRAY['CMCT', 'CCEC'], 'Comprender'),
('CE.MAT.2P.6', 'Matemáticas', '2º Primaria', 6, 'Interpretar gráficos de barras sencillos.', ARRAY['CMCT', 'CD'], 'Comprender'),
('CE.MAT.2P.7', 'Matemáticas', '2º Primaria', 7, 'Identificar y continuar patrones numéricos.', ARRAY['CMCT', 'CPSAA'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. LENGUA CASTELLANA Y LITERATURA - 2º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura', '2º Primaria', 'Comunicación oral', 'Expresión oral con vocabulario adecuado y pronunciación clara.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '2º Primaria', 'Comunicación oral', 'Narración de experiencias personales de forma ordenada.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '2º Primaria', 'Comunicación oral', 'Descripción oral de personas, animales y objetos.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '2º Primaria', 'Comprensión lectora', 'Lectura de textos narrativos sencillos con fluidez.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '2º Primaria', 'Comprensión lectora', 'Comprensión de textos informativos breves.', ARRAY['CCL', 'CD']),
('Lengua Castellana y Literatura', '2º Primaria', 'Comprensión lectora', 'Identificación de personajes, lugares y acciones en cuentos.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '2º Primaria', 'Escritura', 'Redacción de frases y textos muy breves con coherencia.', ARRAY['CCL', 'CD']),
('Lengua Castellana y Literatura', '2º Primaria', 'Escritura', 'Ortografía: uso de mayúsculas, punto y coma.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '2º Primaria', 'Escritura', 'Caligrafía clara y legible.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '2º Primaria', 'Reflexión sobre la lengua', 'El nombre: común y propio.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '2º Primaria', 'Reflexión sobre la lengua', 'El género y el número: masculino, femenino, singular, plural.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '2º Primaria', 'Reflexión sobre la lengua', 'El adjetivo: introducción y concordancia.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '2º Primaria', 'Educación literaria', 'Lectura y comprensión de cuentos infantiles.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '2º Primaria', 'Educación literaria', 'Iniciación a la poesía: rimas y ritmo.', ARRAY['CCL', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.2P.1', 'Lengua Castellana y Literatura', '2º Primaria', 1, 'Leer en voz alta con entonación adecuada.', ARRAY['CCL'], 'Aplicar'),
('CE.LCL.2P.2', 'Lengua Castellana y Literatura', '2º Primaria', 2, 'Comprender el sentido global de textos narrativos sencillos.', ARRAY['CCL'], 'Comprender'),
('CE.LCL.2P.3', 'Lengua Castellana y Literatura', '2º Primaria', 3, 'Escribir textos breves con corrección ortográfica básica.', ARRAY['CCL'], 'Aplicar'),
('CE.LCL.2P.4', 'Lengua Castellana y Literatura', '2º Primaria', 4, 'Identificar nombres comunes y propios.', ARRAY['CCL'], 'Comprender'),
('CE.LCL.2P.5', 'Lengua Castellana y Literatura', '2º Primaria', 5, 'Reconocer el género y número de sustantivos.', ARRAY['CCL'], 'Recordar'),
('CE.LCL.2P.6', 'Lengua Castellana y Literatura', '2º Primaria', 6, 'Narrar experiencias personales de forma ordenada.', ARRAY['CCL', 'CPSAA'], 'Aplicar'),
('CE.LCL.2P.7', 'Lengua Castellana y Literatura', '2º Primaria', 7, 'Disfrutar de la lectura de cuentos y poemas.', ARRAY['CCL', 'CCEC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 3. CIENCIAS DE LA NATURALEZA - 2º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Ciencias de la Naturaleza', '2º Primaria', 'Seres vivos', 'Animales: clasificación básica (mamíferos, aves, peces, reptiles, anfibios).', ARRAY['CMCT', 'CCL']),
('Ciencias de la Naturaleza', '2º Primaria', 'Seres vivos', 'Alimentación de los animales: herbívoros, carnívoros, omnívoros.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '2º Primaria', 'Seres vivos', 'Las plantas: tipos básicos (árboles, arbustos, hierbas).', ARRAY['CMCT', 'CC']),
('Ciencias de la Naturaleza', '2º Primaria', 'Seres vivos', 'El ciclo de vida de las plantas: semilla, germinación, crecimiento.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '2º Primaria', 'Cuerpo humano', 'Huesos y músculos: funciones básicas del esqueleto.', ARRAY['CMCT', 'CPSAA']),
('Ciencias de la Naturaleza', '2º Primaria', 'Cuerpo humano', 'Hábitos saludables: ejercicio físico, higiene y descanso.', ARRAY['CMCT', 'CPSAA', 'CC']),
('Ciencias de la Naturaleza', '2º Primaria', 'Cuerpo humano', 'Alimentación equilibrada: grupos de alimentos.', ARRAY['CMCT', 'CPSAA']),
('Ciencias de la Naturaleza', '2º Primaria', 'Materia y energía', 'El  agua: usos, importancia y ahorro.', ARRAY['CMCT', 'CC']),
('Ciencias de la Naturaleza', '2º Primaria', 'Materia y energía', 'El aire: existencia y propiedades básicas (no se ve, se siente).', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '2º Primaria', 'Tecnología', 'Máquinas simples del entorno: tijeras, palanca, rueda.', ARRAY['CMCT', 'CD', 'CE'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.CN.2P.1', 'Ciencias de la Naturaleza', '2º Primaria', 1, 'Clasificar animales según características básicas.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.2P.2', 'Ciencias de la Naturaleza', '2º Primaria', 2, 'Reconocer tipos de plantas del entorno.', ARRAY['CMCT', 'CC'], 'Recordar'),
('CE.CN.2P.3', 'Ciencias de la Naturaleza', '2º Primaria', 3, 'Identificar las funciones básicas del esqueleto.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.2P.4', 'Ciencias de la Naturaleza', '2º Primaria', 4, 'Practicar hábitos de vida saludable.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.CN.2P.5', 'Ciencias de la Naturaleza', '2º Primaria', 5, 'Reconocer la importancia del agua y su ahorro.', ARRAY['CMCT', 'CC'], 'Evaluar'),
('CE.CN.2P.6', 'Ciencias de la Naturaleza', '2º Primaria', 6, 'Describir el ciclo de vida de las plantas.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.2P.7', 'Ciencias de la Naturaleza', '2º Primaria', 7, 'Identificar máquinas simples del entorno cotidiano.', ARRAY['CMCT', 'CD'], 'Recordar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 4. CIENCIAS SOCIALES - 2º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Ciencias Sociales', '2º Primaria', 'Identidad y convivencia', 'La escuela: organización, espacios y normas.', ARRAY['CC', 'CPSAA']),
('Ciencias Sociales', '2º Primaria', 'Identidad y convivencia', 'Derechos y deberes de los niños.', ARRAY['CC', 'CPSAA']),
('Ciencias Sociales', '2º Primaria', 'Identidad y convivencia', 'Resolución pacífica de conflictos.', ARRAY['CC', 'CPSAA']),
('Ciencias Sociales', '2º Primaria', 'El entorno', 'El pueblo o ciudad: espacios públicos y servicios.', ARRAY['CC']),
('Ciencias Sociales', '2º Primaria', 'El entorno', 'Medios de transporte: terrestres, acuáticos, aéreos.', ARRAY['CC', 'CMCT']),
('Ciencias Sociales', '2º Primaria', 'El entorno', 'Medios de comunicación: televisión, radio, internet, periódico.', ARRAY['CC', 'CD']),
('Ciencias Sociales', '2º Primaria', 'El tiempo', 'El paso del tiempo: antes, ahora, después.', ARRAY['CC', 'CCL']),
('Ciencias Sociales', '2º Primaria', 'El tiempo', 'Cambios en el paisaje según las estaciones.', ARRAY['CC', 'CMCT', 'CCEC']),
('Ciencias Sociales', '2º Primaria', 'Cultura y patrimonio', 'Fiestas y tradiciones de la localidad.', ARRAY['CC', 'CCEC']),
('Ciencias Sociales', '2º Primaria', 'Educación vial', 'Señales de tráfico básicas: semáforo, paso de peatones, stop.', ARRAY['CC', 'CPSAA'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.CS.2P.1', 'Ciencias Sociales', '2º Primaria', 1, 'Conocer y respetar las normas de convivencia escolar.', ARRAY['CC', 'CPSAA'], 'Aplicar'),
('CE.CS.2P.2', 'Ciencias Sociales', '2º Primaria', 2, 'Identificar espacios públicos y servicios del entorno.', ARRAY['CC'], 'Recordar'),
('CE.CS.2P.3', 'Ciencias Sociales', '2º Primaria', 3, 'Clasificar medios de transporte según su tipo.', ARRAY['CC', 'CMCT'], 'Comprender'),
('CE.CS.2P.4', 'Ciencias Sociales', '2º Primaria', 4, 'Reconocer y valorar fiestas y tradiciones locales.', ARRAY['CC', 'CCEC'], 'Evaluar'),
('CE.CS.2P.5', 'Ciencias Sociales', '2º Primaria', 5, 'Identificar señales de tráfico básicas y su significado.', ARRAY['CC', 'CPSAA'], 'Recordar'),
('CE.CS.2P.6', 'Ciencias Sociales', '2º Primaria', 6, 'Describir cambios en el paisaje según las estaciones.', ARRAY['CC', 'CMCT'], 'Comprender'),
('CE.CS.2P.7', 'Ciencias Sociales', '2º Primaria', 7, 'Conocer los derechos y deberes básicos de los niños.', ARRAY['CC', 'CPSAA'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 5. INGLÉS (LENGUA EXTRANJERA) - 2º PRIMARIA
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Inglés', '2º Primaria', 'Comprensión oral', 'Comprensión de vocabulario relacionado con la familia y la escuela.', ARRAY['CP', 'CCL']),
('Inglés', '2º Primaria', 'Comprensión oral', 'Seguimiento de instrucciones sencillas en el aula.', ARRAY['CP', 'CPSAA']),
('Inglés', '2º Primaria', 'Comprensión oral', 'Identificación de números hasta 20 en inglés.', ARRAY['CP', 'CMCT']),
('Inglés', '2º Primaria', 'Producción oral', 'Presentación personal: nombre, edad, gustos básicos.', ARRAY['CP', 'CPSAA']),
('Inglés', '2º Primaria', 'Producción oral', 'Descripción muy básica de objetos familiares.', ARRAY['CP', 'CCL']),
('Inglés', '2º Primaria', 'Producción oral', 'Uso de fórmulas de cortesía: please, thank you, sorry.', ARRAY['CP', 'CC']),
('Inglés', '2º Primaria', 'Vocabulario', 'Léxico de la casa: habitaciones y muebles básicos.', ARRAY['CP']),
('Inglés', '2º Primaria', 'Vocabulario', 'Comidas y bebidas básicas en inglés.', ARRAY['CP']),
('Inglés', '2º Primaria', 'Vocabulario', 'Ropa básica en inglés.', ARRAY['CP']),
('Inglés', '2º Primaria', 'Gramática básica', 'El verbo "to be" en presente: I am, you are.', ARRAY['CP', 'CCL']),
('Inglés', '2º Primaria', 'Cultura', 'Canciones y cuentos tradicionales en inglés.', ARRAY['CP', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.2P.1', 'Inglés', '2º Primaria', 1, 'Comprender vocabulario básico sobre familia y escuela.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.2P.2', 'Inglés', '2º Primaria', 2, 'Contar hasta 20 en inglés.', ARRAY['CP', 'CMCT'], 'Recordar'),
('CE.ING.2P.3', 'Inglés', '2º Primaria', 3, 'Presentarse de forma básica en inglés.', ARRAY['CP', 'CPSAA'], 'Aplicar'),
('CE.ING.2P.4', 'Inglés', '2º Primaria', 4, 'Usar fórmulas de cortesía en inglés.', ARRAY['CP', 'CC'], 'Aplicar'),
('CE.ING.2P.5', 'Inglés', '2º Primaria', 5, 'Identificar y nombrar objetos familiares en inglés.', ARRAY['CP'], 'Recordar'),
('CE.ING.2P.6', 'Inglés', '2º Primaria', 6, 'Participar en canciones y actividades en inglés.', ARRAY['CP', 'CCEC'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- RESUMEN DE COBERTURA - 2º PRIMARIA
-- =====================================================

-- ASIGNATURAS INCLUIDAS:
-- 1. Matemáticas (11 saberes, 7 criterios)
-- 2. Lengua Castellana y Literatura (14 saberes, 7 criterios)
-- 3. Ciencias de la Naturaleza (10 saberes, 7 criterios)
-- 4. Ciencias Sociales (10 saberes, 7 criterios)
-- 5. Inglés (11 saberes, 6 criterios)

-- TOTAL: 56 saberes básicos + 34 criterios de evaluación
-- Cobertura: 5 asignaturas académicas principales
-- Nivel: Adaptado a niños de 7 años
-- Base legal: Real Decreto 157/2022

SELECT 'Currículo completo de 2º Primaria cargado correctamente - 5 asignaturas' AS status;
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
