import PlaybackEvent from "./data/playback_event";

export default class PlaybackEventBus {
  public onevent?: (e: PlaybackEvent) => void;

  constructor() {
    document.addEventListener("keydown", (e) => {
      if (!this.onevent) return;
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
        case "Space": {
          this.onevent(PlaybackEvent.Toggle);
          break;
        }
      }
    });
  }
}
