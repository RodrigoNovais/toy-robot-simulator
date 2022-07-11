import type { Command } from '.';

import { Robot } from '../entities/robot';
import { Table } from '../entities/table';

import { rotationToDirection } from '../helpers/rotation';

export class Move implements Command {
    #oldPosition?: [number, number];

    constructor(private table: Table, private robot: Robot) { }

    execute(): void {
        if (!this.robot.isPlaced()) return;

        this.#oldPosition = this.robot.position;

        const [robotX, robotY] = this.robot.position!;
        const [moveX, moveY] = rotationToDirection(this.robot.rotation!);

        // For this use case, y value increases towards south so moveY must be consumed inverted
        const intent: [number, number] = [robotX + moveX, robotY - moveY];
        if (!this.table.isInside(intent)) return;

        this.robot.move(intent);
    }

    undo(): void { this.robot.move(this.#oldPosition!); }
}
