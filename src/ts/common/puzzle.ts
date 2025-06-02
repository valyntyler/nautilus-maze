import Grid from "../data/grid";
import Maze from "./maze";
import Robot from "./robot";

export default class Puzzle {
  private container: HTMLDivElement;

  protected maze: Maze;
  protected robot: Robot;

  onview = () => {};
  onedit = () => {};

  constructor() {
    this.container = document.getElementById("puzzle") as HTMLDivElement;
    this.container.innerHTML = "";

    this.maze = new Maze(Grid.create());
    this.robot = new Robot();
  }
}
