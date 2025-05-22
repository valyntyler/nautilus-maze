import Rotation from "../data/rotation";
import Puzzle from "./puzzle";
import Tool from "./tool";
import Tools from "./tools";

export default class PuzzleEditor extends Puzzle {
  constructor(tools: Tools) {
    super();

    this.oncellevent = (cell, event, state) => {
      switch (tools.selected) {
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
              const id = cell.children[0].id;
              const rotation = Rotation.parse(id)!;

              switch (rotation) {
                case Rotation.Up: {
                  this.place(cell, Rotation.Left);
                  break;
                }
                case Rotation.Left: {
                  this.place(cell, Rotation.Down);
                  break;
                }
                case Rotation.Down: {
                  this.place(cell, Rotation.Right);
                  break;
                }
                case Rotation.Right: {
                  this.place(cell, Rotation.Up);
                  break;
                }
              }
            }
          }
          break;
        }
      }
    };
  }
}
