import {
  EntityPosition,
  getCurrentTime,
  getEntityPosition,
  moveEntity,
  setEntityPosition,
  stopEntity,
} from "pigeon-mode-game-framework";
import { XDirection, YDirection } from "../types/Direction";
import { arrowBounceDuration } from "../constants/arrowBounceDuration";
import { isMainGameOngoing } from "../game/main/conditions";
import { isPlayerShootingArrow } from "./isPlayerShootingArrow";
import { isPlayerSwingingSword } from "./isPlayerSwingingSword";
import { isPlayerTakingKnockback } from "./isPlayerTakingKnockback";
import { knockbackDuration } from "../constants/knockbackDuration";
import { movePlayer } from "./movePlayer";
import { movementSpeed } from "../constants/movementSpeed";
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
      throw new Error("An attempt was made to tick with no player entity.");
    }
    const playerPosition: EntityPosition | null = getEntityPosition(
      state.values.playerEntityID,
    );
    if (playerPosition === null) {
      throw new Error(
        "An attempt was made to tick with no player entity position.",
      );
    }
    stopPlayer();
    if (
      !isPlayerTakingKnockback() &&
      !isPlayerSwingingSword() &&
      !isPlayerShootingArrow()
    ) {
      movePlayer();
    }
    if (isPlayerTakingKnockback()) {
      applyKnockbackToPlayer();
    }
    // Monsters
    for (const monster of state.values.monsters) {
      stopEntity(monster.entityID);
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
    }
    // Swords
    for (const sword of state.values.swords) {
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
                break;
              case 1:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x - 13,
                    y: playerPosition.y - 13,
                  },
                });
                break;
              case 2:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x - 16,
                    y: playerPosition.y,
                  },
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
                break;
              case 1:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x + 13,
                    y: playerPosition.y - 13,
                  },
                });
                break;
              case 2:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x + 16,
                    y: playerPosition.y,
                  },
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
                break;
              case 1:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x + 13,
                    y: playerPosition.y - 13,
                  },
                });
                break;
              case 2:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x,
                    y: playerPosition.y - 16,
                  },
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
                break;
              case 1:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x - 13,
                    y: playerPosition.y + 13,
                  },
                });
                break;
              case 2:
                setEntityPosition(sword.entityID, {
                  position: {
                    x: playerPosition.x,
                    y: playerPosition.y + 16,
                  },
                });
                break;
            }
            break;
        }
      }
    }
    // Arrows
    for (const arrow of state.values.arrows) {
      if (
        arrow.bouncedAt !== null &&
        currentTime - arrow.bouncedAt >= arrowBounceDuration * 3
      ) {
        removeArrow(arrow.entityID);
      }
    }
  }
};
