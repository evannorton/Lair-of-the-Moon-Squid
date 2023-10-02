import { VolumeChannel } from "../types/VolumeChannel";
import {
  initialize,
  onRun,
  onTick,
  playAudioSource,
  setPauseMenuCondition,
} from "pigeon-mode-game-framework";
import { isMainGameOngoing } from "../game/main/conditions";
import { tick } from "./tick";

export const run = (): void => {
  onRun((): void => {
    console.log("Moon Squid is running.");
    playAudioSource("title", {
      volumeChannelID: VolumeChannel.Music,
    });
  });
  onTick(tick);
  setPauseMenuCondition(isMainGameOngoing);
  initialize();
};
