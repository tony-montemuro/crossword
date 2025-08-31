import { useMemo } from 'react';
import { AlgorithmController } from '../algorithms/AlgorithmController';
import { wordSearch } from '../algorithms/wordSearch';
import type { AlgorithmActions, AlgorithmState } from '../types/AlgorithmState';

interface AlgorithmControlsProps {
  state: AlgorithmState;
  actions: AlgorithmActions
  board: string[][];
  words: string[];
}

export default function AlgorithmControls({ state, actions, board, words }: AlgorithmControlsProps) {
  const controller = useMemo(() => new AlgorithmController(actions), []);
  const algorithmGenerator = wordSearch(board, words);

  const handlePlayPause = () => {
    if (state.isRunning && !state.isPaused) {
      controller.pause();
    } else if (state.isPaused) {
      controller.resume();
    } else {
      controller.startAlgorithm(algorithmGenerator, 1000);
    }
  };

  const handleStep = () => {
    if (state.isRunning) {
      controller.stepOnce();
    } else {
      controller.startAlgorithm(algorithmGenerator, 1000, true);
    }
  };

  const handleReset = () => {
    controller.reset();
  };

  const getPlayPauseButtonText = () => {
    if (state.isRunning && !state.isPaused) {
      return 'Pause';
    }
    return 'Play';
  };

  const getPlayPauseIcon = () => {
    if (state.isRunning && !state.isPaused) {
      // Pause icon
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1zm6 0a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      );
    }
    // Play icon
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8.108v3.784a1 1 0 001.555.94l3.05-1.892a1 1 0 000-1.88l-3.05-1.892z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        {/* Play/Pause Button */ }
        <button
          onClick={ handlePlayPause }
          disabled={ state.isComplete }
          className={ `
                        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                        ${state.isComplete
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : state.isRunning && !state.isPaused
                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg'
                : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
            }
                    `}
        >
          { getPlayPauseIcon() }
          { getPlayPauseButtonText() }
        </button>

        {/* Step Button */ }
        <button
          onClick={ handleStep }
          disabled={ state.isComplete || (state.isRunning && !state.isPaused) }
          className={ `
    flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
    ${(state.isComplete || (state.isRunning && !state.isPaused))
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
            }
  `}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M13 17a1 1 0 102 0V3a1 1 0 10-2 0v14z" clipRule="evenodd" />
          </svg>
          Step
        </button>

        {/* Reset Button */ }
        <button
          onClick={ handleReset }
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-gray-500 hover:bg-gray-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Reset
        </button>
      </div>

      {/* Status Text */ }
      { state.isComplete && (
        <div className="text-center mt-3 text-sm text-gray-600">
          Algorithm completed! Use Reset to start over.
        </div>
      ) }
    </div>
  );
}
