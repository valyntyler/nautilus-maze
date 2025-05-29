type PlaybackEvent =
  | PlaybackEvent.Prev
  | PlaybackEvent.Next
  | PlaybackEvent.Play
  | PlaybackEvent.Stop
  | PlaybackEvent.Pause
  | PlaybackEvent.Resume
  | PlaybackEvent.Toggle;

namespace PlaybackEvent {
  export const Prev = { name: "prev" } as const;
  export const Next = { name: "next" } as const;
  export const Play = { name: "play" } as const;
  export const Stop = { name: "stop" } as const;
  export const Pause = { name: "pause" } as const;
  export const Resume = { name: "resume" } as const;
  export const Toggle = { name: "toggle" } as const;

  export type Prev = typeof Prev;
  export type Next = typeof Next;
  export type Play = typeof Play;
  export type Stop = typeof Stop;
  export type Pause = typeof Pause;
  export type Resume = typeof Resume;
  export type Toggle = typeof Toggle;
}

export default PlaybackEvent;
