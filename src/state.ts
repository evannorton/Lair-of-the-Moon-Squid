import { Direction, YDirection } from "./types/Direction";
import { Hit } from "./types/Hit";
import { Phase } from "./types/Phase";
import { State } from "pixel-pigeon";

interface StateSchema {
  isAtTitle: boolean;
  phase: Phase;
  playerDirection: Direction;
  playerEntityID: string | null;
  playerHit: Hit | null;
  playerShotArrowAt: number | null;
  playerSwungSwordAt: number | null;
  squidArmsMonsterIDs: string[];
  squidHeadMonsterID: string | null;
}
const defaultState: StateSchema = {
  isAtTitle: true,
  phase: Phase.Phase1,
  playerDirection: YDirection.Down,
  playerEntityID: null,
  playerHit: null,
  playerShotArrowAt: null,
  playerSwungSwordAt: null,
  squidArmsMonsterIDs: [],
  squidHeadMonsterID: null,
};

export const state: State<StateSchema> = new State(defaultState);
