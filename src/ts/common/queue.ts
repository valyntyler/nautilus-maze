import Command from "../data/command";

export default class Queue {
  private container: HTMLTextAreaElement;
  private _index = 0;

  private get array(): Array<Command> {
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
    return this.array[this.index];
  }

  get rest(): Array<Command> {
    let v: Array<Command> = [];
    for (let k = this.index; k < this.array.length; k++) {
      v.push(this.array[k]);
    }
    return v;
  }

  set index(value: number) {
    this._index = value;
  }

  constructor() {
    this.container = document.getElementById("queue") as HTMLTextAreaElement;
  }
}
