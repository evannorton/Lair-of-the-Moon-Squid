import { Arrow } from "../classes/Arrow";
import { Sword } from "../classes/Sword";
import { XDirection, YDirection } from "../types/Direction";
import { applyKnockbackToPlayer } from "./applyKnockbackToPlayer";
import { getDefinables } from "../definables";
import { isEntityPathing, moveEntity, stopEntity } from "pixel-pigeon";
import { isMainGameOngoing } from "../game/main/conditions";
import { isMonsterTakingKnockback } from "./isMonsterTakingKnockback";
import { isPlayerShootingArrow } from "./isPlayerShootingArrow";
import { isPlayerSwingingSword } from "./isPlayerSwingingSword";
import { isPlayerTakingKnockback } from "./isPlayerTakingKnockback";
import { movePlayer } from "./movePlayer";
import { movementSpeed } from "../constants/movementSpeed";
import { state } from "../state";
import { stopPlayer } from "./stopPlayer";

export const tick = (): void => {
  if (isMainGameOngoing()) {
    if (state.values.playerEntityID === null) {
      throw new Error("An attempt was made to tick with no player entity.");
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
    for (const sword of getDefinables(Sword).values()) {
      sword.update();
    }
    // Arrows
    for (const arrow of getDefinables(Arrow).values()) {
      arrow.update();
    }
  }
};
