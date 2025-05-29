type PlaybackEvent =
  | PlaybackEvent.Prev
  | PlaybackEvent.Next
  | PlaybackEvent.Play
  | PlaybackEvent.Stop
  | PlaybackEvent.Pause
  | PlaybackEvent.Resume
  | PlaybackEvent.Toggle;

namespace PlaybackEvent {
  export type Prev = { name: "prev" };
  export type Next = { name: "next" };
  export type Play = { name: "play" };
  export type Stop = { name: "stop" };
  export type Pause = { name: "pause" };
  export type Resume = { name: "resume" };
  export type Toggle = { name: "toggle" };
}

export default PlaybackEvent;
