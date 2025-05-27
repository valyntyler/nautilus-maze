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
        return [PlaybackButton.Prev, PlaybackButton.Next, PlaybackButton.Play];
      }
      case PlaybackState.Running: {
        return [PlaybackButton.Pause];
      }
      case PlaybackState.Ended: {
        return [PlaybackButton.Reset];
      }
    }
  }
}

export default PlaybackState;
