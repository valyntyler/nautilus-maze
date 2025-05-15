import State from "../model/state";
import Toolbar from "./toolbar";

export default class Editor {
  container: HTMLDivElement;
  toolbar: Toolbar;

  set state(value: State) {}

  constructor(toolbar: Toolbar) {
    this.toolbar = toolbar;
    this.container = document.getElementById("maze")! as HTMLDivElement;
  }
}
