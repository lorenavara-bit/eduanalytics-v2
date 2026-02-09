import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

/**
 * GOLD MEDAL VISUAL EFFECT
 * Dispara confeti dorado y muestra un halo brillante.
 * Usar cuando el usuario consigue nivel "Gold".
 */
const GoldMedalEffect = ({ children }) => {

    useEffect(() => {
        // Disparar confeti al montar
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Confeti Dorado (Gold & Yellow colors)
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#FFD700', '#FFA500', '#FFFFFF']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#FFD700', '#FDB931', '#FFFFE0']
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-sm mx-auto p-1">
            {/* Halo de Brillo Trasero */}
            <div className="absolute inset-0 bg-gold-shine blur-xl opacity-50 rounded-2xl animate-pulse"></div>

            {/* Tarjeta Principal */}
            <div className="relative bg-gold-shine rounded-xl p-6 shadow-2xl animate-medal-pop border border-yellow-200 text-center text-brown-900">
                <div className="absolute top-0 left-0 w-full h-full shine-effect pointer-events-none rounded-xl"></div>

                {/* Contenido (Icono de medalla + Texto) */}
                <div className="relative z-10 font-bold text-yellow-900 drop-shadow-md">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default GoldMedalEffect;
