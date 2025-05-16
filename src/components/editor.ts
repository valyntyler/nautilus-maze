import Direction from "../model/direction";
import MouseAction from "../model/mouse_action";
import MouseButton from "../model/mouse_button";
import Player from "../model/player";
import State from "../model/state";
import Tool from "../model/tool";
import Toolbar from "./toolbar";

export default class Editor {
  private container: HTMLDivElement;
  private toolbar: Toolbar;

  private rows: number = 0;
  private cols: number = 0;

  get state(): State {
    const value = new State(this.rows, this.cols, [], this.start);

    for (let i = 0; i < value.rows; i++) {
      for (let j = 0; j < value.cols; j++) {
        const cell = this.container.children[value.cols * i + j];

        value.grid[i][j] = cell.classList.contains("black") ? 1 : 0;
      }
    }

    return value;
  }

  set state(value: State) {
    this.container.innerHTML = "";
    this.container.style.gridTemplateColumns = `repeat(${value.cols}, 32px)`;
    this.container.style.gridTemplateRows = `repeat(${value.rows}, 32px)`;

    for (let i = 0; i < value.rows; i++) {
      for (let j = 0; j < value.cols; j++) {
        const cell = document.createElement("div");
        cell.className = "maze-cell";

        if (value.grid[i][j] === 1) {
          cell.classList.add("black");
        }

        cell.addEventListener("mousedown", (e) =>
          this.draw(cell, MouseButton.parse(e.buttons)!, MouseAction.Down),
        );

        cell.addEventListener("mouseenter", (e) =>
          this.draw(cell, MouseButton.parse(e.buttons)!, MouseAction.Enter),
        );

        cell.addEventListener("contextmenu", (e) => e.preventDefault());

        this.container.appendChild(cell);
      }
    }

    this.rows = value.rows;
    this.cols = value.cols;
    this.start = value.start;

    this.save();
  }

  get start(): Player {
    for (let k = 0; k < this.container.children.length; k++) {
      const cell = this.container.children[k];

      if (cell.children.length !== 0) {
        const y = Math.floor(k / this.cols);
        const x = k % this.cols;

        const id = cell.children[0].id;
        const dir = Direction.parse(id)!;

        return new Player(x, y, dir);
      }
    }

    throw new Error("`start` not found");
  }

  set start(value: Player) {
    const cell = this.container.children[this.cols * value.y + value.x];

    this.place(cell as HTMLDivElement, value.dir);
  }

  constructor(toolbar: Toolbar) {
    this.toolbar = toolbar;
    this.container = document.getElementById("maze")! as HTMLDivElement;
  }

  private place(cell: HTMLDivElement, dir: Direction) {
    const img = document.createElement("img");
    const id = Direction.id(dir);

    img.src = `../assets/bx-caret-${id}.svg`;
    img.id = id;

    for (let k = 0; k < this.container.children.length; k++) {
      let cell = this.container.children[k];
      cell.innerHTML = "";
    }

    cell.appendChild(img);
  }

  private draw(
    cell: HTMLDivElement,
    buttons: Array<MouseButton>,
    action: MouseAction,
  ) {
    switch (this.toolbar.selected) {
      case Tool.Pencil:
        if (
          buttons.includes(MouseButton.Left) &&
          cell !==
            this.container.children[this.cols * this.start.y + this.start.x]
        ) {
          cell.classList.add("black");
          this.save();
        }
        break;

      case Tool.Eraser:
        if (buttons.includes(MouseButton.Left)) {
          cell.classList.remove("black");
          this.save();
        }
        break;

      case Tool.Finger:
        if (cell.classList.contains("black")) break;
        if (action !== MouseAction.Down) break;

        const index = this.cols * this.start.y + this.start.x;
        const is_cursor = cell === this.container.children[index];

        if (is_cursor) {
          if (buttons.includes(MouseButton.Left)) {
            this.place(cell, Direction.rotate(this.start.dir, false));
          }
          if (buttons.includes(MouseButton.Right)) {
            this.place(cell, Direction.rotate(this.start.dir, true));
          }
        } else {
          this.place(cell, Direction.Up);
        }

        this.save();
        break;
    }
  }

  private save() {
    localStorage.setItem("editor-state", JSON.stringify(this.state));
  }
}
