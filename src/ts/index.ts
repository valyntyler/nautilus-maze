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

  const buttons = Array.from(document.getElementById("buttons")!.children) as [
    HTMLButtonElement,
    HTMLButtonElement,
  ];

  buttons[0].onclick = () => {
    switch (Storage.get_window()) {
      case Window.View: {
        puzzle = new PuzzleEditor();
        Storage.set_window(Window.Edit);
        break;
      }
      case Window.Edit: {
        puzzle = new PuzzleRunner();
        Storage.set_window(Window.View);
        break;
      }
    }
  };
});
