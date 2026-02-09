-- OPTION 1: RESET EVERYTHING (Recommended for cleaning up your local/dev environment)
-- This deletes ALL subjects and linked files for EVERYONE.
TRUNCATE TABLE public.study_materials CASCADE;
TRUNCATE TABLE public.user_subjects CASCADE;

-- OPTION 2: RESET ONLY FOR YOUR USER (If you want to be careful)
-- Uncomment the lines below and replace 'YOUR_USER_ID' with your actual UUID
-- DELETE FROM public.study_materials WHERE user_id = 'YOUR_USER_ID';
-- DELETE FROM public.user_subjects WHERE user_id = 'YOUR_USER_ID';
