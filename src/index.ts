import Snackbar from "./snackbar";

const save_btn = document.getElementById("save-btn")!;
const load_btn = document.getElementById("load-btn")!;

save_btn.addEventListener("mousedown", () => {
  Snackbar.show("Saved!");
});

load_btn.addEventListener("mousedown", () => {
  Snackbar.show("Loaded!");
});
