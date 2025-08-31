import type { TrieNode } from '../utils/Trie';
import type { StackVals } from './AlgorithmStep';

export type Position = [number, number];

interface Stacks {
    positions: Position[],
    words: string[],
    trieNodes: TrieNode[]
}

interface AlgorithmState {
    description: string,
    stacks: Stacks,
    foundWords: string[];
    recursiveCount: number;
    isBacktracking: boolean;
    isComplete: boolean;
    isRunning: boolean;
    isPaused: boolean;
}

export interface AlgorithmActions {
    // Control flow
    start: (isPaused: boolean) => void;
    pause: () => void;
    resume: () => void;
    reset: () => void;
    complete: () => void;

    // State updates (for algorithm implementation)
    setDescription: (desc: string) => void;
    pushToStacks: (vals: StackVals) => void;
    popFromStacks: () => void;
    addFoundWord: (word: string) => void;
    setBacktracking: (isBacktracking: boolean) => void;
    incrementRecursiveCount: () => void;
}

export const initialAlgorithmState: AlgorithmState = {
    description: '',
    stacks: { positions: [], words: [], trieNodes: [] },
    foundWords: [],
    recursiveCount: 0,
    isBacktracking: false,
    isComplete: false,
    isRunning: false,
    isPaused: false,
};

export type { AlgorithmState };
