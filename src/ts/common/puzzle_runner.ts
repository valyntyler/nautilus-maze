import Command from "../data/command";
import Grid from "../data/grid";
import Transform from "../data/transform";
import Playback from "./playback";
import PlaybackButton from "./playback_button";
import PlaybackState from "./playback_state";
import Puzzle from "./puzzle";
import Queue from "./queue";

export default class PuzzleRunner extends Puzzle {
  private playback: Playback;
  private queue: Queue;
  private index: number = 0;

  private get stages(): Array<Transform> {
    return Command.bake(this.queue.commands, this.local.robot, this.local.maze);
  }

  constructor() {
    super();
    this.html();

    this.playback = new Playback();
    this.queue = new Queue();

    this.playback.onplaybackclick = async (b) => {
      switch (b) {
        case PlaybackButton.Prev: {
          this.robot = this.stages[--this.index];
          break;
        }
        case PlaybackButton.Next: {
          this.robot = this.stages[++this.index];
          break;
        }
        case PlaybackButton.Play: {
          this.playback.state = PlaybackState.Running;
          for (this.index; this.index < this.stages.length; this.index++) {
            if (this.playback.state !== PlaybackState.Running) {
              return;
            }
            this.robot = this.stages[this.index];
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
          this.playback.state = PlaybackState.Ended;
          break;
        }
        case PlaybackButton.Pause: {
          this.playback.state = PlaybackState.Ready;
          break;
        }
        case PlaybackButton.Reset: {
          this.state = this.local;
          this.index = 0;
          this.playback.state = PlaybackState.Ready;
          break;
        }
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
