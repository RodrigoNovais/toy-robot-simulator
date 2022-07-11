import { resolve } from 'path';
import { readFile } from 'fs/promises';

export const FileReader = async (basePath: string, relativePath: string): Promise<string[]> => {
    const input = await readFile(resolve(basePath, ...relativePath.split(/[\\\/]+/)), 'utf8');
    const lines = input.split('\n').filter(value => value);

    return lines;
}
