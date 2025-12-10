-- =====================================================
-- CURRÍCULO GALLEGO - 1º BACHILLERATO
-- Decreto 155/2022 de Galicia (Bachillerato)
-- =====================================================
-- Lingua Galega para 1º Bachillerato (16-17 años)
-- Preparación para universidad
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura I', '1º Bachillerato', 'As linguas e os seus falantes', 'Análise sociolingüística de Galicia: história e presente.', ARRAY['CCL', 'CP', 'CC', 'CPSAA']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'As linguas e os seus falantes', 'Bilingüismo e diglosia: implicacións sociais e culturais.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Comunicación', 'Textos académicos en galego: comentario de texto, ensaio, monografía.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Comunicación', 'Argumentación en galego: técnicas, falacias, estrutura argumentativa.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Reflexión sobre a lingua', 'Sintaxe en galego: análise de oracións compostas e complexas.', ARRAY['CCL']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Reflexión sobre a lingua', 'Morfoloxía galega: formación de palabras, derivación e composición.', ARRAY['CCL']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Reflexión sobre a lingua', 'Semántica galega: relacións semánticas, denotación e connotación.', ARRAY['CCL']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Literatura', 'Literatura medieval galega: lírica profana e relixiosa, prosa.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Literatura', 'Os Séculos Escuros: contexto histórico e perda literaria.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Literatura', 'O Rexurdimento: Rosalía de Castro, Curros Enríquez, Pondal.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Literatura', 'As Irmandades da Fala e o Grupo Nós: Castelao, Risco.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Literatura', 'Literatura galega contemporánea: xeracións poéticas e narrativa.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura I', '1º Bachillerato', 'Lectura', 'Lectura autónoma: obras representativas da literatura galega.', ARRAY['CCL', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.1B.1', 'Lingua Galega e Literatura I', '1º Bachillerato', 1, 'Producir textos académicos rigorosos e ben estruturados en galego.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.1B.2', 'Lingua Galega e Literatura I', '1º Bachillerato', 2, 'Argumentar de forma sólida e coherente en galego.', ARRAY['CCL', 'CPSAA'], 'Evaluar'),
('CE.LG.1B.3', 'Lingua Galega e Literatura I', '1º Bachillerato', 3, 'Realizar análise sintáctica completa de textos complexos en galego.', ARRAY['CCL'], 'Analizar'),
('CE.LG.1B.4', 'Lingua Galega e Literatura I', '1º Bachillerato', 4, 'Analizar obras literarias galegas no seu contexto histórico e cultural.', ARRAY['CCL', 'CCEC', 'CC'], 'Analizar'),
('CE.LG.1B.5', 'Lingua Galega e Literatura I', '1º Bachillerato', 5, 'Comentar textos literarios galegos aplicando técnicas adecuadas.', ARRAY['CCL', 'CCEC'], 'Evaluar'),
('CE.LG.1B.6', 'Lingua Galega e Literatura I', '1º Bachillerato', 6, 'Coñecer a evolución da literatura galega desde a Idade Media ao Rexurdimento.', ARRAY['CCL', 'CCEC', 'CC'], 'Comprender'),
('CE.LG.1B.7', 'Lingua Galega e Literatura I', '1º Bachillerato', 7, 'Valorar criticamente a situación sociolingüística galega.', ARRAY['CCL', 'CP', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 1º Bachillerato cargado correctamente' AS status;
