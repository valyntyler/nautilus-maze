export default class Menubar {
  container: HTMLDivElement;

  get open(): boolean {
    return this.container.classList.contains("open");
  }

  set open(value) {
    if (value) {
      this.container.classList.add("open");
    } else {
      this.container.classList.remove("open");
    }
  }

  constructor() {
    this.container = document.getElementById(
      "menubar-container",
    )! as HTMLDivElement;
  }
}
