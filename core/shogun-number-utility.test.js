import {ShogunNumberUtility} from "./shogun-number-utility";

describe('ShogunNumberUtility', () => {
    const utility = new ShogunNumberUtility();

    test('throws error if fromInclusive is equal toExclusive', () => {
        const from = 5;
        const to = 5;
        expect(() => utility.getRandomIntegerNumber(from, to)).toThrow(Error);
    });

    test('throws error if fromInclusive is greater than toExclusive', () => {
        const from = 5;
        const to = 3;
        expect(() => utility.getRandomIntegerNumber(from, to)).toThrow(Error);
    });

    test('returns fromInclusive if toExclusive is just one more than fromInclusive', () => {
        const from = 5;
        const to = 6;
        expect(utility.getRandomIntegerNumber(from, to)).toBe(from);
    });

    test('works with large range values', () => {
        const from = 1_000_000;
        const to = 2_000_000;
        const result = utility.getRandomIntegerNumber(from, to);
        expect(result).toBeGreaterThanOrEqual(from);
        expect(result).toBeLessThan(to);
    });
});