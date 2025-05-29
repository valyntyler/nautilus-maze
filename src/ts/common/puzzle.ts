import Grid from "../data/grid";
import Rotation from "../data/rotation";
import Transform from "../data/transform";
import Maze from "./maze";
import MouseEvent from "./mouse_event";
import MouseState from "./mouse_state";
import PuzzleState from "./puzzle_state";
import Robot from "./robot";

export default class Puzzle {
  protected maze: Maze;

  container: HTMLDivElement;

  onview = () => {};
  onedit = () => {};
  onchange = () => {};
  oncellevent = (
    cell: HTMLDivElement,
    event: MouseEvent,
    state: MouseState,
  ) => {};

  get local(): PuzzleState {
    const string = localStorage.getItem("puzzle-state");
    return string
      ? JSON.parse(string)
      : {
          maze: Grid.create(14, 15),
          robot: Transform.create(),
        };
  }

  get state(): PuzzleState {
    return {
      // robot: this.robot,
      // maze: this.maze.grid,

      robot: Transform.create(),
      maze: Grid.create(),
    };
  }

  get robot(): Transform {
    // const img = document.getElementById("robot")!;
    // const div = img.parentNode! as HTMLDivElement;
    // const row = div.parentNode! as HTMLDivElement;
    //
    // const x = Array.from(row.children).indexOf(div);
    // const y = Array.from(row.parentNode!.children).indexOf(row);
    // const r = Rotation.parse(img.className)!;
    //
    // return Transform.create(Position.create(x, y), r);
    return Transform.create();
  }

  set state(value: PuzzleState) {}

  set robot(value: Transform) {
    // const cell = this.cell(value.position.x, value.position.y);
    // this.place(cell, value.rotation);
  }

  constructor() {
    this.container = document.getElementById("puzzle") as HTMLDivElement;
    this.container.innerHTML = "";

    const asdf = new Robot();

    this.maze = new Maze();
  }
}
