import { InputPressHandler } from "pigeon-mode-game-framework/api/classes/InputPressHandler";
import { takeScreenshot } from "pigeon-mode-game-framework";

export const screenshotInputHandler: InputPressHandler = new InputPressHandler({
  keyboardButtons: [{ value: "KeyP" }],
  onInput: (): void => {
    takeScreenshot();
  },
});
