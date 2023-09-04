import { createInputPressHandler } from "pigeon-mode-game-framework";
import { isAtTitle } from "./conditions";
import { startMainGame } from "../../functions/startMainGame";

export const titleInputPressHandlerID: string = createInputPressHandler({
  condition: isAtTitle,
  gamepadButtons: [9],
  keys: [{ value: "Space" }, { value: "Enter" }],
  leftClick: true,
  onInput: startMainGame,
});
