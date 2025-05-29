import Position from "../data/position";
import Rotation from "../data/rotation";
import Transform from "../data/transform";

export default class Robot implements Transform {
  private element: HTMLImageElement;

  private _position: Position;
  private _rotation: Rotation;

  get position(): Position {
    return this._position;
  }

  get rotation(): Rotation {
    return this._rotation;
  }

  set position(value: Position) {
    this._position = value;

    const x = { property: "--robot-x", value: `${value.x}` };
    const y = { property: "--robot-y", value: `${value.y}` };

    document.documentElement.style.setProperty(x.property, x.value);
    document.documentElement.style.setProperty(y.property, y.value);
  }

  set rotation(value: Rotation) {
    this._rotation = value;
    this.element.dataset.rotation = Rotation.id(value);
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
    this.element = robot;
  }
}
