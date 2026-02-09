-- Create Screenings/Diagnostics table
-- Supports: VARK, Multiple Intelligences, CHAEA, Special Needs screening
CREATE TABLE IF NOT EXISTS public.nee_screenings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
    test_type TEXT NOT NULL, -- 'vark', 'multiple_intelligences', 'chaea', 'early_detection_primary'
    results JSONB DEFAULT '{}'::jsonb, -- Stores the raw scores and calculated profiles
    metadata JSONB DEFAULT '{}'::jsonb, -- Additional context
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.nee_screenings ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Users can view screenings" ON public.nee_screenings;
CREATE POLICY "Users can view screenings"
    ON public.nee_screenings FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Users can insert screenings" ON public.nee_screenings;
CREATE POLICY "Users can insert screenings"
    ON public.nee_screenings FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update screenings" ON public.nee_screenings;
CREATE POLICY "Users can update screenings"
    ON public.nee_screenings FOR UPDATE
    USING (true);

-- Index for fast retrieval of latest tests
CREATE INDEX IF NOT EXISTS idx_screenings_student_date ON public.nee_screenings(student_id, created_at DESC);
