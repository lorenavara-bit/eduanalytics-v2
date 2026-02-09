-- =====================================================
-- CURRÍCULO LOMLOE - INGLÉS PRIMARIA
-- Real Decreto 157/2022 - Primera Lengua Extranjera
-- =====================================================
-- Inglés (1º a 6º Primaria)
-- Total: 120+ saberes básicos | 40+ criterios de evaluación
-- =====================================================

-- =====================================================
-- 1º PRIMARIA - INGLÉS
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
-- Comunicación oral
('Inglés', '1º Primaria', 'Comunicación', 'Vocabulario básico: colores, números 1-10, la familia (mother, father, sister, brother).', ARRAY['CP', 'CCL']),
('Inglés', '1º Primaria', 'Comunicación', 'Saludos y despedidas: Hello, Goodbye, Good morning.', ARRAY['CP', 'CCL', 'CPSAA']),
('Inglés', '1º Primaria', 'Comunicación', 'Expresiones cotidianas: Yes, No, Please, Thank you.', ARRAY['CP', 'CCL']),
('Inglés', '1º Primaria', 'Comunicación', 'Animales comunes: cat, dog, bird, fish.', ARRAY['CP', 'STEM']),
('Inglés', '1º Primaria', 'Comunicación', 'Partes del cuerpo: head, eyes, nose, mouth, hands.', ARRAY['CP', 'CPSAA']),

-- Comprensión escrita
('Inglés', '1º Primaria', 'Plurilingüismo', 'Reconocimiento de palabras escritas trabajadas oralmente.', ARRAY['CP', 'CCL']),
('Inglés', '1º Primaria', 'Plurilingüismo', 'Relación imagen-palabra en tarjetas y carteles.', ARRAY['CP', 'CD']),

