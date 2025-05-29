import Command from "../../data/command";
import Grid from "../../data/grid";
import Transform from "../../data/transform";

export default class Commands {
  private container: HTMLDivElement;
  public steps: Array<Transform>;

  constructor(t: Transform, grid: Grid) {
    this.container = document.getElementById("commands") as HTMLDivElement;

    // this.steps = [
    //   t,
    //   ...this.container.value
    //     .trim()
    //     .split(/\s+/)
    //     .map((string) => Command.parse(string))
    //     .filter((command) => command !== null)
    //     .map((cmd) => {
    //       t = Command.run(cmd, t, grid);
    //       return t;
    //     }),
    // ];
    //
    // console.log(this.steps);

    const form = document.getElementById("command-prompt") as HTMLFormElement;
    const input = form.elements.namedItem("command") as HTMLInputElement;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const div = document.createElement("div");
      div.className = "command";
      div.textContent = input.value;

      if (
        Command.values()
          .map((cmd) => Command.name(cmd))
          .includes(input.value)
      ) {
        this.container.appendChild(div);
        input.value = "";
      }
    });
  }
}
