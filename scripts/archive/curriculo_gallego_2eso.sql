-- =====================================================
-- CURRÍCULO GALLEGO - 2º ESO  
-- Decreto 155/2022 de Galicia (Secundaria)
-- =====================================================
-- Lingua Galega para 2º ESO (13-14 años)
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '2º ESO', 'As linguas e os seus falantes', 'Análise crítica da presenza do galego nos medios de comunicación.', ARRAY['CCL', 'CP', 'CC', 'CD']),
('Lingua Galega e Literatura', '2º ESO', 'As linguas e os seus falantes', 'Promoción do uso do galego en todos os ámbitos.', ARRAY['CCL', 'CP', 'CC', 'CPSAA']),
('Lingua Galega e Literatura', '2º ESO', 'Comunicación oral', 'Exposicións orais formais en galego: estrutura, recursos e técnicas.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura', '2º ESO', 'Comunicación oral', 'Debate en galego: argumentación e refutación.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lingua Galega e Literatura', '2º ESO', 'Comprensión lectora', 'Textos xornalísticos en galego: noticia, crónica, reportaxe.', ARRAY['CCL', 'CD']),
('Lingua Galega e Literatura', '2º ESO', 'Comprensión lectora', 'Análise crítica de textos argumentativos en galego.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '2º ESO', 'Produción escrita', 'Redacción de textos expositivos e argumentativos en galego.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '2º ESO', 'Produción escrita', 'Coherencia, cohesión e adecuación textual en galego.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º ESO', 'Reflexión sobre a lingua', 'Análise sintáctica en galego: oración simple completa.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º ESO', 'Reflexión sobre a lingua', 'Tipos de predicado en galego: nominal e verbal.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º ESO', 'Reflexión sobre a lingua', 'Clases de oracións segundo a natureza do predicado.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º ESO', 'Educación literaria', 'Literatura do Renacemento galego: Séculos Escuros e Rexurdimento.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '2º ESO', 'Educación literaria', 'O teatro galego: elementos e estrutura dramática.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '2º ESO', 'Educación literaria', 'A narración en galego: estrutura, personaxes, narrador.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '2º ESO', 'Patrimonio cultural', 'O patrimonio literario e cultural galego: análise e valoración crítica.', ARRAY['CCL', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.2E.1', 'Lingua Galega e Literatura', '2º ESO', 1, 'Realizar exposicións orais formais ben estruturadas en galego.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.2E.2', 'Lingua Galega e Literatura', '2º ESO', 2, 'Participar en debates argumentando e refutando en galego.', ARRAY['CCL', 'CPSAA', 'CC'], 'Evaluar'),
('CE.LG.2E.3', 'Lingua Galega e Literatura', '2º ESO', 3, 'Redactar textos expositivos e argumentativos coherentes en galego.', ARRAY['CCL', 'CPSAA'], 'Crear'),
('CE.LG.2E.4', 'Lingua Galega e Literatura', '2º ESO', 4, 'Realizar análise sintáctica completa de oracións simples en galego.', ARRAY['CCL'], 'Analizar'),
('CE.LG.2E.5', 'Lingua Galega e Literatura', '2º ESO', 5, 'Analizar textos xornalísticos e argumentativos en galego.', ARRAY['CCL', 'CD'], 'Analizar'),
('CE.LG.2E.6', 'Lingua Galega e Literatura', '2º ESO', 6, 'Coñecer o Rexurdimento e a literatura galega renacentista.', ARRAY['CCL', 'CCEC', 'CC'], 'Comprender'),
('CE.LG.2E.7', 'Lingua Galega e Literatura', '2º ESO', 7, 'Valorar criticamente o patrimonio cultural galego.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 2º ESO cargado correctamente' AS status;
