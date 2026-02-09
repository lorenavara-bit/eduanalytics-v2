-- Tabla específica para recursos socioemocionales estáticos y de alta calidad
CREATE TABLE IF NOT EXISTS public.recursos_socioemocionales (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    tipo_recurso TEXT NOT NULL CHECK (tipo_recurso IN ('PDF', 'ACTIVIDAD', 'VIDEO', 'ARTICULO', 'GUIA')),
    categoria_emocional TEXT NOT NULL CHECK (categoria_emocional IN ('EMPATIA', 'MINDFULNESS', 'REGULACION_EMOCIONAL', 'HABLIDADES_SOCIALES', 'AUTOCONOCIMIENTO', 'GENERAL')),
    nivel_educativo TEXT DEFAULT 'PRIMARIA', -- PRIMARIA, SECUNDARIA, GENERAL
    url_acceso TEXT, -- Enlace al PDF o web externa
    fuente_origen TEXT, -- VOCA, Averroes, Universidad de Oviedo, etc.
    tags TEXT[], -- ['disruptivo', 'cine', 'cuentos']
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Políticas RLS (Lectura pública, Escritura solo admin)
ALTER TABLE public.recursos_socioemocionales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de recursos emocionales" 
ON public.recursos_socioemocionales FOR SELECT 
USING (true);

-- Insertar los 10 recursos proporcionados por el usuario
INSERT INTO public.recursos_socioemocionales (titulo, descripcion, tipo_recurso, categoria_emocional, nivel_educativo, url_acceso, fuente_origen, tags) VALUES
-- 1. Empatía VOCA
(
    '10 actividades para trabajar la empatía en primaria', 
    'Recopilación práctica de dinámicas de grupo para fomentar la empatía en el aula.', 
    'ARTICULO', 
    'EMPATIA', 
    'PRIMARIA', 
    'https://www.vocaeditorial.com', 
    'VOCA Editorial', 
    ARRAY['dinamicas', 'grupo', 'empatia']
),
-- 2. Primaria Alta
(
    'Actividades para trabajar Educación Emocional', 
    'Enfoque específico para alumnos de Primaria Alta (4º-6º), tratando temas de pre-adolescencia.', 
    'GUIA', 
    'AUTOCONOCIMIENTO', 
    'PRIMARIA', 
    NULL, 
    'Recurso Educativo', 
    ARRAY['primaria-alta', 'autoconocimiento']
),
-- 3. Educacion 3.0
(
    'Actividades y recursos descargables gratuitos para trabajar las emociones', 
    'Banco de recursos digitales y fichas imprimibles para identificación emocional.', 
    'ARTICULO', 
    'GENERAL', 
    'PRIMARIA', 
    'https://www.educaciontrespuntocero.com', 
    'Educación 3.0', 
    ARRAY['descargable', 'gratis', 'fichas']
),
-- 4. Blog Averroes
(
    'Cuadernillo Rebeldes Emocionales', 
    'Material didáctico completo en PDF para trabajar la rebeldía y gestión de ira.', 
    'PDF', 
    'REGULACION_EMOCIONAL', 
    'PRIMARIA', 
    'https://blogsaverroes.juntadeandalucia.es', 
    'Blog Averroes', 
    ARRAY['pdf', 'ira', 'conducta']
),
-- 5. Socioemocional Estudiantes
(
    'Cuadernillo de actividades de aprendizaje socioemocional', 
    'Guía estructurada paso a paso para el desarrollo de competencias SEL (Social Emotional Learning).', 
    'PDF', 
    'HABLIDADES_SOCIALES', 
    'GENERAL', 
    NULL, 
    'Genérico', 
    ARRAY['SEL', 'competencias']
),
-- 6. EMOCINE Frontiers
(
    'Emotional Intelligence in Elementary School Children (EMOCINE)', 
    'Novel Assessment Test Based on the Interpretation of Cinema Scenes. Uso del cine para evaluar emociones.', 
    'ARTICULO', 
    'AUTOCONOCIMIENTO', 
    'PRIMARIA', 
    'https://www.frontiersin.org', 
    'Frontiers Psychology', 
    ARRAY['cine', 'evaluacion', 'ciencia']
),
-- 7. CEIP Villa de Guadarrama
(
    'GUIA PARA TRABAJAR LAS EMOCIONES EN EL AULA', 
    'Guía docente completa desarrollada por el CEIP Villa de Guadarrama.', 
    'GUIA', 
    'GENERAL', 
    'PRIMARIA', 
    NULL, 
    'CEIP Villa de Guadarrama', 
    ARRAY['docente', 'aula', 'planificacion']
),
-- 8. Mindfulness Infosal
(
    'Guia Mindfulness para Niños', 
    'Técnicas de atención plena y relajación adaptadas al público infantil.', 
    'GUIA', 
    'MINDFULNESS', 
    'PRIMARIA', 
    'https://www.infosal.es', 
    'Infosal', 
    ARRAY['relajacion', 'atencion', 'calma']
),
-- 9. Disruptive Students
(
    'The Direct and Spillover Effects of a Nationwide SEL Program', 
    'Estudio y programa para estudiantes con conductas disruptivas y su impacto en el aula.', 
    'ARTICULO', 
    'REGULACION_EMOCIONAL', 
    'SECUNDARIA', 
    NULL, 
    'Academic Research', 
    ARRAY['conducta', 'disruptivo', 'investigacion']
),
-- 10. Cuentos Univ. Oviedo
(
    'Cuentos que emocionan: Propuesta de Intervención', 
    'Uso de la narrativa y cuentos para la intervención en educación emocional.', 
    'PDF', 
    'EMPATIA', 
    'PRIMARIA', 
    'https://uniovi.es', 
    'Universidad de Oviedo', 
    ARRAY['cuentos', 'narrativa', 'literatura']
);
