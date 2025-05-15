import Direction from "./direction";

export default class Player {
  constructor(
    public x: number,
    public y: number,
    public dir: Direction,
  ) {}
}
