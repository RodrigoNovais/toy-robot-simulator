import { CARDINAL, isRotation, normalizeAngle, rotationToCardinal, rotationToDegrees, rotationToDirection, toRadians } from './rotation'

it ('should normalize angles to 0 to 360 range', () => {
    expect(normalizeAngle(0)).toBe(0)
    expect(normalizeAngle(360)).toBe(0)
    expect(normalizeAngle(360 + 90)).toBe(90)
    expect(normalizeAngle(-90)).toBe(360 - 90)
})

it ('should convert degrees to radians', () => {
    expect(toRadians(0)).toBe(0)
    expect(toRadians(180)).toBe(Math.PI)
    expect(toRadians(360)).toBe(Math.PI * 2)
})

it ('should be a valid rotation', () => {
    expect(isRotation('NORTH')).toBe(true)
    expect(isRotation(0)).toBe(true)
})

it ('should be an invalid rotation', () => {
    expect(isRotation('N')).toBe(false)
    expect(isRotation(45)).toBe(false)
})

it ('should return angle from rotation', () => {
    expect(rotationToDegrees('NORTH')).toBe(CARDINAL['NORTH'])
    expect(rotationToDegrees('EAST')).toBe(CARDINAL['EAST'])
    expect(rotationToDegrees('SOUTH')).toBe(CARDINAL['SOUTH'])
    expect(rotationToDegrees('WEST')).toBe(CARDINAL['WEST'])
})

it ('should return the equivalent cardinal point given an angle', () => {
    expect(rotationToCardinal(0)).toBe('NORTH')
    expect(rotationToCardinal(90)).toBe('EAST')
    expect(rotationToCardinal(180)).toBe('SOUTH')
    expect(rotationToCardinal(270)).toBe('WEST')
})

it ('should return forward direction matrix at given rotation', () => {
    expect(rotationToDirection(CARDINAL['NORTH'])).toEqual([0, 1])
    expect(rotationToDirection(CARDINAL['EAST'])).toEqual([1, 0])
    expect(rotationToDirection(CARDINAL['SOUTH'])).toEqual([0, -1])
    expect(rotationToDirection(CARDINAL['WEST'])).toEqual([-1, -0])
})
