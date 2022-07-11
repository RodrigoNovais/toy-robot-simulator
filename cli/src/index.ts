import { Commands, CommandValidator } from './commands';

import { FileReader } from './utils/file-reader';
import { Parser } from './utils/parser';

export const Run = async (): Promise<void> => {
    const messages = await FileReader(__dirname, '../assets/stdin0');
    messages.forEach(message => {
        const [command, args] = Parser(message);

        if (!command) return;
        if (!CommandValidator(command)) return;

        Commands[command](args || '')
    })
}

Run();
