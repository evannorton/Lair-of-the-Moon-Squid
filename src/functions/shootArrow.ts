import { Arrow } from "../classes/Arrow";
import { getCurrentTime } from "pixel-pigeon";
import { state } from "../state";

export const shootArrow = (): void => {
  new Arrow();
  state.setValues({
    playerShotArrowAt: getCurrentTime(),
  });
};
