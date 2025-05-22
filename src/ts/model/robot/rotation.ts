import Position from "./position";

enum Rotation {
  Up,
  Down,
  Left,
  Right,
}

namespace Rotation {
  export function step(rotation: Rotation): Position {
    switch (rotation) {
      case Rotation.Up:
        return {
          x: 0,
          y: -1,
        };

      case Rotation.Down:
        return {
          x: 0,
          y: 1,
        };

      case Rotation.Left:
        return {
          x: -1,
          y: 0,
        };

      case Rotation.Right:
        return {
          x: 1,
          y: 0,
        };
    }
  }

  export function back(rotation: Rotation): Position {
    switch (rotation) {
      case Rotation.Up:
        return {
          x: 0,
          y: 1,
        };

      case Rotation.Down:
        return {
          x: 0,
          y: -1,
        };

      case Rotation.Left:
        return {
          x: 1,
          y: 0,
        };

      case Rotation.Right:
        return {
          x: -1,
          y: 0,
        };
    }
  }

  export function turn(dir: Rotation): Rotation {
    switch (dir) {
      case Rotation.Up:
        return Rotation.Left;

      case Rotation.Left:
        return Rotation.Down;

      case Rotation.Down:
        return Rotation.Right;

      case Rotation.Right:
        return Rotation.Up;
    }
  }
}

export default Rotation;
