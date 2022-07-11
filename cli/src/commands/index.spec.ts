import { Commands, CommandValidator, ParsePlaceArguments } from '.';

const COMMANDS = Object.keys(Commands);

it ('should be a valid command', () => {
    COMMANDS.forEach(command => {
        const valid = CommandValidator(command);
        expect(valid).toBe(true);
    })
})

it ('should be an invalid command', () => {
    const valid = CommandValidator('NOT A COMMAND');
    expect(valid).toBe(false);
})

it ('should return the command from the commands map', () => {
    COMMANDS.forEach(command => {
        const valid = CommandValidator(command);
        const method = Commands[command as keyof typeof Commands];

        expect(valid).toBe(true);
        expect(method).toBeInstanceOf(Function);
    })
})

