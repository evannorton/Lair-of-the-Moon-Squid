import { Arrow } from "../classes/Arrow";
import { getCurrentTime } from "pixel-pigeon";
import { playerMaxMP } from "../constants/playerMaxMP";
import { state } from "../state";

export const shootArrow = (): void => {
  if (state.values.playerMP >= 1) {
    new Arrow();
    state.setValues({
      playerShotArrowAt: getCurrentTime(),
    });
    if (state.values.playerMP === playerMaxMP) {
      state.setValues({
        playerMPReducedFromMaxAt: getCurrentTime(),
      });
    }
    state.setValues({
      playerMP: Math.max(state.values.playerMP - 1, 0),
    });
  }
};
