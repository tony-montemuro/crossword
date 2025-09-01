import CrosswordBoard from './components/CrosswordBoard';
import AlgorithmDiagnostics from './components/AlgorithmDiagnostics';
import AlgorithmControls from './components/AlgorithmControls';
import { useAlgorithmState } from './hooks/useAlgorithmState';
import AlgorithmDashboard from './components/AlgorithmDashboard';
import AlgorithmWords from './components/AlgorithmWords';
import { BOARD_CONFIGS, DEFAULT_BOARD_ID } from './data/board';
import { useState } from 'react';
import AlgorithmInformation from './components/AlgothimInformation';

function App() {
  const [algorithmState, algorithmActions] = useAlgorithmState();
  const [selectedBoardId, setSelectedBoardId] = useState<string>(DEFAULT_BOARD_ID);

  const currentBoard = BOARD_CONFIGS.find(config => config.id === selectedBoardId)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex flex-col items-center justify-center gap-6 p-8">
      <div className="w-full max-w-4xl">
        <AlgorithmDashboard>
          <AlgorithmInformation />
          <AlgorithmDiagnostics
            algorithmState={ algorithmState }
            wordsLength={ currentBoard.words.length }
          />
          <AlgorithmWords
            algorithmState={ algorithmState }
            wordsToFind={ currentBoard.words }
          />
          <AlgorithmControls
            state={ algorithmState }
            actions={ algorithmActions }
            board={ currentBoard.board }
            words={ currentBoard.words }
            selectedBoardId={ selectedBoardId }
            setSelectedBoardId={ setSelectedBoardId }
          />
        </AlgorithmDashboard>

        <div className="w-full flex justify-center items-center h-72">
          <CrosswordBoard board={ currentBoard.board } algorithmState={ algorithmState } />
        </div>
      </div>
    </div>
  )
}

export default App;
