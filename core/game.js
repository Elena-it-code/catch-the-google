import {GameStatus} from "./game-statuses";

export class Game {
    #status = GameStatus.SETTINGS
    #googlePosition = null

    #settings = {
        gridSize: {
            columnsCount: 4,
            rowsCount: 4
        },
        googleJumpInterval: 1000
    }
    #NumberUtility;

    // DI / Dependency Injection
    constructor(somethingsSimilarNumberUtility) {
        this.#NumberUtility = somethingsSimilarNumberUtility; // must have getRandomIntegerNumber method

    }

    /**
     * Sets the Google jump interval.
     *
     * @param {number} newValue - The new interval value in milliseconds.
     *
     * @throws {Error} If `newValue` is not a number.
     * @throws {Error} If `newValue` is less than or equal to zero.
     */
    set googleJumpInterval(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('Google jump interval must be a number');
        }
        if (newValue <= 0) {
            throw new Error('Google jump interval cannot be negative');
        }
        this.#settings.googleJumpInterval = newValue;
    }

    start(game) {
        if (this.status !== GameStatus.SETTINGS) {
            throw new Error('Game must be in Settings before Start!');
        }
        this.#status = GameStatus.IN_PROGRESS;
        this.#makeGoogleJump()

        setInterval(() => {
            this.#makeGoogleJump()
        }, this.#settings.googleJumpInterval)

    }

    #makeGoogleJump() {
        const newPosition = {
            x: this.#NumberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columnsCount),
            y: this.#NumberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.rowsCount),
        }
        if (newPosition.x === this.googlePosition?.x && newPosition.y === this.googlePosition?.y) {
            this.#makeGoogleJump()
            return
        }

        this.#googlePosition = newPosition
    }

    get status() {
        return this.#status;
    }

    get googlePosition() {
        return this.#googlePosition;
    }

    get gridSize() {
        return this.#settings.gridSize;
    }
}

