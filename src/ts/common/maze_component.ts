import MazeData from "./maze_data";
import Robot from "./robot";

export default class MazeComponent {
  container: HTMLDivElement;

  constructor(maze = new MazeData(), robot = new Robot()) {
    this.container = document.getElementById("maze") as HTMLDivElement;

    document.documentElement.style.setProperty("--grid-rows", `${maze.rows}`);
    document.documentElement.style.setProperty("--grid-cols", `${maze.cols}`);

    for (let i = 0; i < maze.rows; i++) {
      for (let j = 0; j < maze.cols; j++) {
        const cell = document.createElement("div");
        this.container.appendChild(cell);
      }
    }
  }
}
