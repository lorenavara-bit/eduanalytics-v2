-- 1. Create table 'user_subjects' (Personalized subjects for each user)
create table if not exists public.user_subjects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  education_level text, -- 'primaria', 'eso', etc.
  textbook_info text,   -- Stores the book name
  is_custom boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for user_subjects
alter table public.user_subjects enable row level security;

create policy "Users can view their own subjects"
  on public.user_subjects for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own subjects"
  on public.user_subjects for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own subjects"
  on public.user_subjects for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own subjects"
  on public.user_subjects for delete
  using ( auth.uid() = user_id );

-- 2. Create table 'study_materials' (Metadata for uploaded files)
create table if not exists public.study_materials (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  subject_id uuid references public.user_subjects(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  file_type text,
  storage_path text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for study_materials
alter table public.study_materials enable row level security;

create policy "Users can view their own materials"
  on public.study_materials for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own materials"
  on public.study_materials for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete their own materials"
  on public.study_materials for delete
  using ( auth.uid() = user_id );


-- 3. Storage Bucket Setup for 'study_materials'
-- ATTEMPT to create bucket (this might fail if running as non-super but mostly works in SQL Editor)
insert into storage.buckets (id, name, public) 
values ('study_materials', 'study_materials', true)
on conflict (id) do nothing;

-- Storage Policies
-- Remove existing policies to avoid conflicts if re-running
drop policy if exists "Materials are publicly accessible" on storage.objects;
drop policy if exists "Users can upload their own materials" on storage.objects;
drop policy if exists "Users can delete their own materials" on storage.objects;

create policy "Materials are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'study_materials' );

create policy "Users can upload their own materials"
  on storage.objects for insert
  with check ( 
    bucket_id = 'study_materials' 
    and auth.uid()::text = (storage.foldername(name))[1] 
  );

create policy "Users can delete their own materials"
  on storage.objects for delete
  using ( 
    bucket_id = 'study_materials' 
    and auth.uid()::text = (storage.foldername(name))[1] 
  );
