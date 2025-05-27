import PlaybackButton from "./playback_button";
import PlaybackState from "./playback_state";

export default class Playback {
  private container: HTMLDivElement;
  private _state: PlaybackState;

  get state(): PlaybackState {
    return this._state;
  }

  set state(value: PlaybackState) {
    this._state = value;

    this.container.innerHTML = "";
    for (const btn of PlaybackState.controls(this.state)) {
      const image = document.createElement("img");

      image.src = PlaybackButton.source(btn);
      image.alt = PlaybackButton.name(btn);
      image.draggable = false;
      image.onclick = () => this.onplaybackevent();

      this.container.appendChild(image);
    }
  }

  onplaybackevent = () => {};

  constructor() {
    this.container = document.getElementById("playback") as HTMLDivElement;
    this.state = PlaybackState.Ready;
  }
}
