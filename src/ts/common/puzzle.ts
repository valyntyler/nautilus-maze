import Grid from "../data/grid";
import Position from "../data/position";
import Rotation from "../data/rotation";
import Transform from "../data/transform";
import MouseEvent from "./mouse_event";
import MouseState from "./mouse_state";
import PuzzleState from "./puzzle_state";

export default class Puzzle {
  container: HTMLDivElement;

  onchange = () => {};
  oncellevent: (
    cell: HTMLDivElement,
    event: MouseEvent,
    state: MouseState,
  ) => void;

  get state(): PuzzleState {
    return {
      robot: this.robot,
      maze: this.maze,
    };
  }

  get robot(): Transform {
    const img = document.getElementById("robot")!;
    const div = img.parentNode! as HTMLDivElement;
    const row = div.parentNode! as HTMLDivElement;

    const x = Array.from(row.children).indexOf(div);
    const y = Array.from(row.parentNode!.children).indexOf(row);
    const r = Rotation.parse(img.className)!;

    return Transform.create(Position.create(x, y), r);
  }

  get maze(): Grid {
    const rows = this.container.children.length;
    const cols = this.container.children[0].children.length;

    const value = Grid.create(rows, cols);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = this.cell(j, i);
        value[i][j] = cell.classList.contains("black") ? 1 : 0;
      }
    }

    return value;
  }

  set state(value: PuzzleState) {
    this.maze = value.maze;
    this.robot = value.robot;
  }

  set robot(value: Transform) {
    const cell = this.cell(value.position.x, value.position.y);
    this.place(cell, value.rotation);
  }

  set maze(value: Grid) {
    const rows = Grid.rows(value);
    const cols = Grid.cols(value);

    document.documentElement.style.setProperty("--grid-rows", `${rows}`);
    document.documentElement.style.setProperty("--grid-cols", `${cols}`);

    for (let i = 0; i < rows; i++) {
      const row = document.createElement("div");
      row.classList.add("maze-row");

      for (let j = 0; j < cols; j++) {
        const cell = document.createElement("div");
        cell.classList.add("maze-cell");

        if (value[i][j] === 1) {
          cell.classList.add("black");
        }

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
  }

  constructor() {
    const local = localStorage.getItem("puzzle-state");
    const state: PuzzleState = local
      ? JSON.parse(local)
      : {
          maze: Grid.create(14, 15),
          robot: Transform.create(),
        };

    this.container = document.getElementById("maze") as HTMLDivElement;
    this.state = state;

    this.onchange = () => {
      localStorage.setItem("puzzle-state", JSON.stringify(this.state));
    };
  }

  cell(x: number, y: number): HTMLDivElement {
    return this.container.children[y].children[x] as HTMLDivElement;
  }

  place(cell: HTMLDivElement, rotation: Rotation = Rotation.Up) {
    const img = document.createElement("img");
    const id = Rotation.id(rotation);

    img.id = "robot";
    img.className = id;
    img.src = `./assets/bx-caret-${id}.svg`;
    img.draggable = false;

    for (const row of this.container.children) {
      for (const cell of row.children) {
        cell.innerHTML = "";
      }
    }

    cell.appendChild(img);
  }
}
