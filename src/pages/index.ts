document.addEventListener("DOMContentLoaded", () => {
  const view_btn = document.getElementById("view")!;
  const edit_btn = document.getElementById("edit")!;

  view_btn.addEventListener("mousedown", () => {});

  edit_btn.addEventListener(
    "mousedown",
    () => (window.location.href = "./public/edit.html"),
  );
});
