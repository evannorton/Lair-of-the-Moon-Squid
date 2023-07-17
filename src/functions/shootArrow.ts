import {
  EntityInstanceData,
  createSpriteInstance,
  getCurrentTime,
  getEntityInstanceData,
  moveEntityInstance,
  spawnEntityInstance,
} from "pigeon-mode-game-library";
import { XDirection, YDirection } from "../types/Direction";
import { arrowSpriteID } from "../game/main/sprites";
import state from "../state";

const shootArrow = (): void => {
  if (state.values.playerEntityInstanceID === null) {
    throw new Error("An arrow input was received with no player entity.");
  }
  const playerEntityData: EntityInstanceData = getEntityInstanceData(
    state.values.playerEntityInstanceID
  );
  let x: number = playerEntityData.x;
  let y: number = playerEntityData.y;
  switch (state.values.direction) {
    case XDirection.Left:
      x -= 16;
      break;
    case XDirection.Right:
      x += 16;
      break;
    case YDirection.Up:
      y -= 16;
      break;
    case YDirection.Down:
      y += 16;
      break;
  }
  const arrowSpriteInstanceID: string = createSpriteInstance({
    spriteID: arrowSpriteID,
  });
  const arrowEntityInstanceID: string = spawnEntityInstance({
    entityID: "arrow",
    height: 16,
    layerID: "entities",
    spriteInstanceID: arrowSpriteInstanceID,
    width: 16,
    x,
    y,
  });
  switch (state.values.direction) {
    case XDirection.Left:
      moveEntityInstance(arrowEntityInstanceID, { xVelocity: -128 });
      break;
    case XDirection.Right:
      moveEntityInstance(arrowEntityInstanceID, { xVelocity: 128 });
      break;
    case YDirection.Up:
      moveEntityInstance(arrowEntityInstanceID, { yVelocity: -128 });
      break;
    case YDirection.Down:
      moveEntityInstance(arrowEntityInstanceID, { yVelocity: 128 });
      break;
  }
  state.setValues({
    arrows: [
      ...state.values.arrows,
      {
        direction: state.values.direction,
        entityInstanceID: arrowEntityInstanceID,
        shotAt: getCurrentTime(),
        spriteInstanceID: arrowSpriteInstanceID,
      },
    ],
  });
};

export default shootArrow;
