import { Direction } from "./Direction";

export interface Arrow {
  bouncedAt: number | null;
  readonly entityID: string;
  readonly shootDirection: Direction;
  readonly spriteInstanceID: string;
}
