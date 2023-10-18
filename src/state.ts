import { Arrow } from "./types/Arrow";
import { Direction, YDirection } from "./types/Direction";
import { Hit } from "./types/Hit";
import { Monster } from "./types/Monster";
import { State } from "pixel-pigeon";
import { Sword } from "./types/Sword";

interface StateSchema {
  arrows: Arrow[];
  isAtTitle: boolean;
  monsters: Monster<string>[];
  playerDirection: Direction;
  playerEntityID: string | null;
  playerHit: Hit | null;
  playerShotArrowAt: number | null;
  playerSwungSwordAt: number | null;
  swords: Sword[];
}
const defaultState: StateSchema = {
  arrows: [],
  isAtTitle: true,
  monsters: [],
  playerDirection: YDirection.Down,
  playerEntityID: null,
  playerHit: null,
  playerShotArrowAt: null,
  playerSwungSwordAt: null,
  swords: [],
};

export const state: State<StateSchema> = new State(defaultState);
