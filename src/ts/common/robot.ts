import Rotation from "../data/rotation";
import Transform from "../data/transform";

export default class Robot {
  private container: HTMLDivElement;
  private element: HTMLImageElement;

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
    this.container = document.getElementById("maze") as HTMLDivElement;
    this.element = document.createElement("img");

    this.element.id = "robot";
    this.element.className = "robot";
    this.element.src = "./assets/bx-caret-up.svg";
    this.element.draggable = false;
    this.element.dataset.rotation = Rotation.id(Rotation.Left);

    this.container.appendChild(this.element);
  }
}
