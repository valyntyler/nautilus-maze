enum Direction {
  Up,
  Down,
  Left,
  Right,
}

namespace Direction {
  export function id(dir: Direction): string {
    switch (dir) {
      case Direction.Up:
        return "up";
      case Direction.Down:
        return "down";
      case Direction.Left:
        return "left";
      case Direction.Right:
        return "right";
    }
  }
}

export default Direction;
