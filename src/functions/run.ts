import {
  initialize,
  onRun,
  onTick,
  playAudioSource,
  setPauseMenuCondition,
} from "pigeon-mode-game-framework";
import { isMainGameOngoing } from "../game/main/conditions";
import { tick } from "./tick";
import { musicVolumeChannelID } from "../game/global/volumeChannels";

export const run = (): void => {
  onRun((): void => {
    console.log("Moon Squid is running.");
    playAudioSource("title", {
      volumeChannelID: musicVolumeChannelID,
    });
  });
  onTick(tick);
  setPauseMenuCondition(isMainGameOngoing);
  initialize();
};
