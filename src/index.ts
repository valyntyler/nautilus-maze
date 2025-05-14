import Maze from "./maze";
import MazeState from "./maze_state";
import Snackbar from "./snackbar";
import Tool from "./tool";
import Toolbar from "./toolbar";

const save_btn = document.getElementById("save")!;
const load_btn = document.getElementById("load")!;

const toolbar = new Toolbar();
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

// handle key presses
document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "b":
      toolbar.selected = Tool.Pencil;
      break;

    case "e":
      toolbar.selected = Tool.Eraser;
      break;
  }
});
