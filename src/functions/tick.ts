import {
  ArrowAnimation,
  PlayerAnimation,
  SwordAnimation,
} from "../game/main/sprites";
import {
  EntityPosition,
  getCurrentTime,
  getEntityPosition,
  isEntityMoving,
  moveEntity,
  playSpriteInstanceAnimation,
  setEntityPosition,
  stopEntity,
} from "pigeon-mode-game-framework";
import { XDirection, YDirection } from "../types/Direction";
import { arrowBounceDuration } from "../constants/arrowBounceDuration";
import { isMainGameOngoing } from "../game/main/conditions";
import { isShootingArrow } from "./isShootingArrow";
import { isSwingingSword } from "./isSwingingSword";
import { isTakingKnockback } from "./isTakingKnockback";
import { knockbackDuration } from "../constants/knockbackDuration";
import { movePlayer } from "./movePlayer";
import { movementSpeed } from "../constants/movementSpeed";
import { playerSpriteInstanceID } from "../game/main/spriteInstances";
import { removeArrow } from "./removeArrow";
import { removeSword } from "./removeSword";
import { state } from "../state";
import { stopPlayer } from "./stopPlayer";
import { swordSwingDuration } from "../constants/swordSwingDuration";
import applyKnockbackToPlayer from "./applyKnockbackToPlayer";

