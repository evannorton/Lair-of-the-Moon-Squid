import { XDirection, YDirection } from "../types/Direction";
import {
  getInputTickHandlerGroupID,
  moveEntity,
} from "pigeon-mode-game-framework";
import { movementSpeed } from "../constants/movementSpeed";
import { state } from "../state";
import {
  xInputTickHandlerID,
  yInputTickHandlerID,
} from "../game/main/inputHandlers";

export const movePlayer = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error(
      "An attempt was made to move the player with no player entity",
    );
  }
  const xDirection: XDirection | null =
    getInputTickHandlerGroupID<XDirection>(xInputTickHandlerID);
  const yDirection: YDirection | null =
    getInputTickHandlerGroupID<YDirection>(yInputTickHandlerID);
  const xVelocity: number =
    xDirection === XDirection.Left
      ? -movementSpeed
      : xDirection === XDirection.Right
      ? movementSpeed
      : 0;
  const yVelocity: number =
    yDirection === YDirection.Up
      ? -movementSpeed
      : yDirection === YDirection.Down
      ? movementSpeed
      : 0;
  moveEntity(state.values.playerEntityID, {
    xVelocity,
    yVelocity,
  });
  if (yDirection !== null) {
    state.setValues({ playerDirection: yDirection });
  } else if (xDirection !== null) {
    state.setValues({ playerDirection: xDirection });
  }
};
