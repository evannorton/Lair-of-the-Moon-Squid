import {
  createInputPressHandler,
  createSpriteInstance,
  goToLevel,
  lockCameraToEntity,
  playSpriteInstanceAnimation,
  spawnEntityInstance,
} from "pigeon-mode-game-library";
import { playerSpriteID, titleSpriteID } from "../../sprites";
import state from "../../state";

const createTitle = (): void => {
  const titleSpriteInstanceID: string = createSpriteInstance({
    coordinates: {
      condition: (): boolean => state.values.isAtTitle,
      x: 0,
      y: 0,
    },
    spriteID: titleSpriteID,
  });
  playSpriteInstanceAnimation({
    animationID: "title",
    spriteInstanceID: titleSpriteInstanceID,
  });
  createInputPressHandler({
    condition: (): boolean => state.values.isAtTitle,
    gamepadButtons: [9],
    keys: ["Space", "Enter"],
    leftClick: true,
    onInput: (): void => {
      if (state.values.isAtTitle) {
        state.setValues({ isAtTitle: false });
      }
      goToLevel("test_level");
      lockCameraToEntity("player");
      const playerSpriteInstanceID: string = createSpriteInstance({
        spriteID: playerSpriteID,
      });
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
        playerSpriteInstanceID,
      });
    },
  });
};

export default createTitle;
