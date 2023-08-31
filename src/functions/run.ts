import { init, onTick } from "pigeon-mode-game-framework";
import { tick } from "./tick";

export const run = (): void => {
  console.log("Moon Squid is running!");
  init();
  onTick(tick);
};
