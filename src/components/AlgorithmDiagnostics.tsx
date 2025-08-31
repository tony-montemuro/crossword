import type { AlgorithmState } from '../types/AlgorithmState';

interface AlgorithmDiagnosticsProps {
  algorithmState: AlgorithmState;
  totalWords: number;
}

export default function AlgorithmDiagnostics({ algorithmState, totalWords }: AlgorithmDiagnosticsProps) {
  const {
    description,
    stacks,
    foundWords,
    stepCount,
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

  const formatPosition = (pos: [number, number] | undefined) => {
    return pos ? `[${pos[0]},${pos[1]}]` : 'None';
  };

  const formatPath = () => {
    const positions = stacks.positions;
    if (positions.length === 0) return 'Empty';
    return positions.map(pos => formatPosition(pos)).join('→');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
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
          <div className="text-sm text-gray-600">
            Step: <span className="font-mono font-medium">{ stepCount }</span>
          </div>
          <div className="text-sm text-gray-600">
            Description: <span className="font-mono font-medium">{ description }</span>
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
              Building: <span className="font-mono font-medium bg-yellow-50 px-1 rounded">
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
              <span className="text-gray-400">/{ totalWords }</span>
            </div>
            <div className="text-gray-600">
              Path Length: <span className="font-mono font-medium">{ stacks.positions.length }</span>
            </div>
            <div className="text-gray-600">
              Completion: <span className="font-medium">
                { ((foundWords.length / totalWords) * 100).toFixed(1) }%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Found Words Quick View */ }
      { foundWords.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Found Words:</span>
            <div className="flex flex-wrap gap-1">
              { foundWords.map(word => (
                <span
                  key={ word }
                  className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                >
                  { word }
                </span>
              )) }
            </div>
          </div>
        </div>
      ) }
    </div>
  );
}
