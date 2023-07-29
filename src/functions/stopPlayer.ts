import { state } from "../state";
import { stopEntity } from "pigeon-mode-game-framework";

export const stopPlayer = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error(
      "A attempt was made to stop the player with no player entity instance.",
    );
  }
  stopEntity(state.values.playerEntityID, {
    x: true,
    y: true,
  });
};
