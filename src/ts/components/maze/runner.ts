import Rotation from "../../model/robot/rotation";
import Player from "../../model/player";
import Maze from "../../model/maze";

export default class MazeRunner {
  private container: HTMLDivElement;

  private rows: number = 0;
  private cols: number = 0;

  get state(): Maze {
    const value = new Maze(this.rows, this.cols, [], this.robot);

    for (let i = 0; i < value.rows; i++) {
      for (let j = 0; j < value.cols; j++) {
        const cell = this.cell(j, i);
        value.grid[i][j] = cell.classList.contains("black") ? 1 : 0;
      }
    }

    return value;
  }

  set state(value: Maze) {
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

        cell.addEventListener("contextmenu", (e) => e.preventDefault());

        this.container.appendChild(cell);
      }
    }

    this.rows = value.rows;
    this.cols = value.cols;
    this.robot = value.start;

    this.save();
  }

  get robot(): Player {
    for (let k = 0; k < this.container.children.length; k++) {
      const cell = this.container.children[k];

      if (cell.children.length !== 0) {
        const y = Math.floor(k / this.cols);
        const x = k % this.cols;

        const id = cell.children[0].id;
        const dir = Rotation.parse(id)!;

        return new Player(x, y, dir);
      }
    }

    throw new Error("`start` not found");
  }

  set robot(value: Player) {
    const cell = this.cell(value.x, value.y);
    this.place(cell, value.dir);
  }

  constructor() {
    this.container = document.getElementById("maze")! as HTMLDivElement;
  }

  private place(cell: HTMLDivElement, dir: Rotation) {
    const img = document.createElement("img");
    const id = Rotation.id(dir);

    img.src = `../assets/bx-caret-${id}.svg`;
    img.id = id;

    for (let k = 0; k < this.container.children.length; k++) {
      let cell = this.container.children[k];
      cell.innerHTML = "";
    }

    cell.appendChild(img);
  }

  private save() {
    localStorage.setItem("editor-state", JSON.stringify(this.state));
  }

  cell(x: number, y: number): HTMLDivElement {
    return this.container.children[this.cols * y + x] as HTMLDivElement;
  }
}
