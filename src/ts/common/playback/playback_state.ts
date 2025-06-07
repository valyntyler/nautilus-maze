import PlaybackButton from "./playback_button";

enum PlaybackState {
  Waiting,
  Running,
  Finished,
}

namespace PlaybackState {
  export function controls(state: PlaybackState): Array<PlaybackButton> {
    switch (state) {
      case PlaybackState.Waiting: {
        return [
          PlaybackButton.Stop,
          PlaybackButton.Prev,
          PlaybackButton.Play,
          PlaybackButton.Next,
        ];
      }
      case PlaybackState.Running: {
        return [
          PlaybackButton.Stop,
          PlaybackButton.Prev,
          PlaybackButton.Pause,
          PlaybackButton.Next,
        ];
      }
      case PlaybackState.Finished: {
        return [
          PlaybackButton.Stop,
          PlaybackButton.Prev,
          PlaybackButton.Reset,
          PlaybackButton.Next,
        ];
      }
    }
  }
}

export default PlaybackState;
