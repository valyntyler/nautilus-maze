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
}

export default MazeData;
