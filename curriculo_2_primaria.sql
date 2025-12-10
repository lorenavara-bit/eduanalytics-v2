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
