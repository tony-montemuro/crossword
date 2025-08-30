import CrosswordGrid from './components/CrosswordGrid';
import WordList from './components/WordList';
import AlgorithmDiagnostics from './components/AlgorithmDiagnostics';
import { mockAlgorithmState } from './utils/mockData';

function App() {
  const testGrid = [
    ['C', 'A', 'T'],
    ['A', 'R', 'E'],
    ['R', 'E', 'D']
  ];

  const testWords = ['CAT', 'ARE', 'RED'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex flex-col items-center justify-center gap-6 p-8">
      <div className="w-full max-w-4xl">
        <AlgorithmDiagnostics 
          algorithmState={mockAlgorithmState} 
          totalWords={testWords.length} 
        />
      </div>
      
      <div className="flex items-center justify-center gap-8">
        <CrosswordGrid grid={ testGrid } algorithmState={ mockAlgorithmState } />
        <WordList words={ testWords } algorithmState={ mockAlgorithmState } />
      </div>
    </div>
  )
}

export default App;
