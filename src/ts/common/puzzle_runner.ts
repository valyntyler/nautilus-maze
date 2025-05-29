import Command from "../data/command";
import Transform from "../data/transform";
import Playback from "./playback";
import PlaybackButton from "./playback_button";
import PlaybackState from "./playback_state";
import Puzzle from "./puzzle";
import Queue from "./queue";

export default class PuzzleRunner extends Puzzle {
  private playback: Playback;
  private queue: Queue;

  private _states: Array<Transform>;
  private _index: number = 0;

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    if (value >= this._states.length) return;
    if (value < 0) return;

    console.log(value);

    this._index = value;
    Object.assign(this.robot, this._states[value]);
  }

  constructor() {
    super();
    this.html();

    this.playback = new Playback();
    this.queue = new Queue();

    console.log(Object.create(this.robot));
    let current: Transform = this.robot;
    this._states = [
      this.robot.transform,
      ...this.queue.commands.map((cmd) => {
        current = Command.run(cmd, current, this.maze.grid);
        return current;
      }),
    ];
    this.index = 0;

    this.playback.onclick = (btn) => this.handlePlayback(btn);
  }

  private async handlePlayback(button: PlaybackButton) {
    switch (button) {
      case PlaybackButton.Prev: {
        this.index--;
        break;
      }
      case PlaybackButton.Next: {
        this.index++;
        break;
      }
      case PlaybackButton.Play: {
        this.playback.state = PlaybackState.Running;
        for (this.index; this.index < this._states.length - 1; this.index++) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          if (this.playback.state !== PlaybackState.Running) return;
        }
        this.playback.state = PlaybackState.Ended;
        break;
      }
      case PlaybackButton.Pause: {
        this.playback.state = PlaybackState.Ready;
        break;
      }
      case PlaybackButton.Reset: {
        this.playback.state = PlaybackState.Ready;
        this.index = 0;
        break;
      }
    }
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
