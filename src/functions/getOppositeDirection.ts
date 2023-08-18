import { Direction, XDirection, YDirection } from "../types/Direction";
import { state } from "../state";

export const getOppositeDirection = (): Direction => {
  switch (state.values.direction) {
    case XDirection.Left:
      return XDirection.Right;
    case XDirection.Right:
      return XDirection.Left;
    case YDirection.Up:
      return YDirection.Down;
    case YDirection.Down:
      return YDirection.Up;
  }
};
