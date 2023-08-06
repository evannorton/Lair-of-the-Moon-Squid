import { Sword } from "../types/Sword";
import {
  despawnEntity,
  removeSpriteInstance,
} from "pigeon-mode-game-framework";
import { state } from "../state";

export const removeSword = (swordEntityID: string): void => {
  const sword: Sword | undefined = state.values.swords.get(swordEntityID);
  if (typeof sword === "undefined") {
    throw new Error("An attempt was made to remove a non-existent sword.");
  }
  removeSpriteInstance(sword.spriteInstanceID);
  despawnEntity(sword.entityID);
  state.values.swords.delete(swordEntityID);
};
