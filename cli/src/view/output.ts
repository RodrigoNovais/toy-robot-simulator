import { dedent } from '../utils/dedent';

export const standard = (...args: any[]) => {
    const [x, y, rotation] = args;
    return `${x},${y},${rotation}\n`;
}

export const fancyOutput = (...args: any[]) => {
    const [x, y, rotation] = args;
    return dedent(`> position: (${x},${y})
                   > rotation: (${rotation})\n`);
};
