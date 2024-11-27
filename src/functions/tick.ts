import { Arrow } from "../classes/Arrow";
import { Monster } from "../classes/Monster";
import { Sword } from "../classes/Sword";
import { applyKnockbackToPlayer } from "./applyKnockbackToPlayer";
import { getCurrentTime } from "pixel-pigeon";
import { getDefinables } from "definables";
import { isMainGameOngoing } from "../conditions";
import { isPlayerShootingArrow } from "./isPlayerShootingArrow";
import { isPlayerSwingingSword } from "./isPlayerSwingingSword";
import { isPlayerTakingKnockback } from "./isPlayerTakingKnockback";
import { movePlayer } from "./movePlayer";
import { playerMPRegenDuration } from "../constants/playerMPRegenDuration";
import { playerMaxMP } from "../constants/playerMaxMP";
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
    if (
      state.values.playerMP < playerMaxMP &&
      (state.values.playerMPRestoredAt === null ||
        getCurrentTime() - state.values.playerMPRestoredAt >=
          playerMPRegenDuration) &&
      (state.values.playerMPReducedFromMaxAt === null ||
        getCurrentTime() - state.values.playerMPReducedFromMaxAt >=
          playerMPRegenDuration)
    ) {
      state.setValues({
        playerMP: Math.min(state.values.playerMP + 1, playerMaxMP),
        playerMPRestoredAt: getCurrentTime(),
      });
    }
  }
};
