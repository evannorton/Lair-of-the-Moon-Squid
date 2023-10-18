import { createInputPressHandler } from "pixel-pigeon";
import { isAtTitle } from "./conditions";
import { startMainGame } from "../../functions/startMainGame";

export const titleInputPressHandlerID: string = createInputPressHandler({
  condition: isAtTitle,
  gamepadButtons: [9],
  keyboardButtons: [{ value: "Space" }, { value: "Enter" }],
  mouseButtons: [0],
  onInput: startMainGame,
});
