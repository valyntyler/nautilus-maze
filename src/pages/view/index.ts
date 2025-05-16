import Maze from "../../model/maze";
import Runner from "../../components/runner";

// const run_btn = document.getElementById("run")!;
// const back_btn = document.getElementById("back")!;

const runner = new Runner();

const local = localStorage.getItem("editor-state");
const state: Maze = local ? JSON.parse(local) : new Maze();

runner.state = state;
