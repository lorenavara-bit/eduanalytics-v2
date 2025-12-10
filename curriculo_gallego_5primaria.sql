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
