import {
  EntityPosition,
  getCurrentTime,
  getEntityPosition,
  isEntityPathing,
  moveEntity,
  setEntityPosition,
  stopEntity,
} from "pixel-pigeon";
import { XDirection, YDirection } from "../types/Direction";
import { applyKnockbackToPlayer } from "./applyKnockbackToPlayer";
import { arrowBounceDuration } from "../constants/arrowBounceDuration";
import { isMainGameOngoing } from "../game/main/conditions";
import { isMonsterTakingKnockback } from "./isMonsterTakingKnockback";
import { isPlayerShootingArrow } from "./isPlayerShootingArrow";
import { isPlayerSwingingSword } from "./isPlayerSwingingSword";
import { isPlayerTakingKnockback } from "./isPlayerTakingKnockback";
import { movePlayer } from "./movePlayer";
import { movementSpeed } from "../constants/movementSpeed";
import { removeArrow } from "./removeArrow";
import { removeSword } from "./removeSword";
import { state } from "../state";
import { stopPlayer } from "./stopPlayer";
import { swordSwingDuration } from "../constants/swordSwingDuration";

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
      if (isMonsterTakingKnockback(monster)) {
        stopEntity(monster.entityID);
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
      } else {
        if (!isEntityPathing(monster.entityID)) {
          stopEntity(monster.entityID);
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
