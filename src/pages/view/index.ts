import Maze from "../../model/maze";
import Runner from "../../components/runner";

document.addEventListener("DOMContentLoaded", () => {
  const edit_btn = document.getElementById("edit")!;
  const back_btn = document.getElementById("back")!;

  const runner = new Runner();

  const local = localStorage.getItem("editor-state");
  const state: Maze = local ? JSON.parse(local) : new Maze();

  runner.state = state;

  edit_btn.addEventListener(
    "click",
    () => (window.location.href = "./edit.html"),
  );

  back_btn.addEventListener(
    "click",
    () => (window.location.href = "../../index.html"),
  );
});
