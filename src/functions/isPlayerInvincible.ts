import { getCurrentTime } from "pixel-pigeon";
import { invincibilityDuration } from "../constants/invincibilityDuration";
import { state } from "../state";

export const isPlayerInvincible = (): boolean =>
  state.values.playerHit !== null &&
  getCurrentTime() < state.values.playerHit.time + invincibilityDuration;
