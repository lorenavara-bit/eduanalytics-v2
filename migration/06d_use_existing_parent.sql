-- =====================================================
-- OPCIÓN SIMPLE: Usar un parent_id que YA EXISTE
-- =====================================================

-- Primero, ver qué profiles existen en tu base de datos
SELECT 
    id,
    username,
    email,
    role,
    created_at
FROM profiles
ORDER BY created_at DESC
LIMIT 5;

-- =====================================================
-- INSTRUCCIONES:
-- 1. Ejecuta el SELECT de arriba
-- 2. Copia el 'id' de cualquier profile que veas
-- 3. Reemplaza 'TU_PARENT_ID_AQUI' abajo con ese ID
-- 4. Ejecuta el INSERT
-- =====================================================

/*
-- Descomenta y reemplaza TU_PARENT_ID_AQUI con un ID real de la tabla profiles
INSERT INTO students (id, full_name, parent_id)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'Demo Student',
    'TU_PARENT_ID_AQUI'  -- ⬅️ REEMPLAZAR CON ID REAL
)
ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    parent_id = EXCLUDED.parent_id;
*/

-- =====================================================
-- O BIEN, usar el primer profile que encuentre
-- =====================================================

DO $$
DECLARE
    v_parent_id UUID;
BEGIN
    -- Buscar cualquier profile existente
    SELECT id INTO v_parent_id 
    FROM profiles 
    ORDER BY created_at DESC
    LIMIT 1;
    
    IF v_parent_id IS NULL THEN
        RAISE EXCEPTION '❌ No hay ningún profile en la base de datos. Primero crea un usuario.';
    END IF;
    
    -- Insertar estudiante con ese parent_id
    INSERT INTO students (id, full_name, parent_id)
    VALUES (
        '11111111-1111-1111-1111-111111111111',
        'Demo Student',
        v_parent_id
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        parent_id = EXCLUDED.parent_id;
    
    -- Actualizar grade_level si la columna existe
    BEGIN
        UPDATE students 
        SET grade_level = '4º Primaria'
        WHERE id = '11111111-1111-1111-1111-111111111111';
    EXCEPTION WHEN undefined_column THEN
        NULL; -- La columna no existe, ignorar
    END;
    
    RAISE NOTICE '✅ Estudiante creado con parent_id: %', v_parent_id;
END $$;

-- Verificar
SELECT 
    s.*,
    p.username as parent_username,
    p.email as parent_email
FROM students s
LEFT JOIN profiles p ON s.parent_id = p.id
WHERE s.id = '11111111-1111-1111-1111-111111111111';

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
