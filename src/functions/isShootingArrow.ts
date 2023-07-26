import { arrowShootDuration } from "../constants/arrowShootDuration";
import { getCurrentTime } from "pigeon-mode-game-framework";
import { state } from "../state";

export const isShootingArrow = (): boolean => {
  for (const [, arrow] of state.values.arrows) {
    if (getCurrentTime() - arrow.shotAt < arrowShootDuration) {
      return true;
    }
  }
  return false;
};
