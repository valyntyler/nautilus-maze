import "../styles/style.css";
import Puzzle from "./common/puzzle";
import Tool from "./common/tool";
import Tools from "./common/tools";

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
        if (!cell.classList.contains("black") && state.left) {
          const img = document.createElement("img");

          img.src = "./assets/bx-caret-down.svg";
          img.draggable = false;

          for (const cell of puzzle.container.children) {
            cell.innerHTML = "";
          }

          cell.appendChild(img);
        }
        break;
      }
    }
  };
});
