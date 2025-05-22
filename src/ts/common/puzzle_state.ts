import Grid from "../data/grid";
import Transform from "../data/transform";

interface PuzzleState {
  robot: Transform;
  maze: Grid;
}

export default PuzzleState;
