enum Rotation {
  Up,
  Down,
  Left,
  Right,
}

namespace Rotation {
  export function id(dir: Rotation): string {
    switch (dir) {
      case Rotation.Up: {
        return "up";
      }
      case Rotation.Down: {
        return "down";
      }
      case Rotation.Left: {
        return "left";
      }
      case Rotation.Right: {
        return "right";
      }
    }
  }

  export function parse(id: string): Rotation | null {
    switch (id) {
      case "up": {
        return Rotation.Up;
      }
      case "down": {
        return Rotation.Down;
      }
      case "left": {
        return Rotation.Left;
      }
      case "right": {
        return Rotation.Right;
      }
      default: {
        return null;
      }
    }
  }
}

export default Rotation;
