import Cell from "./cell";
import Position from "./position";

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

  export function contains(coord: Position, grid: Grid): boolean {
    const rows = Grid.rows(grid);
    const cols = Grid.cols(grid);

    if (coord.x < 0) return false;
    if (coord.x >= cols) return false;

    if (coord.y < 0) return false;
    if (coord.y >= rows) return false;

    return true;
  }

  export function isWall(coord: Position, grid: Grid) {
    return grid[coord.y][coord.x] === 1;
  }
}

export default Grid;
