import { isRotation, rotationToDirection } from '../helpers/rotation.js';
import { tryParseInt } from '../utils/try-parse-int.js'

import { Robot } from '../entities/robot.js'
import { Table } from '../entities/table.js'

const dummy = document.querySelector('.dummy');

const robot = new Robot(dummy);
const table = new Table(5);

export const Commands = {
    PLACE: (args) => {
        if (!args) return `Os argumentos para o comando PLACE são obrigatórios`;

        const [x, y, facing] = args.split(',');
        const [X, Y] = [tryParseInt(x), tryParseInt(y)];

        if (X === undefined) return `O argumento 'position x' precisa ser um número inteiro`;
        if (Y === undefined) return `O argumento 'position y' precisa ser um número inteiro`;
        if (!isRotation(facing)) return `O argumento 'facing' precisa conter os valores NORTH, EAST, SOUTH ou WEST`;
        if (!table.isInside([X, Y])) return 'Não é possível colocar para fora do tabuleiro';

        robot.place([X, Y], facing);
    },
    MOVE: (args) => {
        if (!!args) return `O comando "MOVE" não aceita argumentos`;
        if (!robot.isPlaced()) return `Este comando não pode ser executado enquanto "PLACE" não for executado`;

        const [robotX, robotY] = robot.position;
        const [moveX, moveY] = rotationToDirection(robot.rotation);

        /**
         * For this use case, y value increases towards south so moveY must be consumed inverted
         * @type {[number, number]}
         */
        const intent = [robotX + moveX, robotY - moveY];
        if (!table.isInside(intent)) return 'Não é possível mover o para fora do tabuleiro';

        robot.move(intent);
    },
    LEFT: (args) => {
        if (!!args) return `O comando "TURN" não aceita argumentos`;
        if (!robot.isPlaced()) return `Este comando não pode ser executado enquanto "PLACE" não for executado`;

        robot.rotate(-90);
    },
    RIGHT: (args) => {
        if (!!args) return `O comando "TURN" não aceita argumentos`;
        if (!robot.isPlaced()) return `Este comando não pode ser executado enquanto "PLACE" não for executado`;

        robot.rotate(90);
    },
};

/**
 * Validate if a string is a valid command name
 *
 * @param {string} command - The command to verify
 * @returns {command is keyof typeof Commands}
 */
export const CommandValidator = (command) => { return command in Commands; }
