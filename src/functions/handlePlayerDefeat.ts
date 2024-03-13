import { Arrow } from "../classes/Arrow";
import { Monster } from "../classes/Monster";
import { Sword } from "../classes/Sword";
import {
  exitLevel,
  playAudioSource,
  removeEntity,
  stopAudioSource,
} from "pixel-pigeon";
import { getDefinables } from "../definables";
import { musicVolumeChannelID } from "../volumeChannels";
import { state } from "../state";

export const handlePlayerDefeat = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error("Attempted to handle player defeat with no player entity.");
  }
  stopAudioSource("boss");
  for (const monster of getDefinables(Monster).values()) {
    monster.remove();
  }
  for (const sword of getDefinables(Sword).values()) {
    sword.remove();
  }
  for (const arrow of getDefinables(Arrow).values()) {
    arrow.remove();
  }
  removeEntity(state.values.playerEntityID);
  exitLevel();
  playAudioSource("game-over", {
    volumeChannelID: musicVolumeChannelID,
  });
};
