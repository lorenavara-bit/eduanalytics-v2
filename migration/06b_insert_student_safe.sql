-- =====================================================
-- INSERCIÓN SEGURA: Estudiante de Prueba para Tutor IA
-- Versión simplificada - Solo columnas básicas garantizadas
-- =====================================================

-- Opción 1: Inserción mínima (siempre funciona)
DO $$
BEGIN
    -- Intentar insertar solo con las columnas absolutamente necesarias
    INSERT INTO students (id, full_name, parent_id)
    VALUES (
        '11111111-1111-1111-1111-111111111111',
        'Demo Student',
        '00000000-0000-0000-0000-000000000000'
    )
    ON CONFLICT (id) DO NOTHING;
    
    -- Actualizar grade_level si la columna existe
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'students' AND column_name = 'grade_level'
    ) THEN
        UPDATE students 
        SET grade_level = '4º Primaria'
        WHERE id = '11111111-1111-1111-1111-111111111111';
    END IF;
    
    -- Actualizar name si la columna existe (algunos esquemas usan 'name' en vez de 'full_name')
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'students' AND column_name = 'name'
    ) THEN
        UPDATE students 
        SET name = 'Demo Student'
        WHERE id = '11111111-1111-1111-1111-111111111111';
    END IF;

    RAISE NOTICE '✅ Estudiante de prueba insertado/actualizado correctamente';
END $$;

-- Insertar perfil de aprendizaje básico (si la tabla existe)
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
        
        RAISE NOTICE '✅ Perfil de aprendizaje insertado/actualizado';
    ELSE
        RAISE NOTICE '⚠️ Tabla learning_profiles no existe (esto es normal si no has ejecutado el SQL de perfiles)';
    END IF;
END $$;

-- Verificación: Mostrar el estudiante creado
SELECT 
    id,
    COALESCE(full_name, name) as nombre,
    grade_level
FROM students 
WHERE id = '11111111-1111-1111-1111-111111111111';

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
