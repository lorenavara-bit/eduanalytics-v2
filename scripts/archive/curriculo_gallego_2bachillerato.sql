-- =====================================================
-- CURRÍCULO GALLEGO - 2º BACHILLERATO
-- Decreto 155/2022 de Galicia (Bachillerato)
-- =====================================================
-- Lingua Galega para 2º Bachillerato (17-18 años)
-- Último curso - Preparación universidad
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura II', '2º Bachillerato', 'As linguas e os seus falantes', 'Planificación lingüística e normalización do galego.', ARRAY['CCL', 'CP', 'CC', 'CPSAA']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'As linguas e os seus falantes', 'O galego no mundo: emigración e diáspora galega.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Comunicación', 'Comentario de texto en galego: técnicas de análise e síntese.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Comunicación', 'Textos académicos e científicos en galego.', ARRAY['CCL', 'CD', 'CMCT']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Reflexión sobre a lingua', 'Morfosintaxe galega: análise completa de estruturas complexas.', ARRAY['CCL']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Reflexión sobre a lingua', 'Variedades do galego: dialectos, rexistros, evolución.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Literatura', 'Literatura galega do século XX: Nós, vanguardas.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Literatura', 'Posguerra: xeración de Galaxia, nova narrativa galega.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Literatura', 'Poesía galega contemporánea: Celso Emilio Ferreiro, poetas da promoción dos 80.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Literatura', 'Narrativa galega actual: Manuel Rivas, Suso de Toro, Agustín Fernández Paz.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Literatura', 'Teatro galego: desde Castelao á actualidade.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Literatura', 'Tendencias actuais da literatura galega.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura II', '2º Bachillerato', 'Lectura', 'Lectura autónoma: obras representativas da literatura galega contemporánea.', ARRAY['CCL', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.2B.1', 'Lingua Galega e Literatura II', '2º Bachillerato', 1, 'Realizar comentarios de texto rigorosos e ben fundamentados en galego.', ARRAY['CCL', 'CPSAA'], 'Evaluar'),
('CE.LG.2B.2', 'Lingua Galega e Literatura II', '2º Bachillerato', 2, 'Producir textos argumentativos de alta calidade en galego.', ARRAY['CCL', 'CPSAA'], 'Crear'),
('CE.LG.2B.3', 'Lingua Galega e Literatura II', '2º Bachillerato', 3, 'Analizar morfosintacticamente estruturas complexas en galego.', ARRAY['CCL'], 'Analizar'),
('CE.LG.2B.4', 'Lingua Galega e Literatura II', '2º Bachillerato', 4, 'Recoñecer variedades do galego e a súa evolución.', ARRAY['CCL', 'CP'], 'Comprender'),
('CE.LG.2B.5', 'Lingua Galega e Literatura II', '2º Bachillerato', 5, 'Analizar obras literarias galegas do século XX.', ARRAY['CCL', 'CCEC', 'CC'], 'Analizar'),
('CE.LG.2B.6', 'Lingua Galega e Literatura II', '2º Bachillerato', 6, 'Contextualizar movementos literarios galegos na súa época.', ARRAY['CCL', 'CCEC', 'CC'], 'Comprender'),
('CE.LG.2B.7', 'Lingua Galega e Literatura II', '2º Bachillerato', 7, 'Valorar criticamente a literatura galega contemporánea.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 2º Bachillerato cargado correctamente' AS status;
