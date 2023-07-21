import { State } from "pigeon-mode-game-framework";
import { Direction , YDirection } from "./types/Direction";

export interface Arrow {
  readonly entityInstanceID: string;
  readonly shootDirection: Direction;
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
export const state: State<StateSchema> = new State(defaultState);