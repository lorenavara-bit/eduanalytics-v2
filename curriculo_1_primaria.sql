-- =====================================================
-- CURRÍCULO COMPLETO 1º DE PRIMARIA
-- Real Decreto 157/2022 - Enseñanzas Mínimas Primaria
-- =====================================================
-- Creado específicamente para niños de 6 años
-- Todas las asignaturas principales incluidas
-- Adaptado al nivel cognitivo de primer curso
-- =====================================================

-- =====================================================
-- 1. MATEMÁTICAS - 1º PRIMARIA
-- =====================================================

-- Saberes Básicos de Matemáticas 1º
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '1º Primaria', 'Sentido numérico', 'Números naturales del 0 al 99: lectura, escritura, representación y comparación.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '1º Primaria', 'Sentido numérico', 'Orden y comparación de números: mayor que, menor que, igual a.', ARRAY['CMCT']),
('Matemáticas', '1º Primaria', 'Sentido numérico', 'Suma sin llevadas con números hasta 20. Iniciación a la resta.', ARRAY['CMCT']),
('Matemáticas', '1º Primaria', 'Sentido numérico', 'Conteo de elementos: de uno en uno, de dos en dos, de cinco en cinco.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '1º Primaria', 'Sentido de la medida', 'Comparación de longitudes: largo, corto, alto, bajo.', ARRAY['CMCT']),
('Matemáticas', '1º Primaria', 'Sentido de la medida', 'Comparación de pesos y capacidades: pesado, ligero, lleno, vacío.', ARRAY['CMCT', 'CE']),
('Matemáticas', '1º Primaria', 'Sentido de la medida', 'El tiempo: antes, después, ayer, hoy, mañana. La semana y los meses.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '1º Primaria', 'Sentido espacial', 'Figuras geométricas planas básicas: círculo, cuadrado, triángulo, rectángulo.', ARRAY['CMCT', 'CCEC']),
('Matemáticas', '1º Primaria', 'Sentido espacial', 'Orientación espacial: arriba, abajo, delante, detrás, izquierda, derecha.', ARRAY['CMCT']),
('Matemáticas', '1º Primaria', 'Sentido estocástico', 'Recogida de datos sencillos del entorno próximo.', ARRAY['CMCT', 'CD']),
('Matemáticas', '1º Primaria', 'Sentido algebraico', 'Patrones y series sencillas: identificación y continuación.', ARRAY['CMCT', 'CPSAA'])
ON CONFLICT DO NOTHING;

-- Criterios de Evaluación de Matemáticas 1º
INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.1P.1', 'Matemáticas', '1º Primaria', 1, 'Leer, escribir y ordenar números naturales hasta el 99.', ARRAY['CMCT', 'CCL'], 'Recordar'),
('CE.MAT.1P.2', 'Matemáticas', '1º Primaria', 2, 'Realizar sumas sencillas hasta 20 sin llevadas.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.1P.3', 'Matemáticas', '1º Primaria', 3, 'Reconocer y nombrar figuras geométricas básicas del entorno.', ARRAY['CMCT', 'CCEC'], 'Comprender'),
('CE.MAT.1P.4', 'Matemáticas', '1º Primaria', 4, 'Comparar longitudes, pesos y capacidades usando vocabulario apropiado.', ARRAY['CMCT'], 'Comprender'),
('CE.MAT.1P.5', 'Matemáticas', '1º Primaria', 5, 'Situar objetos en el espacio usando términos de posición.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.1P.6', 'Matemáticas', '1º Primaria', 6, 'Identificar y continuar patrones sencillos.', ARRAY['CMCT', 'CPSAA'], 'Comprender'),
('CE.MAT.1P.7', 'Matemáticas', '1º Primaria', 7, 'Orientarse en el tiempo usando vocabulario temporal básico.', ARRAY['CMCT', 'CCL'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. LENGUA CASTELLANA Y LITERATURA - 1º PRIMARIA
-- =====================================================

-- Saberes Básicos de Lengua 1º
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura', '1º Primaria', 'Comunicación oral', 'Participación en conversaciones respetando el turno de palabra.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '1º Primaria', 'Comunicación oral', 'Pronunciación clara y entonación adecuada al hablar.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '1º Primaria', 'Comunicación oral', 'Comprensión de instrucciones orales sencillas.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '1º Primaria', 'Comprensión lectora', 'Lectura de palabras y frases sencillas con ayuda de imágenes.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '1º Primaria', 'Comprensión lectora', 'Iniciación a la lectura comprensiva de textos muy breves.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '1º Primaria', 'Escritura', 'Escritura de letras, sílabas, palabras y frases muy sencillas.', ARRAY['CCL', 'CD']),
('Lengua Castellana y Literatura', '1º Primaria', 'Escritura', 'Caligrafía: trazado correcto de letras mayúsculas y minúsculas.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '1º Primaria', 'Escritura', 'Separación de palabras en la escritura.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '1º Primaria', 'Reflexión sobre la lengua', 'El abecedario: orden alfabético y tipos de letras.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '1º Primaria', 'Reflexión sobre la lengua', 'La sílaba: identificación y separación silábica.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '1º Primaria', 'Reflexión sobre la lengua', 'Iniciación al uso de mayúsculas: nombres propios y principio de oración.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '1º Primaria', 'Educación literaria', 'Escucha y disfrute de cuentos infantiles.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '1º Primaria', 'Educación literaria', 'Recitado de poemas y canciones sencillas.', ARRAY['CCL', 'CCEC'])
ON CONFLICT DO NOTHING;

-- Criterios de Evaluación de Lengua 1º
INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.1P.1', 'Lengua Castellana y Literatura', '1º Primaria', 1, 'Expresarse oralmente con pronunciación clara y entonación adecuada.', ARRAY['CCL'], 'Aplicar'),
('CE.LCL.1P.2', 'Lengua Castellana y Literatura', '1º Primaria', 2, 'Participar en conversaciones respetando las normas básicas.', ARRAY['CCL', 'CPSAA'], 'Aplicar'),
('CE.LCL.1P.3', 'Lengua Castellana y Literatura', '1º Primaria', 3, 'Leer palabras y frases sencillas.', ARRAY['CCL'], 'Recordar'),
('CE.LCL.1P.4', 'Lengua Castellana y Literatura', '1º Primaria', 4, 'Comprender el sentido global de textos orales y escritos muy breves.', ARRAY['CCL'], 'Comprender'),
('CE.LCL.1P.5', 'Lengua Castellana y Literatura', '1º Primaria', 5, 'Escribir letras, palabras y frases con caligrafía legible.', ARRAY['CCL'], 'Aplicar'),
('CE.LCL.1P.6', 'Lengua Castellana y Literatura', '1º Primaria', 6, 'Identificar y usar correctamente las mayúsculas en nombres propios.', ARRAY['CCL'], 'Comprender'),
('CE.LCL.1P.7', 'Lengua Castellana y Literatura', '1º Primaria', 7, 'Disfrutar de la escucha de cuentos y poemas.', ARRAY['CCL', 'CCEC'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 3. CONOCIMIENTO DEL MEDIO NATURAL - 1º PRIMARIA
-- (Engloba Ciencias de la Naturaleza)
-- =====================================================

-- Saberes Básicos de Ciencias Naturales 1º
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Ciencias de la Naturaleza', '1º Primaria', 'Seres vivos', 'Diferenciación entre seres vivos y seres inertes.', ARRAY['CMCT', 'CCL']),
('Ciencias de la Naturaleza', '1º Primaria', 'Seres vivos', 'Los animales: características básicas. Domésticos y salvajes.', ARRAY['CMCT', 'CC']),
('Ciencias de la Naturaleza', '1º Primaria', 'Seres vivos', 'Las plantas: partes básicas (raíz, tallo, hojas, flores).', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '1º Primaria', 'Seres vivos', 'Cuidado y respeto por los seres vivos del entorno.', ARRAY['CMCT', 'CC', 'CPSAA']),
('Ciencias de la Naturaleza', '1º Primaria', 'Cuerpo humano', 'Partes principales del cuerpo humano: cabeza, tronco, extremidades.', ARRAY['CMCT', 'CPSAA']),
('Ciencias de la Naturaleza', '1º Primaria', 'Cuerpo humano', 'Los cinco sentidos y sus órganos.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '1º Primaria', 'Cuerpo humano', 'Hábitos saludables: higiene, alimentación y descanso.', ARRAY['CMCT', 'CPSAA', 'CC']),
('Ciencias de la Naturaleza', '1º Primaria', 'Materia y energía', 'Observación de cambios en la naturaleza: día y noche, estaciones.', ARRAY['CMCT']),
('Ciencias de la Naturaleza', '1º Primaria', 'Materia y energía', 'El agua: importancia y estados (sólido, líquido).', ARRAY['CMCT', 'CC']),
('Ciencias de la Naturaleza', '1º Primaria', 'Tecnología', 'Objetos y máquinas del entorno cotidiano y su utilidad.', ARRAY['CMCT', 'CD', 'CE'])
ON CONFLICT DO NOTHING;

-- Criterios de Evaluación de Ciencias Naturales 1º
INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.CN.1P.1', 'Ciencias de la Naturaleza', '1º Primaria', 1, 'Diferenciar seres vivos de seres inertes.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.1P.2', 'Ciencias de la Naturaleza', '1º Primaria', 2, 'Identificar animales y plantas del entorno cercano.', ARRAY['CMCT', 'CC'], 'Recordar'),
('CE.CN.1P.3', 'Ciencias de la Naturaleza', '1º Primaria', 3, 'Nombrar las partes principales del cuerpo humano.', ARRAY['CMCT'], 'Recordar'),
('CE.CN.1P.4', 'Ciencias de la Naturaleza', '1º Primaria', 4, 'Reconocer los cinco sentidos y sus órganos.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.1P.5', 'Ciencias de la Naturaleza', '1º Primaria', 5, 'Practicar hábitos saludables básicos de higiene y alimentación.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.CN.1P.6', 'Ciencias de la Naturaleza', '1º Primaria', 6, 'Observar y describir cambios en el entorno natural.', ARRAY['CMCT'], 'Comprender'),
('CE.CN.1P.7', 'Ciencias de la Naturaleza', '1º Primaria', 7, 'Valorar la importancia del agua y su cuidado.', ARRAY['CMCT', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 4. CONOCIMIENTO DEL MEDIO SOCIAL - 1º PRIMARIA
-- (Engloba Ciencias Sociales)
-- =====================================================

-- Saberes Básicos de Ciencias Sociales 1º
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Ciencias Sociales', '1º Primaria', 'Identidad y convivencia', 'La familia: miembros y relaciones familiares.', ARRAY['CC', 'CPSAA']),
('Ciencias Sociales', '1º Primaria', 'Identidad y convivencia', 'El colegio: espacios, personas y normas de convivencia.', ARRAY['CC', 'CPSAA']),
('Ciencias Sociales', '1º Primaria', 'Identidad y convivencia', 'Los amigos: relaciones de amistad y respeto.', ARRAY['CC', 'CPSAA']),
('Ciencias Sociales', '1º Primaria', 'El entorno', 'La casa: dependencias y objetos cotidianos.', ARRAY['CC', 'CCL']),
('Ciencias Sociales', '1º Primaria', 'El entorno', 'La calle: elementos urbanos básicos (acera, calzada, semáforo).', ARRAY['CC', 'CPSAA']),
('Ciencias Sociales', '1º Primaria', 'El entorno', 'El barrio o pueblo: lugares importantes y servicios.', ARRAY['CC']),
('Ciencias Sociales', '1º Primaria', 'El tiempo', 'El tiempo atmosférico: sol, lluvia, nieve, viento, nublado.', ARRAY['CC', 'CMCT']),
('Ciencias Sociales', '1º Primaria', 'El tiempo', 'Las estaciones del año: características básicas.', ARRAY['CC', 'CMCT', 'CCEC']),
('Ciencias Sociales', '1º Primaria', 'Educación vial', 'Normas básicas de seguridad vial como peatón.', ARRAY['CC', 'CPSAA']),
('Ciencias Sociales', '1º Primaria', 'Oficios', 'Profesiones y oficios del entorno: médico, profesor, policía, bombero.', ARRAY['CC', 'CE'])
ON CONFLICT DO NOTHING;

-- Criterios de Evaluación de Ciencias Sociales 1º
INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.CS.1P.1', 'Ciencias Sociales', '1º Primaria', 1, 'Identificar a los miembros de la familia y sus relaciones.', ARRAY['CC', 'CPSAA'], 'Recordar'),
('CE.CS.1P.2', 'Ciencias Sociales', '1º Primaria', 2, 'Reconocer y respetar las normas básicas de convivencia.', ARRAY['CC', 'CPSAA'], 'Aplicar'),
('CE.CS.1P.3', 'Ciencias Sociales', '1º Primaria', 3, 'Describir los espacios de la casa y del colegio.', ARRAY['CC', 'CCL'], 'Comprender'),
('CE.CS.1P.4', 'Ciencias Sociales', '1º Primaria', 4, 'Identificar elementos básicos de la calle y el barrio.', ARRAY['CC'], 'Recordar'),
('CE.CS.1P.5', 'Ciencias Sociales', '1º Primaria', 5, 'Reconocer diferentes estados del tiempo atmosférico.', ARRAY['CC', 'CMCT'], 'Comprender'),
('CE.CS.1P.6', 'Ciencias Sociales', '1º Primaria', 6, 'Conocer y aplicar normas básicas de seguridad vial.', ARRAY['CC', 'CPSAA'], 'Aplicar'),
('CE.CS.1P.7', 'Ciencias Sociales', '1º Primaria', 7, 'Identificar profesiones y oficios del entorno cercano.', ARRAY['CC', 'CE'], 'Recordar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 5. INGLÉS (LENGUA EXTRANJERA) - 1º PRIMARIA
-- =====================================================

-- Saberes Básicos de Inglés 1º
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Inglés', '1º Primaria', 'Comprensión oral', 'Comprensión de saludos y despedidas básicas.', ARRAY['CP', 'CCL']),
('Inglés', '1º Primaria', 'Comprensión oral', 'Comprensión de instrucciones muy sencillas del aula.', ARRAY['CP', 'CPSAA']),
('Inglés', '1º Primaria', 'Comprensión oral', 'Identificación de vocabulario básico: colores, números 1-10, familia.', ARRAY['CP']),
('Inglés', '1º Primaria', 'Producción oral', 'Reproducción de saludos y fórmulas básicas de cortesía.', ARRAY['CP', 'CCL']),
('Inglés', '1º Primaria', 'Producción oral', 'Presentación personal muy básica: nombre, edad.', ARRAY['CP', 'CPSAA']),
('Inglés', '1º Primaria', 'Producción oral', 'Repetición de palabras y expresiones muy sencillas.', ARRAY['CP']),
('Inglés', '1º Primaria', 'Vocabulario', 'Léxico elemental: animales, juguetes, partes del cuerpo.', ARRAY['CP']),
('Inglés', '1º Primaria', 'Vocabulario', 'Colores básicos en inglés.', ARRAY['CP']),
('Inglés', '1º Primaria', 'Vocabulario', 'Números del 1 al 10 en inglés.', ARRAY['CP', 'CMCT']),
('Inglés', '1º Primaria', 'Cultura', 'Canciones y rimas en inglés.', ARRAY['CP', 'CCEC']),
('Inglés', '1º Primaria', 'Cultura', 'Festividades básicas de países anglosajones: Halloween, Christmas.', ARRAY['CP', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

-- Criterios de Evaluación de Inglés 1º
INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.1P.1', 'Inglés', '1º Primaria', 1, 'Comprender saludos y despedidas básicas en inglés.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.1P.2', 'Inglés', '1º Primaria', 2, 'Seguir instrucciones muy sencillas del aula en inglés.', ARRAY['CP', 'CPSAA'], 'Aplicar'),
('CE.ING.1P.3', 'Inglés', '1º Primaria', 3, 'Identificar y nombrar colores y números básicos en inglés.', ARRAY['CP'], 'Recordar'),
('CE.ING.1P.4', 'Inglés', '1º Primaria', 4, 'Presentarse de forma muy básica en inglés.', ARRAY['CP', 'CPSAA'], 'Aplicar'),
('CE.ING.1P.5', 'Inglés', '1º Primaria', 5, 'Participar en canciones y rimas en inglés.', ARRAY['CP', 'CCEC'], 'Aplicar'),
('CE.ING.1P.6', 'Inglés', '1º Primaria', 6, 'Reconocer vocabulario básico de temas familiares.', ARRAY['CP'], 'Recordar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 6. EDUCACIÓN FÍSICA - 1º PRIMARIA
-- =====================================================

-- Saberes Básicos de Educación Física 1º
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Educación Física', '1º Primaria', 'Habilidades motrices', 'Desplazamientos básicos: caminar, correr, saltar.', ARRAY['CPSAA']),
('Educación Física', '1º Primaria', 'Habilidades motrices', 'Giros, equilibrios y coordinación básica.', ARRAY['CPSAA']),
('Educación Física', '1º Primaria', 'Habilidades motrices', 'Lanzamientos y recepciones sencillas.', ARRAY['CPSAA', 'CE']),
('Educación Física', '1º Primaria', 'Esquema corporal', 'Conocimiento de las partes del cuerpo en movimiento.', ARRAY['CPSAA', 'CMCT']),
('Educación Física', '1º Primaria', 'Esquema corporal', 'Lateralidad: derecha e izquierda.', ARRAY['CPSAA']),
('Educación Física', '1º Primaria', 'Juegos', 'Participación en juegos cooperativos.', ARRAY['CPSAA', 'CC']),
('Educación Física', '1º Primaria', 'Juegos', 'Respeto de reglas básicas en el juego.', ARRAY['CPSAA', 'CC']),
('Educación Física', '1º Primaria', 'Salud', 'Higiene corporal tras la actividad física.', ARRAY['CPSAA', 'CC'])
ON CONFLICT DO NOTHING;

-- Criterios de Evaluación de Educación Física 1º
INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.EF.1P.1', 'Educación Física', '1º Primaria', 1, 'Realizar desplazamientos básicos con coordinación.', ARRAY['CPSAA'], 'Aplicar'),
('CE.EF.1P.2', 'Educación Física', '1º Primaria', 2, 'Mantener el equilibrio en situaciones estáticas y dinámicas sencillas.', ARRAY['CPSAA'], 'Aplicar'),
('CE.EF.1P.3', 'Educación Física', '1º Primaria', 3, 'Lanzar y recibir objetos de forma coordinada.', ARRAY['CPSAA'], 'Aplicar'),
('CE.EF.1P.4', 'Educación Física', '1º Primaria', 4, 'Identificar las partes del cuerpo y la lateralidad.', ARRAY['CPSAA', 'CMCT'], 'Recordar'),
('CE.EF.1P.5', 'Educación Física', '1º Primaria', 5, 'Participar en juegos respetando las reglas básicas.', ARRAY['CPSAA', 'CC'], 'Aplicar'),
('CE.EF.1P.6', 'Educación Física', '1º Primaria', 6, 'Practicar hábitos de higiene tras el ejercicio físico.', ARRAY['CPSAA', 'CC'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- RESUMEN DE COBERTURA - 1º PRIMARIA
-- =====================================================

-- ASIGNATURAS INCLUIDAS:
-- 1. Matemáticas (11 saberes, 7 criterios)
-- 2. Lengua Castellana y Literatura (13 saberes, 7 criterios)
-- 3. Ciencias de la Naturaleza (10 saberes, 7 criterios)
-- 4. Ciencias Sociales (10 saberes, 7 criterios)
-- 5. Inglés (11 saberes, 6 criterios)
-- 6. Educación Física (8 saberes, 6 criterios)

-- TOTAL: 63 saberes básicos + 40 criterios de evaluación
-- Cobertura: 6 asignaturas principales
-- Nivel: Adaptado a niños de 6 años
-- Base legal: Real Decreto 157/2022

-- Para añadir Lengua Gallega en 1º Primaria (si Galicia):
-- Ejecutar también: curriculo_gallego_1primaria.sql (crear aparte si necesario)

SELECT 'Currículo completo de 1º Primaria cargado correctamente - 6 asignaturas' AS status;
