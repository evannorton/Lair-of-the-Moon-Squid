import { createMoblin } from "./createMoblin";
import { createPlayer } from "./createPlayer";
import { goToLevel, playAudioSource, stopAudioSource } from "pixel-pigeon";
import { musicVolumeChannelID } from "../game/global/volumeChannels";
import { state } from "../state";

export const startMainGame = (): void => {
  state.setValues({ isAtTitle: false });
  stopAudioSource("title");
  playAudioSource("boss", {
    loopPoint: 0,
    volumeChannelID: musicVolumeChannelID,
  });
  goToLevel("test_level");
  createPlayer();
  createMoblin();
};
