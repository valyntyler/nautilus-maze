export default class MazeState {
  grid: number[][] = [];

  constructor(
    // FIX: changing size doesn't resize `grid`
    public rows: number,
    public cols: number,
    public start: [number, number],
  ) {
    return {
      rows,
      cols,
      grid: Array(rows)
        .fill([])
        .map(() => Array(cols).fill(0)),
      start: [0, 0],
    };
  }
}
