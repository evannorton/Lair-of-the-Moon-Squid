import { getCurrentTime } from "pigeon-mode-game-library";
import arrowShootDuration from "../constants/arrowShootDuration";
import state, { Arrow } from "../state";

const isShootingArrow = (): boolean => {
  if (state.values.arrows.length > 0) {
    const mostRecentArrow: Arrow =
      state.values.arrows[state.values.arrows.length - 1];
    return getCurrentTime() - mostRecentArrow.shotAt < arrowShootDuration;
  }
  return false;
};

export default isShootingArrow;
