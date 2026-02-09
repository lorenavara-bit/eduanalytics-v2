// Llave única para los datos de tu hijo en LocalStorage
const STORAGE_KEY = 'antigravity_progress_v1';

export const ProgresoService = {
    /**
     * Guarda el resultado acumulado de una sesión de trabajo
     * @param {number} puntosNuevos - Puntos XP ganados en la ficha
     * @param {object} medallasNuevas - Objeto { gold: X, silver: Y, bronze: Z }
     */
    guardarSesion: (puntosNuevos, medallasNuevas) => {
        const actual = ProgresoService.obtenerProgreso();

        // Sumar puntos
        const nuevosPuntos = (actual.puntosTotales || 0) + puntosNuevos;

        // Sumar medallas
        const nuevasMedallas = {
            gold: (actual.medallas?.gold || 0) + (medallasNuevas.gold || 0),
            silver: (actual.medallas?.silver || 0) + (medallasNuevas.silver || 0),
            bronze: (actual.medallas?.bronze || 0) + (medallasNuevas.bronze || 0)
        };

        const nuevoProgreso = {
            puntosTotales: nuevosPuntos,
            medallas: nuevasMedallas,
            ultimoAcceso: new Date().toISOString(),
            // Aquí podríamos añadir lógica de calendario/racha si quisiéramos complicarlo
            rachaDias: actual.rachaDias || 1
        };

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoProgreso));
            console.log("💾 Progreso local guardado:", nuevoProgreso);
        } catch (e) {
            console.error("Error guardando progreso local:", e);
        }

        return nuevoProgreso;
    },

    /**
     * Recupera el progreso acumulado del navegador
     */
    obtenerProgreso: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : {
                puntosTotales: 0,
                medallas: { gold: 0, silver: 0, bronze: 0 },
                rachaDias: 0
            };
        } catch (e) {
            console.error("Error leyendo progreso local:", e);
            return { puntosTotales: 0, medallas: { gold: 0, silver: 0, bronze: 0 } };
        }
    },

    /**
     * Resetea el progreso (útil para empezar trimestre o debug)
     */
    borrarProgreso: () => {
        localStorage.removeItem(STORAGE_KEY);
    },

    // --- SISTEMA DE NIVELES (GO FAR 4) ---
    calcularNivelActual: (totalXP) => {
        const NIVELES_GO_FAR = [
            { nivel: 1, nombre: "English Rookie 🥚", xpRequerida: 0 },
            { nivel: 2, nombre: "Junior Explorer 🔍", xpRequerida: 500 },
            { nivel: 3, nombre: "Star Student ⭐", xpRequerida: 1200 },
            { nivel: 4, nombre: "Language Ranger 🤠", xpRequerida: 2500 },
            { nivel: 5, nombre: "English Master 👑", xpRequerida: 5000 }
        ];

        // Buscamos el nivel más alto alcanzado
        // [...matrix].reverse() para encontrar el primero que cumpla xp >= requerida desde arriba
        const nivelAlcanzado = [...NIVELES_GO_FAR].reverse().find(n => totalXP >= n.xpRequerida) || NIVELES_GO_FAR[0];

        // Calculamos el % de progreso hacia el SIGUIENTE nivel
        const siguienteNivel = NIVELES_GO_FAR.find(n => n.nivel === (nivelAlcanzado.nivel + 1));

        let progresoPorcentaje = 100;
        let xpFaltante = 0;

        if (siguienteNivel) {
            const xpEnEsteNivel = totalXP - nivelAlcanzado.xpRequerida;
            const xpRango = siguienteNivel.xpRequerida - nivelAlcanzado.xpRequerida;
            progresoPorcentaje = Math.min(100, Math.max(0, (xpEnEsteNivel / xpRango) * 100)); // Clamp 0-100
            xpFaltante = siguienteNivel.xpRequerida - totalXP;
        }

        return {
            ...nivelAlcanzado,
            siguienteNivel: siguienteNivel || null,
            progresoPorcentaje: Math.round(progresoPorcentaje),
            xpFaltante
        };
    }
};

export default ProgresoService;
