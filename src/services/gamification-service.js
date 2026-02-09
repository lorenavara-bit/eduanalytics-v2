import { supabase } from '../supabaseClient';

const LEVEL_THRESHOLDS = [
    0, 100, 250, 500, 1000, 2000, 4000, 8000, 15000, 30000 // XP required for level 1, 2, 3...
];

export const GamificationService = {

    /**
     * Get current profile or create if missing
     */
    async getProfile(studentId) {
        let { data, error } = await supabase
            .from('gamification_profiles')
            .select('*')
            .eq('student_id', studentId)
            .single();

        if (!data && !error) {
            // Need to insert? Or error code PGRST116 (0 rows)
        }

        if (error && (error.code === 'PGRST116' || !data)) {
            // Create default
            const { data: newData, error: createError } = await supabase
                .from('gamification_profiles')
                .insert({ student_id: studentId, total_xp: 0, current_level: 1 })
                .select()
                .single();

            if (createError) throw createError;
            return newData;
        }

        if (error) throw error;
        return data;
    },

    /**
     * Add XP and calculate level up
     */
    async addXp(studentId, amount, reason, metadata = {}) {
        try {
            const profile = await this.getProfile(studentId);
            const newXp = (profile.total_xp || 0) + amount;

            // Calculate Level
            let newLevel = profile.current_level;
            // Simple loop to find level
            for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
                if (newXp >= LEVEL_THRESHOLDS[i]) {
                    newLevel = i + 1;
                }
            }
            // Logic for levels beyond array
            if (newXp > LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]) {
                const extra = newXp - LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
                newLevel = 10 + Math.floor(extra / 10000);
            }

            // Did level up?
            const leveledUp = newLevel > profile.current_level;

            // Update Profile
            await supabase
                .from('gamification_profiles')
                .update({
                    total_xp: newXp,
                    current_level: newLevel,
                    updated_at: new Date().toISOString()
                })
                .eq('student_id', studentId);

            // Log Activity
            await supabase.from('student_activity_log').insert({
                student_id: studentId,
                activity_type: reason,
                xp_earned: amount,
                metadata: { ...metadata, leveled_up: leveledUp }
            });

            return { newXp, newLevel, leveledUp };
        } catch (error) {
            console.error("Gamification Error:", error);
            return null;
        }
    },

    /**
     * Call this when a student finishes a worksheet to update streak
     */
    async updateStreak(studentId) {
        const profile = await this.getProfile(studentId);
        const lastDate = profile.last_study_date ? new Date(profile.last_study_date) : null;
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];

        let newStreak = profile.current_streak;

        if (!lastDate) {
            // First time
            newStreak = 1;
        } else {
            const lastDateStr = lastDate.toISOString().split('T')[0];
            // If already studied today, do nothing
            if (lastDateStr === todayStr) {
                return { streak: newStreak, updated: false };
            }

            // Check if yesterday
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastDateStr === yesterdayStr) {
                newStreak += 1;
            } else {
                // Streak broken
                newStreak = 1;
            }
        }

        await supabase
            .from('gamification_profiles')
            .update({
                current_streak: newStreak,
                last_study_date: todayStr
            })
            .eq('student_id', studentId);

        return { streak: newStreak, updated: true };
    }
};
