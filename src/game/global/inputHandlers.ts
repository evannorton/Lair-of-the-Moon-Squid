import { createInputPressHandler, takeScreenshot } from "pixel-pigeon";
import { screenshotInputCollectionID } from "./inputCollections";

export const screenshotInputHandlerID: string = createInputPressHandler({
  inputCollectionID: screenshotInputCollectionID,
  onInput: (): void => {
    takeScreenshot();
  },
});
