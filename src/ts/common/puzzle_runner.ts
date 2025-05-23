import Playback from "./playback";
import Puzzle from "./puzzle";

export default class PuzzleRunner extends Puzzle {
  private playback: Playback;
  private command_queue: HTMLTextAreaElement;

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

    this.command_queue = document.getElementById(
      "command-queue",
    ) as HTMLTextAreaElement;

    this.playback = new Playback();
    this.playback.onplaybackevent = () => {
      const value = this.command_queue.value;
      const queue = value.trim().split(/\s+/);

      console.log(queue);
    };
  }
}
