let mousePressed: boolean;
document.addEventListener("mousedown", () => (mousePressed = true));
document.addEventListener("mouseup", () => (mousePressed = false));

export default class Maze {
  container: HTMLDivElement;

  constructor(
    readonly rows: number,
    readonly cols: number,
  ) {
    this.container = document.getElementById("maze")! as HTMLDivElement;
  }

  create() {
    this.container.innerHTML = "";
    this.container.style.gridTemplateColumns = `repeat(${this.cols}, 40px)`;
    this.container.style.gridTemplateRows = `repeat(${this.rows}, 40px)`;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // create cell
        const cell = document.createElement("div");
        cell.className = "maze-cell";

        // register its mouse events
        cell.addEventListener("mousedown", function (e) {
          mousePressed = true;
          this.classList.toggle("black");

          e.preventDefault();
        });

        cell.addEventListener("mouseenter", function () {
          if (mousePressed) {
            this.classList.toggle("black");
          }
        });

        // disable its context menu
        cell.addEventListener("contextmenu", (e) => e.preventDefault());

        // append it to the container
        this.container.appendChild(cell);
      }
    }
  }

  static update() {}
}
