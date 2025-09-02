import Github from "./svg/github";

export default function AlgorithmInformation() {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex justify-between">
        <h1 className="text-2xl">Word Search II: Visualization</h1>
        <a href="https://github.com/tony-montemuro/crossword" target="_blank" rel="noopener noreferrer" title="Consider leaving a star if you enjoyed!"><Github /></a>
      </div>
      <span>An interactive visualization of the <a href="https://leetcode.com/problems/word-search-ii/description/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Word Search II</a> algorithm demonstrating DFS backtracking as it finds multiple words simultaneously in a board of characters, demonstrated on 3 unique examples.</span>
    </div>
  );
}
