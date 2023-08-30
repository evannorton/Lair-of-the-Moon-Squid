import { getCurrentTime } from "pigeon-mode-game-framework";
import { state } from "../state";
import { swordSwingDuration } from "../constants/swordSwingDuration";

export const isPlayerSwingingSword = (): boolean =>
  state.values.playerSwungSwordAt !== null &&
  getCurrentTime() - state.values.playerSwungSwordAt < swordSwingDuration;
