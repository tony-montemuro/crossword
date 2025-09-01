import type { AlgorithmState } from '../types/AlgorithmState';
import { serializePosition, type Position } from '../types/Position';

interface Props {
  algorithmState: AlgorithmState;
  wordsLength: number;
}

export default function AlgorithmDiagnostics({ algorithmState, wordsLength }: Props) {
  const {
    description,
    stacks,
    foundWords,
    recursiveCount,
    isBacktracking,
    isComplete,
    isRunning,
    isPaused
  } = algorithmState;

  const getStatusBadge = () => {
    if (isComplete) {
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Complete</span>;
    }
    if (isPaused) {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Paused</span>;
    }
    if (isRunning) {
      return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Running</span>;
    }
    return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Idle</span>;
  };

  const formatPosition = (pos: Position | undefined) => {
    return pos ? serializePosition(pos) : 'None';
  };

  const formatPath = () => {
    const positions = stacks.positions;
    if (positions.length === 0) return 'Empty';
    return positions.map(pos => formatPosition(pos)).join('→');
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Algorithm Status */ }
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Algorithm Status</h3>
          <div className="flex items-center gap-2">
            { getStatusBadge() }
            { isBacktracking && (
              <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                Backtracking
              </span>
            ) }
          </div>
          <div className="text-sm text-gray-600 h-16">
            <span className="font-mono font-medium">{ description }</span>
          </div>
        </div>

        {/* Current Exploration */ }
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Current Exploration</h3>
          <div className="space-y-1 text-sm">
            <div className="text-gray-600">
              Position: <span className="font-mono font-medium">{ formatPosition(stacks.positions.at(-1)) }</span>
            </div>
            <div className="text-gray-600">
              Building: <span className="font-mono font-medium px-1 rounded">
                "{ stacks.words.at(-1) }" ({ stacks.words.at(-1)?.length ?? '0' })
              </span>
            </div>
            <div className="text-gray-600">
              Path: <span className="font-mono font-medium text-xs">{ formatPath() }</span>
            </div>
          </div>
        </div>

        {/* Progress Metrics */ }
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Progress</h3>
          <div className="space-y-1 text-sm">
            <div className="text-gray-600">
              Words Found: <span className="font-medium text-green-600">{ foundWords.length }</span>
              <span className="text-gray-400">/{ wordsLength }</span>
            </div>
            <div className="text-sm text-gray-600">
              Recursive Calls: <span className="font-mono font-medium">{ recursiveCount }</span>
            </div>
            <div className="text-gray-600">
              Path Length: <span className="font-mono font-medium">{ stacks.positions.length }</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
