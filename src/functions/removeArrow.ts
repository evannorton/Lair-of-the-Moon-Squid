import { Arrow } from "../types/Arrow";
import {
  despawnEntity,
  removeSpriteInstance,
} from "pixel-pigeon";
import { state } from "../state";

export const removeArrow = (arrowEntityID: string): void => {
  const arrowIndex: number = state.values.arrows.findIndex(
    (arrowInState: Arrow): boolean => arrowInState.entityID === arrowEntityID,
  );
  if (arrowIndex === -1) {
    throw new Error("An attempt was made to remove a non-existent arrow.");
  }
  const arrow: Arrow = state.values.arrows[arrowIndex];
  removeSpriteInstance(arrow.spriteInstanceID);
  despawnEntity(arrow.entityID);
  state.values.arrows.splice(arrowIndex, 1);
};
