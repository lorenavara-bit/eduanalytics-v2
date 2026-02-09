-- ==============================================================================
-- PIVOT HACIA SUSTENTABILIDAD (V4 - ULTRA CONSERVADOR)
-- USAMOS 'GUIA' Y 'GENERAL' PARA EVITAR TODOS LOS ERRORES DE CONSTRAINT
-- ==============================================================================

-- 1. MODIFICACIÓN DE SCHEMA (Columnas de contenido)
DO $$ 
BEGIN 
    -- Columna para el contenido teórico
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'recursos_socioemocionales' AND column_name = 'contenido_teorico') THEN
        ALTER TABLE public.recursos_socioemocionales ADD COLUMN contenido_teorico TEXT;
    END IF;

    -- Columna para los pasos prácticos
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'recursos_socioemocionales' AND column_name = 'pasos_practicos') THEN
        ALTER TABLE public.recursos_socioemocionales ADD COLUMN pasos_practicos TEXT[];
    END IF;

    -- Columna para el Prompt de la IA
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'recursos_socioemocionales' AND column_name = 'prompt_ia') THEN
        ALTER TABLE public.recursos_socioemocionales ADD COLUMN prompt_ia TEXT;
    END IF;
END $$;

-- 2. LIMPIEZA
TRUNCATE TABLE public.recursos_socioemocionales;

-- 3. INSERCIÓN
-- NOTA: Usamos 'GUIA' en tipo y 'GENERAL' en categoría para asegurar compatibilidad.
--       La diferenciación real se hará mediante los TAGS ('METODOLOGIA', 'CRITICO', 'EMOCIONAL').

INSERT INTO public.recursos_socioemocionales 
(titulo, descripcion, tipo_recurso, categoria_emocional, nivel_educativo, fuente_origen, tags, contenido_teorico, pasos_practicos, prompt_ia) 
VALUES

-- TÉCNICAS DE ESTUDIO (Tag: METODOLOGIA)
(
    'Método Feynman', 
    'Aprende enseñando. La mejor forma de entender algo es explicarlo de forma simple.', 
    'GUIA', 
    'GENERAL', 
    'GENERAL', 
    'EduAnalytics DB', 
    ARRAY['METODOLOGIA', 'comprension', 'memoria', 'explicacion'],
    'El Método Feynman se basa en la idea de que si no puedes explicar algo de forma sencilla, no lo entiendes lo suficientemente bien.',
    ARRAY[
        'Escribe el nombre del concepto.', 
        'Explica el concepto como si enseñaras a un niño.', 
        'Identifica tus lagunas.', 
        'Simplifica y usa analogías.'
    ],
    'Actúa como tutor experto. Genera un ejemplo de cómo aplicar el "Paso 2" del Método Feynman para explicar el tema "{tema_usuario}" de forma extremadamente sencilla, usando una analogía cotidiana.'
),
(
    'Active Recall', 
    'La técnica de estudio más eficiente: evaluarte a ti mismo.', 
    'GUIA', 
    'GENERAL', 
    'SECUNDARIA', 
    'EduAnalytics DB', 
    ARRAY['METODOLOGIA', 'memoria', 'eficiencia', 'examen'],
    'El Active Recall consiste en recuperar información de tu cerebro activamente en lugar de revisarla pasivamente.',
    ARRAY[
        'Cierra el libro.', 
        'Escribe todo lo que recuerdes.', 
        'Comprueba errores.', 
        'Repite centrándote en fallos.'
    ],
    'Crea un mini-quiz de 3 preguntas de "Active Recall" sobre el tema "{tema_usuario}".'
),
(
    'Técnica Pomodoro', 
    'Gestión del tiempo para evitar la fatiga mental.', 
    'GUIA', 
    'GENERAL', 
    'GENERAL', 
    'EduAnalytics DB', 
    ARRAY['METODOLOGIA', 'tiempo', 'concentracion'],
    'Usa bloques de tiempo fijo (25 min) y descansos cortos para mantener la frescura.',
    ARRAY[
        'Elige tarea.', 
        'Pon cronómetro 25 min.', 
        'Trabaja sin parar.', 
        'Descansa 5 min.'
    ],
    'Diseña un "Plan de Batalla Pomodoro" para estudiar "{tema_usuario}".'
),
(
    'Mapas Mentales', 
    'Visualización de conexiones para organizar ideas.', 
    'GUIA', 
    'GENERAL', 
    'PRIMARIA', 
    'EduAnalytics DB', 
    ARRAY['METODOLOGIA', 'visual', 'creatividad'],
    'Diagrama que conecta información alrededor de un tema central, imitando al cerebro.',
    ARRAY[
        'Tema en el centro.', 
        'Ramas gruesas para ideas principales.', 
        'Ramas finas para detalles.', 
        'Usa colores y dibujos.'
    ],
    'Sugiere la estructura de un Mapa Mental para el tema "{tema_usuario}".'
),
(
    'Método EPL2R', 
    'Lectura comprensiva profunda.', 
    'GUIA', 
    'GENERAL', 
    'SECUNDARIA', 
    'EduAnalytics DB', 
    ARRAY['METODOLOGIA', 'lectura', 'analisis'],
    'Sistematiza la lectura para procesar significados profundos.',
    ARRAY[
        'Explorar (títulos).', 
        'Preguntar (convertir títulos a dudas).', 
        'Leer (buscar respuestas).', 
        'Recitar y Repasar.'
    ],
    'Genera 5 preguntas clave (fase Preguntar) para el tema "{tema_usuario}".'
),

