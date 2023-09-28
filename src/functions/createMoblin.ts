import { CollisionLayer } from "../types/CollisionLayer";
import { MoblinAnimation, moblinSpriteID } from "../game/main/sprites";
import { Monster } from "../types/Monster";
import { XDirection, YDirection } from "../types/Direction";
import {
  createSpriteInstance,
  pathEntity,
  spawnEntity,
} from "pigeon-mode-game-framework";
import { isMonsterInvincible } from "./isMonsterInvincible";
import { movementSpeed } from "../constants/movementSpeed";
import { state } from "../state";

export const createMoblin = (): void => {
  const monsters: Monster<string>[] = [...state.values.monsters];
  const moblinSpriteInstanceID: string = createSpriteInstance<MoblinAnimation>({
    getAnimationID: (): MoblinAnimation | null => {
      const monster: Monster<MoblinAnimation> | null =
        (state.values.monsters.find(
          (monsterInState: Monster<string>): boolean =>
            monsterInState.spriteInstanceID === moblinSpriteInstanceID,
        ) ?? null) as Monster<MoblinAnimation> | null;
      if (monster === null) {
        throw new Error(
          "A Monster attempted to get its SpriteInstance AnimationID, but it could not be found in state.",
        );
      }
      // Play monster idle animation
      switch (monster.direction) {
        case XDirection.Left:
          if (isMonsterInvincible(monster)) {
            return monster.idleLeftInvincibleAnimationID;
          }
          return monster.idleLeftAnimationID;
        case XDirection.Right:
          if (isMonsterInvincible(monster)) {
            return monster.idleRightInvincibleAnimationID;
          }
          return monster.idleRightAnimationID;
        case YDirection.Up:
          if (isMonsterInvincible(monster)) {
            return monster.idleUpInvincibleAnimationID;
          }
          return monster.idleUpAnimationID;
        case YDirection.Down:
          if (isMonsterInvincible(monster)) {
            return monster.idleDownInvincibleAnimationID;
          }
          return monster.idleDownAnimationID;
      }
      return null;
    },
    spriteID: moblinSpriteID,
  });
  const moblinEntityID: string = spawnEntity<CollisionLayer>({
    collisionLayer: CollisionLayer.Monster,
    height: 16,
    layerID: "entities",
    position: {
      x: 96,
      y: 128,
    },
    spriteInstanceID: moblinSpriteInstanceID,
    width: 16,
    zIndex: 0,
  });
  pathEntity(moblinEntityID, {
    velocity: movementSpeed,
    x: 0,
    y: 16,
  });
  monsters.push({
    direction: YDirection.Down,
    entityID: moblinEntityID,
    hit: null,
    idleDownAnimationID: MoblinAnimation.IdleDown,
    idleDownInvincibleAnimationID: MoblinAnimation.IdleDownInvincible,
    idleLeftAnimationID: MoblinAnimation.IdleLeft,
    idleLeftInvincibleAnimationID: MoblinAnimation.IdleLeftInvincible,
    idleRightAnimationID: MoblinAnimation.IdleRight,
    idleRightInvincibleAnimationID: MoblinAnimation.IdleRightInvincible,
    idleUpAnimationID: MoblinAnimation.IdleUp,
    idleUpInvincibleAnimationID: MoblinAnimation.IdleUpInvincible,
    spriteInstanceID: moblinSpriteInstanceID,
  });
  state.setValues({ monsters });
};
