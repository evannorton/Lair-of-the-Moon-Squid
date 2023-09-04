import { XDirection, YDirection } from "../../types/Direction";
import {
  createInputPressHandler,
  createInputTickHandler,
} from "pigeon-mode-game-framework";
import { isMainGameOngoing } from "./conditions";
import { isPlayerShootingArrow } from "../../functions/isPlayerShootingArrow";
import { isPlayerSwingingSword } from "../../functions/isPlayerSwingingSword";
import { isPlayerTakingKnockback } from "../../functions/isPlayerTakingKnockback";
import { shootArrow } from "../../functions/shootArrow";
import { swingSword } from "../../functions/swingSword";

export const swordInputPressHandlerID: string = createInputPressHandler({
  condition: isMainGameOngoing,
  gamepadButtons: [0, 3],
  keys: [{ value: "KeyZ" }],
  leftClick: true,
  onInput: (): void => {
    if (
      !isPlayerTakingKnockback() &&
      !isPlayerSwingingSword() &&
      !isPlayerShootingArrow()
    ) {
      swingSword();
    }
  },
});
export const arrowInputPressHandlerID: string = createInputPressHandler({
  condition: isMainGameOngoing,
  gamepadButtons: [1, 2],
  keys: [{ value: "KeyX" }],
  onInput: (): void => {
    if (
      !isPlayerTakingKnockback() &&
      !isPlayerSwingingSword() &&
      !isPlayerShootingArrow()
    ) {
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
      keys: [
        { value: "ArrowLeft" },
        { value: "KeyA" },
        {
          value: "Numpad4",
          withoutNumlock: true,
        },
      ],
    },
    {
      gamepadButtons: [15],
      id: XDirection.Right,
      keys: [
        { value: "ArrowRight" },
        { value: "KeyD" },
        {
          value: "Numpad6",
          withoutNumlock: true,
        },
      ],
    },
  ],
});
export const yInputTickHandlerID: string = createInputTickHandler<YDirection>({
  groups: [
    {
      gamepadButtons: [13],
      id: YDirection.Down,
      keys: [
        { value: "ArrowDown" },
        { value: "KeyS" },
        {
          value: "Numpad2",
          withoutNumlock: true,
        },
      ],
    },
    {
      gamepadButtons: [12],
      id: YDirection.Up,
      keys: [
        { value: "ArrowUp" },
        { value: "KeyW" },
        {
          value: "Numpad8",
          withoutNumlock: true,
        },
      ],
    },
  ],
});
