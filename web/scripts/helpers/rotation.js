/**
 * A text representation of the cardinal direction
 * @typedef {'NORTH'|'EAST'|'SOUTH'|'WEST'} Cardinal
 */

/**
 * A number, or a string containing a cardinal.
 * @typedef {Cardinal|0|90|180|270} Rotation
 */

export const CARDINAL = {
    NORTH: 0,
    EAST: 90,
    SOUTH: 180,
    WEST: 270,
};

/**
 * Validate if a value is a valid rotation
 *
 * @param {any} rotation - The rotation to verify
 * @returns {rotation is Rotation}
 */
export const isRotation = (rotation) => {
    if (typeof rotation === 'number')
        return Object.values(CARDINAL).some(value => value === rotation);

    return rotation in CARDINAL;
};

/**
 * Normalize angles to be in between 0 and 359 range
 *
 * @param {number} degrees
 * @returns {number}
 */
export const normalizeAngle = (degrees) => (degrees % 360 + 360) % 360;

/**
 * Convert angle in degrees to radians
 *
 * @param {number} degrees
 * @returns {number}
 */
export const toRadians = (degrees) => degrees * Math.PI / 180;

/**
 * Returns an angle given a rotation
 *
 * @param {Rotation} rotation
 * @returns {number}
 */
export const rotationToDegrees = (rotation) => {
    if (typeof rotation === 'number')
        return rotation;

    return CARDINAL[rotation];
}

/**
 * Returns a cardinal point given a rotation
 *
 * @param {Rotation} rotation
 * @returns {Cardinal}
 */
export const rotationToCardinal = (rotation) => {
    if (typeof rotation === 'string')
        return rotation;

    return Object.keys(CARDINAL)
        .find(key => CARDINAL[key] === normalizeAngle(rotation));
}

/**
 * Return forward direction matrix given a rotation
 *
 * @param {Rotation} rotation
 * @returns {[number, number]}
 */
export const rotationToDirection = (rotation) => {
    return [
        Math.round(Math.sin(toRadians(rotationToDegrees(rotation)))),
        Math.round(Math.cos(toRadians(rotationToDegrees(rotation)))),
    ]
}
