import Maze from "./maze";
import Robot from "./robot";
import Storage from "./storage/storage";

export default class Puzzle {
  private container: HTMLDivElement;

  protected maze: Maze;
  protected robot: Robot;

  onview = () => {};
  onedit = () => {};

  constructor() {
    this.container = document.getElementById("puzzle") as HTMLDivElement;
    this.container.innerHTML = "";

    this.maze = new Maze(Storage.get_maze());
    this.robot = new Robot(Storage.get_robot());
  }
}
