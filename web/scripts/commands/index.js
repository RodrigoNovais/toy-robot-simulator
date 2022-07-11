export const Commands = {
    PLACE: (args) => {},
    MOVE: (args) => {},
    LEFT: (args) => {},
    RIGHT: (args) => {},
};

/**
 * Validate if a string is a valid command name
 *
 * @param {string} command - The command to verify
 * @returns {command is keyof typeof Commands}
 */
export const CommandValidator = (command) => { return command in Commands; }
