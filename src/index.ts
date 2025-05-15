import Maze from "./maze";
import MazeState from "./maze_state";
import Menubar from "./menubar";
import Snackbar from "./snackbar";
import Tool from "./tool";
import Toolbar from "./toolbar";

const save_btn = document.getElementById("save")!;
const load_btn = document.getElementById("load")!;

const menu_btn = document.getElementById("menu")!;
const export_btn = document.getElementById("export")!;
const import_btn = document.getElementById("import")!;

const toolbar = new Toolbar();
const menubar = new Menubar();
const maze = new Maze(10, 10, toolbar);

const local = localStorage.getItem("editor-state");
const state: MazeState = local ? JSON.parse(local) : new MazeState(10, 10);

maze.create();
maze.state = state;

save_btn.addEventListener("mousedown", () => {
  Snackbar.show("Saved!");
});

load_btn.addEventListener("mousedown", () => {
  Snackbar.show("Loaded!");
});

menu_btn.addEventListener("mousedown", () => {
  menubar.open = !menubar.open;
});

export_btn.addEventListener("mousedown", () => {
  const jsonString = JSON.stringify(maze.state, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "maze.json";

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  Snackbar.show("Export successful!");
  menubar.open = false;
});

import_btn.addEventListener("mousedown", () => {
  const input = document.createElement("input");
  input.type = "file";

  input.multiple = false;
  input.accept = ".json";

  input.onchange = (event) => {
    const file = (event.target as any).files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const target = e.target as any;
      maze.state = JSON.parse(target.result);

      Snackbar.show("Import successful!");
      menubar.open = false;
    };
    reader.readAsText(file);
  };

  input.click();
});

document.addEventListener("mousedown", (e) => {
  if (!(e.target as any).closest("#menubar-container")) {
    menubar.open = false;
    e.preventDefault();
  }
});

// handle key presses
document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "b":
      toolbar.selected = Tool.Pencil;
      break;

    case "e":
      toolbar.selected = Tool.Eraser;
      break;

    case "Escape":
      if (menubar.open) {
        menubar.open = false;
        e.preventDefault();
      }
      break;
  }
});
