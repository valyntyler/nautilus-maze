import Position from "../data/position";
import Rotation from "../data/rotation";
import Transform from "../data/transform";

export default class Robot {
  public get state(): Transform {
    return {
      position: this.position,
      rotation: this.rotation,
    };
  }

  public set state(value: Transform) {
    this.position = value.position;
    this.rotation = value.rotation;
  }

  private element: HTMLImageElement;

  private _position: Position;
  private _rotation: Rotation;

  private get position(): Position {
    return this._position;
  }

  private get rotation(): Rotation {
    return this._rotation;
  }

  private set position(value: Position) {
    this._position = value;

    const x = { property: "--robot-x", value: `${value.x}` };
    const y = { property: "--robot-y", value: `${value.y}` };

    document.documentElement.style.setProperty(x.property, x.value);
    document.documentElement.style.setProperty(y.property, y.value);
  }

  private set rotation(value: Rotation) {
    if (value === Rotation.Up && this.rotation === Rotation.Right) {
      const rotations = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--rotations",
        ),
        10,
      );

      document.documentElement.style.setProperty(
        "--rotations",
        `${rotations + 1}`,
      );
    }

    if (value === Rotation.Right && this.rotation === Rotation.Up) {
      const rotations = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--rotations",
        ),
        10,
      );

      document.documentElement.style.setProperty(
        "--rotations",
        `${rotations - 1}`,
      );
    }

    this._rotation = value;
    this.element.dataset.rotation = Rotation.id(value);
  }

  private html() {
    const puzzle = document.getElementById("puzzle") as HTMLDivElement;
    const robot = document.createElement("img");

    robot.id = "robot";
    robot.className = "robot";
    robot.src = "./assets/bx-caret-up.svg";
    robot.draggable = false;
    robot.dataset.rotation = Rotation.id(this.rotation);

    puzzle.appendChild(robot);
    this.element = robot;
  }

  constructor(value: Transform) {
    this.html();
    this.state = value;
  }
}
