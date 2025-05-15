import Player from "./player";

export default class MazeState {
  constructor(
    readonly rows: number = 14,
    readonly cols: number = 15,
    readonly grid: number[][] = [],
    readonly start: Player = new Player(),
  ) {
    if (grid.length > 0) {
      grid = Array(rows)
        .fill([])
        .map(() => Array(cols).fill(0));
    }

    return { rows, cols, grid, start };
  }
}
