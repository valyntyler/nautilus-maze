import PlaybackButton from "./playback_button";

enum PlaybackState {
  Ready,
  Running,
  Ended,
}

namespace PlaybackState {
  export function controls(state: PlaybackState): Array<PlaybackButton> {
    switch (state) {
      case PlaybackState.Ready: {
        return [PlaybackButton.Prev, PlaybackButton.Play, PlaybackButton.Next];
      }
      case PlaybackState.Running: {
        return [PlaybackButton.Pause, PlaybackButton.Stop];
      }
      case PlaybackState.Ended: {
        return [PlaybackButton.Prev, PlaybackButton.Reset, PlaybackButton.Play];
      }
    }
  }
}

export default PlaybackState;
