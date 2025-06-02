import Commands from "./commands/commands";
import Playback from "./playback/playback";
import Puzzle from "./puzzle";
import SideBar from "./sidebar/sidebar";

export default class PuzzleRunner extends Puzzle {
  private commands: Commands;
  private playback: Playback;

  constructor() {
    super();
    this.html();

    this.commands = new Commands();
    this.playback = new Playback(
      this.commands.getSteps(this.robot.state, this.maze.state),
    );

    this.playback.onstepchange = (value) => Object.assign(this.robot, value);
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

    SideBar.show();
  }
}
