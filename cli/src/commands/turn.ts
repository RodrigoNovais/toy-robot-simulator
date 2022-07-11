import type { Command } from '.';

import { Robot } from '../entities/robot';

import { normalizeAngle, Rotation, rotationToCardinal, rotationToDegrees } from '../helpers/rotation';

export class Turn implements Command {
    #oldRotation?: Rotation;

    constructor(private robot: Robot, private offset: number) { }

    execute(): void {
        if (!this.robot.isPlaced()) return;
        this.#oldRotation = this.robot.rotation;

        const degrees = rotationToDegrees(this.robot.rotation!) + 90 * this.offset;
        this.robot.rotate(rotationToCardinal(normalizeAngle(degrees) as Rotation));
    }

    undo(): void { this.robot.rotate(this.#oldRotation!); }
}
