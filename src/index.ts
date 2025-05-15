import State from "./model/state";
import Tool from "./model/tool";

import Editor from "./views/editor";
import Toolbar from "./views/toolbar";
import Menubar from "./views/menubar";
import Snackbar from "./views/snackbar";

const save_btn = document.getElementById("save")!;
const load_btn = document.getElementById("load")!;

const menu_btn = document.getElementById("menu")!;
const trash_btn = document.getElementById("trash")!;
const export_btn = document.getElementById("export")!;
const import_btn = document.getElementById("import")!;

const menubar = new Menubar();
const toolbar = new Toolbar();
const editor = new Editor(toolbar);

const local = localStorage.getItem("editor-state");
const state: State = local ? JSON.parse(local) : new State();

save_btn.addEventListener("mousedown", () => {
  Snackbar.show("Saved!");
});

load_btn.addEventListener("mousedown", () => {
  Snackbar.show("Loaded!");
});

menu_btn.addEventListener("mousedown", () => {
  menubar.open = !menubar.open;
});

trash_btn.addEventListener("mousedown", () => {
  editor.state = new State();
  Snackbar.show("Cleared!");
});

export_btn.addEventListener("mousedown", () => {
  const jsonString = JSON.stringify(editor.state);
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
      toolbar.selected = Tool.Pencil;
      menubar.open = false;
      break;

    case "e":
      toolbar.selected = Tool.Eraser;
      menubar.open = false;
      break;

    case "c":
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
