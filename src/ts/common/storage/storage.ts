import Tool from "../toolbar/tool";

namespace Storage {
  export function get_tool(): Tool {
    const stored = localStorage.getItem("selected-tool");
    return stored ? JSON.parse(stored) : Tool.Pencil;
  }

  export function set_tool(value: Tool) {
    localStorage.setItem("selected-tool", JSON.stringify(value));
  }
}

export default Storage;
