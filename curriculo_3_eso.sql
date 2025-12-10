-- =====================================================
-- CURRÍCULO COMPLETO 3º DE ESO
-- Real Decreto 217/2022 - Enseñanzas Mínimas ESO
-- =====================================================
-- Adaptado a estudiantes de 14-15 años
-- Tercer curso de Educación Secundaria Obligatoria
-- =====================================================

-- =====================================================
-- 1. MATEMÁTICAS - 3º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '3º ESO', 'Sentido numérico', 'Números reales: racionales e irracionales. Representación en la recta numérica.', ARRAY['CMCT']),
('Matemáticas', '3º ESO', 'Sentido numérico', 'Aproximación y redondeo. Error absoluto y relativo.', ARRAY['CMCT']),
('Matemáticas', '3º ESO', 'Sentido numérico', 'Intervalos y semirrectas.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '3º ESO', 'Sentido algebraico', 'Ecuaciones de segundo grado: resolución mediante fórmula.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '3º ESO', 'Sentido algebraico', 'Sistemas de ecuaciones lineales y no lineales.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '3º ESO', 'Sentido algebraico', 'Polinomios: operaciones y factorización.', ARRAY['CMCT']),
('Matemáticas', '3º ESO', 'Sentido espacial', 'Semejanza y teorema de Tales: aplicaciones.', ARRAY['CMCT']),
('Matemáticas', '3º ESO', 'Sentido espacial', 'Razones trigonométricas: seno, coseno, tangente.', ARRAY['CMCT']),
('Matemáticas', '3º ESO', 'Sentido funcional', 'Funciones lineales, afines y cuadráticas: representación gráfica.', ARRAY['CMCT', 'CD']),
('Matemáticas', '3º ESO', 'Sentido funcional', 'Características de funciones: crecimiento, máximos, mínimos.', ARRAY['CMCT', 'CD']),
('Matemáticas', '3º ESO', 'Sentido estocástico', 'Probabilidad: regla de Laplace y propiedades.', ARRAY['CMCT']),
('Matemáticas', '3º ESO', 'Sentido estocástico', 'Estadística: tablas de frecuencias y parámetros estadísticos.', ARRAY['CMCT', 'CD'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.3E.1', 'Matemáticas', '3º ESO', 1, 'Clasificar números reales y operar con ellos.', ARRAY['CMCT'], 'Comprender'),
('CE.MAT.3E.2', 'Matemáticas', '3º ESO', 2, 'Resolver ecuaciones de segundo grado completas e incompletas.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.3E.3', 'Matemáticas', '3º ESO', 3, 'Resolver sistemas de ecuaciones lineales y no lineales.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.3E.4', 'Matemáticas', '3º ESO', 4, 'Aplicar el teorema de Tales y las razones trigonométricas.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.3E.5', 'Matemáticas', '3º ESO', 5, 'Representar e interpretar funciones lineales, afines y cuadráticas.', ARRAY['CMCT', 'CD'], 'Analizar'),
('CE.MAT.3E.6', 'Matemáticas', '3º ESO', 6, 'Calcular probabilidades usando la regla de Laplace.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.3E.7', 'Matemáticas', '3º ESO', 7, 'Interpretar y elaborar tablas y gráficos estadísticos.', ARRAY['CMCT', 'CD'], 'Analizar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. LENGUA CASTELLANA Y LITERATURA - 3º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura', '3º ESO', 'Comunicación oral', 'Discursos orales formales: conferencias, ponencias.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lengua Castellana y Literatura', '3º ESO', 'Comunicación oral', 'Técnicas de argumentación oral y debate.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lengua Castellana y Literatura', '3º ESO', 'Comprensión lectora', 'Textos humanísticos y ensayísticos.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '3º ESO', 'Comprensión lectora', 'Interpretación de textos: literales, inferenciales y críticas.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '3º ESO', 'Producción escrita', 'Textos académicos: informes, trabajos de investigación.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lengua Castellana y Literatura', '3º ESO', 'Producción escrita', 'Coherencia, cohesión, adecuación y corrección en textos escritos.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '3º ESO', 'Reflexión sobre la lengua', 'Oración compuesta: coordinación y yuxtaposición.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '3º ESO', 'Reflexión sobre la lengua', 'Clases de oraciones coordinadas.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '3º ESO', 'Reflexión sobre la lengua', 'El texto: mecanismos de cohesión.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '3º ESO', 'Educación literaria', 'Literatura del Barroco: Góngora, Quevedo, Lope de Vega.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '3º ESO', 'Educación literaria', 'El Siglo de Oro español: teatro y poesía.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '3º ESO', 'Educación literaria', 'Análisis de textos literarios barrocos.', ARRAY['CCL', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.3E.1', 'Lengua Castellana y Literatura', '3º ESO', 1, 'Realizar discursos orales formales bien estructurados.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LCL.3E.2', 'Lengua Castellana y Literatura', '3º ESO', 2, 'Comprender e interpretar textos humanísticos y ensayísticos.', ARRAY['CCL', 'CPSAA'], 'Analizar'),
('CE.LCL.3E.3', 'Lengua Castellana y Literatura', '3º ESO', 3, 'Producir textos académicos coherentes y bien cohesionados.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LCL.3E.4', 'Lengua Castellana y Literatura', '3º ESO', 4, 'Analizar la estructura de oraciones compuestas coordinadas.', ARRAY['CCL'], 'Analizar'),
('CE.LCL.3E.5', 'Lengua Castellana y Literatura', '3º ESO', 5, 'Identificar mecanismos de cohesión textual.', ARRAY['CCL'], 'Comprender'),
('CE.LCL.3E.6', 'Lengua Castellana y Literatura', '3º ESO', 6, 'Conocer características del Barroco y el Siglo de Oro.', ARRAY['CCL', 'CCEC'], 'Comprender'),
('CE.LCL.3E.7', 'Lengua Castellana y Literatura', '3º ESO', 7, 'Analizar textos literarios barrocos.', ARRAY['CCL', 'CCEC'], 'Analizar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 3. GEOGRAFÍA E HISTORIA - 3º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Geografía e Historia', '3º ESO', 'Geografía', 'Actividad económica: sectores productivos en el mundo.', ARRAY['CC', 'CE']),
('Geografía e Historia', '3º ESO', 'Geografía', 'Globalización: interdependencia económica y comercio internacional.', ARRAY['CC', 'CE', 'CD']),
('Geografía e Historia', '3º ESO', 'Geografía', 'Desarrollo sostenible y medio ambiente.', ARRAY['CC', 'CE', 'CPSAA']),
('Geografía e Historia', '3º ESO', 'Historia', 'Edad Moderna: el Humanismo y el Renacimiento.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '3º ESO', 'Historia', 'Los descubrimientos geográficos: causas y consecuencias.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '3º ESO', 'Historia', 'El imperio español: la monarquía de los Austrias.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '3º ESO', 'Historia', 'El Antiguo Régimen: monarquías absolutas y sociedad estamental.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '3º ESO', 'Historia', 'La Ilustración y el despotismo ilustrado.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '3º ESO', 'Historia', 'Revoluciones liberales: Revolución Francesa.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '3º ESO', 'Historia', 'Independencias americanas.', ARRAY['CC', 'CCEC', 'CP'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.GH.3E.1', 'Geografía e Historia', '3º ESO', 1, 'Analizar la distribución de las actividades económicas en el mundo.', ARRAY['CC', 'CE'], 'Analizar'),
('CE.GH.3E.2', 'Geografía e Historia', '3º ESO', 2, 'Explicar el fenómeno de la globalización y sus consecuencias.', ARRAY['CC', 'CE', 'CD'], 'Comprender'),
('CE.GH.3E.3', 'Geografía e Historia', '3º ESO', 3, 'Valorar la importancia del desarrollo sostenible.', ARRAY['CC', 'CE', 'CPSAA'], 'Evaluar'),
('CE.GH.3E.4', 'Geografía e Historia', '3º ESO', 4, 'Explicar las causas y consecuencias de los descubrimientos geográficos.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.GH.3E.5', 'Geografía e Historia', '3º ESO', 5, 'Describir las características del Antiguo Régimen.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.GH.3E.6', 'Geografía e Historia', '3º ESO', 6, 'Analizar las causas de la Revolución Francesa.', ARRAY['CC', 'CCEC'], 'Analizar'),
('CE.GH.3E.7', 'Geografía e Historia', '3º ESO', 7, 'Explicar el proceso de independencia de América.', ARRAY['CC', 'CCEC', 'CP'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 4. FÍSICA Y QUÍMICA - 3º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Física y Química', '3º ESO', 'Química', 'Formulación y nomenclatura de compuestos binarios.', ARRAY['CMCT', 'CCL']),
('Física y Química', '3º ESO', 'Química', 'Reacciones químicas: tipos y ajuste de ecuaciones.', ARRAY['CMCT']),
('Física y Química', '3º ESO', 'Química', 'Leyes ponderales: ley de conservación de la masa.', ARRAY['CMCT']),
('Física y Química', '3º ESO', 'Química', 'Ácidos y bases: concepto y pH.', ARRAY['CMCT', 'CPSAA']),
('Física y Química', '3º ESO', 'Física', 'Fuerzas: leyes de Newton.', ARRAY['CMCT']),
('Física y Química', '3º ESO', 'Física', 'Presión: concepto y aplicaciones.', ARRAY['CMCT', 'CE']),
('Física y Química', '3º ESO', 'Física', 'Electricidad: carga eléctrica, corriente, circuitos.', ARRAY['CMCT', 'CD']),
('Física y Química', '3º ESO', 'Física', 'Ley de Ohm: voltaje, intensidad, resistencia.', ARRAY['CMCT']),
('Física y Química', '3º ESO', 'Energía', 'Trabajo y energía: relación y transformaciones.', ARRAY['CMCT', 'CE']),
('Física y Química', '3º ESO', 'Energía', 'Energía eléctrica: producción y consumo responsable.', ARRAY['CMCT', 'CC', 'CE'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.FQ.3E.1', 'Física y Química', '3º ESO', 1, 'Formular y nombrar compuestos químicos binarios.', ARRAY['CMCT', 'CCL'], 'Aplicar'),
('CE.FQ.3E.2', 'Física y Química', '3º ESO', 2, 'Ajustar ecuaciones químicas y clasificar reacciones.', ARRAY['CMCT'], 'Aplicar'),
('CE.FQ.3E.3', 'Física y Química', '3º ESO', 3, 'Aplicar las leyes de Newton a situaciones cotidianas.', ARRAY['CMCT'], 'Aplicar'),
('CE.FQ.3E.4', 'Física y Química', '3º ESO', 4, 'Resolver problemas de circuitos eléctricos aplicando la ley de Ohm.', ARRAY['CMCT'], 'Aplicar'),
('CE.FQ.3E.5', 'Física y Química', '3º ESO', 5, 'Diferenciar ácidos y bases y medir el pH.', ARRAY['CMCT', 'CPSAA'], 'Comprender'),
('CE.FQ.3E.6', 'Física y Química', '3º ESO', 6, 'Calcular trabajo y energía en transformaciones.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.FQ.3E.7', 'Física y Química', '3º ESO', 7, 'Valorar el consumo responsable de energía eléctrica.', ARRAY['CMCT', 'CC', 'CE'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 5. INGLÉS (LENGUA EXTRANJERA) - 3º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Inglés', '3º ESO', 'Comprensión oral', 'Comprensión de conferencias y presentaciones sobre temas académicos.', ARRAY['CP', 'CCL', 'CD']),
('Inglés', '3º ESO', 'Comprensión oral', 'Identificación de información implícita y explícita.', ARRAY['CP', 'CCL', 'CPSAA']),
('Inglés', '3º ESO', 'Producción oral', 'Debates y discusiones sobre temas controvertidos.', ARRAY['CP', 'CPSAA', 'CC']),
('Inglés', '3º ESO', 'Producción oral', 'Presentaciones académicas con soporte visual.', ARRAY['CP', 'CCL', 'CD']),
('Inglés', '3º ESO', 'Comprensión lectora', 'Lectura de textos literarios: novelas adaptadas, poesía.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés', '3º ESO', 'Comprensión lectora', 'Textos científicos y académicos.', ARRAY['CP', 'CCL', 'CMCT']),
('Inglés', '3º ESO', 'Producción escrita', 'Ensayos argumentativos y de opinión.', ARRAY['CP', 'CCL', 'CPSAA']),
('Inglés', '3º ESO', 'Producción escrita', 'Escritura creativa avanzada.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés', '3º ESO', 'Gramática', 'Oraciones condicionales: tipos 0, 1, 2.', ARRAY['CP', 'CCL']),
('Inglés', '3º ESO', 'Gramática', 'Voz pasiva: presente y pasado.', ARRAY['CP', 'CCL']),
('Inglés', '3º ESO', 'Gramática', 'Estilo indirecto (reported speech).', ARRAY['CP', 'CCL']),
('Inglés', '3º ESO', 'Vocabulario', 'Phrasal verbs y expresiones idiomáticas.', ARRAY['CP', 'CCL'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.3E.1', 'Inglés', '3º ESO', 1, 'Comprender información en conferencias y presentaciones.', ARRAY['CP', 'CCL', 'CD'], 'Comprender'),
('CE.ING.3E.2', 'Inglés', '3º ESO', 2, 'Participar en debates expresando opiniones fundamentadas.', ARRAY['CP', 'CPSAA', 'CC'], 'Evaluar'),
('CE.ING.3E.3', 'Inglés', '3º ESO', 3, 'Leer y comprender textos literarios y académicos.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.3E.4', 'Inglés', '3º ESO', 4, 'Escribir ensayos argumentativos coherentes.', ARRAY['CP', 'CCL', 'CPSAA'], 'Crear'),
('CE.ING.3E.5', 'Inglés', '3º ESO', 5, 'Usar correctamente condicionales, voz pasiva y estilo indirecto.', ARRAY['CP', 'CCL'], 'Aplicar'),
('CE.ING.3E.6', 'Inglés', '3º ESO', 6, 'Utilizar phrasal verbs en contexto.', ARRAY['CP', 'CCL'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- RESUMEN - 3º ESO
-- =====================================================

-- TOTAL: 56 saberes básicos + 34 criterios de evaluación
-- 5 asignaturas principales de 3º ESO
-- Nivel: 14-15 años
-- Base legal: Real Decreto 217/2022

SELECT 'Currículo completo de 3º ESO cargado correctamente - 5 asignaturas' AS status;
