enum Command {
  Step,
  Back,
  Move,
  Left,
  Turn,
}

namespace Command {
  export function parse(s: string): Command | null {
    switch (s.toLowerCase()) {
      case "step": {
        return Command.Step;
      }
      case "back": {
        return Command.Back;
      }
      case "move": {
        return Command.Move;
      }
      case "left": {
        return Command.Left;
      }
      case "turn": {
        return Command.Turn;
      }
      default: {
        return null;
      }
    }
  }
}

export default Command;
