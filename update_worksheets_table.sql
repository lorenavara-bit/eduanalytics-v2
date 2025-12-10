-- Add missing columns to worksheets table to support the generator
ALTER TABLE public.worksheets 
ADD COLUMN IF NOT EXISTS config jsonb, -- To store generation settings (difficulty, type, etc)
ADD COLUMN IF NOT EXISTS title text,   -- Generated title
ADD COLUMN IF NOT EXISTS summary text; -- Short intro/summary

-- Rename or mapping: user_id vs student_id. 
-- The table uses 'student_id', the code was sending 'user_id'. 
-- We will update the code, but let's ensure the foreign key is flexible if needed.

-- Create table for file linking if not exists (using array in worksheets is easier, but relational is better)
-- For now, we will store used file IDs in the 'config' jsonb.

-- Grant permissions just in case
GRANT ALL ON public.worksheets TO postgres;
GRANT ALL ON public.worksheets TO anon;
GRANT ALL ON public.worksheets TO authenticated;
GRANT ALL ON public.worksheets TO service_role;
