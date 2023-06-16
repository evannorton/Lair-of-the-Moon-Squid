import { InputHandler, Sprite, State, init } from "pigeon-mode-game-library";

interface StateSchema {
  isAtTitle: boolean;
}

const defaultState: StateSchema = {
  isAtTitle: true,
};

const run = (): void => {
  console.log("Hello World");

  new Sprite("title", {
    x: 0,
    y: 0,
  });

  new InputHandler({
    leftClick: true,
    onInput: (): void => {
      state.setValues({ isAtTitle: false });
    },
  });

  const state = new State(defaultState);

  init();
};

export default run;
