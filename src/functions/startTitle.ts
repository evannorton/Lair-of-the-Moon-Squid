import { musicVolumeChannelID } from "../volumeChannels";
import { playAudioSource } from "pixel-pigeon";
import { state } from "../state";

export const startTitle = (): void => {
  state.setValues({
    isAtTitle: true,
  });
  playAudioSource("title", {
    volumeChannelID: musicVolumeChannelID,
  });
};
