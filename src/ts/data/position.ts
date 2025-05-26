import Rotation from "./rotation";

interface Position {
  x: number;
  y: number;
}

namespace Position {
  export function create(x: number = 0, y: number = 0): Position {
    return { x, y };
  }

  export function step(pos: Position, r: Rotation): Position {
    switch (r) {
      case Rotation.Up: {
        return {
          x: pos.x,
          y: pos.y - 1,
        };
      }
      case Rotation.Down: {
        return {
          x: pos.x,
          y: pos.y + 1,
        };
      }
      case Rotation.Left: {
        return {
          x: pos.x - 1,
          y: pos.y,
        };
      }
      case Rotation.Right: {
        return {
          x: pos.x + 1,
          y: pos.y,
        };
      }
    }
  }
}

export default Position;
