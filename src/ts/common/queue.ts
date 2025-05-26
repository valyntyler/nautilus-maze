import Command from "../data/command";

export default class Queue {
  container: HTMLTextAreaElement;

  get commands(): Array<Command> {
    const value = this.container.value;
    const queue = value.trim().split(/\s+/);

    return queue
      .map((string) => Command.parse(string))
      .filter((command) => command !== null);
  }

  constructor() {
    this.container = document.getElementById("queue") as HTMLTextAreaElement;
  }
}
