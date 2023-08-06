import { arrowShootDuration } from "../constants/arrowShootDuration";
import { getCurrentTime } from "pigeon-mode-game-framework";
import { state } from "../state";

export const isShootingArrow = (): boolean =>
  state.values.shotArrowAt !== null &&
  getCurrentTime() - state.values.shotArrowAt < arrowShootDuration;
