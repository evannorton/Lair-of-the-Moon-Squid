import { createPlayer } from "./createPlayer";
import { goToLevel, playAudioSource, stopAudioSource } from "pixel-pigeon";
import { musicVolumeChannelID } from "../volumeChannels";
import { startPhase1 } from "./startPhase/startPhase1";
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
  startPhase1();
};
