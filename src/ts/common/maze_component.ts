import Grid from "../data/grid";
import Transform from "../data/transform";

export default class MazeComponent {
  container: HTMLDivElement;

  constructor(maze: Grid, robot: Transform) {
    this.container = document.getElementById("maze") as HTMLDivElement;
  }
}
