import MazeData from "./maze_data";
import MouseEvent from "./mouse_event";
import MouseState from "./mouse_state";
import Robot from "./robot";

export default class MazeComponent {
  private container: HTMLDivElement;

  oncellevent: (
    cell: HTMLDivElement,
    event: MouseEvent,
    state: MouseState,
  ) => void;

  constructor(maze = new MazeData(), robot = new Robot()) {
    this.container = document.getElementById("maze") as HTMLDivElement;

    document.documentElement.style.setProperty("--grid-rows", `${maze.rows}`);
    document.documentElement.style.setProperty("--grid-cols", `${maze.cols}`);

    for (let i = 0; i < maze.rows; i++) {
      for (let j = 0; j < maze.cols; j++) {
        const cell = document.createElement("div");

        cell.addEventListener("mousedown", (e) =>
          this.oncellevent(cell, MouseEvent.Down, MouseState.parse(e.buttons)),
        );
        cell.addEventListener("mouseenter", (e) =>
          this.oncellevent(cell, MouseEvent.Enter, MouseState.parse(e.buttons)),
        );

        cell.addEventListener("contextmenu", (e) => e.preventDefault());

        this.container.appendChild(cell);
      }
    }
  }
}
