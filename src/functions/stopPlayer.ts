import { state } from "../state";
import { stopEntity } from "pixel-pigeon";

export const stopPlayer = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error(
      "A attempt was made to stop the player with no player entity.",
    );
  }
  stopEntity(state.values.playerEntityID);
};
