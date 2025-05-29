import Rotation from "../data/rotation";
import MouseEvent from "../data/mouse_event";
import MouseState from "../data/mouse_state";
import Puzzle from "./puzzle";
import Tool from "./tool";
import Tools from "./tools";

export default class PuzzleEditor extends Puzzle {
  private tools: Tools;

  constructor() {
    super();

    this.html();
    this.tools = new Tools();
    this.maze.onevent = (
      cell: HTMLDivElement,
      event: MouseEvent,
      state: MouseState,
    ) => {
      switch (this.tools.selected) {
        case Tool.Pencil: {
          this.usePencil(cell, event, state);
          break;
        }
        case Tool.Eraser: {
          this.useEraser(cell, event, state);
          break;
        }
        case Tool.Finger: {
          this.useFinger(cell, event, state);
          break;
        }
      }
    };
  }

  private usePencil(
    cell: HTMLDivElement,
    event: MouseEvent,
    state: MouseState,
  ) {
    const parent = cell.parentElement!;
    const row = Array.from(parent.children);
    const col = Array.from(parent.parentElement!.children);

    const x = row.indexOf(cell);
    const y = col.indexOf(parent);

    if (
      state.left &&
      cell.children.length === 0 &&
      (x !== this.robot.position.x || y !== this.robot.position.y)
    ) {
      cell.classList.add("black");
      this.maze.save();
    }
  }

  private useEraser(
    cell: HTMLDivElement,
    event: MouseEvent,
    state: MouseState,
  ) {
    if (state.left) {
      cell.classList.remove("black");
      this.maze.save();
    }
  }

  private useFinger(
    cell: HTMLDivElement,
    event: MouseEvent,
    state: MouseState,
  ) {
    if (!cell.classList.contains("black")) {
      const parent = cell.parentElement!;
      const row = Array.from(parent.children);
      const col = Array.from(parent.parentElement!.children);

      const x = row.indexOf(cell);
      const y = col.indexOf(parent);

      if (state.left) {
        this.robot.position = { x, y };
        this.robot.save();
      } else if (
        state.right &&
        x === this.robot.position.x &&
        y === this.robot.position.y
      ) {
        this.robot.rotation = Rotation.turn(this.robot.rotation);
        this.robot.save();
      }
    }
  }

  private html() {
    const tools = document.createElement("div");
    const img = document.createElement("img");
    const bar = document.getElementById("bar")!;

    tools.id = "tools";
    tools.className = "tools-container";

    img.src = "./assets/bx-check.svg";
    img.id = "done";
    img.onclick = () => this.onview();

    bar.innerHTML = "";
    bar.appendChild(tools);
    bar.appendChild(img);
  }
}
