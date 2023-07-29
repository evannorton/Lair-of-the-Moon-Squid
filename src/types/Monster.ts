import { Direction } from "./Direction";

export interface Monster<AnimationID extends string> {
  readonly direction: Direction;
  readonly entityID: string;
  readonly idleDownAnimationID: AnimationID;
  readonly idleLeftAnimationID: AnimationID;
  readonly idleRightAnimationID: AnimationID;
  readonly idleUpAnimationID: AnimationID;
  readonly spriteInstanceID: string;
}
