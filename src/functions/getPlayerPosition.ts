import { EntityPosition, getEntityPosition } from "pixel-pigeon";
import { state } from "../state";

export const getPlayerPosition = (): EntityPosition => {
  if (state.values.playerEntityID === null) {
    throw new Error(
      "Attempted to get player position with no player entity ID .",
    );
  }
  return getEntityPosition(state.values.playerEntityID);
};
