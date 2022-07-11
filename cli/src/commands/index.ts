import { Move } from './move';
import { Place } from './place';
import { Report } from './report';
import { Turn } from './turn';

import { Handler } from './handler';
import { Robot } from '../entities/robot';
import { Table } from '../entities/table';

import { tryParseInt } from '../utils/try-parse-int';
import { isRotation } from '../helpers/rotation';

export abstract class Command {
    execute(): void {}
    undo?(): void;

     static Place(...params: ConstructorParameters<typeof Place>) { return new Place(...params); }
     static Move(...params: ConstructorParameters<typeof Move>) { return new Move(...params); }
     static Turn(...params: ConstructorParameters<typeof Turn>) { return new Turn(...params); }
     static Report(...params: ConstructorParameters<typeof Report>) { return new Report(...params); }
}

const robot = new Robot();
const table = new Table(5);

const handler = new Handler();

export const Commands = {
    PLACE: (args: string): void => {
        if (!args) return;

        const [x, y, facing] = args.split(',');
        const [X, Y] = [tryParseInt(x), tryParseInt(y)];

        if (X === undefined || Y === undefined) return;
        if (!isRotation(facing)) return;

        handler.add(Command.Place(table, robot, [X, Y], facing));
    },
    MOVE: (): void => { handler.add(Command.Move(table, robot)); },
    LEFT: (): void => { handler.add(Command.Turn(robot, -1)); },
    RIGHT: (): void => { handler.add(Command.Turn(robot, 1)); },
    REPORT: (): void => { handler.add(Command.Report(robot)); },
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
