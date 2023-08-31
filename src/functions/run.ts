import { init, onTick, playAudioSource } from "pigeon-mode-game-framework";
import { tick } from "./tick";

export const run = (): void => {
  onTick(tick);
  init()
    .then((): void => {
      console.log("Moon Squid is initialized.");
      playAudioSource("title");
    })
    .catch((error: Error): void => {
      throw error;
    });
};
