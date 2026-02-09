-- =====================================================
-- CURRÍCULO GALLEGO - 6º PRIMARIA
-- Decreto 155/2022 de Galicia
-- =====================================================
-- Lingua Galega para niños de 11 años
-- Último curso de Primaria - Nivel máximo
-- Preparación para ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '6º Primaria', 'As linguas e os seus falantes', 'Coñecemento da situación sociolingüística de Galicia: usos e actitudes.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '6º Primaria', 'As linguas e os seus falantes', 'Compromiso persoal co uso e a normalización do galego.', ARRAY['CCL', 'CP', 'CC', 'CPSAA']),
('Lingua Galega e Literatura', '6º Primaria', 'Comunicación oral', 'Exposición oral formal en galego: estrutura, claridade e uso de recursos.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura', '6º Primaria', 'Comunicación oral', 'Debate e argumentación en galego: defensa de opinións con fundamentos.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lingua Galega e Literatura', '6º Primaria', 'Comprensión lectora', 'Análise e interpretación de textos literarios galegos.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '6º Primaria', 'Comprensión lectora', 'Textos argumentativos en galego: identificación de tese e argumentos.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '6º Primaria', 'Comprensión lectora', 'Lectura crítica en galego: valoración e opinión persoal fundamentada.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '6º Primaria', 'Produción escrita', 'Redacción de textos argumentativos e expositivos en galego.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '6º Primaria', 'Produción escrita', 'Planificación, redacción e revisión de textos en galego.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '6º Primaria', 'Produción escrita', 'Ortografía galega avanzada: acentuación, uso de signos de puntuación.', ARRAY['CCL']),
('Lingua Galega e Literatura', '6º Primaria', 'Reflexión sobre a lingua', 'Análise sintáctica completa en galego: suxeito, predicado e complementos básicos.', ARRAY['CCL']),
('Lingua Galega e Literatura', '6º Primaria', 'Reflexión sobre a lingua', 'Clases de oracións en galego: enunciativas, interrogativas, exclamativas, imperativas.', ARRAY['CCL']),
('Lingua Galega e Literatura', '6º Primaria', 'Reflexión sobre a lingua', 'Análise morfolóxica completa de todas as categorías gramaticais.', ARRAY['CCL']),
('Lingua Galega e Literatura', '6º Primaria', 'Educación literaria', 'Xéneros literarios galegos: narrativa, lírica e teatro.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '6º Primaria', 'Educación literaria', 'Recursos literarios: metáfora, símil, personificación, hipérbole.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '6º Primaria', 'Educación literaria', 'Principais autores e autoras da literatura galega contemporánea.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '6º Primaria', 'Patrimonio cultural', 'Patrimonio cultural, histórico e lingüístico de Galicia: coñecemento e valoración.', ARRAY['CCL', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.6P.1', 'Lingua Galega e Literatura', '6º Primaria', 1, 'Realizar exposicións orais en galego estruturadas e claras.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.6P.2', 'Lingua Galega e Literatura', '6º Primaria', 2, 'Analizar e interpretar textos literarios galegos.', ARRAY['CCL', 'CCEC'], 'Analizar'),
('CE.LG.6P.3', 'Lingua Galega e Literatura', '6º Primaria', 3, 'Producir textos argumentativos en galego con coherencia e cohesión.', ARRAY['CCL', 'CPSAA'], 'Crear'),
('CE.LG.6P.4', 'Lingua Galega e Literatura', '6º Primaria', 4, 'Realizar análise sintáctica completa de oracións en galego.', ARRAY['CCL'], 'Analizar'),
('CE.LG.6P.5', 'Lingua Galega e Literatura', '6º Primaria', 5, 'Identificar e utilizar recursos literarios en galego.', ARRAY['CCL', 'CCEC'], 'Crear'),
('CE.LG.6P.6', 'Lingua Galega e Literatura', '6º Primaria', 6, 'Valorar criticamente textos lidos en galego.', ARRAY['CCL', 'CPSAA'], 'Evaluar'),
('CE.LG.6P.7', 'Lingua Galega e Literatura', '6º Primaria', 7, 'Coñecer e valorar o patrimonio cultural e lingüístico de Galicia.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 6º Primaria cargado correctamente' AS status;
