-- Create Gamification Profiles table
CREATE TABLE IF NOT EXISTS gamification_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
    total_xp INTEGER DEFAULT 0,
    current_level INTEGER DEFAULT 1,
    current_streak INTEGER DEFAULT 0,
    last_activity_date TIMESTAMP WITH TIME ZONE,
    badges JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id)
);

-- Enable RLS
ALTER TABLE gamification_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can read all profiles (for leaderboards/friends)
DROP POLICY IF EXISTS "Users can view gamification profiles" ON gamification_profiles;
CREATE POLICY "Users can view gamification profiles"
    ON gamification_profiles FOR SELECT
    USING (true);

-- Policy: Authenticated users can update profiles
DROP POLICY IF EXISTS "Users can update gamification profiles" ON gamification_profiles;
CREATE POLICY "Users can update gamification profiles"
    ON gamification_profiles FOR ALL
    USING (true);

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_gamification_student ON gamification_profiles(student_id);

-- Create XP History table (Transaction Log)
CREATE TABLE IF NOT EXISTS xp_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    reason TEXT NOT NULL, -- e.g. 'completed_worksheet', 'daily_login'
    metadata JSONB DEFAULT '{}'::jsonb, -- e.g. { "topic": "Fractions", "score": 100 }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Policy for XP History
ALTER TABLE xp_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view xp history" ON xp_history;
CREATE POLICY "Users can view xp history"
    ON xp_history FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Users can insert xp history" ON xp_history;
CREATE POLICY "Users can insert xp history"
    ON xp_history FOR INSERT
    WITH CHECK (true);
