import type { Rotation } from '../helpers/rotation';

export class Robot {
    #position?: [number, number];
    get position(): [number, number] | undefined { return this.#position; }

    #rotation?: Rotation;
    get rotation(): Rotation | undefined { return this.#rotation; }

    place(position: [number, number], rotation: Rotation) {
        this.#position = position;
        this.#rotation = rotation;
    }

    move(position: [number, number]) { this.#position = position; }

    rotate(rotation: Rotation) { this.#rotation = rotation; }

    isPlaced() { return !!this.#position; }
}
