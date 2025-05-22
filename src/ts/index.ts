import "../styles/style.css";
import Puzzle from "./common/puzzle";
import PuzzleRunner from "./common/puzzle_runner";
import PuzzleEditor from "./common/puzzle_editor";

document.addEventListener("DOMContentLoaded", () => {
  let puzzle: Puzzle;

  puzzle = new PuzzleRunner();
  puzzle = new PuzzleEditor();
});
