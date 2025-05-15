import MazeState from "./maze_state";
import Tool from "./tool";
import Toolbar from "./toolbar";

let mousePressed: boolean;

document.addEventListener("mouseup", () => (mousePressed = false));

export default class Maze {
  container: HTMLDivElement;
  toolbar: Toolbar;

  _cols: number;
  _rows: number;

  get rows(): number {
    return this._rows;
  }

  get cols(): number {
    return this._cols;
  }

  get state(): MazeState {
    const _state = new MazeState(this.rows, this.cols);

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
    this._rows = value.rows;
    this._cols = value.cols;

    this.container.innerHTML = "";
    this.container.style.gridTemplateColumns = `repeat(${this.cols}, 40px)`;
    this.container.style.gridTemplateRows = `repeat(${this.rows}, 40px)`;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // create cell
        const cell = document.createElement("div");
        cell.className = "maze-cell";

        // set its value
        if (value.grid[i]) {
          switch (value.grid[i][j]) {
            case 0:
              cell.classList.remove("black");
              break;

            case 1:
              cell.classList.add("black");
              break;
          }
        }

        // register its mouse events
        cell.addEventListener("mousedown", (e) => {
          mousePressed = true;
          this.draw(cell, false);

          e.preventDefault();
        });

        cell.addEventListener("mouseenter", () => {
          if (mousePressed) {
            this.draw(cell, true);
          }
        });

        // disable its context menu
        cell.addEventListener("contextmenu", (e) => e.preventDefault());

        // append it to the container
        this.container.appendChild(cell);
      }
    }

    localStorage.setItem("editor-state", JSON.stringify(this.state));
  }

  constructor(rows: number, cols: number, toolbar: Toolbar) {
    this._rows = rows;
    this._cols = cols;
    this.toolbar = toolbar;
    this.container = document.getElementById("maze")! as HTMLDivElement;
  }

  private draw(cell: HTMLDivElement, enter: boolean) {
    switch (this.toolbar.selected) {
      case Tool.Pencil:
        if (cell.innerHTML === "") {
          cell.classList.add("black");
        }
        break;

      case Tool.Eraser:
        cell.classList.remove("black");
        break;

      case Tool.Finger:
        if (!cell.classList.contains("black") && !enter) {
          const img = document.createElement("img");
          img.src = "./assets/bx-robot.svg";

          for (let i = 0; i < this.container.children.length; i++) {
            const cell = this.container.children[i] as HTMLDivElement;
            cell.innerHTML = "";
          }

          cell.appendChild(img);
        }
        break;
    }
    localStorage.setItem("editor-state", JSON.stringify(this.state));
  }
}
