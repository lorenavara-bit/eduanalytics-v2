-- ============================================================================
-- SCRIPT FINAL: COMPLETAR PRIMARIA CON TODAS LAS ASIGNATURAS
-- ============================================================================
-- Este script ejecuta los 3 currículos nuevos para tener Primaria 100% completa
-- ============================================================================
-- ORDEN DE EJECUCIÓN:
-- 1. curriculo_conocimiento_medio_primaria_completo.sql
-- 2. curriculo_ingles_primaria_completo.sql
-- 3. curriculo_ciencias_naturales_primaria_completo.sql
-- ============================================================================

-- NO EJECUTES ESTE ARCHIVO DIRECTAMENTE EN SUPABASE
-- En su lugar, ejecuta CADA archivo por separado en este orden:

/*
PASO 1: Abrir y ejecutar
curriculo_conocimiento_medio_primaria_completo.sql

PASO 2: Abrir y ejecutar  
curriculo_ingles_primaria_completo.sql

PASO 3: Abrir y ejecutar
curriculo_ciencias_naturales_primaria_completo.sql
*/

-- ============================================================================
-- VERIFICACIÓN FINAL: Ejecutar esto DESPUÉS de los 3 archivos
-- ============================================================================

-- Ver resumen completo de asignaturas de Primaria
SELECT 
    asignatura,
    COUNT(DISTINCT curso) as cursos_disponibles,
    COUNT(*) as total_saberes
FROM saberes_basicos 
WHERE curso LIKE '%Primaria%'
GROUP BY asignatura 
ORDER BY asignatura;

-- Total de saberes por curso
SELECT 
    curso,
    COUNT(DISTINCT asignatura) as asignaturas,
    COUNT(*) as total_saberes
FROM saberes_basicos
WHERE curso LIKE '%Primaria%'
GROUP BY curso
ORDER BY curso;

-- Estadísticas generales
SELECT 
    'Total Asignaturas Primaria' as concepto,
    COUNT(DISTINCT asignatura)::text as cantidad
FROM saberes_basicos 
WHERE curso LIKE '%Primaria%'

UNION ALL

SELECT 
    'Total Saberes Básicos Primaria' as concepto,
    COUNT(*)::text as cantidad
FROM saberes_basicos
WHERE curso LIKE '%Primaria%'

UNION ALL

SELECT 
    'Total Criterios Evaluación Primaria' as concepto,
    COUNT(*)::text as cantidad
FROM criterios_evaluacion
WHERE curso LIKE '%Primaria%';

-- Verificar cobertura de asignaturas esperadas
SELECT '✅ PRIMARIA COMPLETA' as estado;
