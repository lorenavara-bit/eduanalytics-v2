-- Fix missing 'updated_at' column error
alter table public.profiles 
add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());

-- Verify other columns are present just in case
alter table public.profiles 
add column if not exists full_name text,
add column if not exists avatar_url text,
add column if not exists birthdate date,
add column if not exists grade_level text,
add column if not exists learning_style text,
add column if not exists favorite_subjects text,
add column if not exists least_favorite_subjects text,
add column if not exists interests text,
add column if not exists hobbies text[],
add column if not exists observations text;
