import { createMoblin } from "./createMoblin";
import { createPlayer } from "./createPlayer";
import {
  goToLevel,
  playAudioSource,
  stopAudioSource,
} from "pigeon-mode-game-framework";
import { state } from "../state";
import { musicVolumeChannelID } from "../game/global/volumeChannels";

export const startMainGame = (): void => {
  state.setValues({ isAtTitle: false });
  stopAudioSource("title");
  playAudioSource("boss", {
    volumeChannelID: musicVolumeChannelID,
  });
  goToLevel("test_level");
  createPlayer();
  createMoblin();
};
