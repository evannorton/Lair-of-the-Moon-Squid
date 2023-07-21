import {
  goToLevel,
  lockCameraToEntityInstance,
  spawnEntityInstance,
} from "pigeon-mode-game-framework";
import { playerSpriteInstanceID } from "../game/main/spriteInstances";
import { state } from "../state";

export const startMainGame = (): void => {
  state.setValues({ isAtTitle: false });
  goToLevel("test_level");
  lockCameraToEntityInstance("player");
  const playerEntityInstanceID: string = spawnEntityInstance({
    entityID: "player",
    height: 16,
    layerID: "entities",
    spriteInstanceID: playerSpriteInstanceID,
    width: 16,
    x: 0,
    y: 0,
  });
  state.setValues({
    playerEntityInstanceID,
  });
};
