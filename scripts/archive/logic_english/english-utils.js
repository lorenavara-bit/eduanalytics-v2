// ==========================================
// UTILIDADES COMPARTIDAS PARA GENERADORES DE INGLÉS
// ==========================================

export const generarIdentificadorUnico = () => {
    return Math.random().toString(36).substr(2, 9);
};

export const seleccionarElementoAleatorio = (array, excluidos = []) => {
    // Filtrar elementos excluidos
    const disponibles = array.filter(item => {
        // Si el elemento es un objeto con id, comparar ids
        if (typeof item === 'object' && item.id) {
            return !excluidos.some(e => e.id === item.id);
        }
        // Si no, comparar valor directo
        return !excluidos.includes(item);
    });

    if (disponibles.length === 0) return null;
    return disponibles[Math.floor(Math.random() * disponibles.length)];
};

export const mezcladorDeArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
