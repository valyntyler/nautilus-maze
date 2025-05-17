enum Tool {
  Pencil,
  Eraser,
  Finger,
}

namespace Tool {
  export function id(tool: Tool): string {
    switch (tool) {
      case Tool.Pencil:
        return "pencil";

      case Tool.Eraser:
        return "eraser";

      case Tool.Finger:
        return "finger";
    }
  }

  export function parse(id: string): Tool | null {
    switch (id) {
      case "pencil":
        return Tool.Pencil;

      case "eraser":
        return Tool.Eraser;

      case "finger":
        return Tool.Finger;

      default:
        return null;
    }
  }
}

export default Tool;
