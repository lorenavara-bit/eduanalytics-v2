-- Fix permissions for exercise_cache table
-- This table stores AI-generated worksheets to save costs/time on future requests

CREATE TABLE IF NOT EXISTS exercise_cache (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    subject VARCHAR(255),
    grade VARCHAR(50),
    topic VARCHAR(255),
    editorial VARCHAR(100),
    challenge_level VARCHAR(50),
    content JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(subject, grade, topic, editorial, challenge_level)
);

-- Enable RLS
ALTER TABLE exercise_cache ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable read access for all users" ON exercise_cache;
DROP POLICY IF EXISTS "Enable insert for all users" ON exercise_cache;
DROP POLICY IF EXISTS "Enable update for all users" ON exercise_cache;

-- Re-create policies allowing access (adjust 'true' to specific roles if needed in production)
CREATE POLICY "Enable read access for all users" ON exercise_cache 
FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON exercise_cache 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON exercise_cache 
FOR UPDATE USING (true);
