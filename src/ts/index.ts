import "../styles/style.css";
import Puzzle from "./common/puzzle";
import PuzzleRunner from "./common/puzzle_runner";
import PuzzleEditor from "./common/puzzle_editor";
import Storage from "./common/storage/storage";
import Window from "./common/window/window";

document.addEventListener("DOMContentLoaded", () => {
  let puzzle: Puzzle;

  switch (Storage.get_window()) {
    case Window.View: {
      puzzle = new PuzzleRunner();
      break;
    }
    case Window.Edit: {
      puzzle = new PuzzleEditor();
      break;
    }
  }

  const onview = () => {
    // window.history.pushState({}, "", "/view");
    puzzle = new PuzzleRunner();
    Storage.set_window(Window.View);

    puzzle.onview = onview;
    puzzle.onedit = onedit;
  };

  const onedit = () => {
    // window.history.pushState({}, "", "/edit");
    puzzle = new PuzzleEditor();
    Storage.set_window(Window.Edit);

    puzzle.onview = onview;
    puzzle.onedit = onedit;
  };

  puzzle.onview = onview;
  puzzle.onedit = onedit;
});
