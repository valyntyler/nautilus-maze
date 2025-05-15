import MazeState from "./maze_state";
import Tool from "./tool";
import Toolbar from "./toolbar";

let mousePressed: boolean;

document.addEventListener("mouseup", () => (mousePressed = false));

export default class Maze {
  container: HTMLDivElement;

  get state(): MazeState {
    const _state = new MazeState(10, 10);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const index = i * this.rows + j;
        const cell = this.container.children[index];

        _state.grid[i][j] = cell.classList.contains("black") ? 1 : 0;
      }
    }

    return _state;
  }

  set state(value: MazeState) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const index = i * this.rows + j;
        const cell = this.container.children[index];

        switch (value.grid[i][j]) {
          case 0:
            cell.classList.remove("black");
            break;

          case 1:
            cell.classList.add("black");
            break;
        }
      }
    }
  }

  constructor(
    readonly rows: number,
    readonly cols: number,
    private toolbar: Toolbar,
  ) {
    this.container = document.getElementById("maze")! as HTMLDivElement;
  }

  create() {
    this.container.innerHTML = "";
    this.container.style.gridTemplateColumns = `repeat(${this.cols}, 40px)`;
    this.container.style.gridTemplateRows = `repeat(${this.rows}, 40px)`;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // create cell
        const cell = document.createElement("div");
        cell.className = "maze-cell";

        // register its mouse events
        cell.addEventListener("mousedown", (e) => {
          mousePressed = true;
          this.draw(cell);

          e.preventDefault();
        });

        cell.addEventListener("mouseenter", () => {
          if (mousePressed) {
            this.draw(cell);
          }
        });

        // disable its context menu
        cell.addEventListener("contextmenu", (e) => e.preventDefault());

        // append it to the container
        this.container.appendChild(cell);
      }
    }
  }

  draw(cell: HTMLDivElement) {
    switch (this.toolbar.selected) {
      case Tool.Pencil:
        cell.classList.add("black");
        break;

      case Tool.Eraser:
        cell.classList.remove("black");
        break;
    }
    localStorage.setItem("editor-state", JSON.stringify(this.state));
  }
}
