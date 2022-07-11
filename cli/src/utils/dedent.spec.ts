import { dedent } from './dedent';

it ('should remove indent from string', () => {
    const indentedText = `
        There's nothing to see here`;

    expect(dedent(indentedText)).toBe('\nThere\'s nothing to see here')
})
