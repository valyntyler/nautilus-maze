import Rotation from "../data/rotation";

export default class Robot {
  container: HTMLDivElement;

  constructor() {
    this.container = document.getElementById("maze") as HTMLDivElement;

    const robot = document.createElement("img");
    const rotation = Rotation.id(Rotation.Left);

    robot.id = "robot";
    robot.className = "robot";
    robot.src = "./assets/bx-caret-up.svg";
    robot.draggable = false;
    robot.dataset.rotation = rotation;

    this.container.appendChild(robot);
  }
}
