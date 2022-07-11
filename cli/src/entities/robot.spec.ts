import { Robot } from './robot'

const robot = new Robot();

it ('should not be placed', () => {
    expect(robot.isPlaced()).toBe(false);
})

it ('should be placed', () => {
    robot.place([0, 0], 'SOUTH');
    expect(robot.isPlaced()).toBe(true);
})

it ('should move', () => {
    robot.place([2, 2], 'SOUTH');
    expect(robot.position).toEqual([2, 2]);

    robot.move([0, 1]);
    expect(robot.position).toEqual([0, 1]);
})

it ('should rotate', () => {
    robot.place([2, 2], 'SOUTH');
    expect(robot.rotation).toEqual('SOUTH');

    robot.rotate('WEST');
    expect(robot.rotation).toEqual('WEST');
})
