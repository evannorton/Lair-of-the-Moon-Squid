import { createSprite } from "pixel-pigeon";

export enum TitleAnimation {
  Title = "title",
}
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
      id: TitleAnimation.Title,
    },
  ],
  imagePath: "title",
});
