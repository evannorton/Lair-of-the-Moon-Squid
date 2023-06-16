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
    leftClick: true,
    condition: (): boolean => state.values.isAtTitle,
    onInput: (): void => {
      if (state.values.isAtTitle) {
        console.log("update state");
        state.setValues({ isAtTitle: false });
      }
    },
  });

  init();
};

export default run;
