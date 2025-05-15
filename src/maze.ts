import Direction from "./direction";
import MazeState from "./maze_state";
import Player from "./player";
import Tool from "./tool";
import Toolbar from "./toolbar";

let mousePressed: boolean;

document.addEventListener("mouseup", () => (mousePressed = false));

export default class Maze {
  container: HTMLDivElement;
  toolbar: Toolbar;

  _cols: number;
  _rows: number;
  _start: Player;

  get rows(): number {
    return this._rows;
  }

  get cols(): number {
    return this._cols;
  }

  get start(): Player {
    return this._start;
  }

  get state(): MazeState {
    const _state = new MazeState(this.rows, this.cols, new Player());

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const index = i * this.rows + j;
        const cell = this.container.children[index];

        _state.grid[i][j] = cell.classList.contains("black") ? 1 : 0;

        if (cell.innerHTML != "") {
          // FIX: specify direction
          _state.start = new Player(j, i);
        }
      }
    }

    return _state;
  }

  set state(value: MazeState) {
    this._rows = value.rows;
    this._cols = value.cols;
    this._start = value.start;

    this.container.innerHTML = "";
    this.container.style.gridTemplateColumns = `repeat(${this.cols}, 40px)`;
    this.container.style.gridTemplateRows = `repeat(${this.rows}, 40px)`;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // create cell
        const cell = document.createElement("div");
        cell.className = "maze-cell";

        if (value.grid[i]) {
          // set its value
          switch (value.grid[i][j]) {
            case 0:
              cell.classList.remove("black");
              break;

            case 1:
              cell.classList.add("black");
              break;
          }

          // check if it contains the robot
          if (i === this.start.y && j === this.start.x) {
            this.place(cell, Direction.Up);
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
    this._start = new Player();
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
        if (!enter) {
          this.place(cell, Direction.Up);
        }
        break;
    }
    localStorage.setItem("editor-state", JSON.stringify(this.state));
  }

  private place(cell: HTMLDivElement, dir: Direction) {
    if (!cell.classList.contains("black")) {
      const img = document.createElement("img");
      const id = Direction.id(dir);

      img.src = `./assets/bx-caret-${id}.svg`;
      img.id = id;

      for (let i = 0; i < this.container.children.length; i++) {
        const cell = this.container.children[i] as HTMLDivElement;
        cell.innerHTML = "";
      }

      cell.appendChild(img);
    }
  }
}
