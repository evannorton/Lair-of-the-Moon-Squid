import { XDirection, YDirection } from "../types/Direction";
import { knockbackSpeed } from "../constants/knockbackSpeed";
import { moveEntity } from "pixel-pigeon";
import { state } from "../state";

export const applyKnockbackToPlayer = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error(
      "An attempt was made to apply knockback to the player with no player entity",
    );
  }
  if (state.values.playerHit === null) {
    throw new Error(
      "An attempt was made to apply knockback to the player with no player hit",
    );
  }
  switch (state.values.playerHit.direction) {
    case XDirection.Left:
      moveEntity(state.values.playerEntityID, {
        xVelocity: -knockbackSpeed,
        yVelocity: 0,
      });
      break;
    case XDirection.Right:
      moveEntity(state.values.playerEntityID, {
        xVelocity: knockbackSpeed,
        yVelocity: 0,
      });
      break;
    case YDirection.Up:
      moveEntity(state.values.playerEntityID, {
        xVelocity: 0,
        yVelocity: -knockbackSpeed,
      });
      break;
    case YDirection.Down:
      moveEntity(state.values.playerEntityID, {
        xVelocity: 0,
        yVelocity: knockbackSpeed,
      });
      break;
  }
};
