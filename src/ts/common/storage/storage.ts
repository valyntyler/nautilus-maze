import Command from "../../data/command";
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
