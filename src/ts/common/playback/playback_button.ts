type PlaybackButton =
  | PlaybackButton.Prev
  | PlaybackButton.Next
  | PlaybackButton.Play
  | PlaybackButton.Stop
  | PlaybackButton.Pause
  | PlaybackButton.Reset;

namespace PlaybackButton {
  export type Prev = { name: "prev"; source: "./assets/bx-skip-previous.svg" };
  export type Next = { name: "next"; source: "./assets/bx-skip-next.svg" };
  export type Play = { name: "play"; source: "./assets/bx-play.svg" };
  export type Stop = { name: "stop"; source: "./assets/bx-stop.svg" };
  export type Pause = { name: "pause"; source: "./assets/bx-pause.svg" };
  export type Reset = { name: "reset"; source: "./assets/bx-rotate-ccw.svg" };
}

export default PlaybackButton;
