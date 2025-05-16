import State from "../../model/state";
import Editor from "../../views/editor";
import Toolbar from "../../views/toolbar";

// const run_btn = document.getElementById("run")!;
// const back_btn = document.getElementById("back")!;

const toolbar = new Toolbar();
const editor = new Editor(toolbar);

const local = localStorage.getItem("editor-state");
const state: State = local ? JSON.parse(local) : new State();

editor.state = state;
