// src/services/riskCalculator.js
/**
 * Centralized risk calculation for early detection games.
 * Returns 'LOW', 'MEDIUM' or 'HIGH' based on the test type and result payload.
 */
export const calculateRiskFromGame = (type, results) => {
    // Dislexia
    if (type === 'DYSLEXIA') {
        return results.accuracy < 70 ? 'HIGH' : (results.accuracy < 85 ? 'MEDIUM' : 'LOW');
    }
    // TDAH
    if (type === 'TDAH') {
        return (results.commissions > 4 || results.hits < 4) ? 'HIGH' : (results.commissions > 2 ? 'MEDIUM' : 'LOW');
    }
    // Altas Capacidades (AACC) – high score indicates giftedness
    if (type === 'AACC') {
        const score = results.filter(r => r.isCorrect).length;
        return score >= 4 ? 'HIGH' : 'LOW';
    }
    // Raven Progressive Matrices (12 items)
    if (type === 'RAVEN') {
        const percent = (results.score / results.total) * 100;
        return percent >= 70 ? 'HIGH' : (percent >= 50 ? 'MEDIUM' : 'LOW');
    }
    // Cattell Culture‑Fair
    if (type === 'CATTELL') {
        const percent = (results.score / results.total) * 100;
        return percent >= 70 ? 'LOW' : (percent >= 50 ? 'MEDIUM' : 'HIGH');
    }
    // WISC / WAIS sub‑tests
    if (type === 'WISC') {
        const percent = (results.score / results.total) * 100;
        return percent >= 70 ? 'LOW' : (percent >= 50 ? 'MEDIUM' : 'HIGH');
    }
    // Fundación Telefónica (detecta altas capacidades)
    if (type === 'TELEFONICA') {
        const percent = (results.score / results.total) * 100;
        return percent >= 70 ? 'HIGH' : (percent >= 50 ? 'MEDIUM' : 'LOW');
    }
    // TTCT – creatividad
    if (type === 'TTCT') {
        const percent = (results.score / results.total) * 100;
        return percent >= 70 ? 'HIGH' : (percent >= 50 ? 'MEDIUM' : 'LOW');
    }
    // Holland interests
    if (type === 'HOLLAND') {
        return results.matchesHigh ? 'LOW' : 'MEDIUM';
    }
    return 'LOW';
};
