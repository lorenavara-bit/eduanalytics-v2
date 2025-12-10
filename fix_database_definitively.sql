-- PASO 1: Asegurar que la columna 'textbook_info' existe para guardar el libro
ALTER TABLE public.user_subjects 
ADD COLUMN IF NOT EXISTS textbook_info text;

-- PASO 2: Asegurar que las políticas permitem ACTUALIZAR (UPDATE) las asignaturas
-- (Esto arregla el botón de guardar libro)
DROP POLICY IF EXISTS "Users can update their own subjects" ON public.user_subjects;
CREATE POLICY "Users can update their own subjects"
  ON public.user_subjects FOR UPDATE
  USING ( auth.uid() = user_id )
  WITH CHECK ( auth.uid() = user_id );

-- PASO 3: Asegurar que se pueden BORRAR asignaturas
DROP POLICY IF EXISTS "Users can delete their own subjects" ON public.user_subjects;
CREATE POLICY "Users can delete their own subjects"
  ON public.user_subjects FOR DELETE
  USING ( auth.uid() = user_id );

-- PASO 4: Asegurar que se pueden ver e insertar
DROP POLICY IF EXISTS "Users can view their own subjects" ON public.user_subjects;
CREATE POLICY "Users can view their own subjects"
  ON public.user_subjects FOR SELECT
  USING ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can insert their own subjects" ON public.user_subjects;
CREATE POLICY "Users can insert their own subjects"
  ON public.user_subjects FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

-- PASO 5: Permisos para la tabla de archivos (study_materials)
ALTER TABLE public.study_materials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can upload their own materials" ON public.study_materials;
CREATE POLICY "Users can upload their own materials"
  ON public.study_materials FOR INSERT
  WITH CHECK ( auth.uid() = user_id );
  
DROP POLICY IF EXISTS "Users can view their own materials" ON public.study_materials;
CREATE POLICY "Users can view their own materials"
  ON public.study_materials FOR SELECT
  USING ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can delete their own materials" ON public.study_materials;
CREATE POLICY "Users can delete their own materials"
  ON public.study_materials FOR DELETE
  USING ( auth.uid() = user_id );

-- OPCIONAL: Borrar asignaturas que sobran (Plástica, Educación Física)
-- Descomenta la siguiente línea si quieres borrarlas para TODOS los usuarios automáticamente
-- DELETE FROM public.user_subjects WHERE name IN ('Educación Artística', 'Educación Física');
