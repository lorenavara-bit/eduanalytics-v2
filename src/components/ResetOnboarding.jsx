
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Trash2, AlertTriangle, RefreshCw } from 'lucide-react';

const ResetOnboarding = () => {
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!confirm("⚠️ ¿ESTÁS SEGURO? \n\nEsto borrará PERMANENTEMENTE todos tus estudiantes, perfiles de aprendizaje y recursos guardados. \n\nSe usará para simular un 'Usuario Nuevo'.")) return;

        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No user found");

            // 1. Delete Resources
            const { error: rError } = await supabase
                .from('resource_library')
                .delete()
                .eq('student_id', user.id);
            // Note: If you have child students, this might need to delete by their IDs too, 
            // but the simplified flow often uses user.id as student_id for the main profile.
            // Let's rely on Cascade usually, but Supabase Cascade depends on FK setup.

            // 2. Delete Learning Profiles
            const { error: lpError } = await supabase
                .from('learning_profiles')
                .delete()
                .eq('student_id', user.id); // Same logic

            // 3. Delete Students (Limit to those created by this parent)
            // Wait, if "Auto-Creation" uses user.id as student_id (self-profile)?
            // If the system treats the 'auth.user' as a student in 'profiles', we just clear fields.
            // But if we created rows in 'students' table:
            const { error: sError } = await supabase
                .from('students')
                .delete()
                .eq('parent_id', user.id);

            // 4. Reset 'profiles' table special fields (if any)
            await supabase
                .from('profiles')
                .update({
                    first_name: null,
                    full_name: null,
                    learning_style: null,
                    grade_level: null
                })
                .eq('id', user.id);

            alert("✅ Reset Completo. La página se recargará.");
            window.location.reload();

        } catch (error) {
            console.error("Reset Error:", error);
            alert("Error al resetear: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleReset}
            disabled={loading}
            className="fixed bottom-4 right-4 z-[9999] bg-red-600 text-white px-4 py-2 rounded-full shadow-2xl font-bold flex items-center gap-2 text-xs hover:bg-red-700 hover:scale-105 transition-all opacity-50 hover:opacity-100"
            title="Resetear para Testear Onboarding"
        >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            RESET DEMO
        </button>
    );
};

export default ResetOnboarding;
