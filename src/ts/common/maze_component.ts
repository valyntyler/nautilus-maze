import Grid from "../data/grid";
import Transform from "../data/transform";
import MazeData from "./maze_data";
import Robot from "./robot";

export default class MazeComponent {
  container: HTMLDivElement;

  constructor(maze: Grid = new MazeData(), robot: Transform = new Robot()) {
    this.container = document.getElementById("maze") as HTMLDivElement;
  }
}
