import Commands from "./commands/commands";
import PlaybackElement from "./playback/playback";
import Puzzle from "./puzzle";

export default class PuzzleRunner extends Puzzle {
  private commands: Commands;
  private playback: PlaybackElement;

  constructor() {
    super();
    this.html();

    this.commands = new Commands(this.robot, this.maze.grid);
    this.playback = new PlaybackElement(this.commands.steps, this.robot);
  }

  private html() {
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
