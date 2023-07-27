import {
  goToLevel,
  lockCameraToEntityInstance,
  removeSpriteInstance,
  spawnEntityInstance,
} from "pigeon-mode-game-framework";
import { playerSpriteInstanceID } from "../game/main/spriteInstances";
import { state } from "../state";
import { titleSpriteInstanceID } from "../game/title/spriteInstances";

export const startMainGame = (): void => {
  state.setValues({ isAtTitle: false });
  removeSpriteInstance(titleSpriteInstanceID);
  goToLevel("test_level");
  const playerEntityInstanceID: string = spawnEntityInstance({
    entityID: "player",
    height: 16,
    layerID: "entities",
    spriteInstanceID: playerSpriteInstanceID,
    width: 16,
    x: 0,
    y: 0,
  });
  lockCameraToEntityInstance(playerEntityInstanceID);
  state.setValues({
    playerEntityInstanceID,
  });
};
