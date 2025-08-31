export type Position = [number, number];

export const serializePosition = (pos: Position): string => `[${pos[0]},${pos[1]}]`;
