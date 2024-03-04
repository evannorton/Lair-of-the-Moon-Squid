import { TitleAnimation } from "../types/animations";
import {
  createSprite,
  initialize,
  onRun,
  onTick,
  playAudioSource,
  setPauseMenuCondition,
} from "pixel-pigeon";
import { isAtTitle, isMainGameOngoing } from "../conditions";
import { musicVolumeChannelID } from "../volumeChannels";
import { tick } from "./tick";

export const run = (): void => {
  onRun((): void => {
    console.log("Moon Squid is running.");
    createSprite({
      animationID: TitleAnimation.Title,
      animations: [
        {
          frames: [
            {
              height: 144,
              sourceHeight: 144,
              sourceWidth: 160,
              sourceX: 0,
              sourceY: 0,
              width: 160,
            },
          ],
          id: TitleAnimation.Title,
        },
      ],
      coordinates: {
        condition: isAtTitle,
        x: 0,
        y: 0,
      },
      imagePath: "title",
    });
    playAudioSource("title", {
      volumeChannelID: musicVolumeChannelID,
    });
  });
  onTick(tick);
  setPauseMenuCondition(isMainGameOngoing);
  initialize();
};
