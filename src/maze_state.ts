import Direction from "./direction";
import Player from "./player";

export default class MazeState {
  grid: number[][] = [];

  constructor(
    // FIX: changing size doesn't resize `grid`
    public rows: number,
    public cols: number,
    public start: Player,
  ) {
    return {
      rows,
      cols,
      grid: Array(rows)
        .fill([])
        .map(() => Array(cols).fill(0)),
      start: {
        x: 0,
        y: 0,
        dir: Direction.Up,
      },
    };
  }
}
