import { Direction, YDirection } from "./types/Direction";
import { Hit } from "./types/Hit";
import { State } from "pixel-pigeon";

interface StateSchema {
  isAtTitle: boolean;
  playerDirection: Direction;
  playerEntityID: string | null;
  playerHit: Hit | null;
  playerShotArrowAt: number | null;
  playerSwungSwordAt: number | null;
}
const defaultState: StateSchema = {
  isAtTitle: true,
  playerDirection: YDirection.Down,
  playerEntityID: null,
  playerHit: null,
  playerShotArrowAt: null,
  playerSwungSwordAt: null,
};

export const state: State<StateSchema> = new State(defaultState);
