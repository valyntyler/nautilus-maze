import Grid from "../data/grid";
import Transform from "../data/transform";
import Rotation from "../model/robot/rotation";
import MouseEvent from "./mouse_event";
import MouseState from "./mouse_state";

export default class Puzzle {
  container: HTMLDivElement;

  set robot(value: Transform) {
    const cell = this.cell(value.position.x, value.position.y);
    this.place(cell);
  }

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
      const row = document.createElement("div");
      row.classList.add("maze-row");

      for (let j = 0; j < cols; j++) {
        const cell = document.createElement("div");
        cell.classList.add("maze-cell");

        cell.addEventListener("mousedown", (e) =>
          this.oncellevent(cell, MouseEvent.Down, MouseState.parse(e.buttons)),
        );
        cell.addEventListener("mouseenter", (e) =>
          this.oncellevent(cell, MouseEvent.Enter, MouseState.parse(e.buttons)),
        );

        cell.addEventListener("contextmenu", (e) => e.preventDefault());

        row.appendChild(cell);
      }

      this.container.appendChild(row);
    }

    this.robot = robot;
  }

  cell(x: number, y: number): HTMLDivElement {
    return this.container.children[y].children[x] as HTMLDivElement;
  }

  place(cell: HTMLDivElement, rotation: Rotation = Rotation.Up) {
    const img = document.createElement("img");

    img.src = `./assets/bx-caret-${Rotation.id(rotation)}.svg`;
    img.draggable = false;

    for (const row of this.container.children) {
      for (const cell of row.children) {
        cell.innerHTML = "";
      }
    }

    cell.appendChild(img);
  }
}
