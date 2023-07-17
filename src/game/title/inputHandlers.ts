import { createInputPressHandler } from "pigeon-mode-game-library";
import { isAtTitle } from "./conditions";
import startMainGame from "../../functions/startMainGame";

export const titleInputPressHandlerID: string = createInputPressHandler({
  condition: isAtTitle,
  gamepadButtons: [9],
  keys: ["Space", "Enter"],
  leftClick: true,
  onInput: startMainGame,
});
