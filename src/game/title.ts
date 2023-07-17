import {
  createInputPressHandler,
  createSprite,
  createSpriteInstance,
} from "pigeon-mode-game-library";
import startMainGame from "../functions/startMainGame";
import state from "../state";

export const isAtTitle = (): boolean => state.values.isAtTitle;
export const titleInputPressHandlerID: string = createInputPressHandler({
  condition: isAtTitle,
  gamepadButtons: [9],
  keys: ["Space", "Enter"],
  leftClick: true,
  onInput: startMainGame,
});
export const titleSpriteID: string = createSprite<"title">({
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
      id: "title",
    },
  ],
  imagePath: "title",
});
export const titleSpriteInstanceID: string = createSpriteInstance({
  coordinates: {
    condition: isAtTitle,
    x: 0,
    y: 0,
  },
  spriteID: titleSpriteID,
});
