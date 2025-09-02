# Word Search II: Visualization

Interactive visualization of the LeetCode [Word Search II](https://leetcode.com/problems/word-search-ii/description/) algorithm, demonstrating DFS backtracking as it finds multiple words in a board of characters. The algorithm can either be stepped through manually, or executed automatically. Inspired by [an n-Queen visualizer](https://n-queen-five.vercel.app/).

I also [wrote an article about how this algorithm works](https://tonymontemuro.com/blog/word-search-ii-explained-how-dfs-backtracking-finds-multiple-words-in-a-grid).

## Word Search II Algorithm

This visualization is based on the following solution:

```javascript
var TrieNode = function() {
    this.children = new Map();
    this.endOfWord = false;
}

var Trie = function() {
    this.head = new TrieNode();
}

Trie.prototype.insert = function(word) {
    let curr = this.head;

    for (const c of word) {
        let next = curr.children.get(c);
        if (!next) {
            next = new TrieNode();
            curr.children.set(c, next);
        }
        curr = next;
    }

    curr.endOfWord = true;
}

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
    const res = [];
    const trie = new Trie();
    for (const word of words) {
        trie.insert(word);
    }

    function dfs(x, y, word, node) {
        if (x < 0 || y < 0 || y === board.length || x === board[y].length || !node.children.get(board[y][x])) {
            return;
        }

        const c = board[y][x];
        const next = node.children.get(c);
        word += c;
        if (next.endOfWord) {
            res.push(word);
            next.endOfWord = false;
        }

        // mark current position as visited
        board[y][x] = '#';

        dfs(x+1, y, word, next);
        dfs(x, y+1, word, next);
        dfs(x-1, y, word, next);
        dfs(x, y-1, word, next);

        // backtrack
        board[y][x] = c;
    }

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            dfs(x, y, '', trie.head);
        }
    }

    return res;
};
```

## Developing

1. Clone the repository onto your machine:

    ```bash
    git clone https://github.com/tony-montemuro/crossword.git

    # or, if you are using ssh:
    git clone git@github.com:tony-montemuro/crossword.git
    ```

2. Install dependencies:

    ```bash
    npm i
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

## Building

To create a production version of this app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
