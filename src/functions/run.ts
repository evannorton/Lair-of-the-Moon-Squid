import {
  init,
  onTick,
  playAudioSource,
  setPauseMenuCondition,
} from "pigeon-mode-game-framework";
import { isMainGameOngoing } from "../game/main/conditions";
import { tick } from "./tick";

export const run = (): void => {
  onTick(tick);
  setPauseMenuCondition(isMainGameOngoing);
  init()
    .then((): void => {
      console.log("Moon Squid is initialized.");
      playAudioSource("title");
    })
    .catch((error: Error): void => {
      throw error;
    });
};
