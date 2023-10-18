import { createVolumeChannel } from "pixel-pigeon";

export const musicVolumeChannelID: string = createVolumeChannel({
  name: "Music",
});
export const sfxVolumeChannelID: string = createVolumeChannel({ name: "SFX" });
