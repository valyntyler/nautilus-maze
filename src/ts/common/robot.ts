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
    if (value === Rotation.Up) {
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

    this._rotation = value;
    this.element.dataset.rotation = Rotation.id(value);
  }

  constructor() {
    this.html();
    this.load();
  }

  public save() {
    localStorage.setItem(
      "robot",
      JSON.stringify({ position: this.position, rotation: this.rotation }),
    );
  }

  public load() {
    const local = localStorage.getItem("robot");
    const t = local ? JSON.parse(local) : Transform.create();

    this.position = t.position;
    this.rotation = t.rotation;
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
}
