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

    this.commands = new Commands(this.robot.state, this.maze.state);
    this.playback = new Playback(this.commands);

    this.playback.onstepchange = (index, value) => {
      Object.assign(this.robot, value);
      if (index === 0) {
        this.commands.selected = null;
      } else {
        this.commands.selected = index - 1;
      }
    };
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
