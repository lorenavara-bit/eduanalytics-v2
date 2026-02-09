-- 🏗️ UGE v2.0 SCHEMA (Universal Grammar Engine)
-- Migration Strategy: JSON/File -> Supabase Relational
-- Date: 2026-02-04

-- 1. Enable UUID extension if not exists
create extension if not exists "uuid-ossp";

-- 2. TABLE: GRAMMAR RULES (The "Brain")
-- This table replaces 'english-error-taxonomy-4primaria.json'
create table if not exists uge_grammar_rules (
    id uuid default uuid_generate_v4() primary key,
    rule_code text unique not null,         -- e.g., "PS_DO_DOES_AGREEMENT"
    topic text not null,                    -- e.g., "Present Simple"
    scope_tag text not null,                -- 🔑 CRITICAL: "GRAMMAR_PRESENT_SIMPLE", "GRAMMAR_COMPARATIVES"
    regex_pattern text not null,            -- The RegEx logic
    pedagogy_data jsonb not null,           -- Stores the 3-level hints (Diamond Feedback)
    lomloe_ref text,                        -- e.g., "CP, STEM"
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for faster lookup by scope
create index if not exists idx_grammar_scope on uge_grammar_rules(scope_tag);


-- 3. TABLE: EXERCISES (The "Content")
-- This table replaces 'santillana-4-primaria-INGLES.js'
create table if not exists uge_exercises (
    id uuid default uuid_generate_v4() primary key,
    source_unit text not null,              -- e.g., "Unit 1: Present Simple"
    academic_level text default '4º Primaria', -- e.g., "A1", "4º Primaria"
    question_type text not null,            -- "Grammar", "Word Order", "Vocabulary"
    prompt text not null,                   -- The question: "She ____ (go) to school."
    correct_answer text not null,           -- "goes"
    
    -- 🛡️ SCOPE GUARDING: Define which rules apply here
    -- Default: Always check spelling + global rules. Specific grammar is added per unit.
    valid_scopes text[] default '{"GLOBAL_SPELLING", "GLOBAL_SYNTAX"}'::text[],
    
    legacy_metadata jsonb,                  -- Store old 'explicacionDiamante' just in case
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for creating exercise sets by unit
create index if not exists idx_exercise_unit on uge_exercises(source_unit);

-- 4. RLS POLICIES (Security)
alter table uge_grammar_rules enable row level security;
alter table uge_exercises enable row level security;

-- Allow public read (for the app)
create policy "Public rules access" on uge_grammar_rules for select using (true);
create policy "Public exercises access" on uge_exercises for select using (true);

-- 5. FUNCTION: The "Surgical Evaluation" Logic
-- This function runs on Supabase to prevent "Global Scope Contamination"
-- It fetches only the rules allowed by the exercise's scopes.
/*
  Example Logic (Client-side or Edge Function):
  1. Get Exercise -> Read 'valid_scopes' (e.g. ['GLOBAL', 'COMPARATIVES'])
  2. Fetch Rules -> WHERE scope_tag IN (exercise.valid_scopes)
  3. Apply Regex -> Return Feedback
*/
