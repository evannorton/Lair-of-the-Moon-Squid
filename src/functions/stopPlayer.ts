import { stopEntityInstance } from "pigeon-mode-game-library";
import state from "../state";

const stopPlayer = (): void => {
  if (state.values.playerEntityInstanceID === null) {
    throw new Error(
      "A attempt was made to stop the player with no player entity instance."
    );
  }
  stopEntityInstance(state.values.playerEntityInstanceID, {
    x: true,
    y: true,
  });
};

export default stopPlayer;
