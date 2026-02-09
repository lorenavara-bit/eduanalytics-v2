-- =====================================================
-- CURRÍCULO GALLEGO - 4º PRIMARIA
-- Decreto 155/2022 de Galicia (Currículo Autonómico)
-- =====================================================
-- Asignatura específica de Galicia
-- Basado en el decreto de la Xunta de Galicia
-- =====================================================

-- =====================================================
-- LENGUA GALLEGA - 4º PRIMARIA
-- =====================================================

-- Saberes Básicos de Lengua Gallega
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '4º Primaria', 'As linguas e os seus falantes', 'Recoñecemento da diversidade lingüística de Galicia e valoración positiva da lingua galega.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '4º Primaria', 'As linguas e os seus falantes', 'Aproximación á biografía lingüística persoal propia e familiar.', ARRAY['CCL', 'CP', 'CPSAA']),
('Lingua Galega e Literatura', '4º Primaria', 'Comunicación oral', 'Producción oral en lingua galega: pronuncia, entoación e xestión do tempo.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '4º Primaria', 'Comunicación oral', 'Comprensión oral: identificación das ideas principais e secundarias de textos orais en galego.', ARRAY['CCL']),
('Lingua Galega e Literatura', '4º Primaria', 'Comprensión lectora', 'Lectura de textos narrativos, descritivos e informativos en galego: identificación da idea principal.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '4º Primaria', 'Comprensión lectora', 'Estratexias para mellorar a fluidez lectora e a comprensión en lingua galega.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '4º Primaria', 'Produción escrita', 'Elaboración de textos escritos en galego con coherencia, cohesión e adecuación.', ARRAY['CCL', 'CD']),
('Lingua Galega e Literatura', '4º Primaria', 'Produción escrita', 'Uso das regras ortográficas básicas da lingua galega: til, coma, punto e maiúsculas.', ARRAY['CCL']),
('Lingua Galega e Literatura', '4º Primaria', 'Educación literaria', 'Lectura autónoma e guiada de textos literarios galegos: contos, poemas, teatro.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '4º Primaria', 'Educación literaria', 'Autores e autoras representativas da literatura galega infantil.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '4º Primaria', 'Reflexión sobre a lingua', 'Clases de palabras en galego: substantivos, adxectivos, verbos, determinantes.', ARRAY['CCL']),
('Lingua Galega e Literatura', '4º Primaria', 'Reflexión sobre a lingua', 'A oración simple en galego: suxeito e predicado.', ARRAY['CCL']),
('Lingua Galega e Literatura', '4º Primaria', 'Patrimonio cultural', 'Tradicións orais galegas: contos populares, refráns, adiviñas.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '4º Primaria', 'Patrimonio cultural', 'Festas e celebracións tradicionais de Galicia.', ARRAY['CCEC', 'CC'])
ON CONFLICT DO NOTHING;

-- Criterios de Evaluación de Lengua Gallega
INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.4P.1', 'Lingua Galega e Literatura', '4º Primaria', 1, 'Recoñecer a diversidade lingüística de Galicia a partir da identificación das linguas do contorno.', ARRAY['CCL', 'CP', 'CC'], 'Recordar'),
('CE.LG.4P.2', 'Lingua Galega e Literatura', '4º Primaria', 2, 'Comprender o sentido de textos orais en galego identificando as ideas principais e secundarias.', ARRAY['CCL'], 'Comprender'),
('CE.LG.4P.3', 'Lingua Galega e Literatura', '4º Primaria', 3, 'Producir textos orais en galego con pronuncia, entoación e ritmo adecuados.', ARRAY['CCL', 'CPSAA'], 'Aplicar'),
('CE.LG.4P.4', 'Lingua Galega e Literatura', '4º Primaria', 4, 'Comprender textos escritos en galego identificando a idea principal e os datos relevantes.', ARRAY['CCL'], 'Comprender'),
('CE.LG.4P.5', 'Lingua Galega e Literatura', '4º Primaria', 5, 'Producir textos escritos en galego creativos e académicos aplicando normas ortográficas.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LG.4P.6', 'Lingua Galega e Literatura', '4º Primaria', 6, 'Ler de maneira autónoma textos literarios galegos adecuados á idade e intereses.', ARRAY['CCL', 'CCEC'], 'Aplicar'),
('CE.LG.4P.7', 'Lingua Galega e Literatura', '4º Primaria', 7, 'Identificar as clases de palabras e a estrutura básica da oración en galego.', ARRAY['CCL'], 'Comprender'),
('CE.LG.4P.8', 'Lingua Galega e Literatura', '4º Primaria', 8, 'Valorar o patrimonio cultural e literario de Galicia.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- NOTAS IMPORTANTES
-- =====================================================

-- Este currículo está basado en el Decreto 155/2022 de la Xunta de Galicia
-- Lengua Gallega es asignatura obligatoria en todos los centros de Galicia
-- Los contenidos están adaptados específicamente al contexto gallego

-- Para estudiantes de Galicia, la app generará contenido en:
-- - Castellano (Lengua Castellana y Literatura)
-- - Gallego (Lingua Galega e Literatura)

-- La IA debe:
-- 1. Respetar la ortografía gallega (til, nh, ll gallega, etc.)
-- 2. Usar vocabulario apropiado en gallego
-- 3. Incluir referencias culturales gallegas (autores, tradiciones)
-- 4. Adaptar ejemplos al contexto gallego (topónimos, realidad social)

-- Autores gallegos recomendados para 4º Primaria:
-- - Xosé Neira Vilas (Memorias dun neno labrego)
-- - Manuel Rivas
-- - Fina Casalderrey
-- - Agustín Fernández Paz

SELECT 'Currículo de Lingua Galega para 4º Primaria cargado correctamente' AS status;
