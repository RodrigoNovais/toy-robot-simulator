/**
 * Attempt to convert a integer string value to a numeric value
 *
 * @param {string=} value
 * @returns {number=}
 */
export const tryParseInt = (value) =>{
    if (value === undefined) return;
    if (!value.length) return;
    if (value.includes('.')) return;
    if (Number.isNaN(value)) return;

    const integer = Number.parseInt(value);
    if (!Number.isInteger(integer)) return;

    return integer;
}
