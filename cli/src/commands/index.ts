export abstract class Command {
    execute(): void {}
    undo?(): void;
}

export const Commands = {
    PLACE: (_args: string): void => {},
    MOVE: (): void => {},
    LEFT: (): void => {},
    RIGHT: (): void => {},
    REPORT: (): void => {},
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
