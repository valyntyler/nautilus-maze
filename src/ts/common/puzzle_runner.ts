import Command from "../data/command";
import Transform from "../data/transform";
import Playback from "./playback";
import Puzzle from "./puzzle";
import Queue from "./queue";

export default class PuzzleRunner extends Puzzle {
  private playback: Playback;
  private queue: Queue;

  constructor() {
    super();

    const playback = document.createElement("div");
    const img = document.createElement("img");
    const bar = document.getElementById("bar")!;

    playback.id = "playback";
    playback.className = "playback-container";

    img.src = "./assets/bx-edit-alt.svg";
    img.id = "edit";
    img.onclick = () => this.onedit();

    bar.innerHTML = "";
    bar.appendChild(img);
    bar.appendChild(playback);

    this.queue = new Queue();
    this.playback = new Playback();
    this.playback.onplaybackevent = async () => {
      for (const cmd of this.queue.commands) {
        await this.execute(cmd);
      }
    };
  }

  async execute(cmd: Command) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    switch (cmd) {
      case Command.Step: {
        this.robot = Transform.step(this.robot);
        break;
      }
      case Command.Back: {
        this.robot = Transform.back(this.robot);
        break;
      }
      case Command.Move: {
        break;
      }
      case Command.Left: {
        break;
      }
      case Command.Turn: {
        this.robot = Transform.turn(this.robot);
        break;
      }
    }
  }
}
