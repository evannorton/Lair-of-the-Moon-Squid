import { VolumeChannel } from "../types/VolumeChannel";
import { createMoblin } from "./createMoblin";
import { createPlayer } from "./createPlayer";
import {
  goToLevel,
  playAudioSource,
  stopAudioSource,
} from "pigeon-mode-game-framework";
import { state } from "../state";

export const startMainGame = (): void => {
  state.setValues({ isAtTitle: false });
  stopAudioSource("title");
  playAudioSource("boss", {
    volumeChannelID: VolumeChannel.Music,
  });
  goToLevel("test_level");
  createPlayer();
  createMoblin();
};
