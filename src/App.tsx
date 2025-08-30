import CrosswordGrid from './components/CrosswordGrid';
import WordList from './components/WordList';

function App() {
  const testGrid = [
    ['C', 'A', 'T'],
    ['A', 'R', 'E'],
    ['R', 'E', 'D']
  ];

  const testWords = ['CAT', 'ARE', 'RED'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center gap-8 p-8">
      <CrosswordGrid grid={ testGrid } />
      <WordList words={ testWords } />
    </div>
  )
}

export default App;
