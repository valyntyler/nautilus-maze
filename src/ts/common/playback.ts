export default class Playback {
  private container: HTMLDivElement;

  constructor() {
    this.container = document.getElementById("playback") as HTMLDivElement;

    const controls = [
      { alt: "prev", src: "./assets/bx-skip-previous.svg" },
      { alt: "play", src: "./assets/bx-play.svg" },
      { alt: "next", src: "./assets/bx-skip-next.svg" },
    ];

    for (const item of controls) {
      const image = document.createElement("img");

      image.src = item.src;
      image.alt = item.alt;
      image.draggable = false;

      this.container.appendChild(image);
    }
  }
}
