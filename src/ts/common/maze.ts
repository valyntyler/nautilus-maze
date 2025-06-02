import Cell from "../data/cell";
import Grid from "../data/grid";
import MouseEvent from "../data/mouse_event";
import MouseState from "../data/mouse_state";

export default class Maze {
  public onevent: (
    cell: HTMLDivElement,
    event: MouseEvent,
    state: MouseState,
  ) => void = () => {};

  public get state(): Grid {
    return Array.from(this.container.children).map((row) =>
      Array.from(row.children).map((cell) =>
        cell.classList.contains("black") ? Cell.Black : Cell.White,
      ),
    );
  }

  private container: HTMLDivElement;

  private html() {
    const puzzle_element = document.getElementById("puzzle") as HTMLDivElement;
    const maze_element = document.createElement("div");

    maze_element.id = "maze";
    maze_element.classList = "maze-container";

    this.container = maze_element;
    puzzle_element.appendChild(this.container);
  }

  private grid(value: Grid) {
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

  constructor(value: Grid) {
    this.html();
    this.grid(value);
  }
}
