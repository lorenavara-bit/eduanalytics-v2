-- ============================================================================
-- IMPORTACIÓN DE CURRÍCULO LOMLOE EXISTENTE
-- ============================================================================
-- Este archivo combina todo el currículo que ya tienes:
-- 1. Matemáticas, Lengua Castellana, Geografía e Historia (todas las etapas)
-- 2. Lingua Galega e Literatura (Primaria, ESO, Bachillerato)
-- ============================================================================
-- EJECUTAR EN: Proyecto NUEVO de Supabase
-- TIEMPO ESTIMADO: 2-3 minutos
-- ============================================================================

-- Primero, insertar Competencias Clave (si no existen)
INSERT INTO competencias_clave (id, nombre, descripcion) VALUES
('CCL', 'Competencia en comunicación lingüística', 'Habilidad para expresarse e interpretar pensamientos, sentimientos y hechos de forma oral y escrita.'),
('CP', 'Competencia plurilingüe', 'Capacidad de utilizar distintas lenguas de forma apropiada y eficaz.'),
('CMCT', 'Competencia matemática y en ciencia, tecnología e ingeniería', 'Comprensión del mundo utilizando métodos científicos, pensamiento matemático y tecnología.'),
('STEM', 'Competencia matemática y en ciencia, tecnología e ingeniería', 'Alias de CMCT - Comprensión del mundo utilizando métodos científicos.'),
('CD', 'Competencia digital', 'Uso seguro, crítico y responsable de las tecnologías digitales.'),
('CPSAA', 'Competencia personal, social y de aprender a aprender', 'Capacidad de reflexionar sobre uno mismo, gestionar el tiempo y la información.'),
('CC', 'Competencia ciudadana', 'Participación activa y democrática en la vida social y cívica.'),
('CE', 'Competencia emprendedora', 'Desarrollo de ideas y oportunidades para crear valor.'),
('CCEC', 'Competencia en conciencia y expresión culturales', 'Comprensión y respeto de ideas, experiencias y emociones expresadas de forma creativa.')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- AVISO: El contenido completo del currículo es muy largo.
-- INSTRUCCIONES:
-- ============================================================================
-- 
-- NO ejecutes este archivo directamente.
-- En su lugar, ejecuta estos archivos EN ORDEN en el SQL Editor de Supabase:
--
-- 1. curriculo_completo_lomloe.sql (Mates, Lengua, GH)
-- 2. curriculo_gallego_1primaria.sql
-- 3. curriculo_gallego_2primaria.sql
-- 4. curriculo_gallego_3primaria.sql
-- 5. curriculo_gallego_4primaria.sql
-- 6. curriculo_gallego_5primaria.sql
-- 7. curriculo_gallego_6primaria.sql
-- 8. curriculo_gallego_1eso.sql
-- 9. curriculo_gallego_2eso.sql
-- 10. curriculo_gallego_3eso.sql
-- 11. curriculo_gallego_4eso.sql
-- 12. curriculo_gallego_1bachillerato.sql
-- 13. curriculo_gallego_2bachillerato.sql
--
-- ============================================================================

-- Verificación después de ejecutar todos los archivos:
SELECT 'Total Saberes Básicos:' as concepto, COUNT(*)::text as cantidad FROM saberes_basicos;
SELECT 'Total Criterios Evaluación:' as concepto, COUNT(*)::text as cantidad FROM criterios_evaluacion;
SELECT 'Total Competencias:' as concepto, COUNT(*)::text as cantidad FROM competencias_clave;

-- Ver asignaturas disponibles:
SELECT DISTINCT asignatura, COUNT(*) as saberes
FROM saberes_basicos 
GROUP BY asignatura 
ORDER BY asignatura;
