export interface TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;
}

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = this.newTrieNode();
    }

    insert(word: string): void {
        let curr: TrieNode = this.root;

        for (const c of word) {
            let next = curr.children.get(c);
            if (!next) {
                next = this.newTrieNode();
                curr.children.set(c, next);
            }
            curr = next;
        }

        curr.isEndOfWord = true;
    }

    buildFromWords(words: string[]): void {
        // TODO: Implement bulk insertion from word array
        words.forEach(word => this.insert(word));
    }

    private newTrieNode(): TrieNode {
        return { children: new Map(), isEndOfWord: false };
    }
}
