import { Arrow } from "../types/Arrow";
import { ArrowAnimation, arrowSpriteID } from "../game/main/sprites";
import { CollisionLayer } from "../types/CollisionLayer";
import {
  EntityPosition,
  OverlapData,
  createSpriteInstance,
  getCurrentTime,
  getEntityPosition,
  moveEntity,
  spawnEntity,
  stopEntity,
} from "pigeon-mode-game-framework";
import { Monster } from "../types/Monster";
import { XDirection, YDirection } from "../types/Direction";
import { arrowShootSpeed } from "../constants/arrowShootSpeed";
import { isMonsterInvincible } from "./isMonsterInvincible";
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
  switch (state.values.playerDirection) {
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
    getAnimationID: (): ArrowAnimation | null => {
      const arrow: Arrow | null =
        state.values.arrows.find(
          (arrowInState: Arrow): boolean =>
            arrowInState.spriteInstanceID === arrowSpriteInstanceID,
        ) ?? null;
      if (arrow === null) {
        throw new Error(
          "An Arrow collided with an entity, but the Arrow could not be found in state.",
        );
      }
      if (arrow.bouncedAt !== null) {
        // Play arrow bounce animation
        switch (arrow.shootDirection) {
          case XDirection.Left:
            return ArrowAnimation.BounceRight;
          case XDirection.Right:
            return ArrowAnimation.BounceLeft;
          case YDirection.Up:
            return ArrowAnimation.BounceDown;
          case YDirection.Down:
            return ArrowAnimation.BounceUp;
        }
      } else {
        // Play arrow shoot animation
        switch (arrow.shootDirection) {
          case XDirection.Left:
            return ArrowAnimation.ShootLeft;
          case XDirection.Right:
            return ArrowAnimation.ShootRight;
          case YDirection.Up:
            return ArrowAnimation.ShootUp;
          case YDirection.Down:
            return ArrowAnimation.ShootDown;
        }
      }
    },
    spriteID: arrowSpriteID,
  });
  const arrowEntityID: string = spawnEntity<CollisionLayer>({
    height: 16,
    layerID: "entities",
    onOverlap: (overlapData: OverlapData<CollisionLayer>): void => {
      const arrow: Arrow | null =
        state.values.arrows.find(
          (arrowInState: Arrow): boolean =>
            arrowInState.entityID === arrowEntityID,
        ) ?? null;
      if (arrow === null) {
        throw new Error(
          "An arrow overlapped, but the arrow could not be found in state.",
        );
      }
      if (arrow.bouncedAt === null) {
        let hitCount: number = 0;
        for (const entityCollidable of overlapData.entityCollidables) {
          const monster: Monster<string> | null =
            state.values.monsters.find(
              (monsterInState: Monster<string>): boolean =>
                monsterInState.entityID === entityCollidable.entityID,
            ) ?? null;
          if (monster !== null && !isMonsterInvincible(monster)) {
            monster.hit = {
              direction: state.values.playerDirection,
              time: getCurrentTime(),
            };
            hitCount++;
          }
        }
        if (hitCount > 0) {
          removeArrow(arrowEntityID);
        } else if (overlapData.map) {
          stopEntity(arrowEntityID);
          arrow.bouncedAt = getCurrentTime();
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
  switch (state.values.playerDirection) {
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
  const arrows: Arrow[] = [...state.values.arrows];
  arrows.push({
    bouncedAt: null,
    entityID: arrowEntityID,
    shootDirection: state.values.playerDirection,
    spriteInstanceID: arrowSpriteInstanceID,
  });
  state.setValues({
    arrows,
    playerShotArrowAt: getCurrentTime(),
  });
};
