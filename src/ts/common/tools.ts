import Tool from "./tool";

export default class Tools {
  private container: HTMLDivElement;

  get selected(): Tool {
    const el = document.querySelector(".tool input:checked")!;
    const id = el.id;

    return Tool.parse(id)!;
  }

  set selected(value: Tool) {
    const id = Tool.id(value);
    const input = document.getElementById(id) as HTMLInputElement;

    input.checked = true;
  }

  constructor(tools = [Tool.Pencil, Tool.Eraser, Tool.Finger]) {
    this.container = document.getElementById("tools") as HTMLDivElement;

    for (const tool of tools) {
      const div = document.createElement("div");
      const input = document.createElement("input");
      const label = document.createElement("label");
      const image = document.createElement("img");

      const id = Tool.id(tool);

      div.className = "tool";

      input.id = id;
      input.name = "tool";
      input.type = "radio";

      label.setAttribute("for", id);

      image.src = Tool.img(tool);
      image.alt = id;
      image.draggable = false;

      label.appendChild(image);
      div.appendChild(input);
      div.appendChild(label);
      this.container.appendChild(div);
    }

    this.selected = Tool.Pencil;

    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "1":
        case "b": {
          this.selected = Tool.Pencil;
          break;
        }
        case "2":
        case "e": {
          this.selected = Tool.Eraser;
          break;
        }
        case "3":
        case "c": {
          this.selected = Tool.Finger;
          break;
        }
      }
    });
  }
}
