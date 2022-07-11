import { Robot } from '../entities/robot';
import { Table } from '../entities/table';

import { tryParseInt } from '../utils/try-parse-int';
import { isRotation, normalizeAngle, rotationToCardinal, rotationToDegrees, rotationToDirection } from '../helpers/rotation';

import type { Rotation } from '../helpers/rotation';

export abstract class Command {
    execute(): void {}
    undo?(): void;
}

const robot = new Robot();
const table = new Table(5);

export const Commands = {
    PLACE: (args: string): void => {
        if (!args) return;

        const [x, y, facing] = args.split(',');
        const [X, Y] = [tryParseInt(x), tryParseInt(y)];

        if (X === undefined || Y === undefined) return;
        if (!isRotation(facing)) return;
        if (!table.isInside([X, Y])) return;

        robot.move([X, Y]);
        robot.rotate(facing);
    },
    MOVE: (): void => {
        if (!robot.isPlaced()) return;

        const [robotX, robotY] = robot.position!;
        const [moveX, moveY] = rotationToDirection(robot.rotation!);

        // For this use case, y value increases towards south so moveY must be consumed inverted
        const intent: [number, number] = [robotX + moveX, robotY - moveY];
        if (!table.isInside(intent)) return;

        robot.move(intent);
    },
    LEFT: (): void => {
        if (!robot.isPlaced()) return;

        const degrees = rotationToDegrees(robot.rotation!) + 90 * -1;
        robot.rotate(rotationToCardinal(normalizeAngle(degrees) as Rotation));
    },
    RIGHT: (): void => {
        if (!robot.isPlaced()) return;

        const degrees = rotationToDegrees(robot.rotation!) + 90;
        robot.rotate(rotationToCardinal(normalizeAngle(degrees) as Rotation));
    },
    REPORT: (): void => {
        if (!robot.isPlaced()) return;

        const [x, y] = robot.position!;
        process.stdout.write(`${x},${y},${robot.rotation}\n`);
    },
} as const;

/**
 * Validate if a string is a valid command name
 *
 * @param {string} command - The command to verify
 * @returns {command is keyof typeof Commands}
 */
export const CommandValidator = (command: string): command is keyof typeof Commands => {
    return command in Commands;
}
