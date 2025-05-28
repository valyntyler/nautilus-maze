import Command from "../data/command";
import Grid from "../data/grid";
import Transform from "../data/transform";

export default class Stages {
  private index: number = 0;
  private array: Array<Transform> = [];

  get prev(): Transform | null {
    if (this.index > 0) {
      return this.array[this.index - 1];
    }
    return null;
  }

  get next(): Transform | null {
    if (this.index < this.array.length - 1) {
      return this.array[this.index + 1];
    }
    return null;
  }

  constructor(commands: Array<Command>, start: Transform, maze: Grid) {
    this.array = commands.map((cmd) => Command.run(cmd, start, maze));
  }
}
