import Cell from "../data/cell";
import Grid from "../data/grid";

class MazeData implements Grid {
  data: Cell[][];

  get rows() {
    return this.data.length;
  }

  get cols() {
    return this.data[0].length;
  }

  constructor(rows: number = 0, cols: number = 0) {
    this.data = Array(rows)
      .fill([])
      .map(() => Array(cols).fill(0));
  }
}

export default MazeData;
