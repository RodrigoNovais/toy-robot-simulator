export class Table {
    #width = 0;
    get width() { return this.#width; }

    #length = 0;
    get length() { return this.#length; }

    /** @param {number[]} args */
    constructor(...args) {
        const [width, length] = args;

        this.#width = width;
        this.#length = length || width;
    }

    /** @param {number[]} position */
    isInside(position) {
        return position[0] >= 0
            && position[1] >= 0
            && position[0] < this.#width
            && position[1] < this.#length;
    }
}
