import { Direction } from "./Direction";

export interface Arrow {
  readonly entityID: string;
  isBouncing: boolean;
  readonly shootDirection: Direction;
  readonly shotAt: number;
  readonly spriteInstanceID: string;
}
