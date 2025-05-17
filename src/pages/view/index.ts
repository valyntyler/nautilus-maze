import "../../css/index.css";

import Position from "../../model/robot/position";
import Rotation from "../../model/robot/rotation";
import Command from "../../model/robot/command";
import Player from "../../model/player";
import Maze from "../../model/maze";

import Snackbar from "../../components/snackbar";
import MazeRunner from "../../components/maze/runner";
import Playback from "../../components/playback";
import PlaybackEvent from "../../model/playback_event";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", () => {
  const edit_btn = document.getElementById("edit")!;
  const back_btn = document.getElementById("back")!;

  const import_btn = document.getElementById("import")! as HTMLImageElement;
  const cmd_txt = document.getElementById("commands")! as HTMLTextAreaElement;

  const local = localStorage.getItem("editor-state");
  const state: Maze = local ? JSON.parse(local) : new Maze();

  const playback = new Playback();
  const runner = new MazeRunner();
  runner.state = state;

  playback.onplaybackevent = async (e) => {
    switch (e) {
      case PlaybackEvent.Play: {
        handle_commands();

        break;
      }
    }
  };

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
    await delay(200);
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
          await handle_command(Command.Move);
        }
        break;
      }

      case Command.Left: {
        const move = Rotation.step(runner.robot.dir);
        const pos = {
          x: runner.robot.x + move.x,
          y: runner.robot.y + move.y,
        };

        if (legal(pos)) {
          const left_dir = Rotation.turn(runner.robot.dir);
          const left_pos = Rotation.step(left_dir);

          const left = {
            x: runner.robot.x + left_pos.x,
            y: runner.robot.y + left_pos.y,
          };
          const cell = runner.cell(left.x, left.y);

          if (cell.classList.contains("black")) {
            runner.robot = new Player(pos.x, pos.y, runner.robot.dir);
            await handle_command(Command.Left);
          }
        }
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
  };

  const handle_commands = async () => {
    const cmd_strings = cmd_txt.value.split(/\s+/);
    const commands = Command.process(cmd_strings);

    for (const cmd of commands) await handle_command(cmd);
  };

  edit_btn.addEventListener(
    "click",
    () => (window.location.href = "edit.html"),
  );

  back_btn.addEventListener(
    "click",
    () => (window.location.href = "index.html"),
  );

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
