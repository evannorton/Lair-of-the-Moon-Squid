import { Arrow } from "../types/Arrow";
import {
  CollisionData,
  EntityPosition,
  createSpriteInstance,
  disableEntityCollision,
  getCurrentTime,
  getEntityPosition,
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
import { removeArrow } from "./removeArrow";
import { state } from "../state";

export const shootArrow = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error("An arrow input was received with no player entity.");
  }
  const playerEntityPosition: EntityPosition | null = getEntityPosition(
    state.values.playerEntityID,
  );
  if (playerEntityPosition === null) {
    throw new Error(
      "An arrow shoot was attempted with the player entity having no position.",
    );
  }
  let x: number = playerEntityPosition.x;
  let y: number = playerEntityPosition.y;
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
      if (data.entityIDs.length > 0) {
        removeArrow(arrowEntityID);
      } else if (data.map) {
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
      }
    },
    position: {
      x,
      y,
    },
    spriteInstanceID: arrowSpriteInstanceID,
    width: 16,
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
  state.setValues({
    arrows,
    shotArrowAt: getCurrentTime(),
  });
};
