-- =====================================================
-- VERIFICACIÓN: ¿Qué cursos están en la base de datos?
-- =====================================================
-- Ejecuta este script en Supabase SQL Editor
-- Te dirá exactamente qué tienes cargado
-- =====================================================

-- Ver todos los cursos que tienes con cantidad de saberes y criterios
SELECT 
    curso,
    COUNT(DISTINCT asignatura) as asignaturas,
    COUNT(*) as total_saberes
FROM saberes_basicos
GROUP BY curso
ORDER BY 
    CASE 
        WHEN curso LIKE '%1º%' THEN 1
        WHEN curso LIKE '%2º%' THEN 2
        WHEN curso LIKE '%3º%' THEN 3
        WHEN curso LIKE '%4º%' THEN 4
        WHEN curso LIKE '%5º%' THEN 5
        WHEN curso LIKE '%6º%' THEN 6
        ELSE 99
    END;

-- Ver asignaturas por curso
SELECT 
    curso,
    asignatura,
    COUNT(*) as saberes
FROM saberes_basicos
WHERE curso LIKE '%Primaria%'
GROUP BY curso, asignatura
ORDER BY curso, asignatura;

-- Resumen: ¿Qué cursos están COMPLETOS?
SELECT 
    curso,
    COUNT(DISTINCT asignatura) as asignaturas,
    CASE 
        WHEN COUNT(DISTINCT asignatura) >= 6 THEN '✅ COMPLETO'
        WHEN COUNT(DISTINCT asignatura) >= 3 THEN '⚠️ PARCIAL'
        ELSE '❌ INCOMPLETO'
    END as estado
FROM saberes_basicos
WHERE curso LIKE '%Primaria%'
GROUP BY curso
ORDER BY curso;
