-- CONSOLIDATED FIX SCRIPT
-- This script fixes missing columns, RLS policies, duplicate issues, and enables RLS on curricular tables.
-- Run this in your Supabase SQL Editor.

--------------------------------------------------------------------------------
-- 1. FIX MISSING COLUMNS IN PROFILES
--------------------------------------------------------------------------------
-- Fix missing 'updated_at' column error and others
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

--------------------------------------------------------------------------------
-- 2. PREVENT DUPLICATES IN USER_SUBJECTS
--------------------------------------------------------------------------------
-- First, ensure duplicates are removed
DELETE FROM public.user_subjects
WHERE id IN (
    SELECT id
    FROM (
        SELECT id,
        ROW_NUMBER() OVER (partition BY user_id, name ORDER BY created_at ASC) as r_num
        FROM public.user_subjects
    ) t
    WHERE t.r_num > 1
);

-- Add a UNIQUE constraint
-- This ensures the database automatically rejects any attempt to insert a duplicate subject for the same user.
ALTER TABLE public.user_subjects
DROP CONSTRAINT IF EXISTS unique_user_subject_name; -- Drop first if exists to avoid error

ALTER TABLE public.user_subjects
ADD CONSTRAINT unique_user_subject_name UNIQUE (user_id, name);

--------------------------------------------------------------------------------
-- 3. FIX RLS POLICIES FOR RESOURCE LIBRARY AND LEARNING PROFILES
--------------------------------------------------------------------------------
-- RESOURCE LIBRARY
alter table public.resource_library enable row level security;

drop policy if exists "Users can manage their own resources" on public.resource_library;
drop policy if exists "Parents can manage children resources" on public.resource_library;
drop policy if exists "Enable full access for owners and parents" on public.resource_library;

create policy "Enable full access for owners and parents"
on public.resource_library
for all
using (
  auth.uid() = student_id -- Eres tú mismo (perfil personal)
  or 
  exists ( -- O eres el padre del estudiante
    select 1 from public.students 
    where id = resource_library.student_id 
    and parent_id = auth.uid()
  )
)
with check (
  auth.uid() = student_id 
  or 
  exists (
    select 1 from public.students 
    where id = resource_library.student_id 
    and parent_id = auth.uid()
  )
);

-- LEARNING PROFILES
drop policy if exists "Enable upsert for parents" on public.learning_profiles;

create policy "Enable upsert for parents"
on public.learning_profiles
for all
using (
  auth.uid() = student_id
  or
  exists (
    select 1 from public.students
    where id = learning_profiles.student_id
    and parent_id = auth.uid()
  )
)
with check (
  auth.uid() = student_id
  or
  exists (
    select 1 from public.students
    where id = learning_profiles.student_id
    and parent_id = auth.uid()
  )
);

--------------------------------------------------------------------------------
-- 4. ENABLE RLS ON CURRICULAR TABLES (Fix RLS Simple)
--------------------------------------------------------------------------------
-- Problema: Políticas existen pero RLS no está activado
ALTER TABLE public.competencias_clave ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saberes_basicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.criterios_evaluacion ENABLE ROW LEVEL SECURITY;

-- Si existen más tablas, actívalas también
ALTER TABLE public.resultados_evaluacion ENABLE ROW LEVEL SECURITY;
