import Tool from "./tool";

export default class Toolbar {
  tools: NodeListOf<HTMLImageElement>;
  _selected: Tool = Tool.Pencil;

  get selected() {
    return this._selected;
  }

  set selected(value) {
    this._selected = value;
    this.tools.forEach((tool) => {
      tool.classList.remove("selected");
    });
    const tool = document.getElementById(Tool.id(this.selected))!;
    tool.classList.add("selected");
    localStorage.setItem("tool-selected", JSON.stringify(this.selected));
  }

  constructor() {
    this.tools = document.querySelectorAll(".toolbar img");
    this.tools.forEach((tool) =>
      tool.addEventListener(
        "mousedown",
        () => (this.selected = Tool.parse(tool.id)!),
      ),
    );

    const local = localStorage.getItem("tool-selected");
    const state = local ? parseInt(local) : Tool.Pencil;

    this.selected = state;
  }
}
