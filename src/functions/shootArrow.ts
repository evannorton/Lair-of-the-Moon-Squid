import { Arrow } from "../classes/Arrow";
import { getCurrentTime } from "pixel-pigeon";
import { state } from "../state";

export const shootArrow = (): void => {
  if (state.values.playerMP >= 1) {
    new Arrow();
    state.setValues({
      playerShotArrowAt: getCurrentTime(),
    });
    state.setValues({
      playerMP: Math.max(state.values.playerMP - 1, 0),
    });
  }
};
