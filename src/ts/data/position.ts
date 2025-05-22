interface Position {
  x: number;
  y: number;
}

namespace Position {
  export function create(x: number = 0, y: number = 0): Position {
    return { x, y };
  }
}

export default Position;
