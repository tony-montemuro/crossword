import CrosswordGrid from './components/CrosswordGrid';
import AlgorithmDiagnostics from './components/AlgorithmDiagnostics';
import AlgorithmControls from './components/AlgorithmControls';
import { useAlgorithmState } from './hooks/useAlgorithmState';
import AlgorithmDashboard from './components/AlgorithmDashboard';
import AlgorithmWords from './components/AlgorithmWords';

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
        <AlgorithmDashboard>
          <AlgorithmDiagnostics
            algorithmState={ algorithmState }
            wordsLength={ testWords.length }
          />
          <AlgorithmWords
            algorithmState={ algorithmState }
            wordsToFind={ testWords }
          />
          <AlgorithmControls
            state={ algorithmState }
            actions={ algorithmActions }
            board={ testBoard }
            words={ testWords }
          />

        </AlgorithmDashboard>


        <div className="w-full flex justify-center">
          <CrosswordGrid grid={ testBoard } algorithmState={ algorithmState } />
        </div>
      </div>
    </div>
  )
}

export default App;
