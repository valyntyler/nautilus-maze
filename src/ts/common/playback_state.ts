import PlaybackButton from "./playback_button";

enum PlaybackState {
  Ready,
  Playing,
  Ended,
}

namespace PlaybackState {
  export function controls(state: PlaybackState): Array<PlaybackButton> {
    switch (state) {
      case PlaybackState.Ready: {
        return [PlaybackButton.Prev, PlaybackButton.Next, PlaybackButton.Play];
      }
      case PlaybackState.Playing: {
        return [];
      }
      case PlaybackState.Ended: {
        return [];
      }
    }
  }
}

export default PlaybackState;
