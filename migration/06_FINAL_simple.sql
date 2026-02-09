-- =====================================================
-- SCRIPT ULTRA SIMPLE: Estudiante con Parent Real
-- Se adapta a CUALQUIER esquema
-- =====================================================

-- PASO 1: Ver qué profiles existen (ver CUALQUIER columna que tenga)
SELECT * FROM profiles LIMIT 5;

-- PASO 2: Después de ver los profiles, ejecuta este bloque
-- (Usa el primer profile que encuentre)
DO $$
DECLARE
    v_parent_id UUID;
BEGIN
    -- Buscar el primer profile que exista
    SELECT id INTO v_parent_id 
    FROM profiles 
    LIMIT 1;
    
    IF v_parent_id IS NULL THEN
        RAISE EXCEPTION '❌ No hay profiles. Por favor primero accede a la app y crea un usuario.';
    END IF;
    
    RAISE NOTICE '📍 Usando parent_id: %', v_parent_id;
    
    -- Insertar estudiante con ese parent_id
    INSERT INTO students (id, full_name, parent_id)
    VALUES (
        '11111111-1111-1111-1111-111111111111',
        'Demo Student',
        v_parent_id
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = 'Demo Student',
        parent_id = v_parent_id;
    
    RAISE NOTICE '✅ Estudiante insertado correctamente';
    
    -- Intentar actualizar grade_level si existe
    BEGIN
        EXECUTE 'UPDATE students SET grade_level = $1 WHERE id = $2'
        USING '4º Primaria', '11111111-1111-1111-1111-111111111111';
        RAISE NOTICE '✅ Grade level actualizado';
    EXCEPTION WHEN undefined_column THEN
        RAISE NOTICE '⚠️ Columna grade_level no existe (ignorando)';
    END;
    
END $$;

-- PASO 3: Verificar que se creó
SELECT * FROM students 
WHERE id = '11111111-1111-1111-1111-111111111111';

-- PASO 4 (OPCIONAL): Crear perfil de aprendizaje
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'learning_profiles') THEN
        INSERT INTO learning_profiles (student_id, vark_dominant, last_updated)
        VALUES ('11111111-1111-1111-1111-111111111111', 'V', NOW())
        ON CONFLICT (student_id) DO UPDATE SET vark_dominant = 'V', last_updated = NOW();
        RAISE NOTICE '✅ Perfil de aprendizaje creado';
    ELSE
        RAISE NOTICE '⚠️ Tabla learning_profiles no existe';
    END IF;
END $$;

-- =====================================================
-- FIN - El estudiante debería estar creado ahora
-- =====================================================
