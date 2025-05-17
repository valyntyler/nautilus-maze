import PlaybackEvent from "../model/playback_event";

export default class Playback {
  play: HTMLImageElement;
  stop: HTMLImageElement;

  constructor(public onplaybackevent = (e: PlaybackEvent) => {}) {
    this.play = document.getElementById("play") as HTMLImageElement;
    this.stop = document.getElementById("stop") as HTMLImageElement;

    this.play.addEventListener("mousedown", () => {
      this.onplaybackevent(PlaybackEvent.Play);
    });

    this.stop.addEventListener("mousedown", () => {
      this.onplaybackevent(PlaybackEvent.Stop);
    });
  }
}
