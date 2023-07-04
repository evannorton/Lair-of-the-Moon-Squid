import { State } from "pigeon-mode-game-library";
import Direction, { XDirection, YDirection } from "./types/Direction";

interface StateSchema {
  direction: Direction;
  isAtTitle: boolean;
  xDirection: XDirection | null;
  yDirection: YDirection | null;
}
const defaultState: StateSchema = {
  direction: YDirection.Down,
  isAtTitle: true,
  xDirection: null,
  yDirection: null,
};
const state: State<StateSchema> = new State(defaultState);

export default state;
