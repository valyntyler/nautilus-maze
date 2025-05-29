enum PlaybackEvent {
  Prev,
  Next,
  Play,
  Stop,
  Pause,
  Resume,
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
      case PlaybackEvent.Resume: {
        return { name: "resume" };
      }
      case PlaybackEvent.Toggle: {
        return { name: "toggle" };
      }
    }
  }
}

export default PlaybackEvent;
