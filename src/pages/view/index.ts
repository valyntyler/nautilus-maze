import Command from "../../model/robot/command";
import Rotation from "../../model/robot/rotation";
import Player from "../../model/player";
import Maze from "../../model/maze";

import Snackbar from "../../components/snackbar";
import MazeRunner from "../../components/maze/runner";
import Direction from "../../model/robot/rotation";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", () => {
  const edit_btn = document.getElementById("edit")!;
  const back_btn = document.getElementById("back")!;

  const play_btn = document.getElementById("play")!;
  const import_btn = document.getElementById("import")!;
  const cmd_txt = document.getElementById("commands")! as HTMLTextAreaElement;

  const local = localStorage.getItem("editor-state");
  const state: Maze = local ? JSON.parse(local) : new Maze();

  const runner = new MazeRunner();
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
    const cmd_strings = cmd_txt.value.split(/\s+/);
    const commands = Command.process(cmd_strings);

    for (const cmd of commands) {
      switch (cmd) {
        case Command.Step:
          await delay(200);

          const move = Rotation.step(runner.robot.dir);

          const new_x = runner.robot.x + move.x;
          const new_y = runner.robot.y + move.y;

          if (new_x >= runner.state.rows || new_x < 0) break;
          if (new_y >= runner.state.rows || new_y < 0) break;

          if (runner.cell(new_x, new_y).classList.contains("black")) break;

          runner.robot = new Player(new_x, new_y, runner.robot.dir);
          break;

        case Command.Move:
          while (true) {
            await delay(200);

            const move = Rotation.step(runner.robot.dir);

            const new_x = runner.robot.x + move.x;
            const new_y = runner.robot.y + move.y;

            if (new_x >= runner.state.rows || new_x < 0) break;
            if (new_y >= runner.state.rows || new_y < 0) break;

            if (runner.cell(new_x, new_y).classList.contains("black")) break;

            runner.robot = new Player(new_x, new_y, runner.robot.dir);
          }
          break;

        case Command.Left:
          while (true) {
            await delay(200);

            const move = Rotation.step(runner.robot.dir);

            const new_x = runner.robot.x + move.x;
            const new_y = runner.robot.y + move.y;

            if (new_x >= runner.state.rows || new_x < 0) break;
            if (new_y >= runner.state.rows || new_y < 0) break;

            if (runner.cell(new_x, new_y).classList.contains("black")) break;
            if (
              !runner
                .cell(runner.robot.x - 1, runner.robot.y)
                .classList.contains("black")
            )
              break;

            runner.robot = new Player(new_x, new_y, runner.robot.dir);
          }
          break;

        case Command.Turn:
          await delay(200);
          runner.robot = new Player(
            runner.robot.x,
            runner.robot.y,
            Rotation.turn(runner.robot.dir),
          );
          break;
      }
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
