-- CRITICAL FIX: Point resource_library to 'students' table instead of 'profiles'
-- The error "Key (student_id)=... is not present in table profiles" happens because
-- we are trying to save a resource for a "Student" (child), but the database incorrectly
-- thinks resources must belong to "Profiles" (auth users).

-- 1. Drop the incorrect Foreign Key
ALTER TABLE public.resource_library
DROP CONSTRAINT IF EXISTS resource_library_student_id_fkey;

-- 2. Add the CORRECT Foreign Key pointing to the students table
ALTER TABLE public.resource_library
ADD CONSTRAINT resource_library_student_id_fkey
FOREIGN KEY (student_id)
REFERENCES public.students (id)
ON DELETE CASCADE;

-- 3. Reload Schema Cache
NOTIFY pgrst, 'reload config';
