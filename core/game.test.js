import {Game} from "./game";
import {GameStatus} from "./game-statuses";
import {ShogunNumberUtility} from "./shogun-number-utility";

describe('game', () => {
    it('game should be created and return status', () => {
        const numberUtility = new ShogunNumberUtility()
        const game = new Game(numberUtility)
        expect(game.status).toBe(GameStatus.SETTINGS);
    })

    it('game should be created and return status', async () => {
        const numberUtility = new ShogunNumberUtility()
        const game = new Game(numberUtility)
        await game.start()
        expect(game.status).toBe(GameStatus.IN_PROGRESS);
    })

    it('google should be in the Grid after start', async () => {
        const numberUtility = new ShogunNumberUtility()

        for (let i = 0; i < 100; i++) {
            const game = new Game(numberUtility)
            expect(game.googlePosition).toBeNull(); // до старат игры координат у Google нет
            await game.start()
            expect(game.googlePosition.x).toBeLessThan(game.gridSize.columnsCount)
            expect(game.googlePosition.x).toBeGreaterThanOrEqual(0)
            expect(game.googlePosition.y).toBeLessThan(game.gridSize.rowsCount)
            expect(game.googlePosition.y).toBeGreaterThanOrEqual(0)
        }
    })

    it('google should be in the Grid but in new position after jump', async () => {
        const numberUtility = new ShogunNumberUtility()
        const game = new Game(numberUtility);
        game.googleJumpInterval = 1; // ms
        await game.start() // jump -> webAPI/browser 10

        for (let i = 0; i < 100; i++) {
            const prevGooglePosition = game.googlePosition;
            await delay(1) // await -> webAPI/browser 10 // after 10 ms: macrotasks: [jump, await]
            const currentGooglePosition = game.googlePosition;
            expect(prevGooglePosition).not.toEqual(currentGooglePosition)
        }
    })
})

// промисификация setTimeout
const delay = (ms) => new Promise((res, rej) => setTimeout(res, ms))