export class Table {
    #width: number = 0;
    get width(): number { return this.#width; }

    #length: number = 0;
    get length(): number { return this.#length; }

    constructor(size: number);
    constructor(width: number, length: number);
    constructor(...args: Array<any>) {
        const [width, length] = args;

        this.#width = width;
        this.#length = length || width;
    }

    isInside(position: [number, number]): boolean {
        return position[0] >= 0
            && position[1] >= 0
            && position[0] < this.#width
            && position[1] < this.#length;
    }
}
