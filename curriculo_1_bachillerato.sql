-- =====================================================
-- CURRÍCULO COMPLETO 1º DE BACHILLERATO
-- Real Decreto 243/2022 - Enseñanzas Mínimas Bachillerato
-- =====================================================
-- Adaptado a estudiantes de 16-17 años
-- Primer curso de Bachillerato (post-obligatorio)
-- Preparación para universidad y estudios superiores
-- =====================================================

-- =====================================================
-- 1. MATEMÁTICAS I - 1º BACHILLERATO (Ciencias)
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas I', '1º Bachillerato', 'Sentido numérico', 'Números reales: propiedades, operaciones y representación.', ARRAY['CMCT']),
('Matemáticas I', '1º Bachillerato', 'Sentido numérico', 'Números complejos: forma binómica y polar.', ARRAY['CMCT']),
('Matemáticas I', '1º Bachillerato', 'Sentido algebraico', 'Polinomios: operaciones, factorización, teorema del resto.', ARRAY['CMCT']),
('Matemáticas I', '1º Bachillerato', 'Sentido algebraico', 'Ecuaciones e inecuaciones: resolución analítica y gráfica.', ARRAY['CMCT', 'CD']),
('Matemáticas I', '1º Bachillerato', 'Sentido algebraico', 'Sistemas de ecuaciones: métodos de resolución.', ARRAY['CMCT']),
('Matemáticas I', '1º Bachillerato', 'Sentido funcional', 'Funciones: dominio, recorrido, operaciones con funciones.', ARRAY['CMCT', 'CD']),
('Matemáticas I', '1º Bachillerato', 'Sentido funcional', 'Límites de funciones: cálculo e interpretación.', ARRAY['CMCT']),
('Matemáticas I', '1º Bachillerato', 'Sentido funcional', 'Continuidad de funciones: tipos de discontinuidad.', ARRAY['CMCT']),
('Matemáticas I', '1º Bachillerato', 'Sentido espacial', 'Trigonometría: resolución de triángulos, ecuaciones trigonométricas.', ARRAY['CMCT']),
('Matemáticas I', '1º Bachillerato', 'Sentido espacial', 'Geometría analítica: vectores, rectas y lugares geométricos.', ARRAY['CMCT']),
('Matemáticas I', '1º Bachillerato', 'Sentido estocástico', 'Estadística descriptiva: representaciones gráficas y parámetros.', ARRAY['CMCT', 'CD']),
('Matemáticas I', '1º Bachillerato', 'Sentido estocástico', 'Distribuciones de probabilidad discretas y continuas.', ARRAY['CMCT'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.1B.1', 'Matemáticas I', '1º Bachillerato', 1, 'Operar con números reales y complejos.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.1B.2', 'Matemáticas I', '1º Bachillerato', 2, 'Resolver ecuaciones, inecuaciones y sistemas.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.1B.3', 'Matemáticas I', '1º Bachillerato', 3, 'Calcular límites y estudiar continuidad de funciones.', ARRAY['CMCT'], 'Analizar'),
('CE.MAT.1B.4', 'Matemáticas I', '1º Bachillerato', 4, 'Representar y analizar funciones.', ARRAY['CMCT', 'CD'], 'Analizar'),
('CE.MAT.1B.5', 'Matemáticas I', '1º Bachillerato', 5, 'Resolver problemas de trigonometría y geometría analítica.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.1B.6', 'Matemáticas I', '1º Bachillerato', 6, 'Calcular e interpretar parámetros estadísticos.', ARRAY['CMCT', 'CD'], 'Analizar'),
('CE.MAT.1B.7', 'Matemáticas I', '1º Bachillerato', 7, 'Aplicar distribuciones de probabilidad.', ARRAY['CMCT'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. LENGUA CASTELLANA Y LITERATURA I - 1º BACHILLERATO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura I', '1º Bachillerato', 'Comunicación', 'Textos académicos: comentario de texto, ensayo, monografía.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lengua Castellana y Literatura I', '1º Bachillerato', 'Comunicación', 'Argumentación: técnicas, falacias, estructura argumentativa.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lengua Castellana y Literatura I', '1º Bachillerato', 'Comunicación', 'Comunicación oral formal: debate, exposición académica, conferencia.', ARRAY['CCL', 'CD']),
('Lengua Castellana y Literatura I', '1º Bachillerato', 'Reflexión sobre la lengua', 'Sintaxis: análisis de oraciones compuestas y complejas.', ARRAY['CCL']),
('Lengua Castellana y Literatura I', '1º Bachillerato', 'Reflexión sobre la lengua', 'Morfología: formación de palabras, derivación y composición.', ARRAY['CCL']),
('Lengua Castellana y Literatura I', '1º Bachillerato', 'Reflexión sobre la lengua', 'Semántica: relaciones semánticas, denotación y connotación.', ARRAY['CCL']),
('Lengua Castellana y Literatura I', '1º Bachillerato', 'Literatura', 'Literatura medieval: lírica, épica, prosa y teatro.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura I', '1º Bachillerato', 'Literatura', 'Siglo XV: la poesía de Jorge Manrique, La Celestina.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura I', '1º Bachillerato', 'Literatura', 'Renacimiento: Garcilaso, Fray Luis de León, San Juan de la Cruz.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura I', '1º Bachillerato', 'Literatura', 'Cervantes y el Quijote: análisis y contexto.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura I', '1º Bachillerato', 'Literatura', 'Barroco: Góngora, Quevedo, teatro del Siglo de Oro.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura I', '1º Bachillerato', 'Lectura', 'Lectura autónoma: obras representativas de la literatura española.', ARRAY['CCL', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.1B.1', 'Lengua Castellana y Literatura I', '1º Bachillerato', 1, 'Producir textos académicos rigurosos y bien estructurados.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LCL.1B.2', 'Lengua Castellana y Literatura I', '1º Bachillerato', 2, 'Argumentar de forma sólida y coherente.', ARRAY['CCL', 'CPSAA'], 'Evaluar'),
('CE.LCL.1B.3', 'Lengua Castellana y Literatura I', '1º Bachillerato', 3, 'Realizar análisis sintáctico completo de textos complejos.', ARRAY['CCL'], 'Analizar'),
('CE.LCL.1B.4', 'Lengua Castellana y Literatura I', '1º Bachillerato', 4, 'Analizar obras literarias en su contexto histórico y cultural.', ARRAY['CCL', 'CCEC'], 'Analizar'),
('CE.LCL.1B.5', 'Lengua Castellana y Literatura I', '1º Bachillerato', 5, 'Comentar textos literarios aplicando técnicas adecuadas.', ARRAY['CCL', 'CCEC'], 'Evaluar'),
('CE.LCL.1B.6', 'Lengua Castellana y Literatura I', '1º Bachillerato', 6, 'Conocer la evolución de la literatura española medieval y renacentista.', ARRAY['CCL', 'CCEC'], 'Comprender'),
('CE.LCL.1B.7', 'Lengua Castellana y Literatura I', '1º Bachillerato', 7, 'Valorar críticamente obras literarias.', ARRAY['CCL', 'CCEC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 3. HISTORIA DEL MUNDO CONTEMPORÁNEO - 1º BACHILLERATO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Historia del Mundo Contemporáneo', '1º Bachillerato', 'Antiguo Régimen', 'El Antiguo Régimen: características políticas, sociales y económicas.', ARRAY['CC', 'CCEC']),
('Historia del Mundo Contemporáneo', '1º Bachillerato', 'Revoluciones', 'Revoluciones liberales: Revolución Francesa y era napoleónica.', ARRAY['CC', 'CCEC']),
('Historia del Mundo Contemporáneo', '1º Bachillerato', 'Revoluciones', 'Revolución Industrial: fases, consecuencias sociales y económicas.', ARRAY['CC', 'CCEC', 'CE']),
('Historia del Mundo Contemporáneo', '1º Bachillerato', 'Siglo XIX', 'Movimientos nacionales y unificaciones: Italia y Alemania.', ARRAY['CC', 'CCEC']),
('Historia del Mundo Contemporáneo', '1º Bachillerato', 'Siglo XIX', 'Imperialismo y colonialismo: reparto de África y Asia.', ARRAY['CC', 'CCEC']),
('Historia del Mundo Contemporáneo', '1º Bachillerato', 'Siglo XX', 'Primera Guerra Mundial: causas, desarrollo y consecuencias.', ARRAY['CC', 'CCEC']),
('Historia del Mundo Contemporáneo', '1º Bachillerato', 'Siglo XX', 'Revolución Rusa y la URSS.', ARRAY['CC', 'CCEC']),
('Historia del Mundo Contemporáneo', '1º Bachillerato', 'Entreguerras', 'Crisis de 1929 y Gran Depresión.', ARRAY['CC', 'CCEC', 'CE']),
('Historia del Mundo Contemporáneo', '1º Bachillerato', 'Entreguerras', 'Totalitarismos: fascismo, nazismo, estalinismo.', ARRAY['CC', 'CCEC', 'CPSAA']),
('Historia del Mundo Contemporáneo', '1º Bachillerato', 'Segunda Guerra Mundial', 'Segunda Guerra Mundial: desarrollo, Holocausto, consecuencias.', ARRAY['CC', 'CCEC', 'CPSAA']),
('Historia del Mundo Contemporáneo', '1º Bachillerato', 'Guerra Fría', 'La Guerra Fría: bloques, conflictos, coexistencia pacífica.', ARRAY['CC', 'CCEC']),
('Historia del Mundo Contemporáneo', '1º Bachillerato', 'Descolonización', 'Descolonización: independencias de Asia y África.', ARRAY['CC', 'CCEC', 'CP'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.HMC.1B.1', 'Historia del Mundo Contemporáneo', '1º Bachillerato', 1, 'Explicar las características del Antiguo Régimen.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.HMC.1B.2', 'Historia del Mundo Contemporáneo', '1º Bachillerato', 2, 'Analizar causas y consecuencias de revoluciones liberales.', ARRAY['CC', 'CCEC'], 'Analizar'),
('CE.HMC.1B.3', 'Historia del Mundo Contemporáneo', '1º Bachillerato', 3, 'Explicar el impacto de la Revolución Industrial.', ARRAY['CC', 'CCEC', 'CE'], 'Analizar'),
('CE.HMC.1B.4', 'Historia del Mundo Contemporáneo', '1º Bachillerato', 4, 'Comprender el fenómeno del imperialismo.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.HMC.1B.5', 'Historia del Mundo Contemporáneo', '1º Bachillerato', 5, 'Analizar las causas de las guerras mundiales.', ARRAY['CC', 'CCEC'], 'Analizar'),
('CE.HMC.1B.6', 'Historia del Mundo Contemporáneo', '1º Bachillerato', 6, 'Valorar el Holocausto y sus implicaciones.', ARRAY['CC', 'CCEC', 'CPSAA'], 'Evaluar'),
('CE.HMC.1B.7', 'Historia del Mundo Contemporáneo', '1º Bachillerato', 7, 'Explicar la Guerra Fría y la descolonización.', ARRAY['CC', 'CCEC'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 4. FÍSICA Y QUÍMICA - 1º BACHILLERATO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Física y Química', '1º Bachillerato', 'Química', 'Formulación y nomenclatura inorgánica y orgánica.', ARRAY['CMCT', 'CCL']),
('Física y Química', '1º Bachillerato', 'Química', 'Estructura atómica: modelos, configuración electrónica, números cuánticos.', ARRAY['CMCT']),
('Física y Química', '1º Bachillerato', 'Química', 'Tabla periódica y periodicidad química.', ARRAY['CMCT']),
('Física y Química', '1º Bachillerato', 'Química', 'Enlace químico: iónico, covalente, metálico, fuerzas intermoleculares.', ARRAY['CMCT']),
('Física y Química', '1º Bachillerato', 'Química', 'Reacciones químicas: estequiometría, reactivo limitante.', ARRAY['CMCT']),
('Física y Química', '1º Bachillerato', 'Química', 'Termodinámica química: entalpía, entropía, espontaneidad.', ARRAY['CMCT']),
('Física y Química', '1º Bachillerato', 'Física', 'Cinemática: movimiento circular, tiro parabólico.', ARRAY['CMCT']),
('Física y Química', '1º Bachillerato', 'Física', 'Dinámica: fuerzas, leyes de Newton, aplicaciones.', ARRAY['CMCT']),
('Física y Química', '1º Bachillerato', 'Física', 'Trabajo, energía y potencia mecánica.', ARRAY['CMCT', 'CE']),
('Física y Química', '1º Bachillerato', 'Física', 'Gravitación universal: ley de gravitación, campo gravitatorio.', ARRAY['CMCT']),
('Física y Química', '1º Bachillerato', 'Física', 'Electricidad: campo eléctrico, potencial, circuitos eléctricos.', ARRAY['CMCT', 'CD']),
('Física y Química', '1º Bachillerato', 'Física', 'Energía: formas, transformaciones, conservación.', ARRAY['CMCT', 'CE', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.FQ.1B.1', 'Física y Química', '1º Bachillerato', 1, 'Formular y nombrar compuestos químicos inorgánicos y orgánicos.', ARRAY['CMCT', 'CCL'], 'Aplicar'),
('CE.FQ.1B.2', 'Física y Química', '1º Bachillerato', 2, 'Explicar la estructura atómica y la periodicidad química.', ARRAY['CMCT'], 'Comprender'),
('CE.FQ.1B.3', 'Física y Química', '1º Bachillerato', 3, 'Realizar cálculos estequiométricos avanzados.', ARRAY['CMCT'], 'Aplicar'),
('CE.FQ.1B.4', 'Física y Química', '1º Bachillerato', 4, 'Resolver problemas de cinemática y dinámica.', ARRAY['CMCT'], 'Aplicar'),
('CE.FQ.1B.5', 'Física y Química', '1º Bachillerato', 5, 'Aplicar principios de conservación de energía.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.FQ.1B.6', 'Física y Química', '1º Bachillerato', 6, 'Analizar circuitos eléctricos y campo eléctrico.', ARRAY['CMCT', 'CD'], 'Analizar'),
('CE.FQ.1B.7', 'Física y Química', '1º Bachillerato', 7, 'Aplicar la ley de gravitación universal.', ARRAY['CMCT'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 5. INGLÉS I - 1º BACHILLERATO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Inglés I', '1º Bachillerato', 'Comprensión oral', 'Comprensión de discursos académicos, conferencias y presentaciones complejas.', ARRAY['CP', 'CCL', 'CD']),
('Inglés I', '1º Bachillerato', 'Comprensión oral', 'Comprensión de películas, documentales y materiales audiovisuales sin subtítulos.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés I', '1º Bachillerato', 'Producción oral', 'Presentaciones académicas formales sobre temas especializados.', ARRAY['CP', 'CCL', 'CD']),
('Inglés I', '1º Bachillerato', 'Producción oral', 'Debates formales y participación activa en discusiones académicas.', ARRAY['CP', 'CPSAA', 'CC']),
('Inglés I', '1º Bachillerato', 'Comprensión lectora', 'Lectura de textos literarios clásicos y contemporáneos.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés I', '1º Bachillerato', 'Comprensión lectora', 'Comprensión de textos científicos, técnicos y académicos especializados.', ARRAY['CP', 'CCL', 'CMCT']),
('Inglés I', '1º Bachillerato', 'Producción escrita', 'Ensayos académicos: argumentativos, expositivos, analíticos.', ARRAY['CP', 'CCL', 'CPSAA']),
('Inglés I', '1º Bachillerato', 'Producción escrita', 'Escritura creativa avanzada y crítica literaria.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés I', '1º Bachillerato', 'Gramática', 'Tiempos verbales complejos: all perfect tenses, future forms.', ARRAY['CP', 'CCL']),
('Inglés I', '1º Bachillerato', 'Gramática', 'Estructuras complejas: inversión, elipsis, énfasis.', ARRAY['CP', 'CCL']),
('Inglés I', '1º Bachillerato', 'Vocabulario', 'Vocabulario académico y especializado por áreas temáticas.', ARRAY['CP', 'CCL']),
('Inglés I', '1º Bachillerato', 'Literatura', 'Literatura anglófona: obras representativas, análisis crítico.', ARRAY['CP', 'CCL', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.1B.1', 'Inglés I', '1º Bachillerato', 1, 'Comprender discursos académicos y materiales audiovisuales complejos.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.1B.2', 'Inglés I', '1º Bachillerato', 2, 'Producir presentaciones académicas de alta calidad.', ARRAY['CP', 'CCL', 'CD'], 'Crear'),
('CE.ING.1B.3', 'Inglés I', '1º Bachillerato', 3, 'Leer y analizar textos literarios y académicos.', ARRAY['CP', 'CCL'], 'Analizar'),
('CE.ING.1B.4', 'Inglés I', '1º Bachillerato', 4, 'Escribir ensayos académicos rigurosos.', ARRAY['CP', 'CCL', 'CPSAA'], 'Crear'),
('CE.ING.1B.5', 'Inglés I', '1º Bachillerato', 5, 'Dominar estructuras gramaticales complejas.', ARRAY['CP', 'CCL'], 'Aplicar'),
('CE.ING.1B.6', 'Inglés I', '1º Bachillerato', 6, 'Analizar obras literarias anglófonas.', ARRAY['CP', 'CCL', 'CCEC'], 'Analizar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- RESUMEN - 1º BACHILLERATO
-- =====================================================

-- TOTAL: 60 saberes básicos + 35 criterios de evaluación
-- 5 asignaturas comunes de 1º Bachillerato
-- Nivel: 16-17 años - Preparación universidad
-- Base legal: Real Decreto 243/2022

SELECT 'Currículo completo de 1º Bachillerato cargado correctamente - 5 asignaturas' AS status;
