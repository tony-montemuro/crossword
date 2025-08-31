import type { AlgorithmState } from '../types/AlgorithmState';

interface WordListProps {
  words: string[];
  algorithmState?: AlgorithmState;
}

export default function WordList({ words, algorithmState }: WordListProps) {
  const wordsToFind = words.filter(word => !algorithmState?.foundWords.includes(word));
  const wordsFound = algorithmState?.foundWords || [];
  const currentWord = algorithmState?.stacks.words.at(-1) || '';

  const getWordClassName = (word: string, isInToFind: boolean): string => {
    const baseClasses = "px-3 py-2 rounded-md font-medium transition-all duration-300";

    if (isInToFind) {
      if (currentWord && word.startsWith(currentWord) && word !== currentWord) {
        return `${baseClasses} bg-yellow-100 border-2 border-yellow-400 text-gray-800`;
      }
      return `${baseClasses} bg-gray-100 text-gray-700`;
    } else {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs">
      <div className="mb-4 text-center">
        <div className="text-sm text-gray-600 mb-2">
          { wordsFound.length } of { words.length } found
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={ { width: `${(wordsFound.length / words.length) * 100}%` } }
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Words to Find</h2>
        { wordsToFind.length > 0 ? (
          <ul className="space-y-2">
            { wordsToFind.map(word => (
              <li
                key={ word }
                className={ getWordClassName(word, true) }
              >
                { word }
              </li>
            )) }
          </ul>
        ) : (
          <p className="text-gray-500 text-sm italic">All words found!</p>
        ) }
      </div>

      <div>
        <h2 className={ `text-lg font-bold mb-3 flex items-center gap-2 ${wordsFound.length > 0 && "text-green-700"}` }>
          Words Found
          { wordsFound.length > 0 && <span className="text-green-600">✓</span> }
        </h2>
        <ul className="space-y-2">
          { wordsFound.map(word => (
            <li
              key={ word }
              className={ getWordClassName(word, false) }
            >
              { word }
            </li>
          )) }
        </ul>
      </div>
    </div>
  );
}
