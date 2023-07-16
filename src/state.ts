import { State } from "pigeon-mode-game-library";
import Direction, { YDirection } from "./types/Direction";

interface Arrow {
  readonly direction: Direction;
  readonly entityInstanceID: string;
  readonly spriteInstanceID: string;
}
interface StateSchema {
  arrows: Arrow[];
  direction: Direction;
  isAtTitle: boolean;
  playerEntityInstanceID: string | null;
  playerSpriteInstanceID: string | null;
}
const defaultState: StateSchema = {
  arrows: [],
  direction: YDirection.Down,
  isAtTitle: true,
  playerEntityInstanceID: null,
  playerSpriteInstanceID: null,
};
const state: State<StateSchema> = new State(defaultState);

export default state;
export { Arrow };
