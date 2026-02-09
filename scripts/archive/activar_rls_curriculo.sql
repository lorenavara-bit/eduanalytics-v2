-- =====================================================
-- ACTIVAR RLS Y CREAR POLÍTICAS PÚBLICAS
-- Para tablas del currículo LOMLOE
-- =====================================================
-- Soluciona: "RLS Disabled in Public Entity"
-- =====================================================

-- =====================================================
-- 1. ACTIVAR RLS EN TODAS LAS TABLAS DEL CURRÍCULO
-- =====================================================

ALTER TABLE competencias_clave ENABLE ROW LEVEL SECURITY;
ALTER TABLE saberes_basicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE criterios_evaluacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE resultados_evaluacion ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 2. CREAR POLÍTICAS DE LECTURA PÚBLICA
-- =====================================================
-- El currículo LOMLOE es público, todos pueden leer

-- Eliminar políticas antiguas si existen
DROP POLICY IF EXISTS "Lectura pública de competencias" ON competencias_clave;
DROP POLICY IF EXISTS "Lectura pública de saberes" ON saberes_basicos;
DROP POLICY IF EXISTS "Lectura pública de criterios" ON criterios_evaluacion;
DROP POLICY IF EXISTS "Lectura pública de resultados" ON resultados_evaluacion;

-- Crear nuevas políticas de lectura pública
CREATE POLICY "Lectura pública de competencias"
ON competencias_clave
FOR SELECT
TO PUBLIC
USING (true);

CREATE POLICY "Lectura pública de saberes"
ON saberes_basicos
FOR SELECT
TO PUBLIC
USING (true);

CREATE POLICY "Lectura pública de criterios"
ON criterios_evaluacion
FOR SELECT
TO PUBLIC
USING (true);

CREATE POLICY "Lectura pública de resultados"
ON resultados_evaluacion
FOR SELECT
TO PUBLIC
USING (true);

-- =====================================================
-- 3. VERIFICAR QUE RLS ESTÁ ACTIVADO
-- =====================================================

SELECT 
    schemaname,
    tablename,
    rowsecurity as "RLS Enabled"
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('competencias_clave', 'saberes_basicos', 'criterios_evaluacion', 'resultados_evaluacion')
ORDER BY tablename;

-- Debería mostrar:
-- competencias_clave     | true
-- criterios_evaluacion   | true  
-- resultados_evaluacion  | true
-- saberes_basicos        | true

-- =====================================================
-- 4. VERIFICAR POLÍTICAS CREADAS
-- =====================================================

SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('competencias_clave', 'saberes_basicos', 'criterios_evaluacion', 'resultados_evaluacion')
ORDER BY tablename, policyname;

-- =====================================================
-- NOTAS IMPORTANTES:
-- =====================================================
-- 
-- ✅ RLS ahora está ACTIVADO en todas las tablas
-- ✅ Políticas de lectura pública creadas
-- ✅ Cualquiera puede LEER el currículo (es público)
-- ⚠️ SOLO lectura - Nadie puede modificar sin ser admin
-- 
-- Esto es correcto porque:
-- - El currículo LOMLOE es información pública del BOE
-- - Los usuarios solo necesitan LEER los datos
-- - La escritura está protegida (solo admins)
-- 
-- =====================================================

SELECT '✅ RLS activado y políticas públicas configuradas correctamente' AS status;
