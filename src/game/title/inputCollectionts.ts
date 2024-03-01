import { createInputCollection } from "pixel-pigeon";

export const startInputCollectionID: string = createInputCollection({
  gamepadButtons: [9],
  keyboardButtons: [{ value: "Space" }, { value: "Enter" }],
  mouseButtons: [0],
  name: "Start",
});
