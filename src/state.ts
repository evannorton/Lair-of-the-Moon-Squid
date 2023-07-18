import { State } from "pigeon-mode-game-framework";
import Direction, { YDirection } from "./types/Direction";

interface Arrow {
  readonly direction: Direction;
  readonly entityInstanceID: string;
  readonly shotAt: number;
  readonly spriteInstanceID: string;
}
interface StateSchema {
  arrows: Arrow[];
  direction: Direction;
  isAtTitle: boolean;
  playerEntityInstanceID: string | null;
}
const defaultState: StateSchema = {
  arrows: [],
  direction: YDirection.Down,
  isAtTitle: true,
  playerEntityInstanceID: null,
};
const state: State<StateSchema> = new State(defaultState);

export default state;
export { Arrow };
