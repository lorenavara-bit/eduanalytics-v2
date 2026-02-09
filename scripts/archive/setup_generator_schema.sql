create table if not exists public.user_subjects (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) not null,
    name text not null, -- e.g. "Matemáticas", "Gallego"
    textbook_info text, -- e.g. "Santillana Saber Hacer"
    education_level text, -- 'primaria', 'eso', etc.
    is_custom boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for subjects
alter table public.user_subjects enable row level security;
create policy "Users can manage their own subjects"
    on public.user_subjects for all
    using (auth.uid() = user_id);

-- 2. Create table for STudy Materials (Files)
create table if not exists public.study_materials (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) not null,
    subject_id uuid references public.user_subjects(id) on delete cascade,
    file_name text not null,
    file_url text not null, -- Supabase Storage URL
    file_type text, -- 'pdf', 'image', etc.
    storage_path text, -- e.g. "user_id/filename.pdf"
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for materials
alter table public.study_materials enable row level security;
create policy "Users can manage their own materials"
    on public.study_materials for all
    using (auth.uid() = user_id);

-- 3. Create table for Generated Worksheets (History)
create table if not exists public.generated_worksheets (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) not null,
    subject_name text,
    topic text,
    content jsonb, -- Stores the generated HTML/Markdown
    config jsonb, -- Stores difficulty, type, etc.
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for history
alter table public.generated_worksheets enable row level security;
create policy "Users can manage their own worksheets"
    on public.generated_worksheets for all
    using (auth.uid() = user_id);

-- 4. Storage Bucket Setup (Attempt to create via SQL)
-- Note: If this fails, user must create bucket 'study_materials' manually in dashboard.
insert into storage.buckets (id, name, public) 
values ('study_materials', 'study_materials', true)
on conflict (id) do nothing;

-- Storage Policies for 'study_materials'
create policy "Users can upload study materials"
  on storage.objects for insert
  with check ( bucket_id = 'study_materials' and auth.role() = 'authenticated' );

create policy "Users can view study materials"
  on storage.objects for select
  using ( bucket_id = 'study_materials' and auth.role() = 'authenticated' );

create policy "Users can delete study materials"
  on storage.objects for delete
  using ( bucket_id = 'study_materials' and auth.role() = 'authenticated' );
