import type { Command } from '.';

import { Robot } from '../entities/robot';

import { standard } from '../view/output';

export class Report implements Command {
    constructor(private robot: Robot, private output = standard) { }

    execute(): void {
        if (!this.robot.isPlaced()) return;

        const [x, y] = this.robot.position!;
        process.stdout.write(this.output(x, y, this.robot.rotation));
    }
}
