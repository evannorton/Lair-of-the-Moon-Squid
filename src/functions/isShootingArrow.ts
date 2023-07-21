import { getCurrentTime } from "pigeon-mode-game-framework";
import { arrowShootDuration } from "../constants/arrowShootDuration";
import { state , Arrow } from "../state";

export const isShootingArrow = (): boolean => {
  if (state.values.arrows.length > 0) {
    const mostRecentArrow: Arrow =
      state.values.arrows[state.values.arrows.length - 1];
    return getCurrentTime() - mostRecentArrow.shotAt < arrowShootDuration;
  }
  return false;
};