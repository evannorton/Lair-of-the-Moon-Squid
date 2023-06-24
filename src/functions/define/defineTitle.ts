import { InputHandler, Sprite } from "pigeon-mode-game-library";
import state from "../../state";

const defineTitle = (): void => {
  new Sprite({
    imagePath: "title",
    x: 0,
    y: 0,
    condition: (): boolean => state.values.isAtTitle,
  });

  new InputHandler({
    leftClick: true,
    keys: ["Space", "Enter"],
    gamepadButtons: [9],
    condition: (): boolean => state.values.isAtTitle,
    onInput: (): void => {
      if (state.values.isAtTitle) {
        state.setValues({ isAtTitle: false });
      }
    },
  });
};

export default defineTitle;
