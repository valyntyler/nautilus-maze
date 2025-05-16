import Maze from "../../model/maze";

import Snackbar from "../../components/snackbar";
import MazeRunner from "../../components/maze/runner";
import Player from "../../model/player";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

  play_btn.addEventListener("mousedown", async () => {
    while (true) {
      await delay(25);

      const new_x = runner.robot.x;
      const new_y = runner.robot.y - 1;

      if (new_x >= runner.state.rows || new_x < 0) return;
      if (new_y >= runner.state.rows || new_y < 0) return;

      if (runner.cell(new_x, new_y).classList.contains("black")) return;

      runner.robot = new Player(new_x, new_y);
    }
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
