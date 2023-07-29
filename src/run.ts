import { ArrowAnimation, PlayerAnimation } from "./game/main/sprites";
import { XDirection, YDirection } from "./types/Direction";
import { arrowBounceDuration } from "./constants/arrowBounceDuration";
import {
  despawnEntity,
  getCurrentTime,
  init,
  isEntityMoving,
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
      if (state.values.playerEntityID === null) {
        throw new Error(
          "An attempt was made to update the main game with no player entity instance",
        );
      }
      stopPlayer();
      if (!isShootingArrow()) {
        movePlayer();
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
          case YDirection.Up:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.ArrowUp,
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.ArrowDown,
            });
            break;
        }
      }
      // Play player walk animation
      else if (isEntityMoving(state.values.playerEntityID)) {
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
          case YDirection.Up:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.WalkUp,
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.WalkDown,
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
          case YDirection.Up:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.IdleUp,
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation(playerSpriteInstanceID, {
              animationID: PlayerAnimation.IdleDown,
            });
            break;
        }
      }
      // Monsters
      for (const [, monster] of state.values.monsters) {
        // Play monster idle animation
        switch (monster.direction) {
          case XDirection.Left:
            playSpriteInstanceAnimation(monster.spriteInstanceID, {
              animationID: monster.idleLeftAnimationID,
            });
            break;
          case XDirection.Right:
            playSpriteInstanceAnimation(monster.spriteInstanceID, {
              animationID: monster.idleRightAnimationID,
            });
            break;
          case YDirection.Up:
            playSpriteInstanceAnimation(monster.spriteInstanceID, {
              animationID: monster.idleUpAnimationID,
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation(monster.spriteInstanceID, {
              animationID: monster.idleDownAnimationID,
            });
            break;
        }
      }
      // Arrows
      for (const [arrowID, arrow] of state.values.arrows) {
        if (currentTime - arrow.shotAt > arrowBounceDuration * 3) {
          // Remove arrow
          removeSpriteInstance(arrow.spriteInstanceID);
          despawnEntity(arrow.entityID);
          state.values.arrows.delete(arrowID);
        } else {
          if (arrow.isBouncing) {
            // Play arrow bounce animation
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
            // Play arrow shoot animation
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
              case YDirection.Up:
                playSpriteInstanceAnimation(arrow.spriteInstanceID, {
                  animationID: ArrowAnimation.ShootUp,
                });
                break;
              case YDirection.Down:
                playSpriteInstanceAnimation(arrow.spriteInstanceID, {
                  animationID: ArrowAnimation.ShootDown,
                });
                break;
            }
          }
        }
      }
    }
  });
};
