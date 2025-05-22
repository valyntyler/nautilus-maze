import "../styles/style.css";
import Puzzle from "./common/puzzle";
import Tool from "./common/tool";
import Tools from "./common/tools";
import Rotation from "./model/robot/rotation";

document.addEventListener("DOMContentLoaded", () => {
  const puzzle = new Puzzle();
  const tools = new Tools();

  puzzle.oncellevent = (cell, event, state) => {
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
            puzzle.place(cell);
          } else if (state.right && length !== 0) {
            const id = cell.children[0].id;
            const rotation = Rotation.parse(id)!;

            switch (rotation) {
              case Rotation.Up: {
                puzzle.place(cell, Rotation.Left);
                break;
              }
              case Rotation.Left: {
                puzzle.place(cell, Rotation.Down);
                break;
              }
              case Rotation.Down: {
                puzzle.place(cell, Rotation.Right);
                break;
              }
              case Rotation.Right: {
                puzzle.place(cell, Rotation.Up);
                break;
              }
            }
          }
        }
        break;
      }
    }
  };
});
