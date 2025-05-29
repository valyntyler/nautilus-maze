import PlaybackButton from "./playback_button";
import PlaybackState from "./playback_state";

export default class PlaybackElement {
  private container: HTMLDivElement;
  private _state: PlaybackState;

  public onclick = (btn: PlaybackButton) => {};

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
      image.onclick = () => this.onclick(btn);

      this.container.appendChild(image);
    }
  }

  constructor() {
    this.container = document.getElementById("playback") as HTMLDivElement;
    this.state = PlaybackState.Ready;
  }
}
