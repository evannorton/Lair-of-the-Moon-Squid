import { createSprite } from "pigeon-mode-game-library";
import walkDuration from "./constants/walkDuration";

const titleSpriteID: string = createSprite<"title">({
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
enum PlayerAnimation {
  IdleLeft = "idle-left",
  IdleRight = "idle-right",
  IdleUp = "idle-up",
  IdleDown = "idle-down",
  WalkLeft = "walk-left",
  WalkRight = "walk-right",
  WalkUp = "walk-up",
  WalkDown = "walk-down",
}
const playerSpriteID: string = createSprite<PlayerAnimation>({
  animations: [
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 0,
          width: 16,
        },
      ],
      id: PlayerAnimation.IdleLeft,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 16,
          width: 16,
        },
      ],
      id: PlayerAnimation.IdleRight,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 32,
          width: 16,
        },
      ],
      id: PlayerAnimation.IdleUp,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 48,
          width: 16,
        },
      ],
      id: PlayerAnimation.IdleDown,
    },
    {
      frames: [
        {
          duration: walkDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 64,
          width: 16,
        },
        {
          duration: walkDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 64,
          width: 16,
        },
      ],
      id: PlayerAnimation.WalkLeft,
    },
    {
      frames: [
        {
          duration: walkDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 80,
          width: 16,
        },
        {
          duration: walkDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 80,
          width: 16,
        },
      ],
      id: PlayerAnimation.WalkRight,
    },
    {
      frames: [
        {
          duration: walkDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 96,
          width: 16,
        },
        {
          duration: walkDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 96,
          width: 16,
        },
      ],
      id: PlayerAnimation.WalkUp,
    },
    {
      frames: [
        {
          duration: walkDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 112,
          width: 16,
        },
        {
          duration: walkDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 112,
          width: 16,
        },
      ],
      id: PlayerAnimation.WalkDown,
    },
  ],
  imagePath: "player",
});
enum ArrowAnimation {
  Left = "left",
  Right = "right",
  Up = "up",
  Down = "down",
}
const arrowSpriteID: string = createSprite({
  animations: [
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 0,
          width: 16,
        },
      ],
      id: ArrowAnimation.Left,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 16,
          width: 16,
        },
      ],
      id: ArrowAnimation.Right,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 32,
          width: 16,
        },
      ],
      id: ArrowAnimation.Up,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 48,
          width: 16,
        },
      ],
      id: ArrowAnimation.Down,
    },
  ],
  imagePath: "arrow",
});

export {
  titleSpriteID,
  PlayerAnimation,
  playerSpriteID,
  ArrowAnimation,
  arrowSpriteID,
};