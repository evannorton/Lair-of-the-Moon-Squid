import { createMoblin } from "./createMoblin";
import { createPlayer } from "./createPlayer";
import {
  goToLevel,
  playAudioSource,
  stopAudioSource,
  unlockAchievement,
} from "pigeon-mode-game-framework";
import { musicVolumeChannelID } from "../game/global/volumeChannels";
import { state } from "../state";
import { testAchievementID } from "../game/global/achievements";

export const startMainGame = (): void => {
  state.setValues({ isAtTitle: false });
  stopAudioSource("title");
  playAudioSource("boss", {
    volumeChannelID: musicVolumeChannelID,
  });
  goToLevel("test_level");
  createPlayer();
  createMoblin();
  unlockAchievement(testAchievementID);
};
