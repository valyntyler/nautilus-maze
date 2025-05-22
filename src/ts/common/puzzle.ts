import Grid from "../data/grid";
import Transform from "../data/transform";
import MouseEvent from "./mouse_event";
import MouseState from "./mouse_state";

export default class Puzzle {
  container: HTMLDivElement;

  oncellevent: (
    cell: HTMLDivElement,
    event: MouseEvent,
    state: MouseState,
  ) => void;

  constructor(maze = Grid.create(14, 15), robot = Transform.create()) {
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

    const index = cols * robot.position.y + robot.position.x;
    const cell = this.container.children[index];

    const img = document.createElement("img");
    img.src = "./assets/bx-caret-down.svg";
    img.draggable = false;

    for (const cell of this.container.children) {
      cell.innerHTML = "";
    }

    cell.appendChild(img);
  }
}
