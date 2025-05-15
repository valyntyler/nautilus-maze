export default class Snackbar {
  static show(message: string) {
    const container = document.getElementById("snackbar")!;
    container.innerHTML = "";

    const snackbar = document.createElement("div");
    snackbar.className = "snackbar";
    snackbar.textContent = message;

    container.appendChild(snackbar);
    setTimeout(() => snackbar.remove(), 1200);
  }
}
