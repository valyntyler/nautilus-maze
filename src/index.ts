import Maze from "./maze";
import Snackbar from "./snackbar";

const save_btn = document.getElementById("save")!;
const load_btn = document.getElementById("load")!;

const maze = new Maze(10, 10);
maze.create();

save_btn.addEventListener("mousedown", () => {
  Snackbar.show("Saved!");
});

load_btn.addEventListener("mousedown", () => {
  Snackbar.show("Loaded!");
});
