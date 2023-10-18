import { XDirection, YDirection } from "../types/Direction";
import { moveEntity } from "pixel-pigeon";
import { movementSpeed } from "../constants/movementSpeed";
import { state } from "../state";

const applyKnockbackToPlayer = (): void => {
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
        xVelocity: -movementSpeed,
        yVelocity: 0,
      });
      break;
    case XDirection.Right:
      moveEntity(state.values.playerEntityID, {
        xVelocity: movementSpeed,
        yVelocity: 0,
      });
      break;
    case YDirection.Up:
      moveEntity(state.values.playerEntityID, {
        xVelocity: 0,
        yVelocity: -movementSpeed,
      });
      break;
    case YDirection.Down:
      moveEntity(state.values.playerEntityID, {
        xVelocity: 0,
        yVelocity: movementSpeed,
      });
      break;
  }
};

export default applyKnockbackToPlayer;
