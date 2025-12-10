-- =====================================================
-- CURRÍCULO GALLEGO - 4º ESO
-- Decreto 155/2022 de Galicia (Secundaria)
-- =====================================================
-- Lingua Galega para 4º ESO (15-16 años)
-- Último curso de ESO - Preparación para Bachillerato
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '4º ESO', 'As linguas e os seus falantes', 'Situación do galego na actualidade: retos e oportunidades.', ARRAY['CCL', 'CP', 'CC', 'CD']),
('Lingua Galega e Literatura', '4º ESO', 'As linguas e os seus falantes', 'Compromiso persoal e social co uso do galego.', ARRAY['CCL', 'CP', 'CC', 'CPSAA']),
('Lingua Galega e Literatura', '4º ESO', 'Comunicación oral', 'Textos orais formais en galego: ponencias, conferencias académicas.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura', '4º ESO', 'Comunicación oral', 'Argumentación oral avanzada e debate académico en galego.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lingua Galega e Literatura', '4º ESO', 'Comprensión lectora', 'Textos científicos, técnicos e académicos en galego.', ARRAY['CCL', 'CMCT', 'CD']),
('Lingua Galega e Literatura', '4º ESO', 'Comprensión lectora', 'Análise crítica de textos mediáticos en galego.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura', '4º ESO', 'Produción escrita', 'Textos académicos avanzados en galego: ensaios, traballos de investigación.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura', '4º ESO', 'Produción escrita', 'Textos de opinión e argumentativos complexos en galego.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lingua Galega e Literatura', '4º ESO', 'Reflexión sobre a lingua', 'Oración composta en galego: subordinación substantiva, adxetiva e adverbial.', ARRAY['CCL']),
('Lingua Galega e Literatura', '4º ESO', 'Reflexión sobre a lingua', 'Análise sintáctica completa de oracións complexas en galego.', ARRAY['CCL']),
('Lingua Galega e Literatura', '4º ESO', 'Reflexión sobre a lingua', 'Variedades da lingua galega: rexistros e niveis.', ARRAY['CCL', 'CP']),
('Lingua Galega e Literatura', '4º ESO', 'Educación literaria', 'Literatura galega contemporánea: principais autores e movementos.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '4º ESO', 'Educación literaria', 'Xeracións poéticas galegas: Pondal, Cabanillas, Celso Emilio Ferreiro.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '4º ESO', 'Educación literaria', 'Narrativa galega contemporánea: Anxel Fole, Álvaro Cunqueiro, Manuel Rivas.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '4º ESO', 'Patrimonio cultural', 'Patrimonio literario e cultural galego: análise crítica e valoración.', ARRAY['CCL', 'CCEC', 'CC', 'CD'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.4E.1', 'Lingua Galega e Literatura', '4º ESO', 1, 'Producir textos orais formais ben estruturados en galego.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.4E.2', 'Lingua Galega e Literatura', '4º ESO', 2, 'Analizar criticamente textos de diferentes ámbitos en galego.', ARRAY['CCL', 'CPSAA'], 'Evaluar'),
('CE.LG.4E.3', 'Lingua Galega e Literatura', '4º ESO', 3, 'Producir textos académicos e argumentativos complexos en galego.', ARRAY['CCL', 'CD', 'CPSAA'], 'Crear'),
('CE.LG.4E.4', 'Lingua Galega e Literatura', '4º ESO', 4, 'Realizar análise sintáctica completa de oracións compostas en galego.', ARRAY['CCL'], 'Analizar'),
('CE.LG.4E.5', 'Lingua Galega e Literatura', '4º ESO', 5, 'Recoñecer variedades lingüísticas e rexistros en galego.', ARRAY['CCL', 'CP'], 'Comprender'),
('CE.LG.4E.6', 'Lingua Galega e Literatura', '4º ESO', 6, 'Coñecer a literatura galega contemporánea.', ARRAY['CCL', 'CCEC', 'CC'], 'Comprender'),
('CE.LG.4E.7', 'Lingua Galega e Literatura', '4º ESO', 7, 'Analizar textos literarios galegos representativos.', ARRAY['CCL', 'CCEC'], 'Analizar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 4º ESO cargado correctamente' AS status;
