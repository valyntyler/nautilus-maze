import Command from "../../data/command";
import Grid from "../../data/grid";
import Transform from "../../data/transform";

export default class Commands {
  private container: HTMLTextAreaElement;
  public steps: Array<Transform>;

  constructor(t: Transform, grid: Grid) {
    this.container = document.getElementById("commands") as HTMLTextAreaElement;
    this.steps = [
      t,
      ...this.container.value
        .trim()
        .split(/\s+/)
        .map((string) => Command.parse(string))
        .filter((command) => command !== null)
        .map((cmd) => {
          t = Command.run(cmd, t, grid);
          return t;
        }),
    ];
  }
}
