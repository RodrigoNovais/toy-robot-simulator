import { Parser } from './parser';

const PLACE_COMMAND = 'PLACE 0,0,SOUTH';

it ('should parse input into commands', async () => {
    const [command, args] = Parser(PLACE_COMMAND);

    expect(command).toBe('PLACE');
    expect(args).toBe('0,0,SOUTH');
})
