import Grid from "./grid";
import Transform from "./transform";

enum Command {
  Step,
  Back,
  Move,
  Left,
  Turn,
}

namespace Command {
  export function name(cmd: Command): string {
    switch (cmd) {
      case Command.Step: {
        return "step";
      }
      case Command.Back: {
        return "back";
      }
      case Command.Move: {
        return "move";
      }
      case Command.Left: {
        return "left";
      }
      case Command.Turn: {
        return "turn";
      }
    }
  }

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

  export function run(cmd: Command, robot: Transform, maze: Grid): Transform {
    switch (cmd) {
      case Command.Step: {
        const result = Transform.step(robot);
        if (
          Grid.contains(result.position, maze) &&
          !Grid.isWall(result.position, maze)
        ) {
          return result;
        }
        return robot;
      }
      case Command.Back: {
        const result = Transform.back(robot);
        if (
          Grid.contains(result.position, maze) &&
          !Grid.isWall(result.position, maze)
        ) {
          return result;
        }
        return robot;
      }
      case Command.Move: {
        const result = Transform.step(robot);
        if (
          Grid.contains(result.position, maze) &&
          !Grid.isWall(result.position, maze)
        ) {
          return Command.run(cmd, result, maze);
        }
        return robot;
      }
      case Command.Left: {
        const result = Transform.step(robot);
        const left = Transform.step(Transform.turn(robot));
        if (
          Grid.contains(result.position, maze) &&
          !Grid.isWall(result.position, maze) &&
          Grid.isWall(left.position, maze)
        ) {
          return Command.run(cmd, result, maze);
        }
        return robot;
      }
      case Command.Turn: {
        return Transform.turn(robot);
      }
    }
  }

  export function values(): Array<Command> {
    return [
      Command.Step,
      Command.Back,
      Command.Move,
      Command.Left,
      Command.Turn,
    ];
  }
}

export default Command;
