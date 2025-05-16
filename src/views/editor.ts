import State from "../model/state";
import Toolbar from "./toolbar";

export default class Editor {
  container: HTMLDivElement;
  toolbar: Toolbar;

  get state(): State {
    return new State();
  }

  set state(value: State) {
    this.container.innerHTML = "";
    this.container.style.gridTemplateColumns = `repeat(${value.cols}, 32px)`;
    this.container.style.gridTemplateRows = `repeat(${value.rows}, 32px)`;

    for (let i = 0; i < value.rows; i++) {
      for (let j = 0; j < value.cols; j++) {
        const cell = document.createElement("div");
        cell.className = "maze-cell";

        cell.addEventListener("contextmenu", (e) => e.preventDefault());

        this.container.appendChild(cell);
      }
    }
  }

  constructor(toolbar: Toolbar) {
    this.toolbar = toolbar;
    this.container = document.getElementById("maze")! as HTMLDivElement;
    this.state = new State();
  }
}
