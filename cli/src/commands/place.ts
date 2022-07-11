import type { Command } from '.';

import { Robot } from '../entities/robot';
import { Table } from '../entities/table';

import { Rotation } from '../helpers/rotation';

export class Place implements Command {
    #oldPosition?: [number, number];
    #oldRotation?: Rotation;

    constructor(
        private table: Table,
        private robot: Robot,
        private position: [number, number],
        private rotation: Rotation,
    ) {}

    execute(): void {
        if (!this.table.isInside(this.position)) return;

        this.#oldPosition = this.position;
        this.#oldRotation = this.rotation;

        this.robot.move(this.position);
        this.robot.rotate(this.rotation);
    }

    undo(): void {
        this.robot.move(this.#oldPosition!);
        this.robot.rotate(this.#oldRotation!);
    }
}
