CREATE TABLE IF NOT EXISTS question_bank_local (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    source VARCHAR(50) DEFAULT 'KHAN_ACADEMY',
    topic VARCHAR(255) NOT NULL,
    grade_level VARCHAR(50),
    subject VARCHAR(50),
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) DEFAULT 'short_answer',
    options JSONB DEFAULT '[]'::jsonb,
    correct_answer TEXT,
    difficulty VARCHAR(20) DEFAULT 'media',
    image_url TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_question_bank_topic ON question_bank_local(topic);
CREATE INDEX IF NOT EXISTS idx_question_bank_subject ON question_bank_local(subject);

-- Enable RLS (open for now for simplicity, but good practice)
ALTER TABLE question_bank_local ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON question_bank_local FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON question_bank_local FOR INSERT WITH CHECK (true);
