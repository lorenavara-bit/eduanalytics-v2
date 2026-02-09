-- MIGRACIÓN DE LIMPIEZA Y REPARACIÓN (ARREGLA EL BORRADO DE JAX)
-- ⚠️ EJECUTA ESTO EN EL SQL EDITOR DE SUPABASE

-- 1. Eliminar restricciones antiguas que pueden estar bloqueando el borrado
DO $$ 
BEGIN 
    -- Intentar quitar la restricción de worksheets si apunta a students (para ponerle CASCADE)
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='worksheets_student_id_fkey') THEN
        ALTER TABLE public.worksheets DROP CONSTRAINT worksheets_student_id_fkey;
    END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 2. Asegurar que las tablas vinculadas tienen ON DELETE CASCADE
-- Si borras al estudiante, se borra todo lo demás automáticamente

-- Vínculo de Worksheets (si existe la tabla)
DO $$ 
BEGIN 
    ALTER TABLE public.worksheets 
        ADD CONSTRAINT worksheets_student_id_fkey 
        FOREIGN KEY (student_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 3. RE-HABILITAR PERMISOS DE BORRADO (RLS)
-- Esto es lo que permite que tu usuario pueda borrar filas
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Parents can delete their own children" ON public.students;
CREATE POLICY "Parents can delete their own children" ON public.students 
FOR DELETE USING ( auth.uid() = parent_id );

DROP POLICY IF EXISTS "Parents can update their own children" ON public.students;
CREATE POLICY "Parents can update their own children" ON public.students 
FOR UPDATE USING ( auth.uid() = parent_id );

-- 4. LIMPIEZA MANUAL (OPCIONAL)
-- Si tienes dos Jax y quieres borrar uno por ID, puedes hacerlo aquí, 
-- pero el botón de la web YA debería funcionar tras ejecutar esto.

-- 5. Asegurar cascading en tablas de NEE y Learning Profiles
DO $$ 
BEGIN 
    ALTER TABLE public.learning_profiles DROP CONSTRAINT IF EXISTS learning_profiles_student_id_fkey;
    ALTER TABLE public.learning_profiles 
        ADD CONSTRAINT learning_profiles_student_id_fkey 
        FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;

    ALTER TABLE public.nee_screenings DROP CONSTRAINT IF EXISTS nee_screenings_student_id_fkey;
    ALTER TABLE public.nee_screenings 
        ADD CONSTRAINT nee_screenings_student_id_fkey 
        FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
