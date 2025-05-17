import "../../css/style.css";

document.addEventListener("DOMContentLoaded", () => {
  const view_btn = document.getElementById("view")!;
  const edit_btn = document.getElementById("edit")!;

  view_btn.addEventListener(
    "click",
    () => (window.location.href = "view.html"),
  );

  edit_btn.addEventListener(
    "click",
    () => (window.location.href = "edit.html"),
  );
});