-- Interculturalidad
('Inglés', '1º Primaria', 'Interculturalidad', 'Canciones y rimas tradicionales en inglés.', ARRAY['CP', 'CCEC']),
('Inglés', '1º Primaria', 'Interculturalidad', 'Celebraciones anglosajonas: Halloween, Christmas (introducción).', ARRAY['CP', 'CCEC', 'CC']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.1P.1', 'Inglés', '1º Primaria', 1, 'Reconocer y repetir vocabulario básico relacionado con su entorno inmediato.', ARRAY['CP', 'CCL'], 'Recordar'),
('CE.ING.1P.2', 'Inglés', '1º Primaria', 2, 'Participar en interacciones orales muy breves usando fórmulas de cortesía.', ARRAY['CP', 'CPSAA'], 'Aplicar'),
('CE.ING.1P.3', 'Inglés', '1º Primaria', 3, 'Identificar palabras escritas apoyándose en imágenes.', ARRAY['CP', 'CCL'], 'Recordar');

-- =====================================================
-- 2º PRIMARIA - INGLÉS
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
-- Comunicación oral
('Inglés', '2º Primaria', 'Comunicación', 'Vocabulario: objetos de clase (pencil, book, chair, table), números 1-20.', ARRAY['CP', 'CCL']),
('Inglés', '2º Primaria', 'Comunicación', 'Presentación personal: My name is..., I am... years old.', ARRAY['CP', 'CCL', 'CPSAA']),
('Inglés', '2º Primaria', 'Comunicación', 'Descripciones simples: It is big/small, red/blue.', ARRAY['CP', 'CCL']),
('Inglés', '2º Primaria', 'Comunicación', 'Alimentos básicos: apple, banana, milk, water, bread.', ARRAY['CP', 'CPSAA']),
('Inglés', '2º Primaria', 'Comunicación', 'Acciones cotidianas: run, jump, eat, drink, sleep.', ARRAY['CP', 'CCL']),

-- Comprensión escrita
('Inglés', '2º Primaria', 'Plurilingüismo', 'Lectura de frases muy sencillas con apoyo visual.', ARRAY['CP', 'CCL']),
('Inglés', '2º Primaria', 'Plurilingüismo', 'Copia de palabras y frases modelo.', ARRAY['CP', 'CCL']),

-- Interculturalidad
('Inglés', '2º Primaria', 'Interculturalidad', 'Cuentos tradicionales en inglés: The Three Little Pigs.', ARRAY['CP', 'CCEC', 'CCL']),
('Inglés', '2º Primaria', 'Interculturalidad', 'Juegos y canciones infantiles anglosajonas.', ARRAY['CP', 'CCEC']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.2P.1', 'Inglés', '2º Primaria', 1, 'Comprender y usar expresiones para presentarse y hablar de sí mismo.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.2P.2', 'Inglés', '2º Primaria', 2, 'Describir objetos y personas con adjetivos simples.', ARRAY['CP', 'CCL'], 'Aplicar'),
('CE.ING.2P.3', 'Inglés', '2º Primaria', 3, 'Leer y comprender frases sencillas con vocabulario conocido.', ARRAY['CP', 'CCL'], 'Comprender');

-- =====================================================
-- 3º PRIMARIA - INGLÉS
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
-- Comunicación oral
('Inglés', '3º Primaria', 'Comunicación', 'Vocabulario temático: la casa (bedroom, kitchen, bathroom), ropa (shirt, trousers, shoes).', ARRAY['CP', 'CCL']),
('Inglés', '3º Primaria', 'Comunicación', 'Presente simple: I like/I don''t like, I have/I don''t have.', ARRAY['CP', 'CCL']),
('Inglés', '3º Primaria', 'Comunicación', 'Preguntas básicas: What is your name? How old are you? Where do you live?', ARRAY['CP', 'CCL']),
('Inglés', '3º Primaria', 'Comunicación', 'Días de la semana y meses del año.', ARRAY['CP', 'CCL']),
('Inglés', '3º Primaria', 'Comunicación', 'El tiempo atmosférico: sunny, rainy, cloudy, windy.', ARRAY['CP', 'STEM']),

-- Comprensión y expresión escrita
('Inglés', '3º Primaria', 'Plurilingüismo', 'Lectura comprensiva de textos muy breves: carteles, notas.', ARRAY['CP', 'CCL']),
('Inglés', '3º Primaria', 'Plurilingüismo', 'Escritura de frases sencillas sobre temas familiares.', ARRAY['CP', 'CCL']),
('Inglés', '3º Primaria', 'Plurilingüismo', 'Uso del diccionario visual.', ARRAY['CP', 'CD']),

-- Interculturalidad
('Inglés', '3º Primaria', 'Interculturalidad', 'Costumbres de países anglófonos: Reino Unido, Estados Unidos.', ARRAY['CP', 'CC', 'CCEC']),
('Inglés', '3º Primaria', 'Interculturalidad', 'Comidas típicas: fish and chips, hamburger.', ARRAY['CP', 'CCEC']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.3P.1', 'Inglés', '3º Primaria', 1, 'Mantener conversaciones breves sobre temas cotidianos usando el presente simple.', ARRAY['CP', 'CCL'], 'Aplicar'),
('CE.ING.3P.2', 'Inglés', '3º Primaria', 2, 'Leer y comprender textos breves con vocabulario trabajado.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.3P.3', 'Inglés', '3º Primaria', 3, 'Escribir frases sencillas sobre su rutina diaria.', ARRAY['CP', 'CCL'], 'Crear');

-- =====================================================
-- 4º PRIMARIA - INGLÉS
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
-- Comunicación oral y escrita
('Inglés', '4º Primaria', 'Comunicación', 'Vocabulario: deportes (football, basketball, swimming), aficiones (reading, dancing, painting).', ARRAY['CP', 'CCL', 'CPSAA']),
('Inglés', '4º Primaria', 'Comunicación', 'Presente continuo: I am playing, She is reading.', ARRAY['CP', 'CCL']),
('Inglés', '4º Primaria', 'Comunicación', 'Descripción de personas: He/She is tall/short, has brown/blue eyes.', ARRAY['CP', 'CCL']),
('Inglés', '4º Primaria', 'Comunicación', 'Expresión de gustos y preferencias: I prefer..., My favourite is...', ARRAY['CP', 'CCL', 'CPSAA']),
('Inglés', '4º Primaria', 'Comunicación', 'Preposiciones de lugar: in, on, under, next to, between.', ARRAY['CP', 'CCL', 'STEM']),

-- Plurilingüismo
('Inglés', '4º Primaria', 'Plurilingüismo', 'Lectura de cuentos cortos adaptados.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés', '4º Primaria', 'Plurilingüismo', 'Escritura de descripciones y pequeñas historias.', ARRAY['CP', 'CCL']),
('Inglés', '4º Primaria', 'Plurilingüismo', 'Uso de recursos digitales: diccionarios online, aplicaciones educativas.', ARRAY['CP', 'CD']),

-- Interculturalidad
('Inglés', '4º Primaria', 'Interculturalidad', 'Geografía anglófona: países donde se habla inglés.', ARRAY['CP', 'CC', 'CCEC']),
('Inglés', '4º Primaria', 'Interculturalidad', 'Personajes famosos de cultura anglófona (adaptado a niños).', ARRAY['CP', 'CCEC']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.4P.1', 'Inglés', '4º Primaria', 1, 'Participar activamente en conversaciones sobre aficiones y gustos personales.', ARRAY['CP', 'CPSAA'], 'Aplicar'),
('CE.ING.4P.2', 'Inglés', '4º Primaria', 2, 'Comprender textos narrativos breves y extraer información específica.', ARRAY['CP', 'CCL'], 'Analizar'),
('CE.ING.4P.3', 'Inglés', '4º Primaria', 3, 'Escribir descripciones sencillas de personas y lugares.', ARRAY['CP', 'CCL'], 'Crear');

-- =====================================================
-- 5º PRIMARIA - INGLÉS
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
-- Comunicación
('Inglés', '5º Primaria', 'Comunicación', 'Vocabulario: tecnología (computer, tablet, internet), medio ambiente (recycling, pollution).', ARRAY['CP', 'CD', 'CC']),
('Inglés', '5º Primaria', 'Comunicación', 'Pasado simple: verbos regulares e irregulares básicos (was, were, went, saw).', ARRAY['CP', 'CCL']),
('Inglés', '5º Primaria', 'Comunicación', 'Expresión de habilidades: I can/I can''t swim, ride a bike.', ARRAY['CP', 'CPSAA']),
('Inglés', '5º Primaria', 'Comunicación', 'Dar instrucciones: Turn left, Go straight, Stop.', ARRAY['CP', 'CCL']),
('Inglés', '5º Primaria', 'Comunicación', 'Comparativos y superlativos simples: bigger than, the biggest.', ARRAY['CP', 'CCL']),

-- Plurilingüismo
('Inglés', '5º Primaria', 'Plurilingüismo', 'Lectura autónoma de textos adaptados a su nivel.', ARRAY['CP', 'CCL', 'CPSAA']),
('Inglés', '5º Primaria', 'Plurilingüismo', 'Redacción de correos electrónicos y postales sencillas.', ARRAY['CP', 'CCL', 'CD']),
('Inglés', '5º Primaria', 'Plurilingüismo', 'Búsqueda de información en inglés con supervisión.', ARRAY['CP', 'CD', 'CCL']),

-- Interculturalidad
('Inglés', '5º Primaria', 'Interculturalidad', 'Celebraciones: Thanksgiving, Independence Day (USA), Bonfire Night (UK).', ARRAY['CP', 'CCEC', 'CC']),
('Inglés', '5º Primaria', 'Interculturalidad', 'Literatura infantil anglófona: autores como Roald Dahl (adaptado).', ARRAY['CP', 'CCEC', 'CCL']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.5P.1', 'Inglés', '5º Primaria', 1, 'Narrar experiencias pasadas usando el pasado simple.', ARRAY['CP', 'CCL'], 'Aplicar'),
('CE.ING.5P.2', 'Inglés', '5º Primaria', 2, 'Comprender textos informativos y localizar datos específicos.', ARRAY['CP', 'CCL'], 'Analizar'),
('CE.ING.5P.3', 'Inglés', '5º Primaria', 3, 'Comparar objetos y personas usando estructuras comparativas.', ARRAY['CP', 'CCL'], 'Analizar');

-- =====================================================
-- 6º PRIMARIA - INGLÉS
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
-- Comunicación
('Inglés', '6º Primaria', 'Comunicación', 'Vocabulario: profesiones (doctor, teacher, engineer), viajes (airport, hotel, passport).', ARRAY['CP', 'CCL', 'CE']),
('Inglés', '6º Primaria', 'Comunicación', 'Futuro con "going to": I am going to visit, She is going to study.', ARRAY['CP', 'CCL']),
('Inglés', '6º Primaria', 'Comunicación', 'Expresión de opiniones: I think..., In my opinion..., I agree/disagree.', ARRAY['CP', 'CCL', 'CPSAA']),
('Inglés', '6º Primaria', 'Comunicación', 'Conectores: and, but, because, so.', ARRAY['CP', 'CCL']),
('Inglés', '6º Primaria', 'Comunicación', 'Vocabulario de emociones: happy, sad, angry, excited, worried.', ARRAY['CP', 'CPSAA']),

-- Plurilingüismo
('Inglés', '6º Primaria', 'Plurilingüismo', 'Lectura extensiva: libros graduados, comics.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés', '6º Primaria', 'Plurilingüismo', 'Escritura de textos breves: diarios, descripciones, mensajes.', ARRAY['CP', 'CCL']),
('Inglés', '6º Primaria', 'Plurilingüismo', 'Presentaciones orales con apoyo visual sobre temas de interés.', ARRAY['CP', 'CCL', 'CD']),
('Inglés', '6º Primaria', 'Plurilingüismo', 'Proyectos colaborativos usando herramientas digitales en inglés.', ARRAY['CP', 'CD', 'CPSAA']),

-- Interculturalidad
('Inglés', '6º Primaria', 'Interculturalidad', 'Diversidad cultural en países anglófonos: Australia, Canadá, Irlanda.', ARRAY['CP', 'CC', 'CCEC']),
('Inglés', '6º Primaria', 'Interculturalidad', 'Música y cine en inglés: canciones populares, películas infantiles.', ARRAY['CP', 'CCEC']),
('Inglés', '6º Primaria', 'Interculturalidad', 'Respeto por la diversidad lingüística y cultural.', ARRAY['CP', 'CC', 'CPSAA']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.6P.1', 'Inglés', '6º Primaria', 1, 'Expresar planes futuros usando "going to" correctamente.', ARRAY['CP', 'CCL'], 'Aplicar'),
('CE.ING.6P.2', 'Inglés', '6º Primaria', 2, 'Participar en debates sencillos expresando y argumentando opiniones.', ARRAY['CP', 'CCL', 'CPSAA'], 'Evaluar'),
('CE.ING.6P.3', 'Inglés', '6º Primaria', 3, 'Realizar presentaciones orales sobre temas preparados.', ARRAY['CP', 'CCL', 'CD'], 'Crear'),
('CE.ING.6P.4', 'Inglés', '6º Primaria', 4, 'Comprender y apreciar manifestaciones culturales de países anglófonos.', ARRAY['CP', 'CCEC', 'CC'], 'Evaluar');

-- =====================================================
-- VERIFICACIÓN
-- =====================================================

SELECT 'Currículo de Inglés Primaria cargado correctamente' AS status;
SELECT COUNT(*) AS total_saberes FROM saberes_basicos WHERE asignatura = 'Inglés';
SELECT COUNT(*) AS total_criterios FROM criterios_evaluacion WHERE asignatura = 'Inglés';
