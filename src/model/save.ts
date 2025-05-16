import Maze from "./maze";
import Robot from "./robot/robot";

export default interface Save {
  robot: Robot;
  maze: Maze;
}
