import Position from "./position";

enum Rotation {
  North,
  South,
  East,
  West,
}

namespace Rotation {
  export function step(rotation: Rotation): Position {
    switch (rotation) {
      case Rotation.North:
        return {
          x: 0,
          y: -1,
        };

      case Rotation.South:
        return {
          x: 0,
          y: 1,
        };

      case Rotation.East:
        return {
          x: -1,
          y: 0,
        };

      case Rotation.West:
        return {
          x: 1,
          y: 0,
        };
    }
  }

  export function back(rotation: Rotation): Position {
    switch (rotation) {
      case Rotation.North:
        return {
          x: 0,
          y: 1,
        };

      case Rotation.South:
        return {
          x: 0,
          y: -1,
        };

      case Rotation.East:
        return {
          x: 1,
          y: 0,
        };

      case Rotation.West:
        return {
          x: -1,
          y: 0,
        };
    }
  }
}

export default Rotation;
