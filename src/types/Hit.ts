import { Direction } from "./Direction";

export interface Hit {
  readonly direction: Direction;
  readonly time: number;
}
