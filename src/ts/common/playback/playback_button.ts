import PlaybackEvent from "./playback_event";

enum PlaybackButton {
  Prev,
  Next,
  Play,
  Stop,
  Pause,
  Reset,
}

namespace PlaybackButton {
  export function object(b: PlaybackButton) {
    switch (b) {
      case PlaybackButton.Prev: {
        return {
          name: "prev",
          source: "./assets/bx-skip-previous.svg",
          event: PlaybackEvent.Prev,
        };
      }
      case PlaybackButton.Next: {
        return {
          name: "next",
          source: "./assets/bx-skip-next.svg",
          event: PlaybackEvent.Next,
        };
      }
      case PlaybackButton.Play: {
        return {
          name: "play",
          source: "./assets/bx-play.svg",
          event: PlaybackEvent.Play,
        };
      }
      case PlaybackButton.Stop: {
        return {
          name: "stop",
          source: "./assets/bx-stop.svg",
          event: PlaybackEvent.Stop,
        };
      }
      case PlaybackButton.Pause: {
        return {
          name: "pause",
          source: "./assets/bx-pause.svg",
          event: PlaybackEvent.Pause,
        };
      }
      case PlaybackButton.Reset: {
        return {
          name: "reset",
          source: "./assets/bx-rotate-ccw.svg",
          event: PlaybackEvent.Stop,
        };
      }
    }
  }
}

export default PlaybackButton;
