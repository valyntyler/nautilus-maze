enum PlaybackEvent {
  Prev,
  Next,
  Play,
  Stop,
  Pause,
  Toggle,
}

namespace PlaybackEvent {
  export function object(e: PlaybackEvent): { name: string } {
    switch (e) {
      case PlaybackEvent.Prev: {
        return { name: "prev" };
      }
      case PlaybackEvent.Next: {
        return { name: "next" };
      }
      case PlaybackEvent.Play: {
        return { name: "play" };
      }
      case PlaybackEvent.Stop: {
        return { name: "stop" };
      }
      case PlaybackEvent.Pause: {
        return { name: "pause" };
      }
      case PlaybackEvent.Toggle: {
        return { name: "toggle" };
      }
    }
  }
}

export default PlaybackEvent;
