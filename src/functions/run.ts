import { createGameOverHUD } from "./createGameOverHUD";
import { createMainHUD } from "./createMainHUD";
import { createTitleHUD } from "./createTitleHUD";
import { initialize, onRun, onTick, setPauseMenuCondition } from "pixel-pigeon";
import { isMainGameOngoing } from "../conditions";
import { startTitle } from "./startTitle";
import { tick } from "./tick";

export const run = (): void => {
  onRun((): void => {
    console.log("Moon Squid is running.");
    createTitleHUD();
    createMainHUD();
    createGameOverHUD();
    startTitle();
  });
  onTick(tick);
  setPauseMenuCondition(isMainGameOngoing);
  initialize();
};
