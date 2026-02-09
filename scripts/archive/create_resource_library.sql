-- Activar extensión para timestamps
create extension if not exists moddatetime schema extensions;

-- Tabla para la Biblioteca de Recursos (Mochila Digital + Futuro Cerebro Compartido)
drop table if exists public.resource_library;

create table public.resource_library (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.profiles(id) not null,
  
  -- Metadatos del Recurso
  title text not null,
  description text,
  resource_type text not null, -- Ej: 'FEYNMAN', 'POMODORO', 'MindMap', 'QUIZ'
  topic text, -- Ej: 'La Guerra Civil'
  subject text, -- Ej: 'Historia'
  
  -- Contenido Real (JSON para flexibilidad total: estructura del taller, preguntas, etc.)
  content jsonb not null, 
  
  -- Métricas Híbridas (Preparado para Fase C)
  is_public boolean default false, -- Solo TRUE si pasa filtros de calidad
  is_curated boolean default false, -- Revisión manual/profesor
  
  ai_quality_score integer default null, -- 0-100 (Nota de la IA Supervisora)
  user_engagement_score integer default 0, -- Puntos por uso/apertura (Juez Silencioso)
  downloads_count integer default 0, -- Veces exportado a PDF
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS (Seguridad)
alter table public.resource_library enable row level security;

-- Política 1: El dueño puede hacer TODO con sus recursos
create policy "Users can manage their own resources"
  on public.resource_library for all
  using (auth.uid() = student_id)
  with check (auth.uid() = student_id);

-- Política 2: Todo el mundo puede LEER recursos que sean PÚBLICOS (Futuro)
create policy "Users can view public resources"
  on public.resource_library for select
  using (is_public = true);

-- Disparador para actualizar updated_at
create trigger handle_updated_at before update on public.resource_library
  for each row execute procedure moddatetime (updated_at);
