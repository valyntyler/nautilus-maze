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

  const overlay_success = document.getElementById("overlay-success")!;
  const overlay_failure = document.getElementById("overlay-failure")!;
  const dismiss_success = document.getElementById("dismiss-success")!;
  const dismiss_failure = document.getElementById("dismiss-failure")!;

  dismiss_success.addEventListener("click", () =>
    overlay_success.classList.add("hidden"),
  );
  dismiss_failure.addEventListener("click", () =>
    overlay_failure.classList.add("hidden"),
  );

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

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "Escape": {
        document
          .querySelectorAll(".overlay")
          .forEach((overlay) => overlay.classList.add("hidden"));
      }
    }
  });
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
