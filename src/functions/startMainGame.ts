import { createMoblin } from "./createMoblin";
import { createPlayer } from "./createPlayer";
import {
  goToLevel,
  playAudioSource,
  stopAudioSource,
  unlockAchievement,
} from "pixel-pigeon";
import { musicVolumeChannelID } from "../game/global/volumeChannels";
import { state } from "../state";
import {
  testAchievement1ID,
  testAchievement2ID,
} from "../game/global/achievements";

export const startMainGame = (): void => {
  state.setValues({ isAtTitle: false });
  stopAudioSource("title");
  playAudioSource("boss", {
    volumeChannelID: musicVolumeChannelID,
  });
  goToLevel("test_level");
  createPlayer();
  createMoblin();
  unlockAchievement(testAchievement1ID);
  unlockAchievement(testAchievement2ID);
};
