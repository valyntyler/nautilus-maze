import PlaybackButton from "./playback_button";
import PlaybackEvent from "./playback_event";
import PlaybackState from "./playback_state";
import Transform from "../../data/transform";
import Robot from "../robot";

export default class Playback {
  private container: HTMLDivElement;

  private _state: PlaybackState = PlaybackState.Waiting;
  private _index: number = 0;
  private _steps: Array<Transform>;

  private get state(): PlaybackState {
    return this._state;
  }

  private set state(value: PlaybackState) {
    this._state = value;
    this.html();
  }

  private get index(): number {
    return this._index;
  }

  private set index(value: number) {
    if (value < 0) return;
    if (value >= this.steps.length) return;

    this._index = value;
    Object.assign(this.robot, this.steps[value]);
  }

  private get steps(): Array<Transform> {
    return this._steps;
  }

  private set steps(value: Array<Transform>) {
    this._steps = value;
  }

  private html() {
    this.container = document.getElementById("playback") as HTMLDivElement;
    this.container.innerHTML = "";

    for (const b of PlaybackState.controls(this.state)) {
      const btn = PlaybackButton.object(b);
      const image = document.createElement("img");

      image.alt = btn.name;
      image.src = btn.source;
      image.draggable = false;
      image.onclick = () => this.onevent(btn.event);

      this.container.appendChild(image);
    }
  }

  private hookup() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft": {
          this.onevent(PlaybackEvent.Prev);
          break;
        }
        case "ArrowRight": {
          this.onevent(PlaybackEvent.Next);
          break;
        }
        case "c": {
          if (e.ctrlKey) this.onevent(PlaybackEvent.Stop);
          break;
        }
        case " ": {
          this.onevent(PlaybackEvent.Toggle);
          break;
        }
      }
    });
  }

  private async onevent(e: PlaybackEvent) {
    switch (e) {
      case PlaybackEvent.Prev: {
        this.index--;
        break;
      }

      case PlaybackEvent.Next: {
        this.index++;
        break;
      }

      case PlaybackEvent.Play: {
        this.state = PlaybackState.Running;
        while (this.index < this.steps.length - 1) {
          this.index++;
          console.log(this.index);
          if (await this.signal(500)) return;
        }
        this.state = PlaybackState.Finished;
        break;
      }

      case PlaybackEvent.Stop: {
        this.state = PlaybackState.Waiting;
        this.index = 0;
        break;
      }

      case PlaybackEvent.Pause: {
        this.state = PlaybackState.Waiting;
        break;
      }

      case PlaybackEvent.Toggle: {
        switch (this.state) {
          case PlaybackState.Waiting: {
            this.onevent(PlaybackEvent.Play);
            break;
          }
          case PlaybackState.Running: {
            this.onevent(PlaybackEvent.Pause);
            break;
          }
          case PlaybackState.Finished: {
            this.onevent(PlaybackEvent.Stop);
            break;
          }
        }
        break;
      }
    }
  }

  private async signal(ms: number): Promise<boolean> {
    const start = Date.now();
    while (Date.now() - start <= ms) {
      await new Promise((resolve) => setTimeout(resolve, 1));
      if (this.state !== PlaybackState.Running) return true;
    }
    return false;
  }

  constructor(
    steps: Array<Transform>,
    private robot: Robot,
  ) {
    this.html();
    this.hookup();

    this.steps = steps;
  }
}
