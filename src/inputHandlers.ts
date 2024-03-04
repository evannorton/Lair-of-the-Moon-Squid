import { XDirection, YDirection } from "./types/Direction";
import {
  createInputPressHandler,
  createInputTickHandler,
  takeScreenshot,
} from "pixel-pigeon";
import { isAtTitle, isMainGameOngoing } from "./conditions";
import { isPlayerShootingArrow } from "./functions/isPlayerShootingArrow";
import { isPlayerSwingingSword } from "./functions/isPlayerSwingingSword";
import { isPlayerTakingKnockback } from "./functions/isPlayerTakingKnockback";
import {
  moveDownInputCollectionID,
  moveLeftInputCollectionID,
  moveRightInputCollectionID,
  moveUpInputCollectionID,
  primaryWeaponInputCollectionID,
  screenshotInputCollectionID,
  secondaryWeaponInputCollectionID,
  startInputCollectionID,
} from "./inputCollections";
import { shootArrow } from "./functions/shootArrow";
import { startMainGame } from "./functions/startMainGame";
import { swingSword } from "./functions/swingSword";

export const screenshotInputHandlerID: string = createInputPressHandler({
  inputCollectionID: screenshotInputCollectionID,
  onInput: (): void => {
    takeScreenshot();
  },
});
export const titleInputPressHandlerID: string = createInputPressHandler({
  condition: isAtTitle,
  inputCollectionID: startInputCollectionID,
  onInput: startMainGame,
});
export const swordInputPressHandlerID: string = createInputPressHandler({
  condition: isMainGameOngoing,
  inputCollectionID: primaryWeaponInputCollectionID,
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
  inputCollectionID: secondaryWeaponInputCollectionID,
  onInput: (): void => {
    if (
      !isPlayerTakingKnockback() &&
      !isPlayerSwingingSword() &&
      !isPlayerShootingArrow()
    ) {
      shootArrow();
    }
  },
});
export const xInputTickHandlerID: string = createInputTickHandler<XDirection>({
  groups: [
    {
      id: XDirection.Left,
      inputCollectionID: moveLeftInputCollectionID,
    },
    {
      id: XDirection.Right,
      inputCollectionID: moveRightInputCollectionID,
    },
  ],
});
export const yInputTickHandlerID: string = createInputTickHandler<YDirection>({
  groups: [
    {
      id: YDirection.Up,
      inputCollectionID: moveUpInputCollectionID,
    },
    {
      id: YDirection.Down,
      inputCollectionID: moveDownInputCollectionID,
    },
  ],
});
