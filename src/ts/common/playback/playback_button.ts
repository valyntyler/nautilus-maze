import PlaybackEvent from "./playback_event";

type PlaybackButton =
  | PlaybackButton.Prev
  | PlaybackButton.Next
  | PlaybackButton.Play
  | PlaybackButton.Stop
  | PlaybackButton.Pause
  | PlaybackButton.Reset;

namespace PlaybackButton {
  export const Prev = {
    name: "prev",
    source: "./assets/bx-skip-previous.svg",
    event: PlaybackEvent.Prev,
  } as const;

  export const Next = {
    name: "next",
    source: "./assets/bx-skip-next.svg",
    event: PlaybackEvent.Next,
  } as const;

  export const Play = {
    name: "play",
    source: "./assets/bx-play.svg",
    event: PlaybackEvent.Play,
  } as const;

  export const Stop = {
    name: "stop",
    source: "./assets/bx-stop.svg",
    event: PlaybackEvent.Stop,
  } as const;

  export const Pause = {
    name: "pause",
    source: "./assets/bx-pause.svg",
    event: PlaybackEvent.Pause,
  } as const;

  export const Reset = {
    name: "reset",
    source: "./assets/bx-rotate-ccw.svg",
    event: PlaybackEvent.Stop,
  } as const;

  export type Prev = typeof Prev;
  export type Next = typeof Next;
  export type Play = typeof Play;
  export type Stop = typeof Stop;
  export type Pause = typeof Pause;
  export type Reset = typeof Reset;
}

export default PlaybackButton;
