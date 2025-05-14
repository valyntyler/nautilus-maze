export default class MazeState {
  grid: number[][] = [];

  constructor(
    public rows: number,
    public cols: number,
  ) {
    return {
      rows,
      cols,
      grid: Array(rows)
        .fill([])
        .map(() => Array(cols).fill(0)),
    };
  }
}
