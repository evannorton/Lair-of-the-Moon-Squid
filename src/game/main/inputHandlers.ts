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
  keys: ["KeyZ"],
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
  keys: ["KeyX"],
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
