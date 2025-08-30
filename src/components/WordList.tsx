interface WordListProps {
  words: string[];
}

export default function WordList({ words }: WordListProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Words to Find</h2>
      <ul className="space-y-2">
        {words.map((word, index) => (
          <li
            key={index}
            className="px-3 py-2 bg-gray-100 rounded-md text-gray-700 font-medium"
          >
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
}