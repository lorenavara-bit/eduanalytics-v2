-- Add missing columns to profiles table to support the full Student Profile
-- Run this in your Supabase SQL Editor

alter table public.profiles 
add column if not exists birthdate date,
add column if not exists avatar_url text, -- For gamification (storing an emoji or url)
add column if not exists favorite_subjects text[], -- Array of strings
add column if not exists least_favorite_subjects text[], -- Array of strings
add column if not exists interests text[], -- Array of strings e.g. ['Roblox', 'Dinosaurs']
add column if not exists observations text;

-- Policy update not strictly needed if "Users can update own profile" is already there, 
-- but good to verify it allows these new columns. The existing policy was:
-- create policy "Users can update own profile" on profiles for update using ( auth.uid() = id );
-- This covers all columns implicitly.
