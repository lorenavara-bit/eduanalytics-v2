-- 1. First, ensure duplicates are removed (Just in case you haven't run the fix script)
DELETE FROM public.user_subjects
WHERE id IN (
    SELECT id
    FROM (
        SELECT id,
        ROW_NUMBER() OVER (partition BY user_id, name ORDER BY created_at ASC) as r_num
        FROM public.user_subjects
    ) t
    WHERE t.r_num > 1
);

-- 2. Add a UNIQUE constraint
-- This ensures the database automatically rejects any attempt to insert a duplicate subject for the same user.
ALTER TABLE public.user_subjects
ADD CONSTRAINT unique_user_subject_name UNIQUE (user_id, name);
