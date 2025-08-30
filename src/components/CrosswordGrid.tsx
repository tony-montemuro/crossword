interface CrosswordGridProps {
  grid: string[][];
}

export default function CrosswordGrid({ grid }: CrosswordGridProps) {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  return (
    <div 
      className="inline-grid gap-1 p-4 bg-white rounded-lg shadow-lg"
      style={{ 
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((char, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-12 h-12 border-2 border-gray-400 flex items-center justify-center bg-white text-lg font-bold text-gray-800"
          >
            {char}
          </div>
        ))
      )}
    </div>
  );
}