import { Arrow } from "../types/Arrow";
import {
  despawnEntity,
  removeSpriteInstance,
} from "pigeon-mode-game-framework";
import { state } from "../state";

export const removeArrow = (arrowEntityID: string): void => {
  const arrow: Arrow | undefined = state.values.arrows.get(arrowEntityID);
  if (typeof arrow === "undefined") {
    throw new Error("An attempt was made to remove a non-existent arrow.");
  }
  removeSpriteInstance(arrow.spriteInstanceID);
  despawnEntity(arrow.entityID);
  state.values.arrows.delete(arrowEntityID);
};
