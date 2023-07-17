import { createSprite } from "pigeon-mode-game-library";

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
