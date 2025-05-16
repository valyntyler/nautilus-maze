document.addEventListener("DOMContentLoaded", () => {
  const view_btn = document.getElementById("view")!;
  const edit_btn = document.getElementById("edit")!;

  view_btn.addEventListener(
    "click",
    () => (window.location.href = "./public/view.html"),
  );

  edit_btn.addEventListener(
    "click",
    () => (window.location.href = "./public/edit.html"),
  );
});
