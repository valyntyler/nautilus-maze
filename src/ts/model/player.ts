import Rotation from "./robot/rotation";

export default class Player {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public dir: Rotation = Rotation.Up,
  ) {}
}
