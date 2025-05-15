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
    this.container.style.gridTemplateColumns = `repeat(${this.state.cols}, 32px)`;
    this.container.style.gridTemplateRows = `repeat(${this.state.rows}, 32px)`;

    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < this.state.cols; j++) {
        const cell = document.createElement("div");
        cell.className = "maze-cell";

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
