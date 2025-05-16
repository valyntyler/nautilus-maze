import Maze from "../../model/maze";
import Tool from "../../model/tool";

import Editor from "../../components/editor";
import Toolbar from "../../components/toolbar";
import Menubar from "../../components/menubar";
import Snackbar from "../../components/snackbar";

const run_btn = document.getElementById("run")!;
const back_btn = document.getElementById("back")!;

const menu_btn = document.getElementById("menu")!;
const trash_btn = document.getElementById("trash")!;
const export_btn = document.getElementById("export")!;
const import_btn = document.getElementById("import")!;

const menubar = new Menubar();
const toolbar = new Toolbar();
const editor = new Editor(toolbar);

const local = localStorage.getItem("editor-state");
const state: Maze = local ? JSON.parse(local) : new Maze();

editor.state = state;

run_btn.addEventListener("click", () => {});

back_btn.addEventListener(
  "mousedown",
  () => (window.location.href = "../../index.html"),
);

menu_btn.addEventListener("click", () => {
  menubar.open = !menubar.open;
});

trash_btn.addEventListener("mousedown", () => {
  editor.state = new Maze();
  Snackbar.show("Cleared!");
});

export_btn.addEventListener("mousedown", () => {
  const jsonString = JSON.stringify(editor.state, null, 2);
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
      editor.state = JSON.parse(target.result);

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

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "b":
    case "1":
      toolbar.selected = Tool.Pencil;
      menubar.open = false;
      break;

    case "e":
    case "2":
      toolbar.selected = Tool.Eraser;
      menubar.open = false;
      break;

    case "c":
    case "3":
      toolbar.selected = Tool.Finger;
      menubar.open = false;
      break;

    case "Escape":
      if (menubar.open) {
        menubar.open = false;
        e.preventDefault();
      }
      break;
  }
});
