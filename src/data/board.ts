export interface BoardConfig {
  id: string;
  name: string;
  size: string;
  board: string[][];
  words: string[];
}

export const BOARD_CONFIGS: BoardConfig[] = [
  {
    id: '3x3',
    name: '3×3',
    size: 'Small',
    board: [
      ['C', 'A', 'U'],
      ['P', 'R', 'A'],
      ['R', 'E', 'D']
    ],
    words: ['CAR', 'RAD', 'ERA']
  },
  {
    id: '4x4',
    name: '4×4',
    size: 'Medium',
    board: [
      ['T', 'H', 'T', 'H'],
      ['W', 'A', 'I', 'I'],
      ['A', 'E', 'H', 'S'],
      ['K', 'E', 'R', 'T']
    ],
    words: ['AWAKE', 'TREE', 'HIT', 'THIS']
  },
  {
    id: '5x5',
    name: '5×5',
    size: 'Large',
    board: [
      ['E', 'T', 'H', 'E', 'D'],
      ['K', 'A', 'T', 'S', 'E'],
      ['N', 'B', 'O', 'U', 'D'],
      ['A', 'L', 'L', 'D', 'E'],
      ['E', 'E', 'C', 'S', 'A']
    ],
    words: ['LOUDEST', 'DUDE', 'BLANKET', 'TABLECLOTH', 'BATHED']
  }
];

export const DEFAULT_BOARD_ID = '3x3';
