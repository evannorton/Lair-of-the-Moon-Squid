import { Sprite, init } from "pigeon-mode-game-library";

const run = (): void => {
  console.log("Hello World");

  new Sprite("title", {
    x: 0,
    y: 0,
  });

  init();
};

export default run;
