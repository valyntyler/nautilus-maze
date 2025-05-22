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
}

export default Rotation;
