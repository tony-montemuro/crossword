import type { Position } from '../types/AlgorithmState';

export class PositionSet {
    private positions = new Set<string>();

    add(pos: Position): void {
        this.positions.add(`${pos[0]},${pos[1]}`);
    }

    has(pos: Position): boolean {
        return this.positions.has(`${pos[0]},${pos[1]}`);
    }

    delete(pos: Position): void {
        this.positions.delete(`${pos[0]},${pos[1]}`);
    }

    clear(): void {
        this.positions.clear();
    }

    get size(): number {
        return this.positions.size;
    }

    isEmpty(): boolean {
        return this.positions.size === 0;
    }

    *[Symbol.iterator](): Iterator<Position> {
        for (const posStr of this.positions) {
            const [r, c] = posStr.split(',').map(Number);
            yield [r, c];
        }
    }

    toArray(): Position[] {
        return Array.from(this);
    }

    clone(): PositionSet {
        const newSet = new PositionSet();
        for (const pos of this) {
            newSet.add(pos);
        }
        return newSet;
    }

    toString(): string {
        return `PositionSet(${Array.from(this.positions).join(', ')})`;
    }
}
