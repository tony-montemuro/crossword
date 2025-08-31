import type { AlgorithmState } from "../types/AlgorithmState";

interface Props {
  algorithmState: AlgorithmState;
  wordsToFind: string[];
}

export default function AlgorithmWords({ algorithmState, wordsToFind }: Props) {
  const { stacks, foundWords } = algorithmState;

  const getWordClassName = (word: string, isInToFind: boolean): string => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium transition-all duration-300";

    if (isInToFind) {
      const currentWord = stacks.words.at(-1);
      if (currentWord && word.startsWith(currentWord) && word !== currentWord) {
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      }
      return `${baseClasses} bg-gray-100 text-gray-700`;
    } else {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 h-8">
        <span className="text-sm font-medium text-gray-700">Words to Find:</span>
        <div className="flex flex-wrap gap-1">
          { wordsToFind.filter(word => !foundWords.includes(word)).map(word => (
            <span
              key={ word }
              className={ getWordClassName(word, true) }
            >
              { word }
            </span>
          )) }
        </div>
      </div>

      <div className="flex items-center gap-2 h-8">
        <span className="text-sm font-medium text-gray-700">Found Words:</span>
        <div className="flex flex-wrap gap-1">
          { foundWords.map(word => (
            <span
              key={ word }
              className={ getWordClassName(word, false) }
            >
              { word }
            </span>
          )) }
        </div>
      </div>
    </div>
  );
}
