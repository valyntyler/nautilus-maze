import Position from "../data/position";
import Rotation from "../data/rotation";
import Transform from "../data/transform";

class Robot implements Transform {
  position: Position;
  rotation: Rotation;
}

export default Robot;
