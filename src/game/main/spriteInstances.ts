import { PlayerAnimation, playerSpriteID } from "./sprites";
import { XDirection, YDirection } from "../../types/Direction";
import {
  createSpriteInstance,
  getInputTickHandlerGroupID,
} from "pigeon-mode-game-framework";
import { isPlayerInvincible } from "../../functions/isPlayerInvincible";
import { isPlayerShootingArrow } from "../../functions/isPlayerShootingArrow";
import { isPlayerSwingingSword } from "../../functions/isPlayerSwingingSword";
import { isPlayerTakingKnockback } from "../../functions/isPlayerTakingKnockback";
import { state } from "../../state";
import { xInputTickHandlerID, yInputTickHandlerID } from "./inputHandlers";

export const playerSpriteInstanceID: string = createSpriteInstance({
  getAnimationID: (): PlayerAnimation | null => {
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
  spriteID: playerSpriteID,
});
