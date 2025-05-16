import Maze from "./maze";
import Robot from "./robot/transform";

export default interface Save {
  robot: Robot;
  maze: Maze;
}
