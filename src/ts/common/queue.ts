import Command from "../data/command";

export default class Queue {
  private container: HTMLTextAreaElement;
  private _index = 0;

  private get queue(): Array<Command> {
    const value = this.container.value;
    const queue = value.trim().split(/\s+/);

    return queue
      .map((string) => Command.parse(string))
      .filter((command) => command !== null);
  }

  get index(): number {
    return this._index;
  }

  get current(): Command {
    return this.queue[this.index];
  }

  get next(): Command | null {
    if (this.index >= this.queue.length - 1) {
      return null;
    }
    return this.queue[++this.index];
  }

  get prev(): Command | null {
    if (this.index <= 0) {
      return null;
    }

    return this.queue[--this.index];
  }

  private set index(value: number) {
    this._index = value;
  }

  constructor() {
    this.container = document.getElementById("queue") as HTMLTextAreaElement;
  }
}
