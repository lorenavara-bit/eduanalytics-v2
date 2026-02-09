-- DISABLE RLS TEMPORARILY ON RESOURCE LIBRARY
-- This is to verify if policies are hiding the data
ALTER TABLE public.resource_library DISABLE ROW LEVEL SECURITY;

-- Reload Schema
NOTIFY pgrst, 'reload config';
