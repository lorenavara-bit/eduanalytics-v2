-- =====================================================
-- VERIFICACIÓN FINAL - PRIMARIA Y ESO COMPLETAS
-- =====================================================
-- Ejecuta este script para ver TODO lo que tienes
-- =====================================================

-- Ver TODOS los cursos cargados con cantidad de asignaturas
SELECT 
    curso,
    COUNT(DISTINCT asignatura) as asignaturas,
    COUNT(*) as saberes,
    CASE 
        WHEN COUNT(DISTINCT asignatura) >= 6 THEN '✅ COMPLETO'
        WHEN COUNT(DISTINCT asignatura) >= 3 THEN '⚠️ PARCIAL'
        ELSE '❌ INCOMPLETO'
    END as estado
FROM saberes_basicos
GROUP BY curso
ORDER BY 
    CASE 
        WHEN curso LIKE '%Primaria%' THEN 1
        WHEN curso LIKE '%ESO%' THEN 2
        ELSE 3
    END,
    CASE 
        WHEN curso LIKE '%1º%' THEN 1
        WHEN curso LIKE '%2º%' THEN 2
        WHEN curso LIKE '%3º%' THEN 3
        WHEN curso LIKE '%4º%' THEN 4
        WHEN curso LIKE '%5º%' THEN 5
        WHEN curso LIKE '%6º%' THEN 6
        ELSE 99
    END;

-- Resumen por etapa
SELECT 
    CASE 
        WHEN curso LIKE '%Primaria%' THEN 'PRIMARIA'
        WHEN curso LIKE '%ESO%' THEN 'ESO'
        ELSE 'OTROS'
    END as etapa,
    COUNT(DISTINCT curso) as cursos,
    COUNT(DISTINCT asignatura) as asignaturas_diferentes,
    COUNT(*) as total_saberes
FROM saberes_basicos
GROUP BY etapa
ORDER BY etapa;

-- Ver todas las asignaturas disponibles
SELECT DISTINCT asignatura
FROM saberes_basicos
ORDER BY asignatura;

-- Contar criterios de evaluación
SELECT 
    CASE 
        WHEN curso LIKE '%Primaria%' THEN 'PRIMARIA'
        WHEN curso LIKE '%ESO%' THEN 'ESO'
        ELSE 'OTROS'
    END as etapa,
    COUNT(*) as criterios
FROM criterios_evaluacion
GROUP BY etapa
ORDER BY etapa;

-- Ver si existe Lingua Galega
SELECT 
    curso,
    COUNT(*) as saberes_galego
FROM saberes_basicos
WHERE asignatura = 'Lingua Galega e Literatura'
GROUP BY curso
ORDER BY curso;

-- TOTALES GENERALES
SELECT 
    'TOTALES' as tipo,
    COUNT(DISTINCT curso) as cursos,
    COUNT(DISTINCT asignatura) as asignaturas,
    COUNT(*) as saberes
FROM saberes_basicos
UNION ALL
SELECT 
    'Criterios Eval.' as tipo,
    NULL as cursos,
    NULL as asignaturas,
    COUNT(*) as total
FROM criterios_evaluacion;
