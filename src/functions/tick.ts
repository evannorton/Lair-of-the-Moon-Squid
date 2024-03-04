import { Arrow } from "../classes/Arrow";
import { Monster } from "../classes/Monster";
import { Sword } from "../classes/Sword";
import { applyKnockbackToPlayer } from "./applyKnockbackToPlayer";
import { getDefinables } from "../definables";
import { isMainGameOngoing } from "../game/main/conditions";
import { isPlayerShootingArrow } from "./isPlayerShootingArrow";
import { isPlayerSwingingSword } from "./isPlayerSwingingSword";
import { isPlayerTakingKnockback } from "./isPlayerTakingKnockback";
import { movePlayer } from "./movePlayer";
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
    for (const monster of getDefinables(Monster).values()) {
      monster.update();
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
