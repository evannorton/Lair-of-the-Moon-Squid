import { init } from "pigeon-mode-game-library";
import create from "./create/create";

const run = (): void => {
  create();
  init();
  console.log("Moon Squid is running!");
};

export default run;
