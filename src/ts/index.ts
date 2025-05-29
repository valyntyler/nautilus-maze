import "../styles/style.css";
import Puzzle from "./common/puzzle";
import PuzzleRunner from "./common/puzzle_runner";
import PuzzleEditor from "./common/puzzle_editor";

document.addEventListener("DOMContentLoaded", () => {
  let puzzle: Puzzle = new PuzzleEditor();

  const onview = () => {
    puzzle = new PuzzleRunner();

    puzzle.onview = onview;
    puzzle.onedit = onedit;
  };

  const onedit = () => {
    puzzle = new PuzzleEditor();

    puzzle.onview = onview;
    puzzle.onedit = onedit;
  };

  puzzle.onview = onview;
  puzzle.onedit = onedit;
});
