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
  updateButtons(buttons);

  buttons[0].onclick = () => {
    switch (Storage.get_window()) {
      case Window.View: {
        puzzle = new PuzzleEditor();
        Storage.set_window(Window.Edit);
        updateButtons(buttons);
        break;
      }
      case Window.Edit: {
        puzzle = new PuzzleRunner();
        Storage.set_window(Window.View);
        updateButtons(buttons);
        break;
      }
    }
  };
});

function updateButtons(buttons: [HTMLButtonElement, HTMLButtonElement]) {
  const img1 = buttons[0].children[0] as HTMLImageElement;
  const span1 = buttons[0].children[1] as HTMLSpanElement;
  const img2 = buttons[1].children[0] as HTMLImageElement;
  const span2 = buttons[1].children[1] as HTMLSpanElement;
  switch (Storage.get_window()) {
    case Window.View: {
      img1.src = "./assets/bx-edit-alt.svg";
      span1.textContent = "Edit";
      img2.src = "./assets/bx-arrow-out-up-square-half.svg";
      span2.textContent = "Upload";
      break;
    }
    case Window.Edit: {
      img1.src = "./assets/bx-check.svg";
      span1.textContent = "Done";
      img2.src = "./assets/bx-save.svg";
      span2.textContent = "Save";
      break;
    }
  }
}
