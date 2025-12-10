-- =====================================================
-- CURRÍCULO GALLEGO - 1º PRIMARIA
-- Decreto 155/2022 de Galicia (Currículo Autonómico)
-- =====================================================
-- Lingua Galega e Literatura para niños de 6 años
-- Nivel inicial de competencia lingüística en gallego
-- Adaptado al contexto y cultura gallega
-- =====================================================

-- =====================================================
-- LINGUA GALEGA E LITERATURA - 1º PRIMARIA
-- =====================================================

-- Saberes Básicos de Lengua Gallega 1º
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lingua Galega e Literatura', '1º Primaria', 'As linguas e os seus falantes', 'Recoñecemento do galego como lingua propia de Galicia.', ARRAY['CCL', 'CP', 'CC']),
('Lingua Galega e Literatura', '1º Primaria', 'As linguas e os seus falantes', 'Identificación do galego no contorno familiar e escolar.', ARRAY['CCL', 'CP', 'CPSAA']),
('Lingua Galega e Literatura', '1º Primaria', 'Comunicación oral', 'Participación en conversacións en galego respectando o quenda de palabra.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '1º Primaria', 'Comunicación oral', 'Pronuncia e entoación básicas en lingua galega.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º Primaria', 'Comunicación oral', 'Comprensión de instrucións orais sinxelas en galego.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '1º Primaria', 'Comprensión lectora', 'Lectura de palabras e frases moi sinxelas en galego.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º Primaria', 'Comprensión lectora', 'Comprensión de textos moi breves en galego con apoio de imaxes.', ARRAY['CCL', 'CPSAA']),
('Lingua Galega e Literatura', '1º Primaria', 'Produción escrita', 'Escritura de letras, sílabas e palabras sinxelas en galego.', ARRAY['CCL', 'CD']),
('Lingua Galega e Literatura', '1º Primaria', 'Produción escrita', 'Caligrafía clara de letras en lingua galega.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º Primaria', 'Produción escrita', 'Separación correcta de palabras ao escribir en galego.', ARRAY['CCL']),
('Lingua Galega e Literatura', '1º Primaria', 'Educación literaria', 'Escoita de contos tradicionais galegos.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '1º Primaria', 'Educación literaria', 'Recitado de cantigas e poemas galegos infantís.', ARRAY['CCL', 'CCEC']),
('Lingua Galega e Literatura', '1º Primaria', 'Patrimonio cultural', 'Tradicións orais galegas: xogos, adiviñas e refráns sinxelos.', ARRAY['CCL', 'CCEC', 'CC']),
('Lingua Galega e Literatura', '1º Primaria', 'Patrimonio cultural', 'Festas galegas: Entroido, San Xoán, Magosto.', ARRAY['CCEC', 'CC']),
('Lingua Galega e Literatura', '1º Primaria', 'Vocabulario', 'Vocabulario básico galego: familia, colexio, animais, cores.', ARRAY['CCL', 'CP']),
('Lingua Galega e Literatura', '1º Primaria', 'Reflexión sobre a lingua', 'Iniciación ao alfabeto galego: letras especiais (ñ, til).', ARRAY['CCL'])
ON CONFLICT DO NOTHING;

-- Criterios de Evaluación de Lengua Gallega 1º
INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LG.1P.1', 'Lingua Galega e Literatura', '1º Primaria', 1, 'Recoñecer o galego como lingua propia de Galicia.', ARRAY['CCL', 'CP', 'CC'], 'Recordar'),
('CE.LG.1P.2', 'Lingua Galega e Literatura', '1º Primaria', 2, 'Participar en conversacións sinxelas en galego.', ARRAY['CCL', 'CPSAA'], 'Aplicar'),
('CE.LG.1P.3', 'Lingua Galega e Literatura', '1º Primaria', 3, 'Comprender instrucións orais básicas en galego.', ARRAY['CCL'], 'Comprender'),
('CE.LG.1P.4', 'Lingua Galega e Literatura', '1º Primaria', 4, 'Ler palabras e frases moi sinxelas en galego.', ARRAY['CCL'], 'Recordar'),
('CE.LG.1P.5', 'Lingua Galega e Literatura', '1º Primaria', 5, 'Escribir letras e palabras sinxelas en galego con caligrafía clara.', ARRAY['CCL'], 'Aplicar'),
('CE.LG.1P.6', 'Lingua Galega e Literatura', '1º Primaria', 6, 'Escoitar e gozar de contos e cantigas galegas.', ARRAY['CCL', 'CCEC'], 'Comprender'),
('CE.LG.1P.7', 'Lingua Galega e Literatura', '1º Primaria', 7, 'Valorar o patrimonio cultural galego.', ARRAY['CCL', 'CCEC', 'CC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- VOCABULARIO BÁSICO RECOMENDADO PARA 1º PRIMARIA
-- =====================================================

-- FAMILIA E CASA:
-- nai, pai, avó, avoa, irmán, irmá, casa, cuarto, cociña, baño

-- COLEXIO:
-- mestra, mestro, compañeiro, lápis, goma, caderno, pupitre, aula

-- ANIMAIS:
-- can, gato, vaca, cabalo, ovellla, porco, paxaro, peixe

-- CORES:
-- vermello, azul, amarelo, verde, branco, negro, laranxa, rosa

-- NÚMEROS 1-10:
-- un, dous, tres, catro, cinco, seis, sete, oito, nove, dez

-- NATUREZA:
-- árbore, flor, herbá, sol, lúa, estrela, río, praia, monte

-- COMIDA:
-- pan, leite, auga, mazá, plátano, peixe, carne, queixo

-- =====================================================
-- CONTOS TRADICIONAIS GALEGOS RECOMENDADOS
-- =====================================================

-- Para leer/contar en 1º Primaria:
-- - "O Apalpador" (figura tradicional gallega)
-- - "A véspera de Reis" (Cabalgata de Reyes en Galicia)
-- - "O lobo e o carneiro" (fábula gallega)
-- - "A castañeira" (sobre el Magosto)
-- - Leyendas de meigas (adaptadas para niños)

-- =====================================================
-- CANTIGAS POPULARES GALEGAS PARA 1º
-- =====================================================

-- Canciones infantiles tradicionales:
-- - "Pimpín Sarabín" (canción de cuna)
-- - "Ay, Maripucha" (canción infantil)
-- - "A Carolina" (canción de juego)
-- - "O meu cuquillán" (muy popular en Galicia)
-- - "Unha noite na eira do trigo"

-- =====================================================
-- FESTIVIDADES GALLEGAS PARA TRABAJAR EN 1º
-- =====================================================

-- Entroido (Carnaval gallego):
-- - Disfraces típicos
-- - Tradiciones del Entroido
-- - Comidas típicas (filloas, orejas)

-- Magosto (11 noviembre):
-- - Castañas asadas
-- - Fogata tradicional
-- - Canciones del Magosto

-- San Xoán (23-24 junio):
-- - Fogueiras de San Xoán
-- - Saltar la hoguera (tradición)
-- - La noche más corta

-- Día das Letras Galegas (17 mayo):
-- - Homenaje a escritores gallegos
-- - Actividades culturales

-- =====================================================
-- AUTORES GALLEGOS PARA INFANTIL/1º PRIMARIA
-- =====================================================

-- Literatura infantil gallega apropiada para 6 años:
-- - Xosé Cermeño (cuentos infantiles)
-- - Marina Mayoral (adaptaciones infantiles)
-- - Fina Casalderrey (literatura juvenil, cuentos simples)
-- - Antonio García Teijeiro (poemas para niños)

-- =====================================================
-- DIFERENCIAS ORTOGRÁFICAS GALEGO-CASTELLANO
-- =====================================================

-- Para que la IA las respete al generar contenido:
-- 
-- Letras especiales en gallego:
-- - Ñ (igual que castellano): "niño" = "neno" 
-- - NH (nh gallega): "unha", "teña", "miña"
-- - LL (diferente del castellano): "fillo", "olla", "amarelo"
-- - Til (~) en vocales: "avión", "canción", "razón"
-- 
-- NO usar en gallego:
-- - Ü (no existe en gallego)
-- - Z al final de palabras (raro en gallego)
-- 
-- Palabras comunes diferentes:
-- - Castellano | Gallego
-- - niño       | neno
-- - casa       | casa (igual)
-- - escuela    | escola
-- - madre      | nai
-- - padre      | pai
-- - hermano    | irmán
-- - agua       | auga
-- - libro      | libro (igual)

-- =====================================================
-- NOTAS PARA LA IA AL GENERAR CONTENIDO EN GALLEGO
-- =====================================================

-- Cuando se generen fichas de Lingua Galega 1º Primaria:
-- 
-- 1. Usar vocabulario MUY SIMPLE (nivel 6 años)
-- 2. Frases cortas (máximo 5-6 palabras)
-- 3. Respetar ortografía gallega (nh, til, ll)
-- 4. Incluir referencias culturales gallegas apropiadas
-- 5. Ejemplos con entorno gallego: playa (praia), monte, río (río)
-- 6. Comidas gallegas: pulpo, empanada, filloas
-- 7. Animales del entorno: vaca (vaca), oveja (ovella), caballo (cabalo)
-- 8. Topónimos reales: Santiago, A Coruña, Vigo, Ourense, Lugo, Pontevedra
-- 
-- Ejemplo de pregunta bien adaptada:
-- "Cantos dedos ten unha man?" (¿Cuántos dedos tiene una mano?)
-- Opciones: Tres, Cinco, Sete, Dez
-- Respuesta: Cinco
-- 
-- Feedback en gallego: "Moi ben! Unha man ten cinco dedos."

-- =====================================================
-- RESUMEN
-- =====================================================

-- LINGUA GALEGA 1º PRIMARIA:
-- - 16 saberes básicos
-- - 7 criterios de evaluación
-- - Adaptado a 6 años
-- - Enfoque: oral > escrito (al principio del curso)
-- - Integración cultural gallega
-- - Vocabulario básico del entorno

-- Este currículo complementa el de Lengua Castellana
-- Niños gallegos estudian ambas lenguas simultáneamente
-- Importante: Respeto y valoración del bilingüismo

SELECT 'Currículo de Lingua Galega para 1º Primaria cargado correctamente' AS status;
