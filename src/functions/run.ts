import { init } from "pigeon-mode-game-library";
import add from "./add/add";

const run = (): void => {
  add();
  init();
  console.log("Moon Squid is running!");
};

export default run;
