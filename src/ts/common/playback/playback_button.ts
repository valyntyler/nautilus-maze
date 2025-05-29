import PlaybackEvent from "./playback_event";

type PlaybackButton =
  | PlaybackButton.Prev
  | PlaybackButton.Next
  | PlaybackButton.Play
  | PlaybackButton.Stop
  | PlaybackButton.Pause
  | PlaybackButton.Reset;

namespace PlaybackButton {
  export type Prev = {
    name: "prev";
    source: "./assets/bx-skip-previous.svg";
    event: PlaybackEvent.Prev;
  };

  export type Next = {
    name: "next";
    source: "./assets/bx-skip-next.svg";
    event: PlaybackEvent.Next;
  };

  export type Play = {
    name: "play";
    source: "./assets/bx-play.svg";
    event: PlaybackEvent.Play;
  };

  export type Stop = {
    name: "stop";
    source: "./assets/bx-stop.svg";
    event: PlaybackEvent.Stop;
  };

  export type Pause = {
    name: "pause";
    source: "./assets/bx-pause.svg";
    event: PlaybackEvent.Pause;
  };

  export type Reset = {
    name: "reset";
    source: "./assets/bx-rotate-ccw.svg";
    event: PlaybackEvent.Stop;
  };
}

export default PlaybackButton;
