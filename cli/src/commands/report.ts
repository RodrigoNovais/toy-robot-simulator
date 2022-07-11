import type { Command } from '.';

import { Robot } from '../entities/robot';

export class Report implements Command {
    constructor(private robot: Robot) { }

    execute(): void {
        if (!this.robot.isPlaced()) return;

        const [x, y] = this.robot.position!;
        process.stdout.write(`${x},${y},${this.robot.rotation}\n`);
    }
}
