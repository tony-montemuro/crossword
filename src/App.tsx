import CrosswordGrid from './components/CrosswordGrid';
import WordList from './components/WordList';
import AlgorithmDiagnostics from './components/AlgorithmDiagnostics';
import AlgorithmControls from './components/AlgorithmControls';
import { useAlgorithmState } from './hooks/useAlgorithmState';

function App() {
  const [algorithmState, algorithmActions] = useAlgorithmState();

  const testBoard = [
    ['C', 'A', 'U'],
    ['P', 'R', 'A'],
    ['R', 'E', 'D']
  ];

  const testWords = ['CAR', 'RAD', 'ERA'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex flex-col items-center justify-center gap-6 p-8">
      <div className="w-full max-w-4xl">
        <AlgorithmDiagnostics
          algorithmState={ algorithmState }
          totalWords={ testWords.length }
        />

        <AlgorithmControls
          state={ algorithmState }
          actions={ algorithmActions }
          board={ testBoard }
          words={ testWords }
        />
      </div>

      <div className="flex items-center justify-center gap-8">
        <CrosswordGrid grid={ testBoard } algorithmState={ algorithmState } />
        <WordList words={ testWords } algorithmState={ algorithmState } />
      </div>
    </div>
  )
}

export default App;
