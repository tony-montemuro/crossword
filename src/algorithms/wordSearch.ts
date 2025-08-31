import { Trie } from '../utils/Trie';
import type { TrieNode } from '../utils/Trie';
import type { AlgorithmGenerator } from './AlgorithmController';

/**
 * Word Search II Algorithm using Trie + Backtracking with Visualization
 * 
 * This function implements the classic Word Search II problem:
 * Given a 2D grid of characters and a list of words, find all words that can be
 * constructed from sequentially adjacent cells (horizontally or vertically).
 * 
 * Uses a generator pattern to yield intermediate states for visualization.
 */
export function* wordSearch(
    board: string[][],
    words: string[]
): AlgorithmGenerator {
    const VISITED_CHAR = "#";
    const trie = new Trie();
    trie.buildFromWords(words);

    yield {
        description: 'Built Trie from word list'
    };

    const m = board.length;
    const n = board[0]?.length || 0;
    let count: number = 0;

    function* dfs(
        x: number,
        y: number,
        node: TrieNode,
        word: string,
    ): AlgorithmGenerator {
        yield {
            stackVals: {
                position: [x, y],
                trieNode: node,
                word: word
            },
            description: `Exploring position ([${x},${y}]) with word "${word}"`
        };

        if (x < 0 || y < 0 || y === board.length || x === board[y].length) {
            yield {
                description: `Backtracking from position [${x},${y}]: out-of-bounds`,
                popStackVals: true
            }
            return;
        }

        if (board[y][x] === VISITED_CHAR) {
            yield {
                description: `Backtracking from position [${x},${y}]: already been visited`,
                popStackVals: true
            }
            return;
        }

        const next = node.children.get(board[y][x]);
        if (!next) {
            yield {
                description: `Backtracking from position [${x},${y}]: '${board[y][x]}' not child of current TrieNode`,
                popStackVals: true
            };
            return;
        }

        const c = board[y][x];
        word += c;

        if (next.isEndOfWord) {
            next.isEndOfWord = false;
            yield {
                description: `Word "${word}" found, completed by '${board[y][x]}'!`,
                word: word
            }
            count++;
        }

        board[y][x] = VISITED_CHAR;

        yield* dfs(x + 1, y, next, word);
        yield* dfs(x, y + 1, next, word);
        yield* dfs(x - 1, y, next, word);
        yield* dfs(x, y - 1, next, word);

        board[y][x] = c;
        yield {
            description: `Backtracking from position [${x},${y}]: exhaused all paths`,
            popStackVals: true
        }
    }

    for (let y = 0; y < m; y++) {
        for (let x = 0; x < n; x++) {
            yield {
                description: `Starting search from position [${x},${y}]`
            };

            yield* dfs(x, y, trie.root, '');
        }
    }

    // Algorithm complete
    yield {
        description: `Search complete! Found ${count} words.`
    };
}


