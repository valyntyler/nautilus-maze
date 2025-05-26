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

  export function turn(t: Transform): Transform {
    return {
      position: t.position,
      rotation: Rotation.turn(t.rotation),
    };
  }
}

export default Transform;
