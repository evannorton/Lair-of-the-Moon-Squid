import { getCurrentTime } from "pigeon-mode-game-framework";
import { state } from "../state";
import { swordSwingDuration } from "../constants/swordSwingDuration";

export const isSwingingSword = (): boolean =>
  state.values.swungSwordAt !== null &&
  getCurrentTime() - state.values.swungSwordAt < swordSwingDuration;
