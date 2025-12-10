-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Extends auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  role text check (role in ('student', 'parent', 'admin')) default 'student',
  full_name text,
  grade_level text, -- e.g., '1 ESO', '2 Bachillerato'
  learning_style text, -- e.g., 'visual', 'auditory'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- 2. SUBJECTS TABLE (Standard list of subjects)
create table public.subjects (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Init default subjects
insert into public.subjects (name) values 
('Matemáticas'), ('Lengua Castellana'), ('Historia'), ('Geografía'), 
('Física'), ('Química'), ('Biología'), ('Inglés'), ('Filosofía');

-- Enable RLS
alter table public.subjects enable row level security;

create policy "Subjects are viewable by everyone"
  on subjects for select
  using ( true );

-- 3. WORKSHEETS TABLE (Stores AI generated content)
create table public.worksheets (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.profiles(id) not null,
  subject_id uuid references public.subjects(id),
  topic text not null,
  difficulty_level text check (difficulty_level in ('basic', 'intermediate', 'advanced')),
  content jsonb not null, -- Stores the generated questions/content
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.worksheets enable row level security;

create policy "Users can view their own worksheets"
  on worksheets for select
  using ( auth.uid() = student_id );

create policy "Users can insert their own worksheets"
  on worksheets for insert
  with check ( auth.uid() = student_id );

-- 4. STUDENT ANSWERS (Stores user responses)
create table public.student_answers (
  id uuid default uuid_generate_v4() primary key,
  worksheet_id uuid references public.worksheets(id) not null,
  student_id uuid references public.profiles(id) not null,
  answers jsonb not null, -- Stores student's answers
  score numeric, -- Optional score if auto-graded
  feedback text, -- AI feedback
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.student_answers enable row level security;

create policy "Users can view their own answers"
  on student_answers for select
  using ( auth.uid() = student_id );

create policy "Users can insert their own answers"
  on student_answers for insert
  with check ( auth.uid() = student_id );

-- 5. STORAGE BUCKETS (If using file uploads)
-- Note: Buckets are usually created via dashboard, but we can set up policies if the bucket exists 'uploads'
-- insert into storage.buckets (id, name) values ('uploads', 'uploads');

