import Grid from "../data/grid";
import MouseEvent from "./mouse_event";
import MouseState from "./mouse_state";
import Robot from "./robot";

export default class Puzzle {
  private container: HTMLDivElement;

  oncellevent: (
    cell: HTMLDivElement,
    event: MouseEvent,
    state: MouseState,
  ) => void;

  constructor(maze = Grid.create(14, 15), robot = new Robot()) {
    this.container = document.getElementById("maze") as HTMLDivElement;

    const rows = Grid.rows(maze);
    const cols = Grid.cols(maze);

    document.documentElement.style.setProperty("--grid-rows", `${rows}`);
    document.documentElement.style.setProperty("--grid-cols", `${cols}`);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
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
