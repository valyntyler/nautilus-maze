import Command from "../data/command";
import Grid from "../data/grid";
import Transform from "../data/transform";

export default class Steps {
  private index: number = 0;
  private array: Array<Transform> = [];

  constructor(commands: Array<Command>, start: Transform, maze: Grid) {
  }
}
