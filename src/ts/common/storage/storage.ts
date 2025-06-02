import Command from "../../data/command";
import Grid from "../../data/grid";
import Transform from "../../data/transform";
import Tool from "../toolbar/tool";
import Window from "../window/window";

namespace Storage {
  export function get_commands(): Array<Command> {
    const stored = localStorage.getItem("commands");
    return stored ? (JSON.parse(stored) as Array<Command>) : [];
  }

  export function set_commands(value: Array<Command>) {
    localStorage.setItem("commands", JSON.stringify(value));
  }

  export function get_maze(): Grid {
    const stored = localStorage.getItem("grid");
    return stored ? JSON.parse(stored) : Grid.create();
  }

  export function set_maze(value: Grid) {
    localStorage.setItem("grid", JSON.stringify(value));
  }

  export function get_robot(): Transform {
    const stored = localStorage.getItem("robot");
    return stored ? JSON.parse(stored) : Transform.create();

    // this.position = t.position;
    // this.rotation = t.rotation;
  }

  export function set_robot(value: Transform) {
    localStorage.setItem(
      "robot",
      JSON.stringify({ position: value.position, rotation: value.rotation }),
    );
  }

  export function get_tool(): Tool {
    const stored = localStorage.getItem("selected-tool");
    return stored ? JSON.parse(stored) : Tool.Pencil;
  }

  export function set_tool(value: Tool) {
    localStorage.setItem("selected-tool", JSON.stringify(value));
  }

  export function get_window(): Window {
    const stored = localStorage.getItem("active-window");
    return stored ? JSON.parse(stored) : Window.View;
  }

  export function set_window(value: Window) {
    localStorage.setItem("active-window", JSON.stringify(value));
  }
}

export default Storage;
