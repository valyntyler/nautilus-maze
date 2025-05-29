import Command from "../data/command";
import Grid from "../data/grid";
import Transform from "../data/transform";

export default class Stages {
  private index: number = 0;
  private array: Array<Transform> = [];

  constructor(commands: Array<Command>, start: Transform, maze: Grid) {
    let current = start;
    this.array = [
      start,
      ...commands.map((cmd) => {
        current = Command.run(cmd, current, maze);
        return current;
      }),
    ];

    console.log(this.array);
  }

  prev(): Transform | null {
    if (this.index > 0) {
      return this.array[--this.index];
    }
    return null;
  }

  next(): Transform | null {
    if (this.index < this.array.length - 1) {
      return this.array[++this.index];
    }
    return null;
  }

  peek_prev(): Transform | null {
    if (this.index > 0) {
      return this.array[this.index - 1];
    }
    return null;
  }

  peek_next(): Transform | null {
    if (this.index < this.array.length - 1) {
      return this.array[this.index + 1];
    }
    return null;
  }

  origin() {
    this.index = 0;
    return this.array[this.index];
  }
}
