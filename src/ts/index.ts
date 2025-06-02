import "../styles/style.css";
import Puzzle from "./common/puzzle";
import PuzzleRunner from "./common/puzzle_runner";
import PuzzleEditor from "./common/puzzle_editor";

document.addEventListener("DOMContentLoaded", () => {
  let puzzle: Puzzle = new PuzzleRunner();

  const onview = () => {
    // window.history.pushState({}, "", "/view");
    puzzle = new PuzzleRunner();

    puzzle.onview = onview;
    puzzle.onedit = onedit;
  };

  const onedit = () => {
    // window.history.pushState({}, "", "/edit");
    puzzle = new PuzzleEditor();

    puzzle.onview = onview;
    puzzle.onedit = onedit;
  };

  puzzle.onview = onview;
  puzzle.onedit = onedit;
});
