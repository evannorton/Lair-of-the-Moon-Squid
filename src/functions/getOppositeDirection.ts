import { Direction, XDirection, YDirection } from "../types/Direction";

export const getOppositeDirection = (direction: Direction): Direction => {
  switch (direction) {
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
