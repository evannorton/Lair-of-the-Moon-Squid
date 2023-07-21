import { Arrow, state } from "../state";
import { arrowShootDuration } from "../constants/arrowShootDuration";
import { getCurrentTime } from "pigeon-mode-game-framework";

export const isShootingArrow = (): boolean => {
  if (state.values.arrows.length > 0) {
    const mostRecentArrow: Arrow =
      state.values.arrows[state.values.arrows.length - 1];
    return getCurrentTime() - mostRecentArrow.shotAt < arrowShootDuration;
  }
  return false;
};
