-- =====================================================
-- CURRÍCULO GALLEGO - 3º ESO
-- Decreto 155/2022 de Galicia (Secundaria)
-- =====================================================
-- Lingua Galega para 3º ESO (14-15 años)
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '3º ESO', 'As linguas e os seus falantes', 'Políticas lingüísticas en Galicia: normalización e planificación.', ARRAY['CCL', 'CP', 'CC', 'CPSAA']),
('Lingua Galega e Literatura', '3º ESO', 'As linguas e os seus falantes', 'Uso institucional e social do galego: análise crítica.', ARRAY['CCL', 'CP', 'CC', 'CD']),
('Lingua Galega e Literatura', '3º ESO', 'Comunicación oral', 'Discursos orais formais en galego: conferencias, ponencias.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura', '3º ESO', 'Comunicación oral', 'Técnicas de argumentación oral e debate en galego.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lingua Galega e Literatura', '3º ESO', 'Comprensión lectora', 'Textos humanísticos e ensaíst icos en galego.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '3º ESO', 'Comprensión lectora', 'Interpretación de textos galegos: literais, inferenciais e críticas.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '3º ESO', 'Produción escrita', 'Textos académicos en galego: informes, traballos de investigación.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura', '3º ESO', 'Produción escrita', 'Coherencia, cohesión e corrección en textos galegos.', ARRAY['CCL']),
('Lingua Galega e Literatura', '3º ESO', 'Reflexión sobre a lingua', 'Oración composta en galego: coordinación e xustaposición.', ARRAY['CCL']),
('Lingua Galega e Literatura', '3º ESO', 'Reflexión sobre a lingua', 'Clases de oracións coordinadas en galego.', ARRAY['CCL']),
('Lingua Galega e Literatura', '3º ESO', 'Reflexión sobre a lingua', 'O texto en galego: mecanismos de cohesión.', ARRAY['CCL']),
('Lingua Galega e Literatura', '3º ESO', 'Educación literaria', 'Literatura galega do século XIX: Rosalía de Castro, Curros Enríquez.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '3º ESO', 'Educación literaria', 'Literatura galega do século XX: Castelao, Cunqueiro.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '3º ESO', 'Educación literaria', 'Análise de textos literarios galegos contemporáneos.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '3º ESO', 'Patrimonio cultural', 'Patrimonio literario e cultural galego: preservación e difusión.', ARRAY['CCL', 'CCEC', 'CC', 'CD'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.3E.1', 'Lingua Galega e Literatura', '3º ESO', 1, 'Realizar discursos orais formais ben estruturados en galego.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.3E.2', 'Lingua Galega e Literatura', '3º ESO', 2, 'Comprender e interpretar textos humanísticos e ensaísticos en galego.', ARRAY['CCL', 'CPSAA'], 'Analizar'),
('CE.LG.3E.3', 'Lingua Galega e Literatura', '3º ESO', 3, 'Producir textos académicos coherentes en galego.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.3E.4', 'Lingua Galega e Literatura', '3º ESO', 4, 'Analizar a estrutura de oracións compostas coordinadas en galego.', ARRAY['CCL'], 'Analizar'),
('CE.LG.3E.5', 'Lingua Galega e Literatura', '3º ESO', 5, 'Identificar mecanismos de cohesión textual en galego.', ARRAY['CCL'], 'Comprender'),
('CE.LG.3E.6', 'Lingua Galega e Literatura', '3º ESO', 6, 'Coñecer a literatura galega dos séculos XIX e XX.', ARRAY['CCL', 'CCEC', 'CC'], 'Comprender'),
('CE.LG.3E.7', 'Lingua Galega e Literatura', '3º ESO', 7, 'Valorar criticamente o patrimonio cultural galego.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 3º ESO cargado correctamente' AS status;
