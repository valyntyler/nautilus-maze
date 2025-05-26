enum PlaybackButton {
  Prev,
  Next,
  Play,
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
    }
  }
}

export default PlaybackButton;
