import Direction from "./direction";
import Player from "./player";

export default class MazeState {
  constructor(
    readonly rows: number = 14,
    readonly cols: number = 15,
    readonly grid: number[][] = [],
    readonly start: Player = new Player(),
  ) {
    return {
      rows,
      cols,
      grid:
        grid.length > 0
          ? grid
          : Array(rows)
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
