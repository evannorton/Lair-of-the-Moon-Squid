import { arrowBounceDuration } from "../../constants/arrowBounceDuration";
import { createSprite } from "pigeon-mode-game-framework";
import { movementDuration } from "../../constants/movementDuration";

export enum PlayerAnimation {
  ArrowLeft = "arrow-left",
  ArrowRight = "arrow-right",
  ArrowUp = "arrow-up",
  ArrowDown = "arrow-down",
  IdleLeft = "idle-left",
  IdleRight = "idle-right",
  IdleUp = "idle-up",
  IdleDown = "idle-down",
  WalkLeft = "walk-left",
  WalkRight = "walk-right",
  WalkUp = "walk-up",
  WalkDown = "walk-down",
}
export const playerSpriteID: string = createSprite<PlayerAnimation>({
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
          duration: movementDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 64,
          width: 16,
        },
        {
          duration: movementDuration,
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
          duration: movementDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 80,
          width: 16,
        },
        {
          duration: movementDuration,
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
          duration: movementDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 96,
          width: 16,
        },
        {
          duration: movementDuration,
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
          duration: movementDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 112,
          width: 16,
        },
        {
          duration: movementDuration,
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
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 192,
          width: 16,
        },
      ],
      id: PlayerAnimation.ArrowLeft,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 208,
          width: 16,
        },
      ],
      id: PlayerAnimation.ArrowRight,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 224,
          width: 16,
        },
      ],
      id: PlayerAnimation.ArrowUp,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 240,
          width: 16,
        },
      ],
      id: PlayerAnimation.ArrowDown,
    },
  ],
  imagePath: "player",
});
export enum MoblinAnimation {
  IdleLeft = "idle-left",
  IdleRight = "idle-right",
  IdleUp = "idle-up",
  IdleDown = "idle-down",
}
export const moblinSpriteID: string = createSprite<MoblinAnimation>({
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
      id: MoblinAnimation.IdleLeft,
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
      id: MoblinAnimation.IdleRight,
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
      id: MoblinAnimation.IdleUp,
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
      id: MoblinAnimation.IdleDown,
    },
  ],
  imagePath: "monsters/moblin",
});
export enum ArrowAnimation {
  BounceLeft = "bounce-left",
  BounceRight = "bounce-right",
  BounceUp = "bounce-up",
  BounceDown = "bounce-down",
  ShootLeft = "shoot-left",
  ShootRight = "shoot-right",
  ShootUp = "shoot-up",
  ShootDown = "shoot-down",
}
export const arrowSpriteID: string = createSprite({
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
      id: ArrowAnimation.ShootLeft,
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
      id: ArrowAnimation.ShootRight,
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
      id: ArrowAnimation.ShootUp,
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
      id: ArrowAnimation.ShootDown,
    },
    {
      frames: [
        {
          duration: arrowBounceDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 64,
          width: 16,
        },
        {
          duration: arrowBounceDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 64,
          width: 16,
        },
        {
          duration: arrowBounceDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 64,
          width: 16,
        },
      ],
      id: ArrowAnimation.BounceLeft,
    },
    {
      frames: [
        {
          duration: arrowBounceDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 80,
          width: 16,
        },
        {
          duration: arrowBounceDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 80,
          width: 16,
        },
        {
          duration: arrowBounceDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 80,
          width: 16,
        },
      ],
      id: ArrowAnimation.BounceRight,
    },
    {
      frames: [
        {
          duration: arrowBounceDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 96,
          width: 16,
        },
        {
          duration: arrowBounceDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 96,
          width: 16,
        },
        {
          duration: arrowBounceDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 96,
          width: 16,
        },
      ],
      id: ArrowAnimation.BounceUp,
    },
    {
      frames: [
        {
          duration: arrowBounceDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 112,
          width: 16,
        },
        {
          duration: arrowBounceDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 112,
          width: 16,
        },
        {
          duration: arrowBounceDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 112,
          width: 16,
        },
      ],
      id: ArrowAnimation.BounceDown,
    },
  ],
  imagePath: "arrow",
});
