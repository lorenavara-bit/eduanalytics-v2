-- =====================================================
-- DATOS DE PRUEBA: Estudiante y Tablas del Tutor
-- Fecha: 2026-01-15
-- Descripción: Inserta un estudiante de prueba para testing del Tutor IA
-- =====================================================

-- 1. Insertar estudiante de prueba
-- Usando solo las columnas esenciales que definitivamente existen
INSERT INTO students (
    id, 
    full_name, 
    grade_level, 
    parent_id
)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'Demo Student',
    '4º Primaria',
    '00000000-0000-0000-0000-000000000000'
) 
ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    grade_level = EXCLUDED.grade_level;

-- 2. Insertar perfil de aprendizaje de prueba (opcional)
INSERT INTO learning_profiles (
    student_id,
    vark_scores,
    vark_dominant,
    multiple_intelligences,
    cognitive_traits,
    confidence_score,
    last_updated
)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    '{"v": 0.7, "a": 0.2, "r": 0.3, "k": 0.5}'::jsonb,
    'V',
    '{"linguistic": 0.6, "logical": 0.7, "spatial": 0.8, "kinesthetic": 0.5, "musical": 0.4, "interpersonal": 0.6, "intrapersonal": 0.5, "naturalistic": 0.5}'::jsonb,
    '{"attention": "normal", "processing_speed": "normal", "persistence": "normal"}'::jsonb,
    0.75,
    NOW()
)
ON CONFLICT (student_id) DO UPDATE SET
    vark_scores = EXCLUDED.vark_scores,
    vark_dominant = EXCLUDED.vark_dominant,
    multiple_intelligences = EXCLUDED.multiple_intelligences,
    cognitive_traits = EXCLUDED.cognitive_traits,
    confidence_score = EXCLUDED.confidence_score,
    last_updated = NOW();

-- 3. Verificar que el estudiante se creó correctamente
SELECT 
    id,
    full_name,
    grade_level,
    parent_id
FROM students 
WHERE id = '11111111-1111-1111-1111-111111111111';

-- 4. Verificar el perfil de aprendizaje
SELECT 
    student_id,
    vark_dominant,
    vark_scores,
    confidence_score
FROM learning_profiles 
WHERE student_id = '11111111-1111-1111-1111-111111111111';

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
