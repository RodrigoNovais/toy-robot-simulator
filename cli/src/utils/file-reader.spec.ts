import { FileReader } from './file-reader'

const COMMANDS = ['PLACE 0,0,SOUTH','MOVE','REPORT']

it ('should read user input though file', async () => {
    const messages = await FileReader(__dirname, '../../assets/stdin0');

    expect(messages).toHaveLength(3);

    expect(messages[0]).toBe(COMMANDS[0]);
    expect(messages[1]).toBe(COMMANDS[1]);
    expect(messages[2]).toBe(COMMANDS[2]);
})
