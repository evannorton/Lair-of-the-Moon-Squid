import { Direction } from "./Direction";

export interface Monster<AnimationID extends string> {
  readonly direction: Direction;
  readonly entityID: string;
  hit: {
    readonly direction: Direction;
    readonly time: number;
  } | null;
  readonly idleDownAnimationID: AnimationID;
  readonly idleDownDamagedAnimationID: AnimationID;
  readonly idleLeftAnimationID: AnimationID;
  readonly idleLeftDamagedAnimationID: AnimationID;
  readonly idleRightAnimationID: AnimationID;
  readonly idleRightDamagedAnimationID: AnimationID;
  readonly idleUpAnimationID: AnimationID;
  readonly idleUpDamagedAnimationID: AnimationID;
  readonly spriteInstanceID: string;
}