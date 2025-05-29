import Grid from "../data/grid";
import Transform from "../data/transform";
import Maze from "./maze";
import PuzzleState from "./puzzle_state";
import Robot from "./robot";

export default class Puzzle {
  private container: HTMLDivElement;

  protected maze: Maze;
  private robot: Robot;

  onview = () => {};
  onedit = () => {};

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

  set state(value: PuzzleState) {}

  constructor() {
    this.container = document.getElementById("puzzle") as HTMLDivElement;
    this.container.innerHTML = "";

    this.maze = new Maze();
    this.robot = new Robot();
  }
}
