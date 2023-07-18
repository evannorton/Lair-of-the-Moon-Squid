import { createSpriteInstance } from "pigeon-mode-game-framework";
import { isAtTitle } from "./conditions";
import { titleSpriteID } from "./sprites";

export const titleSpriteInstanceID: string = createSpriteInstance({
  coordinates: {
    condition: isAtTitle,
    x: 0,
    y: 0,
  },
  spriteID: titleSpriteID,
});
