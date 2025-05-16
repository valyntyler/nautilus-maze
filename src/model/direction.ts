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

  export function parse(id: string): Direction | null {
    switch (id) {
      case "up":
        return Direction.Up;
      case "down":
        return Direction.Down;
      case "left":
        return Direction.Left;
      case "right":
        return Direction.Right;
      default:
        return null;
    }
  }
}

export default Direction;
