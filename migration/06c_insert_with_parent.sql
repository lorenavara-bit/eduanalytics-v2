-- =====================================================
-- INSERCIÓN COMPLETA: Perfil de Padre + Estudiante de Prueba
-- Maneja correctamente las foreign keys
-- =====================================================

-- PASO 1: Crear un perfil de padre/usuario de prueba en la tabla profiles
DO $$
BEGIN
    -- Primero verificar si existe un perfil con ese ID
    IF NOT EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = '00000000-0000-0000-0000-000000000000'
    ) THEN
        -- Intentar insertar el perfil de padre
        BEGIN
            INSERT INTO profiles (id, username, role)
            VALUES (
                '00000000-0000-0000-0000-000000000000',
                'demo_parent',
                'parent'
            );
            RAISE NOTICE '✅ Perfil de padre demo creado';
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '⚠️ No se pudo crear perfil (intentando con NULL parent_id)';
        END;
    ELSE
        RAISE NOTICE '✅ Perfil de padre ya existe';
    END IF;
END $$;

-- PASO 2: Insertar el estudiante (intentando con parent_id, si falla usa NULL)
DO $$
DECLARE
    v_parent_id UUID;
BEGIN
    -- Intentar usar el parent_id del perfil que creamos
    v_parent_id := '00000000-0000-0000-0000-000000000000';
    
    -- Verificar si el parent_id existe en profiles
    IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = v_parent_id) THEN
        -- Si no existe, buscar cualquier perfil existente para usar como parent
        SELECT id INTO v_parent_id 
        FROM profiles 
        LIMIT 1;
        
        IF v_parent_id IS NULL THEN
            RAISE NOTICE '⚠️ No hay perfiles en la base de datos. Intentando insertar sin parent_id...';
            -- Intentar insertar sin parent_id (esperando que la columna permita NULL)
            INSERT INTO students (id, full_name)
            VALUES (
                '11111111-1111-1111-1111-111111111111',
                'Demo Student'
            )
            ON CONFLICT (id) DO UPDATE SET
                full_name = EXCLUDED.full_name;
            RAISE NOTICE '✅ Estudiante creado sin parent_id';
            RETURN;
        END IF;
    END IF;
    
    -- Insertar el estudiante con el parent_id válido
    INSERT INTO students (id, full_name, parent_id)
    VALUES (
        '11111111-1111-1111-1111-111111111111',
        'Demo Student',
        v_parent_id
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        parent_id = EXCLUDED.parent_id;
    
    RAISE NOTICE '✅ Estudiante insertado con parent_id: %', v_parent_id;
    
    -- Actualizar grade_level si existe la columna
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'students' AND column_name = 'grade_level'
    ) THEN
        UPDATE students 
        SET grade_level = '4º Primaria'
        WHERE id = '11111111-1111-1111-1111-111111111111';
        RAISE NOTICE '✅ Grade level actualizado';
    END IF;
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ Error: %', SQLERRM;
    RAISE NOTICE '💡 Verifica que la tabla profiles existe y tiene datos';
END $$;

-- PASO 3: Insertar perfil de aprendizaje (opcional)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'learning_profiles'
    ) THEN
        INSERT INTO learning_profiles (
            student_id,
            vark_dominant,
            last_updated
        )
        VALUES (
            '11111111-1111-1111-1111-111111111111',
            'V',
            NOW()
        )
        ON CONFLICT (student_id) DO UPDATE SET
            vark_dominant = 'V',
            last_updated = NOW();
        
        RAISE NOTICE '✅ Perfil de aprendizaje creado';
    END IF;
END $$;

-- PASO 4: Verificación final
SELECT 
    s.id,
    s.full_name,
    s.grade_level,
    s.parent_id,
    p.username as parent_username
FROM students s
LEFT JOIN profiles p ON s.parent_id = p.id
WHERE s.id = '11111111-1111-1111-1111-111111111111';

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
