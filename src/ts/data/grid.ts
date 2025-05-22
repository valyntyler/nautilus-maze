import Cell from "./cell";

interface Grid extends Array<Array<Cell>> {}

namespace Grid {
  export function create(rows: number = 14, cols: number = 15): Grid {
    return Array(rows)
      .fill([])
      .map(() => Array(cols).fill(0));
  }

  export function rows(grid: Grid): number {
    return grid.length;
  }

  export function cols(grid: Grid): number {
    return grid[0].length;
  }
}

export default Grid;
