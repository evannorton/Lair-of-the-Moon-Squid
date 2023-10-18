import {
  initialize,
  onRun,
  onTick,
  playAudioSource,
  setPauseMenuCondition,
} from "pixel-pigeon";
import { isMainGameOngoing } from "../game/main/conditions";
import { musicVolumeChannelID } from "../game/global/volumeChannels";
import { tick } from "./tick";

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
