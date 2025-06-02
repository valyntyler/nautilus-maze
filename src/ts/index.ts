import "../styles/style.css";
import Puzzle from "./common/puzzle";
import PuzzleRunner from "./common/puzzle_runner";
import PuzzleEditor from "./common/puzzle_editor";

document.addEventListener("DOMContentLoaded", () => {
  let local = localStorage.getItem("active-window");
  let puzzle: Puzzle;

  if (local !== null && local === "edit") {
    puzzle = new PuzzleEditor();
  } else {
    puzzle = new PuzzleRunner();
  }

  const onview = () => {
    // window.history.pushState({}, "", "/view");
    puzzle = new PuzzleRunner();
    localStorage.setItem("active-window", "view");

    puzzle.onview = onview;
    puzzle.onedit = onedit;
  };

  const onedit = () => {
    // window.history.pushState({}, "", "/edit");
    puzzle = new PuzzleEditor();
    localStorage.setItem("active-window", "edit");

    puzzle.onview = onview;
    puzzle.onedit = onedit;
  };

  puzzle.onview = onview;
  puzzle.onedit = onedit;
});
