-- FOOLPROOF RLS POLICY FOR RESOURCE LIBRARY
-- Only run this if the "Disable RLS" test confirmed that RLS was the issue.

-- 1. Re-enable RLS
ALTER TABLE public.resource_library ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing potentially broken policies
DROP POLICY IF EXISTS "Enable full access for owners and parents" ON public.resource_library;
DROP POLICY IF EXISTS "Users can manage their own resources" ON public.resource_library;
DROP POLICY IF EXISTS "Parents can manage children resources" ON public.resource_library;
DROP POLICY IF EXISTS "rls_resource_library_all" ON public.resource_library;

-- 3. Create a single, permissive policy for Parents
-- This allows the parent (auth.uid()) to do ANYTHING (select, insert, update, delete)
-- on any resource where the associated student belongs to them.
CREATE POLICY "parent_full_access"
ON public.resource_library
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.students
        WHERE public.students.id = public.resource_library.student_id
        AND public.students.parent_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.students
        WHERE public.students.id = public.resource_library.student_id
        AND public.students.parent_id = auth.uid()
    )
);

-- 4. Reload Schema Cache to apply immediately
NOTIFY pgrst, 'reload config';
