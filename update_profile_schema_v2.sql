-- 1. Add new columns for enhanced personalization
alter table public.profiles 
add column if not exists learning_style text, -- 'visual', 'auditivo', 'kinestesico', 'lectura'
add column if not exists hobbies text[]; -- Array of strings for hobbies/interests

-- 2. Modify existing columns (if needed, though text[] or text is fine)
-- We are changing 'favorite_subjects' and 'least_favorite_subjects' to be simple TEXT fields (comma separated or free text)
-- instead of arrays, as per user request to make them "like observations".
-- If they are already arrays, we can keep them or cast them. 
-- For simplicity in the UI (textarea), we will treat them as text.
-- If the column type is already text[], we can't easily change it to text without casting.
-- So we will create NEW columns for the text-based versions to avoid data loss errors during migration,
-- or we can just ALTER the type if the data is empty.

-- Safe approach: Add new text columns or ensure the UI handles arrays as text.
-- Let's stick to the current schema for now and handle the array conversion in the frontend specific to the User's request?
-- actually, the user wants "rellenar como observaciones", which implies a TEXTAREA.
-- If the DB has text[], we can just join/split.
-- BUT, if the user explicitly wants free text (e.g. "Matemáticas pero solo geometría"), simple Text is better.

alter table public.profiles
alter column favorite_subjects type text using array_to_string(favorite_subjects, ','),
alter column least_favorite_subjects type text using array_to_string(least_favorite_subjects, ',');

-- Ensure they are explicitly text now:
alter table public.profiles 
add column if not exists learning_style text,
add column if not exists hobbies text[]; -- keeping hobbies as array? User said "interests and hobbies". 
-- Actually, let's make 'interests' and 'hobbies' separate or merged.
-- The user said: "añadir aparte de observaciones intereses y hobbies".
-- Current 'interests' is text[]. Let's change it to TEXT for consistency with the "observations" style request.

alter table public.profiles
alter column interests type text using array_to_string(interests, ',');
