import { normalizeAngle, rotationToCardinal, rotationToDegrees } from '../helpers/rotation.js';

export class Robot {
    /** @type {HTMLElement} */
    #dummy;

    /** @type {[number, number]} */
    #position;
    get position() { return this.#position; }

    #rotation = 0;
    /** @type {import('../helpers/rotation').Rotation} */
    get rotation() { return rotationToCardinal(normalizeAngle(this.#rotation)); }

    /** @param {HTMLElement} dummy */
    constructor(dummy) { this.#dummy = dummy; }

    /**
     * @param {[number, number]} position
     * @param {import('../helpers/rotation').Rotation} rotation
     */
    place(position, rotation) {
        this.#rotation = 0;

        this.move(position);
        this.rotate(rotationToDegrees(rotation));

        this.#dummy.classList.remove('placed');
        setTimeout(() => this.#dummy.classList.add('placed'), 250);
    }

    /** @param {[number, number]} position */
    move(position) {
        this.#position = position;

        this.#dummy.style.left = `${this.#position[0] * 10}rem`;
        this.#dummy.style.top = `${this.#position[1] * 10}rem`;
    }

    /** @param {number} rotation */
    rotate(rotation) {
        this.#rotation += rotation;

        this.#dummy.style.transform = `rotate(${this.#rotation}deg)`;
    }

    isPlaced() { return !!this.#position; }
}
