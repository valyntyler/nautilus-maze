import Position from "../../model/robot/position";
import Rotation from "../../model/robot/rotation";
import Command from "../../model/robot/command";
import Player from "../../model/player";
import Maze from "../../model/maze";

import Snackbar from "../../components/snackbar";
import MazeRunner from "../../components/maze/runner";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", () => {
  const edit_btn = document.getElementById("edit")!;
  const back_btn = document.getElementById("back")!;

  const play_btn = document.getElementById("play")! as HTMLImageElement;
  const import_btn = document.getElementById("import")! as HTMLImageElement;
  const cmd_txt = document.getElementById("commands")! as HTMLTextAreaElement;

  const local = localStorage.getItem("editor-state");
  const state: Maze = local ? JSON.parse(local) : new Maze();

  const runner = new MazeRunner();
  runner.state = state;

  let playing = false;

  const legal = (pos: Position) => {
    if (pos.x >= runner.state.rows) return false;
    if (pos.y >= runner.state.rows) return false;
    if (pos.x < 0) return false;
    if (pos.y < 0) return false;

    const cell = runner.cell(pos.x, pos.y);

    if (cell.classList.contains("black")) return false;

    return true;
  };

  const handle_command = async (cmd: Command) => {
    switch (cmd) {
      case Command.Step: {
        const move = Rotation.step(runner.robot.dir);
        const pos = {
          x: runner.robot.x + move.x,
          y: runner.robot.y + move.y,
        };

        if (legal(pos)) {
          runner.robot = new Player(pos.x, pos.y, runner.robot.dir);
        }
        break;
      }

      case Command.Back: {
        const move = Rotation.back(runner.robot.dir);
        const pos = {
          x: runner.robot.x + move.x,
          y: runner.robot.y + move.y,
        };

        if (legal(pos)) {
          runner.robot = new Player(pos.x, pos.y, runner.robot.dir);
        }
        break;
      }

      case Command.Move: {
        const move = Rotation.step(runner.robot.dir);
        const pos = {
          x: runner.robot.x + move.x,
          y: runner.robot.y + move.y,
        };

        if (legal(pos)) {
          runner.robot = new Player(pos.x, pos.y, runner.robot.dir);
          await delay(200);
          await handle_command(Command.Move);
        }
        break;
      }

      case Command.Left: {
        break;
      }

      case Command.Turn: {
        runner.robot = new Player(
          runner.robot.x,
          runner.robot.y,
          Rotation.turn(runner.robot.dir),
        );
        break;
      }
    }
    await delay(200);
  };

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

    if (playing) {
      playing = false;
      play_btn.src = "../assets/bx-play.svg";

      runner.state = state;
      return;
    }

    playing = true;
    play_btn.src = "../assets/bx-pause.svg";

    for (const cmd of commands) await handle_command(cmd);
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
