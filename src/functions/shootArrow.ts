import { Arrow, state } from "../state";
import { ArrowAnimation, arrowSpriteID } from "../game/main/sprites";
import {
  EntityInstanceData,
  createSpriteInstance,
  disableEntityInstanceCollision,
  getCurrentTime,
  getEntityInstanceData,
  moveEntityInstance,
  playSpriteInstanceAnimation,
  spawnEntityInstance,
  stopEntityInstance,
} from "pigeon-mode-game-framework";
import { XDirection, YDirection } from "../types/Direction";
import { arrowShootSpeed } from "../constants/arrowShootSpeed";

export const shootArrow = (): void => {
  if (state.values.playerEntityInstanceID === null) {
    throw new Error("An arrow input was received with no player entity.");
  }
  const playerEntityData: EntityInstanceData = getEntityInstanceData(
    state.values.playerEntityInstanceID,
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
    onCollision: (): void => {
      disableEntityInstanceCollision(arrowEntityInstanceID);
      stopEntityInstance(arrowEntityInstanceID, {
        x: true,
        y: true,
      });
      const arrow: Arrow | null =
        state.values.arrows.find(
          (stateArrow: Arrow): boolean =>
            arrowEntityInstanceID === stateArrow.entityInstanceID,
        ) ?? null;
      if (arrow === null) {
        throw new Error(
          "An arrow collided with an entity instance, but the arrow could not be found in state.",
        );
      }
      switch (arrow.shootDirection) {
        case XDirection.Left:
          moveEntityInstance(arrowEntityInstanceID, {
            xVelocity: Math.floor(arrowShootSpeed / 2),
          });
          playSpriteInstanceAnimation(arrowSpriteInstanceID, {
            animationID: ArrowAnimation.BounceLeft,
          });
          break;
        case XDirection.Right:
          moveEntityInstance(arrowEntityInstanceID, {
            xVelocity: -Math.floor(arrowShootSpeed / 2),
          });
          playSpriteInstanceAnimation(arrowSpriteInstanceID, {
            animationID: ArrowAnimation.BounceRight,
          });
          break;
        case YDirection.Up:
          moveEntityInstance(arrowEntityInstanceID, {
            yVelocity: Math.floor(arrowShootSpeed / 2),
          });
          playSpriteInstanceAnimation(arrowSpriteInstanceID, {
            animationID: ArrowAnimation.BounceUp,
          });
          break;
        case YDirection.Down:
          moveEntityInstance(arrowEntityInstanceID, {
            yVelocity: -Math.floor(arrowShootSpeed / 2),
          });
          playSpriteInstanceAnimation(arrowSpriteInstanceID, {
            animationID: ArrowAnimation.BounceDown,
          });
          break;
      }
    },
    spriteInstanceID: arrowSpriteInstanceID,
    width: 16,
    x,
    y,
  });
  switch (state.values.direction) {
    case XDirection.Left:
      moveEntityInstance(arrowEntityInstanceID, {
        xVelocity: -arrowShootSpeed,
      });
      break;
    case XDirection.Right:
      moveEntityInstance(arrowEntityInstanceID, { xVelocity: arrowShootSpeed });
      break;
    case YDirection.Up:
      moveEntityInstance(arrowEntityInstanceID, {
        yVelocity: -arrowShootSpeed,
      });
      break;
    case YDirection.Down:
      moveEntityInstance(arrowEntityInstanceID, { yVelocity: arrowShootSpeed });
      break;
  }
  state.setValues({
    arrows: [
      ...state.values.arrows,
      {
        entityInstanceID: arrowEntityInstanceID,
        shootDirection: state.values.direction,
        shotAt: getCurrentTime(),
        spriteInstanceID: arrowSpriteInstanceID,
      },
    ],
  });
};
