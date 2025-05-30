import Command from "../../data/command";
import Grid from "../../data/grid";
import Transform from "../../data/transform";

export default class Commands {
  private container: HTMLDivElement;

  public steps: Array<Transform>;

  private appendCommand(cmd: Command) {
    const div = document.createElement("div");
    div.className = "command";
    div.textContent = Command.name(cmd);

    this.container.appendChild(div);
  }

  private html() {
    this.container = document.getElementById("commands") as HTMLDivElement;

    const form = document.getElementById("command-prompt") as HTMLFormElement;
    const input = form.elements.namedItem("command") as HTMLInputElement;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const cmd = Command.parse(input.value);
      if (cmd !== null) {
        this.appendCommand(cmd);
        input.value = "";

        localStorage.setItem(
          "commands",
          JSON.stringify(
            Array.from(this.container.children).map((elem) =>
              Command.parse(elem.textContent!),
            ),
          ),
        );
      }
    });
  }

  private revive() {
    const local = localStorage.getItem("commands");
    if (local) {
      (JSON.parse(local) as Array<Command>).forEach((cmd) =>
        this.appendCommand(cmd),
      );
    }
  }

  constructor(transform: Transform, grid: Grid) {
    this.html();
    this.revive();

    let current = transform;
    this.steps = [
      transform,
      ...Array.from(this.container.children)
        .map((elem) => Command.parse(elem.textContent!))
        .filter((command) => command !== null)
        .map((cmd) => {
          current = Command.run(cmd, current, grid);
          return current;
        }),
    ];
  }
}
