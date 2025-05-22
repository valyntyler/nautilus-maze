import "../styles/style.css";
import MazeComponent from "./common/maze_component";
import MazeData from "./common/maze_data";
import Tool from "./common/tool";
import Tools from "./common/tools";

document.addEventListener("DOMContentLoaded", () => {
  const maze = new MazeComponent(new MazeData(14, 15));
  const tools = new Tools();

  maze.oncellevent = (cell, event, state) => {
    switch (tools.selected) {
      case Tool.Pencil: {
        if (state.left) {
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
    }
  };
});
