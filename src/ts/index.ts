import "../styles/style.css";
import Tools from "./common/tools";
import PuzzleEditor from "./common/puzzle_editor";

document.addEventListener("DOMContentLoaded", () => {
  const tools = new Tools();
  const puzzle_editor = new PuzzleEditor(tools);
});
