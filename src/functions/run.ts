import { init } from "pigeon-mode-game-library";
import define from "./define/define";

const run = (): void => {
  define();
  init();
  console.log("Moon Squid is running!");
};

export default run;
