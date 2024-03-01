import { Direction } from "./Direction";
import { Hit } from "./Hit";

export interface Monster<AnimationID extends string> {
  readonly direction: Direction;
  readonly entityID: string;
  hit: Hit | null;
  readonly idleDownAnimationID: AnimationID;
  readonly idleDownInvincibleAnimationID: AnimationID;
  readonly idleLeftAnimationID: AnimationID;
  readonly idleLeftInvincibleAnimationID: AnimationID;
  readonly idleRightAnimationID: AnimationID;
  readonly idleRightInvincibleAnimationID: AnimationID;
  readonly idleUpAnimationID: AnimationID;
  readonly idleUpInvincibleAnimationID: AnimationID;
  readonly spriteID: string;
}
