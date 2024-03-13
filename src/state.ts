import { Direction, YDirection } from "./types/Direction";
import { Hit } from "./types/Hit";
import { Phase } from "./types/Phase";
import { State } from "pixel-pigeon";
import { playerMaxHP } from "./constants/playerMaxHP";
import { playerMaxMP } from "./constants/playerMaxMP";

interface StateSchema {
  isAtTitle: boolean;
  phase: Phase;
  playerDirection: Direction;
  playerEntityID: string | null;
  playerHP: number;
  playerHit: Hit | null;
  playerMP: number;
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
  playerHP: playerMaxHP,
  playerHit: null,
  playerMP: playerMaxMP,
  playerShotArrowAt: null,
  playerSwungSwordAt: null,
  squidArmsMonsterIDs: [],
  squidHeadMonsterID: null,
};

export const state: State<StateSchema> = new State(defaultState);
