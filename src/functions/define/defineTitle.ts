import { InputHandler, Sprite } from "pigeon-mode-game-library";
import state from "../../state";

const defineTitle = (): void => {
  new Sprite({
    condition: (): boolean => state.values.isAtTitle,
    imagePath: "title",
    x: 0,
    y: 0,
  });
  new InputHandler({
    condition: (): boolean => state.values.isAtTitle,
    gamepadButtons: [9],
    keys: ["Space", "Enter"],
    leftClick: true,
    onInput: (): void => {
      if (state.values.isAtTitle) {
        state.setValues({ isAtTitle: false });
      }
    },
  });
};

export default defineTitle;
