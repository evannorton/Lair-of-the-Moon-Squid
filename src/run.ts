import { ArrowAnimation, PlayerAnimation } from "./game/main/sprites";
import { XDirection, YDirection } from "./types/Direction";
import { arrowBounceDuration } from "./constants/arrowBounceDuration";
import {
  despawnEntityInstance,
  getCurrentTime,
  init,
  isEntityInstanceMoving,
  onTick,
  playSpriteInstanceAnimation,
  removeSpriteInstance,
} from "pigeon-mode-game-framework";
import { isMainGameOngoing } from "./game/main/conditions";
import { isShootingArrow } from "./functions/isShootingArrow";
import { movePlayer } from "./functions/movePlayer";
import { playerSpriteInstanceID } from "./game/main/spriteInstances";
import { state } from "./state";
import { stopPlayer } from "./functions/stopPlayer";
import { titleSpriteInstanceID } from "./game/title/spriteInstances";

export const run = (): void => {
  console.log("Moon Squid is running!");
  init();
  playSpriteInstanceAnimation(titleSpriteInstanceID, {
    animationID: "title",
  });
  onTick((): void => {
    const currentTime: number = getCurrentTime();
    if (isMainGameOngoing()) {
      if (state.values.playerEntityInstanceID === null) {
        throw new Error(
          "An attempt was made to update the main game with no player entity instance",
        );
      }
      stopPlayer();
      if (!isShootingArrow()) {
        movePlayer();
      }
      for (const [arrowEntityInstanceID, arrow] of state.values.arrows) {
        if (currentTime - arrow.shotAt > arrowBounceDuration * 3) {
          removeSpriteInstance(arrow.spriteInstanceID);
          despawnEntityInstance(arrowEntityInstanceID);
          state.values.arrows.delete(arrowEntityInstanceID);
        }
      }
      // Play player arrow animation
      if (isShootingArrow()) {
        switch (state.values.direction) {
          case XDirection.Left:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.ArrowLeft,
            });
            break;
          case XDirection.Right:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.ArrowRight,
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.ArrowDown,
            });
            break;
          case YDirection.Up:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.ArrowUp,
            });
            break;
        }
      }
      // Play player walk animation
      else if (isEntityInstanceMoving(state.values.playerEntityInstanceID)) {
        switch (state.values.direction) {
          case XDirection.Left:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.WalkLeft,
            });
            break;
          case XDirection.Right:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.WalkRight,
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.WalkDown,
            });
            break;
          case YDirection.Up:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.WalkUp,
            });
            break;
        }
      }
      // Play player idle animation
      else {
        switch (state.values.direction) {
          case XDirection.Left:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.IdleLeft,
            });
            break;
          case XDirection.Right:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.IdleRight,
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.IdleDown,
            });
            break;
          case YDirection.Up:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.IdleUp,
            });
            break;
        }
      }
      // Play arrow animations
      for (const [, arrow] of state.values.arrows) {
        if (arrow.isBouncing) {
          switch (arrow.shootDirection) {
            case XDirection.Left:
              playSpriteInstanceAnimation(arrow.spriteInstanceID, {
                animationID: ArrowAnimation.BounceRight,
              });
              break;
            case XDirection.Right:
              playSpriteInstanceAnimation(arrow.spriteInstanceID, {
                animationID: ArrowAnimation.BounceLeft,
              });
              break;
            case YDirection.Up:
              playSpriteInstanceAnimation(arrow.spriteInstanceID, {
                animationID: ArrowAnimation.BounceDown,
              });
              break;
            case YDirection.Down:
              playSpriteInstanceAnimation(arrow.spriteInstanceID, {
                animationID: ArrowAnimation.BounceUp,
              });
              break;
          }
        } else {
          switch (arrow.shootDirection) {
            case XDirection.Left:
              playSpriteInstanceAnimation(arrow.spriteInstanceID, {
                animationID: ArrowAnimation.ShootLeft,
              });
              break;
            case XDirection.Right:
              playSpriteInstanceAnimation(arrow.spriteInstanceID, {
                animationID: ArrowAnimation.ShootRight,
              });
              break;
            case YDirection.Down:
              playSpriteInstanceAnimation(arrow.spriteInstanceID, {
                animationID: ArrowAnimation.ShootDown,
              });
              break;
            case YDirection.Up:
              playSpriteInstanceAnimation(arrow.spriteInstanceID, {
                animationID: ArrowAnimation.ShootUp,
              });
              break;
          }
        }
      }
    }
  });
};
