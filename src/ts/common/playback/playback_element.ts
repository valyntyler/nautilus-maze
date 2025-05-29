import PlaybackButton from "./playback_button";
import PlaybackEventBus from "./playback_event_bus";

export default class PlaybackElement {
  private container: HTMLDivElement;

  constructor(bus: PlaybackEventBus, controls: Array<PlaybackButton>) {
    this.container = document.getElementById("playback") as HTMLDivElement;
    this.container.innerHTML = "";

    for (const btn of controls) {
      const image = document.createElement("img");

      image.alt = btn.name;
      image.src = btn.source;
      image.draggable = false;
      image.onclick = () => {
        if (bus.onevent) bus.onevent(btn.event);
      };

      this.container.appendChild(image);
    }
  }
}
