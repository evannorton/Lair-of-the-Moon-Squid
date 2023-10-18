import { getCurrentTime } from "pixel-pigeon";
import { knockbackDuration } from "../constants/knockbackDuration";
import { state } from "../state";

export const isPlayerTakingKnockback = (): boolean =>
  state.values.playerHit !== null &&
  getCurrentTime() < state.values.playerHit.time + knockbackDuration;
