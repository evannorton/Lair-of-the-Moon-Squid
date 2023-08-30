import { Arrow } from "./types/Arrow";
import { Direction, YDirection } from "./types/Direction";
import { Hit } from "./types/Hit";
import { Monster } from "./types/Monster";
import { State } from "pigeon-mode-game-framework";
import { Sword } from "./types/Sword";

interface StateSchema {
  arrows: Map<string, Arrow>;
  isAtTitle: boolean;
  monsters: Map<string, Monster<string>>;
  playerDirection: Direction;
  playerEntityID: string | null;
  playerHit: Hit | null;
  shotArrowAt: number | null;
  swords: Map<string, Sword>;
  swungSwordAt: number | null;
}
const defaultState: StateSchema = {
  arrows: new Map(),
  isAtTitle: true,
  monsters: new Map(),
  playerDirection: YDirection.Down,
  playerEntityID: null,
  playerHit: null,
  shotArrowAt: null,
  swords: new Map(),
  swungSwordAt: null,
};

export const state: State<StateSchema> = new State(defaultState);
