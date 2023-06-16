import { InputHandler, Sprite, init } from "pigeon-mode-game-library";

const run = (): void => {
  console.log("Hello World");

  new Sprite("title", {
    x: 0,
    y: 0,
  });

  new InputHandler({
    leftClick: true,
    onInput: (): void => {
      console.log("Advance main menu");
    },
  });

  init();
};

export default run;
