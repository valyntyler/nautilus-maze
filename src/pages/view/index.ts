import Maze from "../../model/maze";
import Editor from "../../components/editor";
import Toolbar from "../../components/toolbar";

// const run_btn = document.getElementById("run")!;
// const back_btn = document.getElementById("back")!;

const toolbar = new Toolbar();
const editor = new Editor(toolbar);

const local = localStorage.getItem("editor-state");
const state: Maze = local ? JSON.parse(local) : new Maze();

editor.state = state;
