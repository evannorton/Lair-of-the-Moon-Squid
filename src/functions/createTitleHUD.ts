import { TitleAnimation } from "../types/animations";
import { createInputPressHandler, createSprite } from "pixel-pigeon";
import { isAtTitle } from "../conditions";
import { startInputCollectionID } from "../inputCollections";
import { startMainGame } from "./startMainGame";

export const createTitleHUD = (): void => {
  createSprite({
    animationID: TitleAnimation.Title,
    animations: [
      {
        frames: [
          {
            height: 144,
            sourceHeight: 144,
            sourceWidth: 160,
            sourceX: 0,
            sourceY: 0,
            width: 160,
          },
        ],
        id: TitleAnimation.Title,
      },
    ],
    coordinates: {
      condition: isAtTitle,
      x: 0,
      y: 0,
    },
    imagePath: "title",
  });
  createInputPressHandler({
    condition: isAtTitle,
    inputCollectionID: startInputCollectionID,
    onInput: startMainGame,
  });
};
