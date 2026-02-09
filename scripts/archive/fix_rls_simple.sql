-- =====================================================
-- ACTIVAR RLS - SOLUCIÓN DIRECTA
-- =====================================================
-- Problema: Políticas existen pero RLS no está activado
-- Solución: Activar RLS en todas las tablas
-- =====================================================

-- Activar RLS en todas las tablas del currículo
ALTER TABLE public.competencias_clave ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saberes_basicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.criterios_evaluacion ENABLE ROW LEVEL SECURITY;

-- Si existen más tablas, actívalas también
ALTER TABLE public.resultados_evaluacion ENABLE ROW LEVEL SECURITY;

-- Verificar que está activado
SELECT 
    tablename,
    CASE 
        WHEN rowsecurity = true THEN '✅ RLS ACTIVADO'
        ELSE '❌ RLS DESACTIVADO'
    END as estado
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN (
    'competencias_clave',
    'saberes_basicos', 
    'criterios_evaluacion',
    'resultados_evaluacion'
)
ORDER BY tablename;

-- =====================================================
-- IMPORTANTE:
-- =====================================================
-- Después de ejecutar este script, TODAS las tablas
-- deberían mostrar "✅ RLS ACTIVADO"
-- 
-- Las políticas ya existen (como "Competencias son públicas")
-- Solo faltaba activar RLS
-- =====================================================