export const tick = (): void => {
  const currentTime: number = getCurrentTime();
  if (isMainGameOngoing()) {
    if (state.values.playerEntityID === null) {
      throw new Error(
        "An attempt was made to tick with no player entity instance",
      );
    }
    const playerPosition: EntityPosition | null = getEntityPosition(
      state.values.playerEntityID,
    );
    if (playerPosition === null) {
      throw new Error(
        "An attempt was made to tick with no player entity position",
      );
    }
    stopPlayer();
    if (!isTakingKnockback() && !isSwingingSword() && !isShootingArrow()) {
      movePlayer();
    }
    if (isTakingKnockback()) {
      applyKnockbackToPlayer();
    }
    // Play player sword animation
    if (isSwingingSword()) {
      switch (state.values.playerDirection) {
        case XDirection.Left:
          playSpriteInstanceAnimation(playerSpriteInstanceID, {
            animationID: PlayerAnimation.SwordLeft,
          });
          break;
        case XDirection.Right:
          playSpriteInstanceAnimation(playerSpriteInstanceID, {
            animationID: PlayerAnimation.SwordRight,
          });
          break;
        case YDirection.Up:
          playSpriteInstanceAnimation(playerSpriteInstanceID, {
            animationID: PlayerAnimation.SwordUp,
          });
          break;
        case YDirection.Down:
          playSpriteInstanceAnimation(playerSpriteInstanceID, {
            animationID: PlayerAnimation.SwordDown,
          });
          break;
      }
    }
    // Play player arrow animation
    else if (isShootingArrow()) {
      switch (state.values.playerDirection) {
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
    // Play player knockback animation
    else if (isTakingKnockback()) {
      switch (state.values.playerDirection) {
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
    // Play player walk animation
    else if (isEntityMoving(state.values.playerEntityID)) {
      switch (state.values.playerDirection) {
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
      switch (state.values.playerDirection) {
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
      stopEntity(monster.entityID, {
        x: true,
        y: true,
      });
      const sinceHit: number | null =
        monster.hit !== null ? getCurrentTime() - monster.hit.time : null;
      if (sinceHit !== null && sinceHit < knockbackDuration) {
        switch (monster.hit?.direction) {
          case XDirection.Left:
            moveEntity(monster.entityID, {
              xVelocity: -movementSpeed,
            });
            break;
          case XDirection.Right:
            moveEntity(monster.entityID, {
              xVelocity: movementSpeed,
            });
            break;
          case YDirection.Up:
            moveEntity(monster.entityID, {
              yVelocity: -movementSpeed,
            });
            break;
          case YDirection.Down:
            moveEntity(monster.entityID, {
              yVelocity: movementSpeed,
            });
            break;
        }
      }
      // Play monster idle damaged animation
      if (
        monster.hit !== null &&
        getCurrentTime() - monster.hit.time < knockbackDuration
      ) {
        switch (monster.direction) {
          case XDirection.Left:
            playSpriteInstanceAnimation(monster.spriteInstanceID, {
              animationID: monster.idleLeftDamagedAnimationID,
            });
            break;
          case XDirection.Right:
            playSpriteInstanceAnimation(monster.spriteInstanceID, {
              animationID: monster.idleRightDamagedAnimationID,
            });
            break;
          case YDirection.Up:
            playSpriteInstanceAnimation(monster.spriteInstanceID, {
              animationID: monster.idleUpDamagedAnimationID,
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation(monster.spriteInstanceID, {
              animationID: monster.idleDownDamagedAnimationID,
            });
            break;
        }
      }
      // Play monster idle animation
      else {
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
    }
    // Swords
    for (const [, sword] of state.values.swords) {
      if (currentTime - sword.swungAt >= swordSwingDuration) {
        removeSword(sword.entityID);
      } else {
        const diff: number = getCurrentTime() - sword.swungAt;
        const frame: number = Math.floor((diff / swordSwingDuration) * 3);
        switch (state.values.playerDirection) {
          case XDirection.Left:
            switch (frame) {
              case 0:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x,
                    y: playerPosition.y - 16,
                  },
                });
                playSpriteInstanceAnimation(sword.spriteInstanceID, {
                  animationID: SwordAnimation.SwingLeft1,
                });
                break;
              case 1:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x - 13,
                    y: playerPosition.y - 13,
                  },
                });
                playSpriteInstanceAnimation(sword.spriteInstanceID, {
                  animationID: SwordAnimation.SwingLeft2,
                });
                break;
              case 2:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x - 16,
                    y: playerPosition.y,
                  },
                });
                playSpriteInstanceAnimation(sword.spriteInstanceID, {
                  animationID: SwordAnimation.SwingLeft3,
                });
                break;
            }
            break;
          case XDirection.Right:
            switch (frame) {
              case 0:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x,
                    y: playerPosition.y - 16,
                  },
                });
                playSpriteInstanceAnimation(sword.spriteInstanceID, {
                  animationID: SwordAnimation.SwingRight1,
                });
                break;
              case 1:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x + 13,
                    y: playerPosition.y - 13,
                  },
                });
                playSpriteInstanceAnimation(sword.spriteInstanceID, {
                  animationID: SwordAnimation.SwingRight2,
                });
                break;
              case 2:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x + 16,
                    y: playerPosition.y,
                  },
                });
                playSpriteInstanceAnimation(sword.spriteInstanceID, {
                  animationID: SwordAnimation.SwingRight3,
                });
                break;
            }
            break;
          case YDirection.Up:
            switch (frame) {
              case 0:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x + 16,
                    y: playerPosition.y,
                  },
                });
                playSpriteInstanceAnimation(sword.spriteInstanceID, {
                  animationID: SwordAnimation.SwingUp1,
                });
                break;
              case 1:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x + 13,
                    y: playerPosition.y - 13,
                  },
                });
                playSpriteInstanceAnimation(sword.spriteInstanceID, {
                  animationID: SwordAnimation.SwingUp2,
                });
                break;
              case 2:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x,
                    y: playerPosition.y - 16,
                  },
                });
                playSpriteInstanceAnimation(sword.spriteInstanceID, {
                  animationID: SwordAnimation.SwingUp3,
                });
                break;
            }
            break;
          case YDirection.Down:
            switch (frame) {
              case 0:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x - 16,
                    y: playerPosition.y,
                  },
                });
                playSpriteInstanceAnimation(sword.spriteInstanceID, {
                  animationID: SwordAnimation.SwingDown1,
                });
                break;
              case 1:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x - 13,
                    y: playerPosition.y + 13,
                  },
                });
                playSpriteInstanceAnimation(sword.spriteInstanceID, {
                  animationID: SwordAnimation.SwingDown2,
                });
                break;
              case 2:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x,
                    y: playerPosition.y + 16,
                  },
                });
                playSpriteInstanceAnimation(sword.spriteInstanceID, {
                  animationID: SwordAnimation.SwingDown3,
                });
                break;
            }
            break;
        }
      }
    }
    // Arrows
    for (const [, arrow] of state.values.arrows) {
      if (
        arrow.bouncedAt !== null &&
        currentTime - arrow.bouncedAt >= arrowBounceDuration * 3
      ) {
        removeArrow(arrow.entityID);
      } else {
        if (arrow.bouncedAt !== null) {
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
};
