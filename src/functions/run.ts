import { InputHandler, Sprite, init } from "pigeon-mode-game-library";
import state from "../state";

const run = (): void => {
  console.log("Hello World");

  new Sprite("title", {
    condition: (): boolean => state.values.isAtTitle,
    x: 0,
    y: 0,
  });

  new InputHandler({
    keys: ["Space", "Enter"],
    leftClick: true,
    condition: (): boolean => state.values.isAtTitle,
    onInput: (): void => {
      if (state.values.isAtTitle) {
        state.setValues({ isAtTitle: false });
      }
    },
  });

  init();
};

export default run;
