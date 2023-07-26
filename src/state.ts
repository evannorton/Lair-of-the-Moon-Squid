import { Direction, YDirection } from "./types/Direction";
import { State } from "pigeon-mode-game-framework";

export interface Arrow {
  isBouncing: boolean;
  readonly shootDirection: Direction;
  readonly shotAt: number;
  readonly spriteInstanceID: string;
}
interface StateSchema {
  arrows: Map<string, Arrow>;
  direction: Direction;
  isAtTitle: boolean;
  playerEntityInstanceID: string | null;
}
const defaultState: StateSchema = {
  arrows: new Map(),
  direction: YDirection.Down,
  isAtTitle: true,
  playerEntityInstanceID: null,
};

export const state: State<StateSchema> = new State(defaultState);
