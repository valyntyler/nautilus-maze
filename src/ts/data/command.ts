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
        if (Grid.contains(result.position, maze)) {
          return result;
        }
        return robot;
      }
      case Command.Back: {
        const result = Transform.back(robot);
        if (Grid.contains(result.position, maze)) {
          return result;
        }
        return robot;
      }
      case Command.Move: {
        // TODO:
        return robot;
      }
      case Command.Left: {
        // TODO:
        return robot;
      }
      case Command.Turn: {
        return Transform.turn(robot);
      }
    }
  }

  export function bake(
    commands: Array<Command>,
    robot: Transform,
    maze: Grid,
  ): Array<Transform> {
    const out: Array<Transform> = [robot];

    for (const cmd of commands) {
      robot = Command.run(cmd, robot, maze);
      out.push(robot);
    }

    return out;
  }
}

export default Command;
