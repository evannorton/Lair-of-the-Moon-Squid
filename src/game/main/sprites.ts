import { arrowBounceDuration } from "../../constants/arrowBounceDuration";
import { createSprite } from "pigeon-mode-game-framework";
import { movementFrameDuration } from "../../constants/movementFrameDuration";
import { swordSwingDuration } from "../../constants/swordSwingDuration";

export enum PlayerAnimation {
  ArrowLeft = "arrow-left",
  ArrowRight = "arrow-right",
  ArrowUp = "arrow-up",
  ArrowDown = "arrow-down",
  ArrowLeftInvincible = "arrow-left-invincible",
  ArrowRightInvincible = "arrow-right-invincible",
  ArrowUpInvincible = "arrow-up-invincible",
  ArrowDownInvincible = "arrow-down-invincible",
  KnockbackLeft = "knockback-left",
  KnockbackRight = "knockback-right",
  KnockbackUp = "knockback-up",
  KnockbackDown = "knockback-down",
  KnockbackLeftInvincible = "knockback-left-invincible",
  KnockbackRightInvincible = "knockback-right-invincible",
  KnockbackUpInvincible = "knockback-up-invincible",
  KnockbackDownInvincible = "knockback-down-invincible",
  IdleLeft = "idle-left",
  IdleRight = "idle-right",
  IdleUp = "idle-up",
  IdleDown = "idle-down",
  IdleLeftInvincible = "idle-left-invincible",
  IdleRightInvincible = "idle-right-invincible",
  IdleUpInvincible = "idle-up-invincible",
  IdleDownInvincible = "idle-down-invincible",
  SwordLeft = "sword-left",
  SwordRight = "sword-right",
  SwordUp = "sword-up",
  SwordDown = "sword-down",
  SwordLeftInvincible = "sword-left-invincible",
  SwordRightInvincible = "sword-right-invincible",
  SwordUpInvincible = "sword-up-invincible",
  SwordDownInvincible = "sword-down-invincible",
  WalkLeft = "walk-left",
  WalkRight = "walk-right",
  WalkUp = "walk-up",
  WalkDown = "walk-down",
  WalkLeftInvincible = "walk-left-invincible",
  WalkRightInvincible = "walk-right-invincible",
  WalkUpInvincible = "walk-up-invincible",
  WalkDownInvincible = "walk-down-invincible",
}
export const playerSpriteID: string = createSprite({
  animations: [
    // Regular
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
          duration: movementFrameDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 64,
          width: 16,
        },
        {
          duration: movementFrameDuration,
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
          duration: movementFrameDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 80,
          width: 16,
        },
        {
          duration: movementFrameDuration,
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
          duration: movementFrameDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 96,
          width: 16,
        },
        {
          duration: movementFrameDuration,
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
          duration: movementFrameDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 112,
          width: 16,
        },
        {
          duration: movementFrameDuration,
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
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 128,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 128,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 128,
          width: 16,
        },
      ],
      id: PlayerAnimation.SwordLeft,
    },
    {
      frames: [
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 144,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 144,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 144,
          width: 16,
        },
      ],
      id: PlayerAnimation.SwordRight,
    },
    {
      frames: [
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 160,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 160,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 160,
          width: 16,
        },
      ],
      id: PlayerAnimation.SwordUp,
    },
    {
      frames: [
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 176,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 176,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 176,
          width: 16,
        },
      ],
      id: PlayerAnimation.SwordDown,
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
      id: PlayerAnimation.KnockbackLeft,
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
      id: PlayerAnimation.KnockbackRight,
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
      id: PlayerAnimation.KnockbackUp,
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
      id: PlayerAnimation.KnockbackDown,
    },
    // Invincible
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 320,
          width: 16,
        },
      ],
      id: PlayerAnimation.IdleLeftInvincible,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 336,
          width: 16,
        },
      ],
      id: PlayerAnimation.IdleRightInvincible,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 352,
          width: 16,
        },
      ],
      id: PlayerAnimation.IdleUpInvincible,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 368,
          width: 16,
        },
      ],
      id: PlayerAnimation.IdleDownInvincible,
    },
    {
      frames: [
        {
          duration: movementFrameDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 384,
          width: 16,
        },
        {
          duration: movementFrameDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 384,
          width: 16,
        },
      ],
      id: PlayerAnimation.WalkLeftInvincible,
    },
    {
      frames: [
        {
          duration: movementFrameDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 400,
          width: 16,
        },
        {
          duration: movementFrameDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 400,
          width: 16,
        },
      ],
      id: PlayerAnimation.WalkRightInvincible,
    },
    {
      frames: [
        {
          duration: movementFrameDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 416,
          width: 16,
        },
        {
          duration: movementFrameDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 416,
          width: 16,
        },
      ],
      id: PlayerAnimation.WalkUpInvincible,
    },
    {
      frames: [
        {
          duration: movementFrameDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 432,
          width: 16,
        },
        {
          duration: movementFrameDuration,
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 432,
          width: 16,
        },
      ],
      id: PlayerAnimation.WalkDownInvincible,
    },
    {
      frames: [
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 448,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 448,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 448,
          width: 16,
        },
      ],
      id: PlayerAnimation.SwordLeftInvincible,
    },
    {
      frames: [
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 464,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 464,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 464,
          width: 16,
        },
      ],
      id: PlayerAnimation.SwordRightInvincible,
    },
    {
      frames: [
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 480,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 480,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 480,
          width: 16,
        },
      ],
      id: PlayerAnimation.SwordUpInvincible,
    },
    {
      frames: [
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 496,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 496,
          width: 16,
        },
        {
          duration: Math.floor(swordSwingDuration / 3),
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 496,
          width: 16,
        },
      ],
      id: PlayerAnimation.SwordDownInvincible,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 512,
          width: 16,
        },
      ],
      id: PlayerAnimation.ArrowLeftInvincible,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 528,
          width: 16,
        },
      ],
      id: PlayerAnimation.ArrowRightInvincible,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 544,
          width: 16,
        },
      ],
      id: PlayerAnimation.ArrowUpInvincible,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 560,
          width: 16,
        },
      ],
      id: PlayerAnimation.ArrowDownInvincible,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 576,
          width: 16,
        },
      ],
      id: PlayerAnimation.KnockbackLeftInvincible,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 592,
          width: 16,
        },
      ],
      id: PlayerAnimation.KnockbackRightInvincible,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 608,
          width: 16,
        },
      ],
      id: PlayerAnimation.KnockbackUpInvincible,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 624,
          width: 16,
        },
      ],
      id: PlayerAnimation.KnockbackDownInvincible,
    },
  ],
  imagePath: "player",
});
export enum MoblinAnimation {
  IdleLeft = "idle-left",
  IdleRight = "idle-right",
  IdleUp = "idle-up",
  IdleDown = "idle-down",
  IdleLeftInvincible = "idle-left-Invincible",
  IdleRightInvincible = "idle-right-Invincible",
  IdleUpInvincible = "idle-up-Invincible",
  IdleDownInvincible = "idle-down-Invincible",
}
export const moblinSpriteID: string = createSprite({
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
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 128,
          width: 16,
        },
      ],
      id: MoblinAnimation.IdleLeftInvincible,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 144,
          width: 16,
        },
      ],
      id: MoblinAnimation.IdleRightInvincible,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 160,
          width: 16,
        },
      ],
      id: MoblinAnimation.IdleUpInvincible,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 0,
          sourceY: 176,
          width: 16,
        },
      ],
      id: MoblinAnimation.IdleDownInvincible,
    },
  ],
  imagePath: "monsters/moblin",
});
export enum SwordAnimation {
  SwingDown1 = "swing-down-1",
  SwingDown2 = "swing-down-2",
  SwingDown3 = "swing-down-3",
  SwingLeft1 = "swing-left-1",
  SwingLeft2 = "swing-left-2",
  SwingLeft3 = "swing-left-3",
  SwingRight1 = "swing-right-1",
  SwingRight2 = "swing-right-2",
  SwingRight3 = "swing-right-3",
  SwingUp1 = "swing-up-1",
  SwingUp2 = "swing-up-2",
  SwingUp3 = "swing-up-3",
}
export const swordSpriteID: string = createSprite({
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
      id: SwordAnimation.SwingLeft1,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 0,
          width: 16,
        },
      ],
      id: SwordAnimation.SwingLeft2,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 0,
          width: 16,
        },
      ],
      id: SwordAnimation.SwingLeft3,
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
      id: SwordAnimation.SwingRight1,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 16,
          width: 16,
        },
      ],
      id: SwordAnimation.SwingRight2,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 16,
          width: 16,
        },
      ],
      id: SwordAnimation.SwingRight3,
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
      id: SwordAnimation.SwingUp1,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 32,
          width: 16,
        },
      ],
      id: SwordAnimation.SwingUp2,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 32,
          width: 16,
        },
      ],
      id: SwordAnimation.SwingUp3,
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
      id: SwordAnimation.SwingDown1,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 16,
          sourceY: 48,
          width: 16,
        },
      ],
      id: SwordAnimation.SwingDown2,
    },
    {
      frames: [
        {
          height: 16,
          sourceHeight: 16,
          sourceWidth: 16,
          sourceX: 32,
          sourceY: 48,
          width: 16,
        },
      ],
      id: SwordAnimation.SwingDown3,
    },
  ],
  imagePath: "sword",
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
