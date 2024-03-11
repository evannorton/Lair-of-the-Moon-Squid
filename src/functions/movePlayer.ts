import { XDirection, YDirection } from "../types/Direction";
import { getInputTickHandlerGroupID, moveEntity } from "pixel-pigeon";
import { playerMovementSpeed } from "../constants/playerMovementSpeed";
import { state } from "../state";
import { xInputTickHandlerID, yInputTickHandlerID } from "../inputHandlers";

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
      ? -playerMovementSpeed
      : xDirection === XDirection.Right
        ? playerMovementSpeed
        : 0;
  const yVelocity: number =
    yDirection === YDirection.Up
      ? -playerMovementSpeed
      : yDirection === YDirection.Down
        ? playerMovementSpeed
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
