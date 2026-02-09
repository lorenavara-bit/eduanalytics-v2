-- Clean up duplicate subjects
-- This script keeps only one instance of each subject name per user.

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

-- Note: This is safe to run multiple times. It simply enforces uniqueness.
