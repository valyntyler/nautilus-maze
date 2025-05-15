import Direction from "./direction";
import Player from "./player";

export default class MazeState {
  readonly grid: number[][] = [];

  constructor(
    readonly rows: number,
    readonly cols: number,
    readonly start: Player,
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
