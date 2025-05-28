import Command from "../data/command";
import Grid from "../data/grid";
import Transform from "../data/transform";
import Playback from "./playback";
import Puzzle from "./puzzle";
import Queue from "./queue";

export default class PuzzleRunner extends Puzzle {
  private playback: Playback;
  private queue: Queue;

  constructor() {
    super();
    this.html();

    this.playback = new Playback();
    this.queue = new Queue();

    this.playback.onplaybackclick = async (_) => {
      const stages = Command.bake(this.queue.commands, this.robot, this.maze);
      for (const stage of stages) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        this.robot = stage;
      }
    };
  }

  html() {
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
  }
}
