import Tool from "./tool";

export default class Tools {
  container: HTMLDivElement;

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
  }
}
