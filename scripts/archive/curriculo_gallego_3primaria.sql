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
