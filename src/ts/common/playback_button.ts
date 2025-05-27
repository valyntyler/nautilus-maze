enum PlaybackButton {
  Prev,
  Next,
  Play,
  Pause,
  Reset,
}

namespace PlaybackButton {
  export function name(btn: PlaybackButton): string {
    switch (btn) {
      case PlaybackButton.Prev: {
        return "prev";
      }
      case PlaybackButton.Next: {
        return "next";
      }
      case PlaybackButton.Play: {
        return "play";
      }
      case PlaybackButton.Pause: {
        return "pause";
      }
      case PlaybackButton.Reset: {
        return "reset";
      }
    }
  }

  export function source(btn: PlaybackButton): string {
    switch (btn) {
      case PlaybackButton.Prev: {
        return "./assets/bx-skip-previous.svg";
      }
      case PlaybackButton.Next: {
        return "./assets/bx-skip-next.svg";
      }
      case PlaybackButton.Play: {
        return "./assets/bx-play.svg";
      }
      case PlaybackButton.Pause: {
        return "./assets/bx-pause.svg";
      }
      case PlaybackButton.Reset: {
        return "./assets/bx-rotate-ccw.svg";
      }
    }
  }
}

export default PlaybackButton;
