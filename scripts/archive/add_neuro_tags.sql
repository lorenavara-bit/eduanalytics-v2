-- MIGRATION: Add Pedagogical and Neuro-Education Tags to Question Bank
-- This enables "Surgical Precision" filtering for VARK and Multiple Intelligences

-- 1. Add Pedagogical Focus (The "What")
ALTER TABLE question_bank_local 
ADD COLUMN IF NOT EXISTS foco_pedagogico VARCHAR(50) 
CHECK (foco_pedagogico IN ('concepto', 'procedimiento', 'aplicacion'));

-- 2. Add VARK Tags (The "How")
-- Stored as an array because a question can be valid for multiple styles (e.g. Visual + Kinesthetic)
ALTER TABLE question_bank_local 
ADD COLUMN IF NOT EXISTS vark_styles TEXT[]; 
-- Example: ['visual', 'kinesthetic']

-- 3. Add Multiple Intelligences (The "Talent")
ALTER TABLE question_bank_local 
ADD COLUMN IF NOT EXISTS multiple_intelligences TEXT[];
-- Example: ['logical_mathematical', 'spatial']

-- 4. Create Indexes for fast filtering
CREATE INDEX IF NOT EXISTS idx_foco_pedagogico ON question_bank_local(foco_pedagogico);
CREATE INDEX IF NOT EXISTS idx_vark_styles ON question_bank_local USING GIN(vark_styles);
CREATE INDEX IF NOT EXISTS idx_multiple_intelligences ON question_bank_local USING GIN(multiple_intelligences);

-- Comment: This structure allows queries like:
-- "SELECT * FROM questions WHERE 'visual' = ANY(vark_styles) AND foco_pedagogico = 'procedimiento'"
