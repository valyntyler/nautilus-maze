import Direction from "./direction";

export default class Player {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public dir: Direction = Direction.Up,
  ) {}
}
