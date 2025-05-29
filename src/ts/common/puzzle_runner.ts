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
    this.stages = new Stages(this.queue.commands, this.robot, this.maze.grid);

    this.playback.onclick = (btn) => {
      this.handlePlayback(btn);
    };
  }

  private async handlePlayback(button: PlaybackButton) {
    switch (button) {
      case PlaybackButton.Prev: {
        if (this.stages.peek_prev() !== null) {
          const prev = this.stages.prev()!;
          this.robot.position = prev.position;
          this.robot.rotation = prev.rotation;
        }
        break;
      }
      case PlaybackButton.Next: {
        if (this.stages.peek_next() !== null) {
          const next = this.stages.next()!;
          this.robot.position = next.position;
          this.robot.rotation = next.rotation;
        }
        break;
      }
      case PlaybackButton.Play: {
        this.playback.state = PlaybackState.Running;
        while (this.stages.peek_next() !== null) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          if (this.playback.state !== PlaybackState.Running) {
            return;
          }
          const next = this.stages.next()!;
          this.robot.position = next.position;
          this.robot.rotation = next.rotation;
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
        const origin = this.stages.origin()!;
        this.robot.position = origin.position;
        this.robot.rotation = origin.rotation;
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
