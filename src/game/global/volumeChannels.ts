import { createVolumeChannel } from "pigeon-mode-game-framework";

export const musicVolumeChannelID: string = createVolumeChannel({
  name: "Music",
});
export const sfxVolumeChannelID: string = createVolumeChannel({ name: "SFX" });
