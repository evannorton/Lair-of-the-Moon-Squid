import { State } from "pigeon-mode-game-library";
import Direction, { YDirection } from "./types/Direction";

interface StateSchema {
  direction: Direction;
  isAtTitle: boolean;
}
const defaultState: StateSchema = {
  direction: YDirection.Down,
  isAtTitle: true,
};
const state: State<StateSchema> = new State(defaultState);

export default state;
