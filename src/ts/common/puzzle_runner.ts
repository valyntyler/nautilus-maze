import Playback from "./playback";
import PlaybackButton from "./playback_button";
import PlaybackState from "./playback_state";
import Puzzle from "./puzzle";
import Queue from "./queue";
import Stages from "./stages";

export default class PuzzleRunner extends Puzzle {
  private playback: Playback;
  private queue: Queue;
  private stages: Stages;

  constructor() {
    super();
    this.html();

    this.playback = new Playback();
    this.queue = new Queue();
    this.stages = new Stages(this.queue.commands, this.robot, this.maze);

    this.playback.onplaybackclick = async (b) => {
      switch (b) {
        case PlaybackButton.Prev: {
          if (this.stages.peek_prev() !== null) {
            this.robot = this.stages.prev()!;
          }
          break;
        }
        case PlaybackButton.Next: {
          if (this.stages.peek_next() !== null) {
            this.robot = this.stages.next()!;
          }
          break;
        }
        case PlaybackButton.Play: {
          this.playback.state = PlaybackState.Running;
          while (this.stages.peek_next() !== null) {
            if (this.playback.state !== PlaybackState.Running) {
              return;
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
            this.robot = this.stages.next()!;
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
          this.robot = this.stages.origin();
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
