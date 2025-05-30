import Command from "../../data/command";
import Grid from "../../data/grid";
import Transform from "../../data/transform";

export default class Commands {
  private container: HTMLDivElement;

  private get state(): Array<Command> {
    return Array.from(this.container.children)
      .map((elem) => Command.parse(elem.children[1].textContent!))
      .filter((command) => command !== null);
  }

  public getSteps(transform: Transform, grid: Grid): Array<Transform> {
    let current = transform;
    return [
      transform,
      ...this.state.map((cmd) => {
        current = Command.run(cmd, current, grid);
        return current;
      }),
    ];
  }

  private appendCommand(cmd: Command) {
    const row = document.createElement("div");
    const div = document.createElement("div");
    const btn = document.createElement("button");

    row.className = "command";
    div.textContent = Command.name(cmd);
    btn.textContent = "-";
    btn.onclick = () => {
      row.remove();
      localStorage.setItem("commands", JSON.stringify(this.state));
    };

    row.appendChild(btn);
    row.appendChild(div);
    this.container.appendChild(row);
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

        localStorage.setItem("commands", JSON.stringify(this.state));
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

  constructor() {
    this.html();
    this.revive();
  }
}