-- PENSAMIENTO CRÍTICO (Tag: CRITICO)
(
    'Detector de Falacias', 
    'Identifica argumentos engañosos.', 
    'GUIA', 
    'GENERAL', -- Cambiado de CRITICO a GENERAL
    'SECUNDARIA', 
    'EduAnalytics DB', 
    ARRAY['CRITICO', 'logica', 'verdad'],
    'Una falacia es un error de razonamiento que invalida un argumento.',
    ARRAY[
        'Ad Hominem (ataque personal).', 
        'Hombre de Paja (exageración).', 
        'Falso Dilema (solo 2 opciones).', 
        'Post Hoc (falsa causalidad).'
    ],
    'Escribe un diálogo donde un personaje use una "Falacia de Hombre de Paja" sobre "{tema_usuario}" y explica el error.'
),
(
    '6 Sombreros para Pensar', 
    'Analiza desde todas las perspectivas.', 
    'GUIA', 
    'GENERAL', 
    'GENERAL', 
    'EduAnalytics DB', 
    ARRAY['CRITICO', 'creatividad', 'analisis'],
    'Separa el pensamiento en modos distintos (emoción, datos, riesgo).',
    ARRAY[
        'Blanco: Datos.', 
        'Rojo: Emoción.', 
        'Negro: Riesgos.', 
        'Amarillo: Beneficios.', 
        'Verde: Creatividad.', 
        'Azul: Control.'
    ],
    'Aplica el Sombrero Negro y Amarillo al tema "{tema_usuario}".'
),
(
    'Fake News (Fuentes)', 
    'Verifica la fiabilidad online.', 
    'GUIA', 
    'GENERAL', 
    'GENERAL', 
    'EduAnalytics DB', 
    ARRAY['CRITICO', 'internet', 'verdad'],
    'Alfabetización informacional para distinguir verdad de manipulación.',
    ARRAY[
        'Autoría (¿Quién?).', 
        'Propósito (¿Vender?).', 
        'Actualidad (¿Fecha?).', 
        'Evidencia (¿Pruebas?).'
    ],
    'Simula un artículo falso sobre "{tema_usuario}" y genera 3 preguntas para desmentirlo.'
),

-- INTELIGENCIA EMOCIONAL (Tag: EMOCIONAL)
(
    'Comunicación Asertiva', 
    'Expresa necesidades sin agredir.', 
    'GUIA', 
    'GENERAL', -- Cambiado de EMOCIONAL a GENERAL
    'GENERAL', 
    'EduAnalytics DB', 
    ARRAY['EMOCIONAL', 'comunicacion', 'respeto'],
    'Punto medio entre pasividad y agresividad. Habla desde el "Yo".',
    ARRAY[
        'Hechos objetivos.', 
        'Sentimientos (Me siento...).', 
        'Necesidad (Me gustaría...).', 
        'Sin culpar.'
    ],
    'Genera un guion de respuesta asertiva para un conflicto sobre "{tema_usuario}".'
),
(
    'Growth Mindset', 
    'El poder del "Todavía".', 
    'GUIA', 
    'GENERAL', 
    'PRIMARIA', 
    'EduAnalytics DB', 
    ARRAY['EMOCIONAL', 'resiliencia', 'actitud'],
    'La inteligencia se desarrolla. El error es parte del proceso.',
    ARRAY[
        'Detecta voz fija ("No sirvo").', 
        'Añade "AÚN".', 
        'Enfócate en el esfuerzo.', 
        'Busca nueva estrategia.'
    ],
    'Transforma 3 frases negativas sobre "{tema_usuario}" en frases de Crecimiento.'
);
