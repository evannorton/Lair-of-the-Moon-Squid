import { XDirection, YDirection } from "../types/Direction";
import {
  createInputPressHandler,
  createInputTickHandler,
  createSprite,
  createSpriteInstance,
} from "pigeon-mode-game-library";
import isShootingArrow from "../functions/isShootingArrow";
import movementDuration from "../constants/movementDuration";
import shootArrow from "../functions/shootArrow";
import state from "../state";

export const isMainGameOngoing = (): boolean => !state.values.isAtTitle;
export const swordInputPressHandlerID: string = createInputPressHandler({
  condition: isMainGameOngoing,
  gamepadButtons: [0, 3],
  keys: ["KeyZ"],
  leftClick: true,
  onInput: (): void => {
    if (state.values.playerEntityInstanceID === null) {
      throw new Error("A sword input was received with no player entity.");
    }
    console.log("swing sword");
  },
});
export const arrowInputPressHandlerID: string = createInputPressHandler({
  condition: isMainGameOngoing,
  gamepadButtons: [1, 2],
  keys: ["KeyX"],
  onInput: (): void => {
    if (!isShootingArrow()) {
      shootArrow();
    }
  },
  rightClick: true,
});
export const xInputTickHandlerID: string = createInputTickHandler<XDirection>({
  groups: [
    {
      gamepadButtons: [14],
      id: XDirection.Left,
      keys: ["ArrowLeft", "KeyA"],
    },
    {
      gamepadButtons: [15],
      id: XDirection.Right,
      keys: ["ArrowRight", "KeyD"],
    },
  ],
});
export const yInputTickHandlerID: string = createInputTickHandler<YDirection>({
  groups: [
    {
      gamepadButtons: [13],
      id: YDirection.Down,
      keys: ["ArrowDown", "KeyS"],
    },
    {
      gamepadButtons: [12],
      id: YDirection.Up,
      keys: ["ArrowUp", "KeyW"],
    },
  ],
});
export enum PlayerAnimation {
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
  ],
  imagePath: "player",
});
export const playerSpriteInstanceID: string = createSpriteInstance({
  spriteID: playerSpriteID,
});
export enum ArrowAnimation {
  Left = "left",
  Right = "right",
  Up = "up",
  Down = "down",
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
