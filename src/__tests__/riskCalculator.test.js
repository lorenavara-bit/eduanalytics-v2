import { calculateRiskFromGame } from '../services/riskCalculator';

describe('calculateRiskFromGame', () => {
    // Dislexia
    test('DYSLEXIA low risk', () => {
        expect(calculateRiskFromGame('DYSLEXIA', { accuracy: 90 })).toBe('LOW');
    });
    test('DYSLEXIA medium risk', () => {
        expect(calculateRiskFromGame('DYSLEXIA', { accuracy: 80 })).toBe('MEDIUM');
    });
    test('DYSLEXIA high risk', () => {
        expect(calculateRiskFromGame('DYSLEXIA', { accuracy: 60 })).toBe('HIGH');
    });

    // TDAH
    test('TDAH low risk', () => {
        expect(calculateRiskFromGame('TDAH', { commissions: 1, hits: 5 })).toBe('LOW');
    });
    test('TDAH medium risk', () => {
        expect(calculateRiskFromGame('TDAH', { commissions: 3, hits: 5 })).toBe('MEDIUM');
    });
    test('TDAH high risk', () => {
        expect(calculateRiskFromGame('TDAH', { commissions: 5, hits: 3 })).toBe('HIGH');
    });

    // AACC (giftedness)
    test('AACC high (gifted)', () => {
        const results = [{ isCorrect: true }, { isCorrect: true }, { isCorrect: true }, { isCorrect: true }];
        expect(calculateRiskFromGame('AACC', results)).toBe('HIGH');
    });
    test('AACC low', () => {
        const results = [{ isCorrect: true }, { isCorrect: false }];
        expect(calculateRiskFromGame('AACC', results)).toBe('LOW');
    });

    // Raven
    test('RAVEN low risk (>=70%)', () => {
        expect(calculateRiskFromGame('RAVEN', { score: 9, total: 12 })).toBe('LOW');
    });
    test('RAVEN medium risk (50-69%)', () => {
        expect(calculateRiskFromGame('RAVEN', { score: 6, total: 12 })).toBe('MEDIUM');
    });
    test('RAVEN high risk (<50%)', () => {
        expect(calculateRiskFromGame('RAVEN', { score: 4, total: 12 })).toBe('HIGH');
    });

    // Cattell
    test('CATTELL low risk', () => {
        expect(calculateRiskFromGame('CATTELL', { score: 10, total: 12 })).toBe('LOW');
    });
    test('CATTELL medium risk', () => {
        expect(calculateRiskFromGame('CATTELL', { score: 6, total: 12 })).toBe('MEDIUM');
    });
    test('CATTELL high risk', () => {
        expect(calculateRiskFromGame('CATTELL', { score: 4, total: 12 })).toBe('HIGH');
    });

    // WISC
    test('WISC low risk', () => {
        expect(calculateRiskFromGame('WISC', { score: 9, total: 12 })).toBe('LOW');
    });
    test('WISC medium risk', () => {
        expect(calculateRiskFromGame('WISC', { score: 6, total: 12 })).toBe('MEDIUM');
    });
    test('WISC high risk', () => {
        expect(calculateRiskFromGame('WISC', { score: 4, total: 12 })).toBe('HIGH');
    });

    // Telefónica
    test('TELEFONICA high giftedness (>=70%)', () => {
        expect(calculateRiskFromGame('TELEFONICA', { score: 9, total: 12 })).toBe('HIGH');
    });
    test('TELEFONICA medium', () => {
        expect(calculateRiskFromGame('TELEFONICA', { score: 6, total: 12 })).toBe('MEDIUM');
    });
    test('TELEFONICA low', () => {
        expect(calculateRiskFromGame('TELEFONICA', { score: 4, total: 12 })).toBe('LOW');
    });

    // TTCT
    test('TTCT high creativity', () => {
        expect(calculateRiskFromGame('TTCT', { score: 8, total: 10 })).toBe('HIGH');
    });
    test('TTCT medium creativity', () => {
        expect(calculateRiskFromGame('TTCT', { score: 5, total: 10 })).toBe('MEDIUM');
    });
    test('TTCT low creativity', () => {
        expect(calculateRiskFromGame('TTCT', { score: 3, total: 10 })).toBe('LOW');
    });

    // Holland
    test('HOLLAND matches high -> LOW risk', () => {
        expect(calculateRiskFromGame('HOLLAND', { matchesHigh: true })).toBe('LOW');
    });
    test('HOLLAND no high match -> MEDIUM risk', () => {
        expect(calculateRiskFromGame('HOLLAND', { matchesHigh: false })).toBe('MEDIUM');
    });
});
