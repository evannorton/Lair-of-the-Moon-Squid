import { getCurrentTime } from "pixel-pigeon";
import { state } from "../state";
import { swordSwingDuration } from "../constants/swordSwingDuration";

export const isPlayerSwingingSword = (): boolean =>
  state.values.playerSwungSwordAt !== null &&
  getCurrentTime() - state.values.playerSwungSwordAt < swordSwingDuration;
