import type { TrieNode } from '../utils/Trie';
import type { Position } from './AlgorithmState';

export interface StackVals {
    position: Position,
    word: string,
    trieNode: TrieNode
}

export interface AlgorithmStep {
    description: string;
    stackVals?: StackVals;
    popStackVals?: boolean;
    word?: string;
    isBacktracking?: boolean;
}

