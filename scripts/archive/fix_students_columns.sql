-- FIX: Add missing columns to students table if they don't exist
ALTER TABLE public.students 
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS full_name text;

-- Force reload schema cache
NOTIFY pgrst, 'reload config';
