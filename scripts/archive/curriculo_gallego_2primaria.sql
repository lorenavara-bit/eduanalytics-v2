-- =====================================================
-- CURRÍCULO GALLEGO - 2º PRIMARIA
-- Decreto 155/2022 de Galicia
-- =====================================================
-- Lingua Galega para niños de 7 años
-- Nivel progresivo respecto a 1º Primaria
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '2º Primaria', 'As linguas e os seus falantes', 'Uso do galego en diferentes contextos: familia, escola, amigos.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '2º Primaria', 'As linguas e os seus falantes', 'Valoración positiva da diversidade lingüística de Galicia.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '2º Primaria', 'Comunicación oral', 'Narración de experiencias persoais en galego de xeito ordenado.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '2º Primaria', 'Comunicación oral', 'Descrición oral de persoas, animais e obxectos en galego.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '2º Primaria', 'Comunicación oral', 'Expresión oral con vocabulario galego apropiado.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º Primaria', 'Comprensión lectora', 'Lectura de textos narrativos sinxelos en galego con fluidez.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º Primaria', 'Comprensión lectora', 'Comprensión de textos informativos breves en galego.', ARRAY['CCL', 'CD']),
('Lingua Galega e Literatura', '2º Primaria', 'Comprensión lectora', 'Identificación de personaxes, lugares e accións en contos galegos.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '2º Primaria', 'Produción escrita', 'Redacción de frases e textos moi breves en galego con coherencia.', ARRAY['CCL', 'CD']),
('Lingua Galega e Literatura', '2º Primaria', 'Produción escrita', 'Ortografía galega básica: uso de til, maiúsculas, punto e coma.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º Primaria', 'Produción escrita', 'Caligrafía clara ao escribir en galego.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º Primaria', 'Educación literaria', 'Lectura e gozo de contos tradicionais galegos.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '2º Primaria', 'Educación literaria', 'Recitado de poemas galegos infantís con expresividade.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '2º Primaria', 'Reflexión sobre a lingua', 'O nome en galego: común e propio.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º Primaria', 'Reflexión sobre a lingua', 'O xénero e o número en galego: masculino, feminino, singular, plural.', ARRAY['CCL']),
('Lingua Galega e Literatura', '2º Primaria', 'Patrimonio cultural', 'Tradicións galegas: xogos populares, cantigas, festas.', ARRAY['CCL', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.2P.1', 'Lingua Galega e Literatura', '2º Primaria', 1, 'Usar o galego en diferentes contextos comunicativos.', ARRAY['CCL', 'CP'], 'Aplicar'),
('CE.LG.2P.2', 'Lingua Galega e Literatura', '2º Primaria', 2, 'Ler en voz alta textos en galego con entoación adecuada.', ARRAY['CCL'], 'Aplicar'),
('CE.LG.2P.3', 'Lingua Galega e Literatura', '2º Primaria', 3, 'Comprender o sentido global de textos narrativos sinxelos en galego.', ARRAY['CCL'], 'Comprender'),
('CE.LG.2P.4', 'Lingua Galega e Literatura', '2º Primaria', 4, 'Escribir textos breves en galego con corrección ortográfica básica.', ARRAY['CCL'], 'Aplicar'),
('CE.LG.2P.5', 'Lingua Galega e Literatura', '2º Primaria', 5, 'Identificar nomes comúns e propios en galego.', ARRAY['CCL'], 'Comprender'),
('CE.LG.2P.6', 'Lingua Galega e Literatura', '2º Primaria', 6, 'Gozar da lectura de contos e poemas galegos.', ARRAY['CCL', 'CCEC'], 'Evaluar'),
('CE.LG.2P.7', 'Lingua Galega e Literatura', '2º Primaria', 7, 'Valorar o patrimonio cultural e lingüístico de Galicia.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

SELECT 'Currículo de Lingua Galega para 2º Primaria cargado correctamente' AS status;
