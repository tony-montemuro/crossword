import { useState, useCallback } from 'react';
import { initialAlgorithmState } from '../types/AlgorithmState';
import type { AlgorithmState, AlgorithmActions } from "../types/AlgorithmState";
import type { StackVals } from '../types/AlgorithmStep';

export function useAlgorithmState(): [AlgorithmState, AlgorithmActions] {
    const [state, setState] = useState<AlgorithmState>(initialAlgorithmState);

    const actions: AlgorithmActions = {
        start: useCallback(() => {
            setState(prev => ({
                ...prev,
                isRunning: true,
                isPaused: false,
                isComplete: false,
                stepCount: 0
            }));
        }, []),

        pause: useCallback(() => {
            setState(prev => ({ ...prev, isPaused: true }));
        }, []),

        resume: useCallback(() => {
            setState(prev => ({ ...prev, isPaused: false }));
        }, []),

        reset: useCallback(() => {
            setState(initialAlgorithmState);
        }, []),

        complete: useCallback(() => {
            setState(prev => ({ ...prev, isComplete: true }));
        }, []),

        setDescription: useCallback((desc: string) => {
            setState(prev => ({ ...prev, desc }));
        }, []),

        pushToStacks: useCallback((vals: StackVals) => {
            setState(prev => ({
                ...prev,
                stacks: {
                    positions: [...prev.stacks.positions, vals.position],
                    words: [...prev.stacks.words, vals.word],
                    trieNodes: [...prev.stacks.trieNodes, vals.trieNode]
                }
            }));
        }, []),

        popFromStacks: useCallback(() => {
            setState(prev => ({
                ...prev,
                stacks: {
                    positions: prev.stacks.positions.slice(0, -1),
                    words: prev.stacks.words.slice(0, -1),
                    trieNodes: prev.stacks.trieNodes.slice(0, -1)
                }
            }));
        }, []),

        addFoundWord: useCallback((word: string) => {
            setState(prev => {
                if (!prev.foundWords.includes(word)) {
                    return { ...prev, foundWords: [...prev.foundWords, word] };
                }
                return prev;
            });
        }, []),

        setBacktracking: useCallback((isBacktracking: boolean) => {
            setState(prev => ({ ...prev, isBacktracking }));
        }, []),

        incrementStep: useCallback(() => {
            setState(prev => ({ ...prev, stepCount: prev.stepCount + 1 }));
        }, []),
    };

    return [state, actions];
}
