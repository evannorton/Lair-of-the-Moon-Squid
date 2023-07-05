import {
  createInputPressHandler,
  createSprite,
  goToLevel,
  lockCameraToEntity,
} from "pigeon-mode-game-library";
import state from "../../state";

const createTitle = (): void => {
  createSprite<"title">({
    animations: [
      {
        frames: [
          {
            height: 144,
            sourceHeight: 144,
            sourceWidth: 160,
            sourceX: 0,
            sourceY: 0,
            width: 160,
          },
        ],
        id: "title",
      },
    ],
    condition: (): boolean => state.values.isAtTitle,
    defaultAnimationID: "title",
    imagePath: "title",
    x: 0,
    y: 0,
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
    },
  });
};

export default createTitle;
