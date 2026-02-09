-- =====================================================
-- CURRÍCULO GALLEGO - 1º ESO
-- Decreto 155/2022 de Galicia (Secundaria)
-- =====================================================
-- Lingua Galega para 1º ESO (12-13 años)
-- Primer curso de Secundaria
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '1º ESO', 'As linguas e os seus falantes', 'Análise da situación sociolingüística actual de Galicia.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '1º ESO', 'As linguas e os seus falantes', 'Actitudes de respecto e valoración cara ao galego e ao plurilingüismo.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '1º ESO', 'Comunicación oral', 'Exposicións orais planificadas sobre temas diversos en galego.', ARRAY['CCL', 'CD']),
('Lingua Galega e Literatura', '1º ESO', 'Comunicación oral', 'Comprensión de textos orais en galego: informativos, argumentativos, narrativos.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º ESO', 'Comprensión lectora', 'Lectura comprensiva de textos galegos de diferentes xéneros e épocas.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º ESO', 'Comprensión lectora', 'Análise da estrutura e contido de textos en galego.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '1º ESO', 'Produción escrita', 'Redacción de textos narrativos, descritivos e dialogados en galego.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '1º ESO', 'Produción escrita', 'Ortografía e puntuación galega: normas avanzadas.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º ESO', 'Reflexión sobre a lingua', 'Análise morfolóxica completa en galego: categorías gramaticais.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º ESO', 'Reflexión sobre a lingua', 'Análise sintáctica en galego: oración simple, suxeito e predicado.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º ESO', 'Reflexión sobre a lingua', 'Complementos do verbo en galego: CD, CI, CC.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º ESO', 'Educación literaria', 'Literatura medieval galega: características xerais, Cantigas de Amigo.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '1º ESO', 'Educación literaria', 'Xéneros literarios galegos: narrativa, lírica, teatro.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '1º ESO', 'Educación literaria', 'Recursos literarios en textos galegos: metáfora, símil, personificación.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '1º ESO', 'Patrimonio cultural', 'O patrimonio literario e cultural de Galicia: valoración e conservación.', ARRAY['CCL', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.1E.1', 'Lingua Galega e Literatura', '1º ESO', 1, 'Realizar exposicións orais estruturadas e ben documentadas en galego.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.1E.2', 'Lingua Galega e Literatura', '1º ESO', 2, 'Comprender e analizar textos galegos de diferentes xéneros.', ARRAY['CCL'], 'Analizar'),
('CE.LG.1E.3', 'Lingua Galega e Literatura', '1º ESO', 3, 'Redactar textos coherentes e ben cohesionados en galego.', ARRAY['CCL', 'CCEC'], 'Crear'),
('CE.LG.1E.4', 'Lingua Galega e Literatura', '1º ESO', 4, 'Realizar análise morfolóxica e sintáctica de oracións simples en galego.', ARRAY['CCL'], 'Analizar'),
('CE.LG.1E.5', 'Lingua Galega e Literatura', '1º ESO', 5, 'Identificar e analizar recursos literarios en textos galegos.', ARRAY['CCL', 'CCEC'], 'Analizar'),
('CE.LG.1E.6', 'Lingua Galega e Literatura', '1º ESO', 6, 'Coñecer características da literatura medieval galega.', ARRAY['CCL', 'CCEC', 'CC'], 'Comprender'),
('CE.LG.1E.7', 'Lingua Galega e Literatura', '1º ESO', 7, 'Valorar o patrimonio literario e cultural de Galicia.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 1º ESO cargado correctamente' AS status;
