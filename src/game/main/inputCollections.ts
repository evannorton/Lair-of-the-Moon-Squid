import { NumLock, createInputCollection } from "pixel-pigeon";

export const primaryWeaponInputCollectionID: string = createInputCollection({
  gamepadButtons: [0, 3],
  keyboardButtons: [{ value: "KeyZ" }],
  mouseButtons: [0],
  name: "Primary weapon",
});
export const secondaryWeaponInputCollectionID: string = createInputCollection({
  gamepadButtons: [0, 3],
  keyboardButtons: [{ value: "KeyX" }],
  mouseButtons: [2],
  name: "Secondary weapon",
});
export const moveLeftInputCollectionID: string = createInputCollection({
  gamepadButtons: [14],
  keyboardButtons: [
    { value: "ArrowLeft" },
    { value: "KeyA" },
    {
      numLock: NumLock.Without,
      value: "Numpad4",
    },
  ],
  name: "Move left",
});
export const moveRightInputCollectionID: string = createInputCollection({
  gamepadButtons: [15],
  keyboardButtons: [
    { value: "ArrowRight" },
    { value: "KeyD" },
    {
      numLock: NumLock.Without,
      value: "Numpad6",
    },
  ],
  name: "Move right",
});
export const moveUpInputCollectionID: string = createInputCollection({
  gamepadButtons: [12],
  keyboardButtons: [
    { value: "ArrowUp" },
    { value: "KeyW" },
    {
      numLock: NumLock.Without,
      value: "Numpad8",
    },
  ],
  name: "Move left",
});
export const moveDownInputCollectionID: string = createInputCollection({
  gamepadButtons: [13],
  keyboardButtons: [
    { value: "ArrowDown" },
    { value: "KeyS" },
    {
      numLock: NumLock.Without,
      value: "Numpad2",
    },
  ],
  name: "Move left",
});
