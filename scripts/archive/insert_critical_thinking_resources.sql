-- Insertar los 10 recursos de Pensamiento Crítico
INSERT INTO public.recursos_socioemocionales (titulo, descripcion, tipo_recurso, categoria_emocional, nivel_educativo, url_acceso, fuente_origen, tags) VALUES
-- 1. Actividades PDF
(
    'Actividades de Pensamiento Crítico y Creativo', 
    'Fichero práctico en PDF con actividades listas para usar tanto en Primaria como en Secundaria.', 
    'PDF', 
    'AUTOCONOCIMIENTO', -- Mapeado a Autoconocimiento/Cognitivo
    'GENERAL', 
    'http://www.orientacionandujar.es', -- URL placeholder común para estos recursos, o NULL si no se tiene
    'Recopilación Docente', 
    ARRAY['creatividad', 'fichas', 'ejercicios']
),
-- 2. Consejos Aula
(
    '5 consejos y 5 actividades para fomentar el pensamiento crítico', 
    'Artículo con reflexiones y dinámicas de grupo sencillas para implementar hoy mismo.', 
    'ARTICULO', 
    'HABLIDADES_SOCIALES', 
    'PRIMARIA', 
    'https://www.educaciontrespuntocero.com', 
    'Educación 3.0', 
    ARRAY['consejos', 'dinamicas', 'aula']
),
-- 3. Mini-guía Foundation
(
    'La mini-guía para el Pensamiento Crítico: Conceptos y herramientas', 
    'Manual de referencia esencial de la "Foundation for Critical Thinking".', 
    'GUIA', 
    'AUTOCONOCIMIENTO', 
    'GENERAL', 
    'https://www.criticalthinking.org', 
    'Foundation for Critical Thinking', 
    ARRAY['fundamentos', 'teoria', 'herramientas']
),
-- 4. Pensamiento Crítico Niños
(
    'Pensamiento Crítico para Niños Guía Ilustrada', 
    'Versión adaptada y visual de los conceptos lógicos diseñada específicamente para primaria.', 
    'GUIA', 
    'AUTOCONOCIMIENTO', 
    'PRIMARIA', 
    'https://www.criticalthinking.org', 
    'Foundation for Critical Thinking', 
    ARRAY['visual', 'niños', 'adaptado']
),
-- 5. Didáctica Ministerio
(
    'Didáctica del Pensamiento Crítico', 
    'Manual oficial con ejercicios para planificar sesiones activas centradas en el razonamiento.', 
    'GUIA', 
    'GENERAL', 
    'GENERAL', 
    'https://www.educacion.gob.es', 
    'Ministerio de Educación', 
    ARRAY['didactica', 'planificacion', 'oficial']
),
-- 6. Dialnet Estudio
(
    'Pensamiento crítico en ESO y Bachillerato: propuesta didáctica', 
    'Estudio piloto académico de alta calidad con metodologías probadas para adolescentes.', 
    'ARTICULO', 
    'AUTOCONOCIMIENTO', 
    'SECUNDARIA', 
    'https://dialnet.unirioja.es', 
    'Dialnet', 
    ARRAY['investigacion', 'bachillerato', 'metodologia']
),
-- 7. INTEF Filosofía
(
    'Existir es pensar: del ser al compromiso vital', 
    'Recurso especializado para Historia de la Filosofía (2º Bachillerato) con rúbricas de evaluación.', 
    'ACTIVIDAD', 
    'AUTOCONOCIMIENTO', 
    'SECUNDARIA', 
    'https://intef.es', 
    'INTEF', 
    ARRAY['filosofia', 'bachillerato', 'rubrica']
),
-- 8. Sesgos Cognitivos
(
    'Kit de material lúdico: Lotería y memorama de Sesgos Cognitivos', 
    'Juegos interactivos para aprender a identificar fallos lógicos y sesgos de pensamiento.', 
    'ACTIVIDAD', 
    'AUTOCONOCIMIENTO', 
    'GENERAL', 
    'https://www.ratiomagna.com', 
    'Editorial Ratio Magna', 
    ARRAY['juegos', 'sesgos', 'logica']
),
-- 9. Guía Debate Averroes
(
    'Guía breve para preparar un debate en clase', 
    'Paso a paso para organizar debates estructurados que fomenten la argumentación.', 
    'GUIA', 
    'HABLIDADES_SOCIALES', 
    'SECUNDARIA', 
    'https://blogsaverroes.juntadeandalucia.es', 
    'Blog Averroes', 
    ARRAY['debate', 'oratoria', 'argumentacion']
),
-- 10. REA General
(
    'Recursos Educativos Abiertos (REA): innovación y acceso', 
    'Visión general de las redes de recursos abiertos disponibles en España.', 
    'ARTICULO', 
    'GENERAL', 
    'GENERAL', 
    'https://intef.es/recursos-educativos/rea/', 
    'INTEF', 
    ARRAY['rea', 'open-source', 'innovacion']
);
