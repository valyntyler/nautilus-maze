import "../styles/style.css";
import MazeComponent from "./common/maze_component";
import MazeData from "./common/maze_data";
import Tools from "./common/tools";

document.addEventListener("DOMContentLoaded", () => {
  const maze = new MazeComponent(new MazeData(14, 15));
  const tools = new Tools();
});
