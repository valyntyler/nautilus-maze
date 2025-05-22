import Position from "./position";
import Rotation from "./rotation";

interface Transform {
  position: Position;
  rotation: Rotation;
}

namespace Transform {
  export function create(
    position: Position = Position.create(),
    rotation: Rotation = Rotation.Up,
  ): Transform {
    return {
      position,
      rotation,
    };
  }
}

export default Transform;
