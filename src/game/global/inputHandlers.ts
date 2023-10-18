import { InputPressHandler } from "pixel-pigeon/api/classes/InputPressHandler";
import { takeScreenshot } from "pixel-pigeon";

export const screenshotInputHandler: InputPressHandler = new InputPressHandler({
  keyboardButtons: [{ value: "KeyP" }],
  onInput: (): void => {
    takeScreenshot();
  },
});
