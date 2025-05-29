import Rotation from "../data/rotation";
import Transform from "../data/transform";

export default class Robot {
  private _transform: Transform;

  get transform(): Transform {
    return this._transform;
  }

  set transform(value: Transform) {
    this._transform = value;
    this.element.dataset.rotation = Rotation.id(value.rotation);

    const x = { property: "--robot-x", value: `${value.position.x}` };
    const y = { property: "--robot-y", value: `${value.position.y}` };

    document.documentElement.style.setProperty(x.property, x.value);
    document.documentElement.style.setProperty(y.property, y.value);
  }

  constructor() {
    this.html();
  }

  private html() {
    const puzzle = document.getElementById("puzzle") as HTMLDivElement;
    const robot = document.createElement("img");

    robot.id = "robot";
    robot.className = "robot";
    robot.src = "./assets/bx-caret-up.svg";
    robot.draggable = false;
    robot.dataset.rotation = Rotation.id(Rotation.Left);

    puzzle.appendChild(robot);
  }
}
