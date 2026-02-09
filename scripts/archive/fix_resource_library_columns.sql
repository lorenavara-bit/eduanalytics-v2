-- FIX: Add missing 'topic' column to resource_library
ALTER TABLE public.resource_library 
ADD COLUMN IF NOT EXISTS topic text;

-- FIX: Add 'subject' column if missing too, just in case
ALTER TABLE public.resource_library 
ADD COLUMN IF NOT EXISTS subject text;

-- Reload schema cache
NOTIFY pgrst, 'reload config';
