import {
  InputPressHandler,
  Sprite,
  goToLevel,
  lockCameraToEntity,
} from "pigeon-mode-game-library";
import state from "../../state";

const defineTitle = (): void => {
  new Sprite({
    condition: (): boolean => state.values.isAtTitle,
    imagePath: "title",
    x: 0,
    y: 0,
  });
  new InputPressHandler({
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

export default defineTitle;
