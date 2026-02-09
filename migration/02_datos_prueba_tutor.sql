-- ============================================================================
-- DATOS DE PRUEBA PARA TESTING DEL TUTOR IA
-- ============================================================================
-- Ejecutar este script en Supabase SQL Editor
-- ============================================================================

-- 1. Crear estudiante de prueba
INSERT INTO students (
  id,
  name,
  grade_level,
  autonomous_community,
  interests,
  onboarding_completed
) VALUES (
  '11111111-1111-1111-1111-111111111111', -- ID fijo para testing
  'Alex Prueba',
  '4º Primaria',
  'Andalucía',
  'Geografía, Mapas, Ciencias Naturales',
  true
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  grade_level = EXCLUDED.grade_level;

-- 2. Crear perfil de aprendizaje VARK (Visual dominante)
INSERT INTO learning_profiles (
  student_id,
  vark_dominant,
  vark_scores,
  vark_confidence,
  ai_summary
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'V', -- Visual
  '{"V": 12, "A": 5, "R": 7, "K": 8}'::jsonb,
  0.85, -- Confianza del 85%
  'Alex aprende mejor con IMÁGENES y DIAGRAMAS. Le encantan los mapas y representaciones visuales.'
)
ON CONFLICT (student_id) DO UPDATE SET
  vark_dominant = EXCLUDED.vark_dominant,
  vark_scores = EXCLUDED.vark_scores,
  ai_summary = EXCLUDED.ai_summary;

-- 3. Crear algunas asignaturas favoritas
INSERT INTO user_subjects (
  student_id,
  name
) VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Matemáticas'),
  ('11111111-1111-1111-1111-111111111111', 'Conocimiento del Medio'),
  ('11111111-1111-1111-1111-111111111111', 'Inglés')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================

-- Ver el estudiante creado
SELECT * FROM students WHERE id = '11111111-1111-1111-1111-111111111111';

-- Ver el perfil de aprendizaje
SELECT * FROM learning_profiles WHERE student_id = '11111111-1111-1111-1111-111111111111';

-- ============================================================================
-- ✅ ESTUDIANTE DE PRUEBA CREADO
-- ============================================================================
-- ID del estudiante para testing: 11111111-1111-1111-1111-111111111111
-- Nombre: Alex Prueba
-- Curso: 4º Primaria
-- Estilo VARK: Visual (V)
-- 
-- URL para acceder al tutor:
-- http://localhost:5173/tutor/11111111-1111-1111-1111-111111111111
-- ============================================================================
