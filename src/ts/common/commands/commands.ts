import Command from "../../data/command";
import Grid from "../../data/grid";
import Transform from "../../data/transform";
import Storage from "../storage/storage";

export default class Commands {
  public get steps(): Array<Transform> {
    let current = this.transform;
    return [
      this.transform,
      ...this.state.map((cmd) => {
        current = Command.run(cmd, current, this.grid);
        return current;
      }),
    ];
  }

  public set selected(value: number | null) {
    Array.from(this.container.children).forEach((elem) =>
      elem.classList.remove("selected"),
    );

    if (value !== null) {
      this.container.children[value].classList.add("selected");
    }
  }

  private container: HTMLDivElement;

  private get state(): Array<Command> {
    return Array.from(this.container.children)
      .map((elem) => Command.parse(elem.children[0].textContent!))
      .filter((command) => command !== null);
  }

  private set state(value: Array<Command>) {
    Storage.set_commands(value);
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
      this.state = this.state;
    };

    row.appendChild(div);
    row.appendChild(btn);
    this.container.appendChild(row);
  }

  private html() {
    this.container = document.getElementById("commands") as HTMLDivElement;
    this.container.innerHTML = "";

    const form = document.getElementById("command-prompt") as HTMLFormElement;
    const input = form.elements.namedItem("command") as HTMLInputElement;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const cmd = Command.parse(input.value);
      if (cmd !== null) {
        this.appendCommand(cmd);
        input.value = "";
        this.state = this.state;
      }
    });
  }

  private revive() {
    Storage.get_commands().forEach((cmd) => this.appendCommand(cmd));
  }

  constructor(
    private transform: Transform,
    private grid: Grid,
  ) {
    this.html();
    this.revive();
  }
}
