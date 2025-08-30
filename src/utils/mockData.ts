import type { AlgorithmState } from '../types/AlgorithmState';

export const mockAlgorithmState: AlgorithmState = {
    description: '',
    stacks: {
        positions: [[0, 0], [0, 1], [1, 1]],
        words: ['C', 'CA', 'CAR'],
        trieNodes: [] // Not worrying about this for now
    },
    foundWords: ["CAT"],
    stepCount: 15,
    isBacktracking: false,
    isComplete: false,
    isRunning: true,
    isPaused: false,
};

export const mockAlgorithmStateEmpty: AlgorithmState = {
    description: '',
    stacks: { positions: [], words: [], trieNodes: [] },
    foundWords: [],
    stepCount: 0,
    isBacktracking: false,
    isComplete: false,
    isRunning: false,
    isPaused: false,
};
