// src/data/boards.ts
export interface BoardConfig {
    id: string;
    name: string;
    size: string;
    board: string[][];
    words: string[];
}

export const BOARD_CONFIGS: BoardConfig[] = [
    {
        id: '3x3',
        name: '3×3',
        size: 'Small',
        board: [
            ['C', 'A', 'U'],
            ['P', 'R', 'A'],
            ['R', 'E', 'D']
        ],
        words: ['CAR', 'RAD', 'ERA']
    },
    {
        id: '4x4',
        name: '4×4',
        size: 'Medium',
        board: [
            ['T', 'H', 'I', 'S'],
            ['W', 'A', 'T', 'S'],
            ['O', 'A', 'H', 'G'],
            ['F', 'G', 'D', 'T']
        ],
        words: ['OATH', 'EAT', 'WHAT', 'THIS']
    },
    {
        id: '5x5',
        name: '5×5',
        size: 'Large',
        board: [
            ['A', 'B', 'C', 'E', 'D'],
            ['S', 'F', 'C', 'S', 'A'],
            ['A', 'D', 'E', 'E', 'B'],
            ['A', 'B', 'C', 'D', 'E'],
            ['A', 'S', 'A', 'S', 'A']
        ],
        words: ['ABCCED', 'SEE', 'SEED', 'AS']
    }
];

export const DEFAULT_BOARD_ID = '3x3';
