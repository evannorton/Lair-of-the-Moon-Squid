import { XDirection, YDirection } from "../types/Direction";
import {
  getInputTickHandlerGroupID,
  moveEntityInstance,
} from "pigeon-mode-game-library";
import {
  xInputTickHandlerID,
  yInputTickHandlerID,
} from "../game/main/inputHandlers";
import state from "../state";

const movePlayer = (): void => {
  if (state.values.playerEntityInstanceID === null) {
    throw new Error(
      "An attempt was made to move the player with no player entity instance"
    );
  }
  const xDirection: XDirection | null =
    getInputTickHandlerGroupID<XDirection>(xInputTickHandlerID);
  const yDirection: YDirection | null =
    getInputTickHandlerGroupID<YDirection>(yInputTickHandlerID);
  const xVelocity: number =
    xDirection === XDirection.Left
      ? -64
      : xDirection === XDirection.Right
      ? 64
      : 0;
  const yVelocity: number =
    yDirection === YDirection.Up
      ? -64
      : yDirection === YDirection.Down
      ? 64
      : 0;
  moveEntityInstance(state.values.playerEntityInstanceID, {
    xVelocity,
    yVelocity,
  });
  if (yDirection !== null) {
    state.setValues({ direction: yDirection });
  } else if (xDirection !== null) {
    state.setValues({ direction: xDirection });
  }
};

export default movePlayer;
