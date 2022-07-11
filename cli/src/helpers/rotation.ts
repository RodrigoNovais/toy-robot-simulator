export type ValueOf<T> = T[keyof T];
export type Cardinal = keyof typeof CARDINAL;
export type Rotation = Cardinal | ValueOf<typeof CARDINAL>;

export const CARDINAL = {
    NORTH: 0,
    EAST: 90,
    SOUTH: 180,
    WEST: 270,
} as const;

/**
 * Validate if a value is a valid rotation
 *
 * @param {unknown} rotation - The rotation to verify
 * @returns {rotation is Rotation}
 */
export const isRotation = (rotation: unknown): rotation is Rotation => {
    if (typeof rotation === 'number')
        return Object.values(CARDINAL).some(value => value === rotation);

    return rotation as string in CARDINAL;
};

/**
 * Normalize angles to be in between 0 and 359 range
 *
 * @param {number} degrees
 * @returns {number}
 */
export const normalizeAngle = (degrees: number): number => {
    return (degrees % 360 + 360) % 360;
}

/**
 * Convert angle in degrees to radians
 *
 * @param {number} degrees
 * @returns {number}
 */
export const toRadians = (degrees: number): number => {
    return degrees * Math.PI / 180;
}

/**
 * Returns an angle given a rotation
 *
 * @param {Rotation} rotation
 * @returns {number}
 */
export const rotationToDegrees = (rotation: Rotation): number => {
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
export const rotationToCardinal = (rotation: Rotation): Cardinal => {
    if (typeof rotation === 'string')
        return rotation;

    return Object.keys(CARDINAL).find(key =>
        CARDINAL[key as Cardinal] === normalizeAngle(rotation)
    ) as Cardinal;
}

/**
 * Return forward direction matrix given a rotation
 *
 * @param {Rotation} rotation
 * @returns {[number, number]}
 */
export const rotationToDirection = (rotation: Rotation): [number, number] => {
    return [
        Math.round(Math.sin(toRadians(rotationToDegrees(rotation)))),
        Math.round(Math.cos(toRadians(rotationToDegrees(rotation)))),
    ]
}
