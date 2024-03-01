import { Arrow } from "../types/Arrow";
import { ArrowAnimation } from "../types/animations";
import {
  EntityPosition,
  OverlapData,
  createEntity,
  createSprite,
  getCurrentTime,
  getEntityPosition,
  moveEntity,
  stopEntity,
} from "pixel-pigeon";
import { EntityType } from "../types/EntityType";
import { Monster } from "../types/Monster";
import { XDirection, YDirection } from "../types/Direction";
import { arrowBounceDuration } from "../constants/arrowBounceDuration";
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
  const arrowSpriteID: string = createSprite({
    animationID: (): ArrowAnimation => {
      const arrow: Arrow | null =
        state.values.arrows.find(
          (arrowInState: Arrow): boolean =>
            arrowInState.spriteID === arrowSpriteID,
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
    animations: [
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 0,
            width: 16,
          },
        ],
        id: ArrowAnimation.ShootLeft,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 16,
            width: 16,
          },
        ],
        id: ArrowAnimation.ShootRight,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 32,
            width: 16,
          },
        ],
        id: ArrowAnimation.ShootUp,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 48,
            width: 16,
          },
        ],
        id: ArrowAnimation.ShootDown,
      },
      {
        frames: [
          {
            duration: arrowBounceDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 64,
            width: 16,
          },
          {
            duration: arrowBounceDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 64,
            width: 16,
          },
          {
            duration: arrowBounceDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 64,
            width: 16,
          },
        ],
        id: ArrowAnimation.BounceLeft,
      },
      {
        frames: [
          {
            duration: arrowBounceDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 80,
            width: 16,
          },
          {
            duration: arrowBounceDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 80,
            width: 16,
          },
          {
            duration: arrowBounceDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 80,
            width: 16,
          },
        ],
        id: ArrowAnimation.BounceRight,
      },
      {
        frames: [
          {
            duration: arrowBounceDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 96,
            width: 16,
          },
          {
            duration: arrowBounceDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 96,
            width: 16,
          },
          {
            duration: arrowBounceDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 96,
            width: 16,
          },
        ],
        id: ArrowAnimation.BounceUp,
      },
      {
        frames: [
          {
            duration: arrowBounceDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 112,
            width: 16,
          },
          {
            duration: arrowBounceDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 112,
            width: 16,
          },
          {
            duration: arrowBounceDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 112,
            width: 16,
          },
        ],
        id: ArrowAnimation.BounceDown,
      },
    ],
    imagePath: "arrow",
  });
  const arrowEntityID: string = createEntity({
    height: 16,
    layerID: "entities",
    levelID: "test_level",
    onOverlap: (overlapData: OverlapData): void => {
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
          if (entityCollidable.type === EntityType.Monster) {
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
    sprites: [
      {
        spriteID: arrowSpriteID,
      },
    ],
    type: "projectile",
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
    spriteID: arrowSpriteID,
  });
  state.setValues({
    arrows,
    playerShotArrowAt: getCurrentTime(),
  });
};
