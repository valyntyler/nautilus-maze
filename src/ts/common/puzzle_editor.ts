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
        if (state.left && cell.children.length === 0) {
          cell.classList.add("black");
        }
        break;
      }
      case Tool.Eraser: {
        if (state.left) {
          cell.classList.remove("black");
        }
        break;
      }
      case Tool.Finger: {
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
        break;
      }
    }
  }
}
