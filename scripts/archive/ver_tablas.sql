-- =====================================================
-- VERIFICAR QUÉ TABLAS TIENES
-- =====================================================

-- Ver TODAS las tablas que tienes en public
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- =====================================================
-- Esto te mostrará TODAS tus tablas
-- Copia el resultado y me lo pasas
-- =====================================================
