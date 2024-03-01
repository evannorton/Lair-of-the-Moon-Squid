import { Sword } from "../classes/Sword";
import { getCurrentTime } from "pixel-pigeon";
import { state } from "../state";

export const swingSword = (): void => {
  new Sword();
  state.setValues({
    playerSwungSwordAt: getCurrentTime(),
  });
};
