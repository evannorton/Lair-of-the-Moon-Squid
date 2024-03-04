import { MoblinAnimation } from "../types/animations";
import { Monster } from "../classes/Monster";

export const createMoblin = (): void => {
  const monster: Monster<MoblinAnimation> = new Monster({
    idleDownAnimationID: MoblinAnimation.IdleDown,
    idleDownInvincibleAnimationID: MoblinAnimation.IdleDownInvincible,
    idleLeftAnimationID: MoblinAnimation.IdleLeft,
    idleLeftInvincibleAnimationID: MoblinAnimation.IdleLeftInvincible,
    idleRightAnimationID: MoblinAnimation.IdleRight,
    idleRightInvincibleAnimationID: MoblinAnimation.IdleRightInvincible,
    idleUpAnimationID: MoblinAnimation.IdleUp,
    idleUpInvincibleAnimationID: MoblinAnimation.IdleUpInvincible,
  });
  monster.pathToCoordinates(16, 80);
};
