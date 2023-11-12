import { createInputPressHandler, takeScreenshot } from "pixel-pigeon";

export const screenshotInputHandlerID: string = createInputPressHandler({
  keyboardButtons: [{ value: "KeyP" }],
  onInput: (): void => {
    takeScreenshot();
  },
});
