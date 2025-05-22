import Puzzle from "./puzzle";

export default class PuzzleRunner extends Puzzle {
  constructor() {
    super();

    const playback = document.createElement("div");
    const img = document.createElement("img");
    const bar = document.getElementById("bar")!;

    playback.id = "playback";
    playback.className = "playback-container";

    img.src = "./assets/bx-edit-alt.svg";
    img.id = "edit";
    img.onclick = () => {
      console.log("edit");
    };

    bar.innerHTML = "";
    bar.appendChild(img);
    bar.appendChild(playback);
  }
}
