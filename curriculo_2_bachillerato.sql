-- =====================================================
-- CURRÍCULO COMPLETO 2º DE BACHILLERATO
-- Real Decreto 243/2022 - Enseñanzas Mínimas Bachillerato
-- =====================================================
-- Adaptado a estudiantes de 17-18 años
-- Último curso antes de universidad
-- Preparación para EvAU/EBAU (Selectividad)
-- =====================================================

-- =====================================================
-- 1. MATEMÁTICAS II - 2º BACHILLERATO (Ciencias)
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas II', '2º Bachillerato', 'Análisis', 'Límites y continuidad: cálculo, tipos de discontinuidad, teoremas.', ARRAY['CMCT']),
('Matemáticas II', '2º Bachillerato', 'Análisis', 'Derivadas: definición, reglas de derivación, aplicaciones.', ARRAY['CMCT']),
('Matemáticas II', '2º Bachillerato', 'Análisis', 'Aplicaciones de la derivada: crecimiento, extremos, optimización, problemas.', ARRAY['CMCT', 'CE']),
('Matemáticas II', '2º Bachillerato', 'Análisis', 'Representación de funciones: estudio completo.', ARRAY['CMCT', 'CD']),
('Matemáticas II', '2º Bachillerato', 'Análisis', 'Integrales: primitivas, integral definida, aplicaciones al cálculo de áreas.', ARRAY['CMCT']),
('Matemáticas II', '2º Bachillerato', 'Álgebra lineal', 'Matrices: operaciones, rango, matriz inversa.', ARRAY['CMCT']),
('Matemáticas II', '2º Bachillerato', 'Álgebra lineal', 'Determinantes: cálculo, propiedades, aplicaciones.', ARRAY['CMCT']),
('Matemáticas II', '2º Bachillerato', 'Álgebra lineal', 'Sistemas de ecuaciones lineales: métodos de resolución, discusión.', ARRAY['CMCT']),
('Matemáticas II', '2º Bachillerato', 'Geometría', 'Vectores en el espacio: operaciones, producto escalar, vectorial y mixto.', ARRAY['CMCT']),
('Matemáticas II', '2º Bachillerato', 'Geometría', 'Rectas y planos en el espacio: ecuaciones, posiciones relativas.', ARRAY['CMCT']),
('Matemáticas II', '2º Bachillerato', 'Geometría', 'Distancias, ángulos y áreas en el espacio.', ARRAY['CMCT']),
('Matemáticas II', '2º Bachillerato', 'Probabilidad', 'Probabilidad condicionada: teorema de Bayes.', ARRAY['CMCT'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.2B.1', 'Matemáticas II', '2º Bachillerato', 1, 'Calcular límites y estudiar continuidad de funciones.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.2B.2', 'Matemáticas II', '2º Bachillerato', 2, 'Derivar funciones y aplicar a problemas de optimización.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.MAT.2B.3', 'Matemáticas II', '2º Bachillerato', 3, 'Representar funciones realizando un estudio completo.', ARRAY['CMCT', 'CD'], 'Analizar'),
('CE.MAT.2B.4', 'Matemáticas II', '2º Bachillerato', 4, 'Calcular integrales y aplicar al cálculo de áreas.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.2B.5', 'Matemáticas II', '2º Bachillerato', 5, 'Operar con matrices y resolver sistemas de ecuaciones.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.2B.6', 'Matemáticas II', '2º Bachillerato', 6, 'Resolver problemas de geometría del espacio.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.2B.7', 'Matemáticas II', '2º Bachillerato', 7, 'Aplicar el teorema de Bayes a problemas de probabilidad.', ARRAY['CMCT'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. LENGUA CASTELLANA Y LITERATURA II - 2º BACHILLERATO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura II', '2º Bachillerato', 'Comunicación', 'Comentario de texto: técnicas de análisis y síntesis.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura II', '2º Bachillerato', 'Comunicación', 'Textos académicos y científicos: estructura, características.', ARRAY['CCL', 'CD', 'CMCT']),
('Lengua Castellana y Literatura II', '2º Bachillerato', 'Comunicación', 'Argumentación avanzada: ensayo, artículo de opinión.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lengua Castellana y Literatura II', '2º Bachillerato', 'Reflexión sobre la lengua', 'Morfosintaxis: análisis completo de estructuras complejas.', ARRAY['CCL']),
('Lengua Castellana y Literatura II', '2º Bachillerato', 'Reflexión sobre la lengua', 'Variedades del español: geográficas, sociales, situacionales.', ARRAY['CCL', 'CP', 'CC']),
('Lengua Castellana y Literatura II', '2º Bachillerato', 'Literatura', 'Siglo XVIII: Ilustración, Neoclasicismo (Jovellanos, Moratín).', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura II', '2º Bachillerato', 'Literatura', 'Romanticismo: Espronceda, Larra, Bécquer, Rosalía de Castro.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura II', '2º Bachillerato', 'Literatura', 'Realismo y Naturalismo: Galdós, Clarín.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura II', '2º Bachillerato', 'Literatura', 'Modernismo y Generación del 98: Rubén Darío, Unamuno, Machado, Baroja.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura II', '2º Bachillerato', 'Literatura', 'Vanguardias y Generación del 27: Lorca, Alberti, Cernuda, Aleixandre.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura II', '2º Bachillerato', 'Literatura', 'Literatura posterior a 1939: poesía, novela y teatro.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura II', '2º Bachillerato', 'Literatura', 'Literatura actual: tendencias contemporáneas.', ARRAY['CCL', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.2B.1', 'Lengua Castellana y Literatura II', '2º Bachillerato', 1, 'Realizar comentarios de texto rigurosos y bien fundamentados.', ARRAY['CCL', 'CPSAA'], 'Evaluar'),
('CE.LCL.2B.2', 'Lengua Castellana y Literatura II', '2º Bachillerato', 2, 'Producir textos argumentativos de alta calidad.', ARRAY['CCL', 'CPSAA'], 'Crear'),
('CE.LCL.2B.3', 'Lengua Castellana y Literatura II', '2º Bachillerato', 3, 'Analizar morfosintácticamente estructuras complejas.', ARRAY['CCL'], 'Analizar'),
('CE.LCL.2B.4', 'Lengua Castellana y Literatura II', '2º Bachillerato', 4, 'Reconocer variedades del español.', ARRAY['CCL', 'CP'], 'Comprender'),
('CE.LCL.2B.5', 'Lengua Castellana y Literatura II', '2º Bachillerato', 5, 'Analizar obras literarias de los siglos XVIII, XIX y XX.', ARRAY['CCL', 'CCEC'], 'Analizar'),
('CE.LCL.2B.6', 'Lengua Castellana y Literatura II', '2º Bachillerato', 6, 'Contextualizar movimientos literarios en su época.', ARRAY['CCL', 'CCEC'], 'Comprender'),
('CE.LCL.2B.7', 'Lengua Castellana y Literatura II', '2º Bachillerato', 7, 'Valorar críticamente la literatura contemporánea.', ARRAY['CCL', 'CCEC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 3. HISTORIA DE ESPAÑA - 2º BACHILLERATO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Historia de España', '2º Bachillerato', 'Raíces históricas', 'La Península Ibérica desde los primeros humanos hasta la desaparición de la monarquía visigoda.', ARRAY['CC', 'CCEC']),
('Historia de España', '2º Bachillerato', 'Edad Media', 'La Edad Media: Al-Ándalus y los reinos cristianos.', ARRAY['CC', 'CCEC']),
('Historia de España', '2º Bachillerato', 'Edad Moderna', 'La formación de la Monarquía Hispánica: Reyes Católicos.', ARRAY['CC', 'CCEC']),
('Historia de España', '2º Bachillerato', 'Edad Moderna', 'El Imperio de los Austrias: Carlos I y Felipe II.', ARRAY['CC', 'CCEC']),
('Historia de España', '2º Bachillerato', 'Siglo XVIII', 'Los Borbones: reformismo ilustrado y Guerra de Sucesión.', ARRAY['CC', 'CCEC']),
('Historia de España', '2º Bachillerato', 'Siglo XIX', 'Crisis del Antiguo Régimen: Guerra de Independencia, Cortes de Cádiz.', ARRAY['CC', 'CCEC']),
('Historia de España', '2º Bachillerato', 'Siglo XIX', 'Construcción del Estado Liberal: reinados de Isabel II y Restauración.', ARRAY['CC', 'CCEC']),
('Historia de España', '2º Bachillerato', 'Siglo XX', 'Crisis del 98 y Alfonso XIII.', ARRAY['CC', 'CCEC']),
('Historia de España', '2º Bachillerato', 'Siglo XX', 'Segunda República: reformas, conflictos.', ARRAY['CC', 'CCEC', 'CPSAA']),
('Historia de España', '2º Bachillerato', 'Siglo XX', 'Guerra Civil Española: causas, desarrollo, consecuencias.', ARRAY['CC', 'CCEC', 'CPSAA']),
('Historia de España', '2º Bachillerato', 'Siglo XX', 'Dictadura franquista: etapas, características, oposición.', ARRAY['CC', 'CCEC', 'CPSAA']),
('Historia de España', '2º Bachillerato', 'España democrática', 'La Transición democrática y la España actual.', ARRAY['CC', 'CCEC', 'CPSAA'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.HE.2B.1', 'Historia de España', '2º Bachillerato', 1, 'Explicar la evolución política de España en la Edad Media.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.HE.2B.2', 'Historia de España', '2º Bachillerato', 2, 'Analizar el Imperio de los Austrias.', ARRAY['CC', 'CCEC'], 'Analizar'),
('CE.HE.2B.3', 'Historia de España', '2º Bachillerato', 3, 'Explicar la construcción del Estado Liberal en el siglo XIX.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.HE.2B.4', 'Historia de España', '2º Bachillerato', 4, 'Analizar las causas y consecuencias de la Guerra Civil.', ARRAY['CC', 'CCEC', 'CPSAA'], 'Analizar'),
('CE.HE.2B.5', 'Historia de España', '2º Bachillerato', 5, 'Caracterizar la dictadura franquista.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.HE.2B.6', 'Historia de España', '2º Bachillerato', 6, 'Valorar la importancia de la Transición democrática.', ARRAY['CC', 'CCEC', 'CPSAA'], 'Evaluar'),
('CE.HE.2B.7', 'Historia de España', '2º Bachillerato', 7, 'Comprender la España actual en su contexto histórico.', ARRAY['CC', 'CCEC'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 4. FÍSICA - 2º BACHILLERATO (Modalidad Ciencias)
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Física', '2º Bachillerato', 'Mecánica', 'Cinemática avanzada: movimiento armónico simple.', ARRAY['CMCT']),
('Física', '2º Bachillerato', 'Mecánica', 'Dinámica: momento lineal, choques, conservación.', ARRAY['CMCT']),
('Física', '2º Bachillerato', 'Mecánica', 'Momento angular y rotación de sólidos rígidos.', ARRAY['CMCT']),
('Física', '2º Bachillerato', 'Gravitación', 'Campo gravitatorio: intensidad, potencial, energía.', ARRAY['CMCT']),
('Física', '2º Bachillerato', 'Gravitación', 'Movimiento de planetas y satélites: leyes de Kepler.', ARRAY['CMCT']),
('Física', '2º Bachillerato', 'Electromagnetismo', 'Campo eléctrico: intensidad, potencial, energía.', ARRAY['CMCT']),
('Física', '2º Bachillerato', 'Electromagnetismo', 'Campo magnético: fuerza de Lorentz, ley de Ampère.', ARRAY['CMCT']),
('Física', '2º Bachillerato', 'Electromagnetismo', 'Inducción electromagnética: ley de Faraday-Lenz.', ARRAY['CMCT', 'CD']),
('Física', '2º Bachillerato', 'Ondas', 'Movimiento ondulatorio: tipos, ecuación, propiedades.', ARRAY['CMCT']),
('Física', '2º Bachillerato', 'Óptica', 'Óptica geométrica: espejos, lentes, formación de imágenes.', ARRAY['CMCT']),
('Física', '2º Bachillerato', 'Física moderna', 'Física cuántica: efecto fotoeléctrico, dualidad onda-corpúsculo.', ARRAY['CMCT']),
('Física', '2º Bachillerato', 'Física moderna', 'Física nuclear: radiactividad, fusión, fisión, aplicaciones.', ARRAY['CMCT', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.FIS.2B.1', 'Física', '2º Bachillerato', 1, 'Resolver problemas de cinemática y dinámica avanzada.', ARRAY['CMCT'], 'Aplicar'),
('CE.FIS.2B.2', 'Física', '2º Bachillerato', 2, 'Aplicar las leyes de conservación a sistemas físicos.', ARRAY['CMCT'], 'Aplicar'),
('CE.FIS.2B.3', 'Física', '2º Bachillerato', 3, 'Calcular magnitudes del campo gravitatorio y eléctrico.', ARRAY['CMCT'], 'Aplicar'),
('CE.FIS.2B.4', 'Física', '2º Bachillerato', 4, 'Resolver problemas de inducción electromagnética.', ARRAY['CMCT', 'CD'], 'Aplicar'),
('CE.FIS.2B.5', 'Física', '2º Bachillerato', 5, 'Analizar fenómenos ondulatorios y ópticos.', ARRAY['CMCT'], 'Analizar'),
('CE.FIS.2B.6', 'Física', '2º Bachillerato', 6, 'Explicar fenómenos de física cuántica y nuclear.', ARRAY['CMCT'], 'Comprender'),
('CE.FIS.2B.7', 'Física', '2º Bachillerato', 7, 'Aplicar leyes de Kepler al movimiento planetario.', ARRAY['CMCT'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 5. INGLÉS II - 2º BACHILLERATO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Inglés II', '2º Bachillerato', 'Comprensión oral', 'Comprensión de conferencias, ponencias académicas y discursos especializados.', ARRAY['CP', 'CCL', 'CD']),
('Inglés II', '2º Bachillerato', 'Comprensión oral', 'Comprensión de medios audiovisuales auténticos sin apoyo.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés II', '2º Bachillerato', 'Producción oral', 'Presentaciones académicas de nivel universitario.', ARRAY['CP', 'CCL', 'CD']),
('Inglés II', '2º Bachillerato', 'Producción oral', 'Debates formales y defensa de posiciones con argumentación sólida.', ARRAY['CP', 'CPSAA', 'CC']),
('Inglés II', '2º Bachillerato', 'Comprensión lectora', 'Lectura de textos literarios clásicos sin adaptar.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés II', '2º Bachillerato', 'Comprensión lectora', 'Comprensión de textos académicos y científicos especializados.', ARRAY['CP', 'CCL', 'CMCT']),
('Inglés II', '2º Bachillerato', 'Producción escrita', 'Ensayos académicos formales: estructura, registro, coherencia.', ARRAY['CP', 'CCL', 'CPSAA']),
('Inglés II', '2º Bachillerato', 'Producción escrita', 'Análisis crítico literario y comentario de texto.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés II', '2º Bachillerato', 'Gramática', 'Dominio completo de tiempos verbales y estructuras complejas.', ARRAY['CP', 'CCL']),
('Inglés II', '2º Bachillerato', 'Gramática', 'Discourse markers y conectores avanzados.', ARRAY['CP', 'CCL']),
('Inglés II', '2º Bachillerato', 'Vocabulario', 'Vocabulario académico C1: precisión léxica y registro formal.', ARRAY['CP', 'CCL']),
('Inglés II', '2º Bachillerato', 'Literatura', 'Literatura anglófona: análisis de obras representativas de diferentes épocas.', ARRAY['CP', 'CCL', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.2B.1', 'Inglés II', '2º Bachillerato', 1, 'Comprender discursos académicos complejos y especializados.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.2B.2', 'Inglés II', '2º Bachillerato', 2, 'Realizar presentaciones académicas de nivel universitario.', ARRAY['CP', 'CCL', 'CD'], 'Crear'),
('CE.ING.2B.3', 'Inglés II', '2º Bachillerato', 3, 'Leer y analizar textos literarios sin adaptar.', ARRAY['CP', 'CCL', 'CCEC'], 'Analizar'),
('CE.ING.2B.4', 'Inglés II', '2º Bachillerato', 4, 'Escribir ensayos académicos con estructura formal rigurosa.', ARRAY['CP', 'CCL', 'CPSAA'], 'Crear'),
('CE.ING.2B.5', 'Inglés II', '2º Bachillerato', 5, 'Dominar estructuras gramaticales y léxico de nivel C1.', ARRAY['CP', 'CCL'], 'Aplicar'),
('CE.ING.2B.6', 'Inglés II', '2º Bachillerato', 6, 'Analizar críticamente obras de literatura anglófona.', ARRAY['CP', 'CCL', 'CCEC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- RESUMEN - 2º BACHILLERATO
-- =====================================================

-- TOTAL: 60 saberes básicos + 34 criterios de evaluación
-- 5 asignaturas de 2º Bachillerato
-- Nivel: 17-18 años - Preparación EvAU/Selectividad
-- Base legal: Real Decreto 243/2022

SELECT 'Currículo completo de 2º Bachillerato cargado correctamente - 5 asignaturas' AS status;
