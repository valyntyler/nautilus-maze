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
          PlaybackButton.Prev,
          PlaybackButton.Play,
          PlaybackButton.Next,
          PlaybackButton.Stop,
        ];
      }
      case PlaybackState.Running: {
        return [
          PlaybackButton.Prev,
          PlaybackButton.Pause,
          PlaybackButton.Next,
          PlaybackButton.Stop,
        ];
      }
      case PlaybackState.Finished: {
        return [PlaybackButton.Reset];
      }
    }
  }
}

export default PlaybackState;
