import Maze from "../../model/maze";

import Snackbar from "../../components/snackbar";
import MazeRunner from "../../components/maze/runner";

document.addEventListener("DOMContentLoaded", () => {
  const edit_btn = document.getElementById("edit")!;
  const back_btn = document.getElementById("back")!;

  const play_btn = document.getElementById("play")!;
  const import_btn = document.getElementById("import")!;

  const runner = new MazeRunner();

  const local = localStorage.getItem("editor-state");
  const state: Maze = local ? JSON.parse(local) : new Maze();

  runner.state = state;

  edit_btn.addEventListener(
    "click",
    () => (window.location.href = "./edit.html"),
  );

  back_btn.addEventListener(
    "click",
    () => (window.location.href = "../../index.html"),
  );

  play_btn.addEventListener("mousedown", () => {
    console.log("pressed!");
  });

  import_btn.addEventListener("mousedown", () => {
    const input = document.createElement("input");
    input.type = "file";

    input.multiple = false;
    input.accept = ".json";

    input.onchange = (event) => {
      const file = (event.target as any).files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const target = e.target as any;
        runner.state = JSON.parse(target.result);

        Snackbar.show("Import successful!");
      };
      reader.readAsText(file);
    };

    input.click();
  });
});
