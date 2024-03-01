import { createInputPressHandler } from "pixel-pigeon";
import { isAtTitle } from "./conditions";
import { startInputCollectionID } from "./inputCollectionts";
import { startMainGame } from "../../functions/startMainGame";

export const titleInputPressHandlerID: string = createInputPressHandler({
  condition: isAtTitle,
  inputCollectionID: startInputCollectionID,
  onInput: startMainGame,
});
