import { Table } from './table'

it ('should create a square table', () => {
    const table = new Table(5);

    expect(table.width).toBe(5);
    expect(table.length).toBe(5);
})

it ('should create a rectangular table', () => {
    const table = new Table(8, 4);

    expect(table.width).toBe(8);
    expect(table.length).toBe(4);
})

it ('should be inside', () => {
    const table = new Table(5);

    expect(table.isInside([2, 4])).toBe(true);
})

it ('should not be inside', () => {
    const table = new Table(5);

    expect(table.isInside([2, 5])).toBe(false);
})
