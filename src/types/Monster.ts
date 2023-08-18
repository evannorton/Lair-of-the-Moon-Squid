import { Direction } from "./Direction";
import { Hit } from "./Hit";

export interface Monster<AnimationID extends string> {
  readonly direction: Direction;
  readonly entityID: string;
  hit: Hit | null;
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
