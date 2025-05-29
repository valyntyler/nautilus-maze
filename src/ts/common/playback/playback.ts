import PlaybackEvent from "./playback_event";
import PlaybackState from "./playback_state";

export default class Playback {
  private container: HTMLDivElement;
  private state: PlaybackState = PlaybackState.Waiting;

  private html() {
    this.container = document.getElementById("playback") as HTMLDivElement;
    this.container.innerHTML = "";

    for (const btn of PlaybackState.controls(this.state)) {
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

  private onevent(e: PlaybackEvent) {
    console.log(e.name);
  }

  constructor() {
    this.html();
    this.hookup();
  }
}
