// Hook para gestionar el plan del usuario (Beta/Premium)

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { getPlanInfo, canUseFeature, isPremiumPlan, getFormattedPrice } from '../utils/plans';

/**
 * Hook para obtener y gestionar el plan del usuario
 * @returns {object} Información del plan del usuario
 */
export function usePlan() {
    const [plan, setPlan] = useState('beta');  // Por defecto beta
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar plan del usuario al montar el componente
    useEffect(() => {
        loadUserPlan();
    }, []);

    /**
     * Cargar plan del usuario desde Supabase
     */
    async function loadUserPlan() {
        try {
            setLoading(true);
            setError(null);

            // Obtener usuario actual
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError) throw userError;

            if (user) {
                // Obtener perfil con el campo 'plan'
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('plan')
                    .eq('id', user.id)
                    .single();

                if (profileError) {
                    console.warn('Error cargando perfil:', profileError);
                    setPlan('beta'); // Fallback a beta si hay error
                } else {
                    setPlan(profile?.plan || 'beta');
                }
            } else {
                setPlan('beta'); // Sin usuario = beta
            }
        } catch (err) {
            console.error('Error en usePlan:', err);
            setError(err.message);
            setPlan('beta'); // Fallback a beta en caso de error
        } finally {
            setLoading(false);
        }
    }

    /**
     * Cambiar plan del usuario (para testing)
     * En producción esto se haría a través de Stripe
     */
    async function changePlan(newPlan) {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                throw new Error('Usuario no autenticado');
            }

            const { error } = await supabase
                .from('profiles')
                .update({ plan: newPlan })
                .eq('id', user.id);

            if (error) throw error;

            setPlan(newPlan);
            console.log(`✅ Plan cambiado a: ${newPlan}`);

            return true;
        } catch (err) {
            console.error('Error cambiando plan:', err);
            setError(err.message);
            return false;
        }
    }

    // Información del plan
    const planInfo = getPlanInfo(plan);

    return {
        // Estado
        plan,                           // 'beta' o 'premium'
        loading,
        error,

        // Información del plan
        planInfo,                       // Objeto completo con toda la info
        planName: planInfo.name,        // 'Beta Gratuita' o 'Premium'
        planPrice: getFormattedPrice(plan),  // 'Gratis' o '€7.99/mes'
        planFeatures: planInfo.features,     // Array de características

        // Helpers booleanos
        isPremium: isPremiumPlan(plan), // true si es premium
        isBeta: plan === 'beta',        // true si es beta

        // Verificar características
        canUse: (feature) => canUseFeature(plan, feature),

        // Acciones
        changePlan,    // Cambiar plan (solo para testing)
        reload: loadUserPlan  // Recargar plan
    };
}

export default usePlan;
