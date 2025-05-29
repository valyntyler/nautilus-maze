import Cell from "../data/cell";
import Grid from "../data/grid";
import MouseEvent from "./mouse_event";
import MouseState from "./mouse_state";

export default class Maze {
  private container: HTMLDivElement;

  public onevent = (
    cell: HTMLDivElement,
    event: MouseEvent,
    state: MouseState,
  ) => {};

  get grid(): Grid {
    return Array.from(this.container.children).map((row) =>
      Array.from(row.children).map((cell) =>
        cell.classList.contains("black") ? Cell.Black : Cell.White,
      ),
    );
  }

  set grid(value: Grid) {
    this.container.innerHTML = "";

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

        if (value[i][j] === Cell.Black) {
          cell.classList.add("black");
        }

        cell.addEventListener("mousedown", (e) =>
          this.onevent(cell, MouseEvent.Down, MouseState.parse(e.buttons)),
        );
        cell.addEventListener("mouseenter", (e) =>
          this.onevent(cell, MouseEvent.Enter, MouseState.parse(e.buttons)),
        );

        cell.addEventListener("contextmenu", (e) => e.preventDefault());

        row.appendChild(cell);
      }

      this.container.appendChild(row);
    }
  }

  constructor() {
    this.html();
    this.load();
  }

  public save() {
    localStorage.setItem("grid", JSON.stringify(this.grid));
  }

  public load() {
    const local = localStorage.getItem("grid");
    this.grid = local ? JSON.parse(local) : Grid.create();
  }

  private html() {
    const puzzle_element = document.getElementById("puzzle") as HTMLDivElement;
    const maze_element = document.createElement("div");

    maze_element.id = "maze";
    maze_element.classList = "maze-container";

    this.container = maze_element;
    puzzle_element.appendChild(this.container);
  }
}
