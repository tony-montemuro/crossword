import type { AlgorithmState } from '../types/AlgorithmState';

interface CrosswordGridProps {
  grid: string[][];
  algorithmState?: AlgorithmState;
}

export default function CrosswordGrid({ grid, algorithmState }: CrosswordGridProps) {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  const getCellClassName = (rowIndex: number, colIndex: number): string => {
    let baseClasses = "w-12 h-12 border-2 flex items-center justify-center text-lg font-bold transition-all duration-300";

    if (!algorithmState) {
      return `${baseClasses} border-gray-400 bg-white text-gray-800`;
    }

    // Current position - bright highlight with pulsing animation
    const currentPosition = algorithmState.stacks.positions.at(-1);
    if (currentPosition && currentPosition[0] === colIndex && currentPosition[1] === rowIndex) {
      return `${baseClasses} border-yellow-400 bg-yellow-200 text-gray-800 animate-pulse ring-2 ring-yellow-400`;
    }

    // Current path - show the active exploration path
    if (algorithmState.stacks.positions.some(pos => pos[0] === colIndex && pos[1] === rowIndex)) {
      return `${baseClasses} border-blue-400 bg-blue-100 text-gray-800`;
    }

    // Default cell
    return `${baseClasses} border-gray-400 bg-white text-gray-800`;
  };

  return (
    <div
      className="inline-grid gap-1 p-4 bg-white rounded-lg shadow-lg"
      style={ {
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`
      } }
    >
      { grid.map((row, rowIndex) =>
        row.map((char, colIndex) => (
          <div
            key={ `${rowIndex}-${colIndex}` }
            className={ getCellClassName(rowIndex, colIndex) }
          >
            { char }
          </div>
        ))
      ) }
    </div>
  );
}
