import { tryParseInt } from './try-parse-int'

it ('should not parse an empty string', () => {
    expect(tryParseInt('')).toBeUndefined();
})

it ('should not parse a character', () => {
    expect(tryParseInt('a')).toBeUndefined();
})

it ('should not parse a float value', () => {
    expect(tryParseInt('1.5')).toBeUndefined();
})

it ('should parse an integer value', () => {
    expect(tryParseInt('2')).toBe(2);
})
