import {
  EntityCollidable,
  OverlapData,
  createEntity,
  createSprite,
  getCurrentTime,
  getInputTickHandlerGroupID,
  lockCameraToEntity,
} from "pixel-pigeon";
import { EntityType } from "../types/EntityType";
import { PlayerAnimation } from "../types/animations";
import { XDirection, YDirection } from "../types/Direction";
import { getOppositeDirection } from "../functions/getOppositeDirection";
import { isPlayerInvincible } from "./isPlayerInvincible";
import { isPlayerShootingArrow } from "./isPlayerShootingArrow";
import { isPlayerSwingingSword } from "./isPlayerSwingingSword";
import { isPlayerTakingKnockback } from "./isPlayerTakingKnockback";
import { playerMovementFrameDuration } from "../constants/playerMovementFrameDuration";
import { state } from "../state";
import { swordSwingDuration } from "../constants/swordSwingDuration";
import { xInputTickHandlerID, yInputTickHandlerID } from "../inputHandlers";

export const createPlayer = (): void => {
  const playerSpriteID: string = createSprite({
    animationID: (): PlayerAnimation => {
      const xDirection: XDirection | null =
        getInputTickHandlerGroupID<XDirection>(xInputTickHandlerID);
      const yDirection: YDirection | null =
        getInputTickHandlerGroupID<YDirection>(yInputTickHandlerID);
      // Play player sword animation
      if (isPlayerSwingingSword()) {
        switch (state.values.playerDirection) {
          case XDirection.Left:
            if (isPlayerInvincible()) {
              return PlayerAnimation.SwordLeftInvincible;
            }
            return PlayerAnimation.SwordLeft;
          case XDirection.Right:
            if (isPlayerInvincible()) {
              return PlayerAnimation.SwordRightInvincible;
            }
            return PlayerAnimation.SwordRight;
          case YDirection.Up:
            if (isPlayerInvincible()) {
              return PlayerAnimation.SwordUpInvincible;
            }
            return PlayerAnimation.SwordUp;
          case YDirection.Down:
            if (isPlayerInvincible()) {
              return PlayerAnimation.SwordDownInvincible;
            }
            return PlayerAnimation.SwordDown;
        }
      }
      // Play player arrow animation
      else if (isPlayerShootingArrow()) {
        switch (state.values.playerDirection) {
          case XDirection.Left:
            if (isPlayerInvincible()) {
              return PlayerAnimation.ArrowLeftInvincible;
            }
            return PlayerAnimation.ArrowLeft;
          case XDirection.Right:
            if (isPlayerInvincible()) {
              return PlayerAnimation.ArrowRightInvincible;
            }
            return PlayerAnimation.ArrowRight;
          case YDirection.Up:
            if (isPlayerInvincible()) {
              return PlayerAnimation.ArrowUpInvincible;
            }
            return PlayerAnimation.ArrowUp;
          case YDirection.Down:
            if (isPlayerInvincible()) {
              return PlayerAnimation.ArrowDownInvincible;
            }
            return PlayerAnimation.ArrowDown;
        }
      }
      // Play player knockback animation
      else if (isPlayerTakingKnockback()) {
        switch (state.values.playerDirection) {
          case XDirection.Left:
            if (isPlayerInvincible()) {
              return PlayerAnimation.IdleLeftInvincible;
            }
            return PlayerAnimation.IdleLeft;
          case XDirection.Right:
            if (isPlayerInvincible()) {
              return PlayerAnimation.IdleRightInvincible;
            }
            return PlayerAnimation.IdleRight;
          case YDirection.Up:
            if (isPlayerInvincible()) {
              return PlayerAnimation.IdleUpInvincible;
            }
            return PlayerAnimation.IdleUp;
          case YDirection.Down:
            if (isPlayerInvincible()) {
              return PlayerAnimation.IdleDownInvincible;
            }
            return PlayerAnimation.IdleDown;
        }
      }
      // Play player walk animation
      else if (xDirection !== null || yDirection !== null) {
        switch (state.values.playerDirection) {
          case XDirection.Left:
            if (isPlayerInvincible()) {
              return PlayerAnimation.WalkLeftInvincible;
            }
            return PlayerAnimation.WalkLeft;
          case XDirection.Right:
            if (isPlayerInvincible()) {
              return PlayerAnimation.WalkRightInvincible;
            }
            return PlayerAnimation.WalkRight;
          case YDirection.Up:
            if (isPlayerInvincible()) {
              return PlayerAnimation.WalkUpInvincible;
            }
            return PlayerAnimation.WalkUp;
          case YDirection.Down:
            if (isPlayerInvincible()) {
              return PlayerAnimation.WalkDownInvincible;
            }
            return PlayerAnimation.WalkDown;
        }
      }
      // Play player idle animation
      else {
        switch (state.values.playerDirection) {
          case XDirection.Left:
            if (isPlayerInvincible()) {
              return PlayerAnimation.IdleLeftInvincible;
            }
            return PlayerAnimation.IdleLeft;
          case XDirection.Right:
            if (isPlayerInvincible()) {
              return PlayerAnimation.IdleRightInvincible;
            }
            return PlayerAnimation.IdleRight;
          case YDirection.Up:
            if (isPlayerInvincible()) {
              return PlayerAnimation.IdleUpInvincible;
            }
            return PlayerAnimation.IdleUp;
          case YDirection.Down:
            if (isPlayerInvincible()) {
              return PlayerAnimation.IdleDownInvincible;
            }
            return PlayerAnimation.IdleDown;
        }
      }
    },
    animations: [
      // Regular
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
        id: PlayerAnimation.IdleLeft,
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
        id: PlayerAnimation.IdleRight,
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
        id: PlayerAnimation.IdleUp,
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
        id: PlayerAnimation.IdleDown,
      },
      {
        frames: [
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 64,
            width: 16,
          },
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 64,
            width: 16,
          },
        ],
        id: PlayerAnimation.WalkLeft,
      },
      {
        frames: [
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 80,
            width: 16,
          },
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 80,
            width: 16,
          },
        ],
        id: PlayerAnimation.WalkRight,
      },
      {
        frames: [
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 96,
            width: 16,
          },
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 96,
            width: 16,
          },
        ],
        id: PlayerAnimation.WalkUp,
      },
      {
        frames: [
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 112,
            width: 16,
          },
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 112,
            width: 16,
          },
        ],
        id: PlayerAnimation.WalkDown,
      },
      {
        frames: [
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 128,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 128,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 128,
            width: 16,
          },
        ],
        id: PlayerAnimation.SwordLeft,
      },
      {
        frames: [
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 144,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 144,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 144,
            width: 16,
          },
        ],
        id: PlayerAnimation.SwordRight,
      },
      {
        frames: [
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 160,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 160,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 160,
            width: 16,
          },
        ],
        id: PlayerAnimation.SwordUp,
      },
      {
        frames: [
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 176,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 176,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 176,
            width: 16,
          },
        ],
        id: PlayerAnimation.SwordDown,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 192,
            width: 16,
          },
        ],
        id: PlayerAnimation.ArrowLeft,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 208,
            width: 16,
          },
        ],
        id: PlayerAnimation.ArrowRight,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 224,
            width: 16,
          },
        ],
        id: PlayerAnimation.ArrowUp,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 240,
            width: 16,
          },
        ],
        id: PlayerAnimation.ArrowDown,
      },
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
        id: PlayerAnimation.KnockbackLeft,
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
        id: PlayerAnimation.KnockbackRight,
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
        id: PlayerAnimation.KnockbackUp,
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
        id: PlayerAnimation.KnockbackDown,
      },
      // Invincible
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 320,
            width: 16,
          },
        ],
        id: PlayerAnimation.IdleLeftInvincible,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 336,
            width: 16,
          },
        ],
        id: PlayerAnimation.IdleRightInvincible,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 352,
            width: 16,
          },
        ],
        id: PlayerAnimation.IdleUpInvincible,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 368,
            width: 16,
          },
        ],
        id: PlayerAnimation.IdleDownInvincible,
      },
      {
        frames: [
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 384,
            width: 16,
          },
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 384,
            width: 16,
          },
        ],
        id: PlayerAnimation.WalkLeftInvincible,
      },
      {
        frames: [
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 400,
            width: 16,
          },
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 400,
            width: 16,
          },
        ],
        id: PlayerAnimation.WalkRightInvincible,
      },
      {
        frames: [
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 416,
            width: 16,
          },
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 416,
            width: 16,
          },
        ],
        id: PlayerAnimation.WalkUpInvincible,
      },
      {
        frames: [
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 432,
            width: 16,
          },
          {
            duration: playerMovementFrameDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 432,
            width: 16,
          },
        ],
        id: PlayerAnimation.WalkDownInvincible,
      },
      {
        frames: [
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 448,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 448,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 448,
            width: 16,
          },
        ],
        id: PlayerAnimation.SwordLeftInvincible,
      },
      {
        frames: [
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 464,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 464,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 464,
            width: 16,
          },
        ],
        id: PlayerAnimation.SwordRightInvincible,
      },
      {
        frames: [
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 480,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 480,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 480,
            width: 16,
          },
        ],
        id: PlayerAnimation.SwordUpInvincible,
      },
      {
        frames: [
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 496,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 496,
            width: 16,
          },
          {
            duration: Math.floor(swordSwingDuration / 3),
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 496,
            width: 16,
          },
        ],
        id: PlayerAnimation.SwordDownInvincible,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 512,
            width: 16,
          },
        ],
        id: PlayerAnimation.ArrowLeftInvincible,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 528,
            width: 16,
          },
        ],
        id: PlayerAnimation.ArrowRightInvincible,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 544,
            width: 16,
          },
        ],
        id: PlayerAnimation.ArrowUpInvincible,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 560,
            width: 16,
          },
        ],
        id: PlayerAnimation.ArrowDownInvincible,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 576,
            width: 16,
          },
        ],
        id: PlayerAnimation.KnockbackLeftInvincible,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 592,
            width: 16,
          },
        ],
        id: PlayerAnimation.KnockbackRightInvincible,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 608,
            width: 16,
          },
        ],
        id: PlayerAnimation.KnockbackUpInvincible,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 624,
            width: 16,
          },
        ],
        id: PlayerAnimation.KnockbackDownInvincible,
      },
    ],
    imagePath: "player",
  });
  const playerEntityID: string = createEntity({
    collidesWithMap: true,
    height: 16,
    layerID: "entities",
    levelID: "test_level",
    onOverlap: (overlapData: OverlapData): void => {
      if (overlapData.entityCollidables.length > 0) {
        const entityCollidable: EntityCollidable =
          overlapData.entityCollidables[0];
        if (entityCollidable.type === EntityType.Monster) {
          if (!isPlayerInvincible()) {
            state.setValues({
              playerHit: {
                direction: getOppositeDirection(state.values.playerDirection),
                time: getCurrentTime(),
              },
            });
          }
        }
      }
    },
    position: {
      x: 8 * 16,
      y: 8 * 16,
    },
    sprites: [
      {
        spriteID: playerSpriteID,
      },
    ],
    type: EntityType.Player,
    width: 16,
    zIndex: 1,
  });
  lockCameraToEntity(playerEntityID);
  state.setValues({
    playerEntityID,
  });
};
