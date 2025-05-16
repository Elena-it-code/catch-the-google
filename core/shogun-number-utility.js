/**
 * Utility class for generating random numbers.
 */
export class ShogunNumberUtility {
    /**
     * Generates a random integer between the specified range.
     * @param {number} fromInclusive - The lower bound (inclusive).
     * @param {number} toExclusive - The upper bound (exclusive).
     * @returns {number} Random integer in [fromInclusive, toExclusive).
     * @throws {Error} If arguments are not numbers or fromInclusive >= toExclusive.
     */
    getRandomIntegerNumber(fromInclusive, toExclusive) {
        // Проверка, что аргументы — числа
        if (typeof fromInclusive !== 'number' || typeof toExclusive !== 'number') {
            throw new Error('Both arguments must be numbers');
        }

        // Проверка, что fromInclusive < toExclusive
        if (fromInclusive >= toExclusive) {
            throw new Error('fromInclusive must be less than toExclusive');
        }
        // Основная логика
        return Math.floor(Math.random() * (toExclusive - fromInclusive)) + fromInclusive;
    }
}