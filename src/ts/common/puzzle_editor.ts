import Rotation from "../data/rotation";
import MouseEvent from "./mouse_event";
import MouseState from "./mouse_state";
import Puzzle from "./puzzle";
import Tool from "./tool";
import Tools from "./tools";

export default class PuzzleEditor extends Puzzle {
  private tools: Tools;

  constructor() {
    super();

    const tools = document.createElement("div");
    const img = document.createElement("img");
    const bar = document.getElementById("bar")!;

    tools.id = "tools";
    tools.className = "tools-container";

    img.src = "./assets/bx-check.svg";
    img.id = "done";
    img.onclick = () => this.onview();

    bar.innerHTML = "";
    bar.appendChild(tools);
    bar.appendChild(img);

    this.tools = new Tools();
    this.oncellevent = this.handleCellEvent;
  }

  private handleCellEvent(
    cell: HTMLDivElement,
    event: MouseEvent,
    state: MouseState,
  ) {
    switch (this.tools.selected) {
      case Tool.Pencil: {
        this.usePencil(cell, event, state);
        break;
      }
      case Tool.Eraser: {
        this.useEraser(cell, event, state);
        break;
      }
      case Tool.Finger: {
        this.useFinger(cell, event, state);
        break;
      }
    }
    this.onchange();
  }

  private usePencil(
    cell: HTMLDivElement,
    event: MouseEvent,
    state: MouseState,
  ) {
    if (state.left && cell.children.length === 0) {
      cell.classList.add("black");
    }
  }

  private useEraser(
    cell: HTMLDivElement,
    event: MouseEvent,
    state: MouseState,
  ) {
    if (state.left) {
      cell.classList.remove("black");
    }
  }

  private useFinger(
    cell: HTMLDivElement,
    event: MouseEvent,
    state: MouseState,
  ) {
    const length = cell.children.length;
    if (!cell.classList.contains("black")) {
      if (state.left && length === 0) {
        this.place(cell);
      } else if (state.right && length !== 0) {
        const id = cell.children[0].className;
        const r = Rotation.parse(id)!;

        this.place(cell, Rotation.turn(r));
      }
    }
  }
}
