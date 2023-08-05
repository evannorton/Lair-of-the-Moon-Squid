import { createSprite } from "pigeon-mode-game-framework";

export const titleSpriteID: string = createSprite({
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
