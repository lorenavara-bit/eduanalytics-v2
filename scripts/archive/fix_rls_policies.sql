-- Arreglar políticas RLS para Resource Library y Learning Profiles
-- Permitir que los padres gestionen los recursos de sus hijos

-- 1. RESOURCE LIBRARY
alter table public.resource_library enable row level security;

drop policy if exists "Users can manage their own resources" on public.resource_library;
drop policy if exists "Parents can manage children resources" on public.resource_library;

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

-- 2. LEARNING PROFILES (Por si acaso)
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
