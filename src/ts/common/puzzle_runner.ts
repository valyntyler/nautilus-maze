import Playback from "./playback";
import Puzzle from "./puzzle";

export default class PuzzleRunner extends Puzzle {
  private playback: Playback;

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

    this.playback = new Playback();
  }
}
