import { Arrow } from "../types/Arrow";
import {
  CollisionData,
  EntityData,
  createSpriteInstance,
  disableEntityCollision,
  getCurrentTime,
  getEntityData,
  moveEntity,
  spawnEntity,
  stopEntity,
} from "pigeon-mode-game-framework";
import { CollisionLayer } from "../types/CollisionLayer";
import { Monster } from "../types/Monster";
import { XDirection, YDirection } from "../types/Direction";
import { arrowShootSpeed } from "../constants/arrowShootSpeed";
import { arrowSpriteID } from "../game/main/sprites";
import { knockbackDuration } from "../constants/knockbackDuration";
import { state } from "../state";

export const shootArrow = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error("An arrow input was received with no player entity.");
  }
  const playerEntityData: EntityData = getEntityData(
    state.values.playerEntityID,
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
  const arrowEntityID: string = spawnEntity<CollisionLayer>({
    collidableLayers: [CollisionLayer.Monster],
    collisionLayers: [CollisionLayer.Projectile],
    height: 16,
    layerID: "entities",
    onCollision: (data: CollisionData): void => {
      disableEntityCollision(arrowEntityID);
      stopEntity(arrowEntityID, {
        x: true,
        y: true,
      });
      const arrow: Arrow | null =
        state.values.arrows.get(arrowEntityID) ?? null;
      if (arrow === null) {
        throw new Error(
          "An arrow collided with an entity instance, but the arrow could not be found in state.",
        );
      }
      arrow.isBouncing = true;
      switch (arrow.shootDirection) {
        case XDirection.Left:
          moveEntity(arrowEntityID, {
            xVelocity: Math.floor(arrowShootSpeed / 2),
          });
          break;
        case XDirection.Right:
          moveEntity(arrowEntityID, {
            xVelocity: -Math.floor(arrowShootSpeed / 2),
          });
          break;
        case YDirection.Up:
          moveEntity(arrowEntityID, {
            yVelocity: Math.floor(arrowShootSpeed / 2),
          });
          break;
        case YDirection.Down:
          moveEntity(arrowEntityID, {
            yVelocity: -Math.floor(arrowShootSpeed / 2),
          });
          break;
      }
      for (const entityID of data.entityIDs) {
        const monster: Monster<string> | null =
          state.values.monsters.get(entityID) ?? null;
        if (
          monster !== null &&
          (monster.hit === null ||
            getCurrentTime() - monster.hit.time >= knockbackDuration)
        ) {
          monster.hit = {
            direction: state.values.direction,
            time: getCurrentTime(),
          };
        }
      }
    },
    spriteInstanceID: arrowSpriteInstanceID,
    width: 16,
    x,
    y,
    zIndex: 2,
  });
  switch (state.values.direction) {
    case XDirection.Left:
      moveEntity(arrowEntityID, {
        xVelocity: -arrowShootSpeed,
      });
      break;
    case XDirection.Right:
      moveEntity(arrowEntityID, { xVelocity: arrowShootSpeed });
      break;
    case YDirection.Up:
      moveEntity(arrowEntityID, {
        yVelocity: -arrowShootSpeed,
      });
      break;
    case YDirection.Down:
      moveEntity(arrowEntityID, { yVelocity: arrowShootSpeed });
      break;
  }
  const arrows: Map<string, Arrow> = new Map(state.values.arrows);
  arrows.set(arrowEntityID, {
    entityID: arrowEntityID,
    isBouncing: false,
    shootDirection: state.values.direction,
    shotAt: getCurrentTime(),
    spriteInstanceID: arrowSpriteInstanceID,
  });
  state.setValues({ arrows });
};
