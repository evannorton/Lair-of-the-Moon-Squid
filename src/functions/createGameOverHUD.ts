import { advanceInputCollectionID } from "../inputCollections";
import {
  createInputPressHandler,
  createLabel,
  getGameHeight,
  getGameWidth,
  stopAudioSource,
} from "pixel-pigeon";
import { isAtGameOver } from "../conditions";
import { playerMaxHP } from "../constants/playerMaxHP";
import { playerMaxMP } from "../constants/playerMaxMP";
import { startTitle } from "./startTitle";
import { state } from "../state";

export const createGameOverHUD = (): void => {
  createLabel({
    color: "#ffffff",
    coordinates: {
      condition: isAtGameOver,
      x: getGameWidth() / 2,
      y: getGameHeight() / 2 - 4,
    },
    horizontalAlignment: "center",
    text: {
      value: "Game Over",
    },
  });
  createInputPressHandler({
    condition: isAtGameOver,
    inputCollectionID: advanceInputCollectionID,
    onInput: (): void => {
      stopAudioSource("game-over");
      startTitle();
      state.setValues({
        playerHP: playerMaxHP,
        playerMP: playerMaxMP,
      });
    },
  });
};
