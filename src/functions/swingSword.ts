import { CollisionLayer } from "../types/CollisionLayer";
import { Monster } from "../types/Monster";
import {
  OverlapData,
  createSpriteInstance,
  getCurrentTime,
  spawnEntity,
} from "pixel-pigeon";
import { Sword } from "../types/Sword";
import { SwordAnimation, swordSpriteID } from "../game/main/sprites";
import { XDirection, YDirection } from "../types/Direction";
import { isMonsterInvincible } from "./isMonsterInvincible";
import { state } from "../state";
import { swordSwingDuration } from "../constants/swordSwingDuration";

export const swingSword = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error("An sword input was received with no player entity.");
  }
  const swordSpriteInstanceID: string = createSpriteInstance({
    getAnimationID: (): SwordAnimation | null => {
      const sword: Sword | null =
        state.values.swords.find(
          (swordInState: Sword): boolean =>
            swordInState.spriteInstanceID === swordSpriteInstanceID,
        ) ?? null;
      if (sword === null) {
        throw new Error(
          "A Sword attempted to get its SpriteInstance AnimationID, but it could not be found in state.",
        );
      }
      const diff: number = getCurrentTime() - sword.swungAt;
      const frame: number = Math.floor((diff / swordSwingDuration) * 3);
      switch (state.values.playerDirection) {
        case XDirection.Left:
          switch (frame) {
            case 0:
              return SwordAnimation.SwingLeft1;
            case 1:
              return SwordAnimation.SwingLeft2;
            case 2:
              return SwordAnimation.SwingLeft3;
          }
          break;
        case XDirection.Right:
          switch (frame) {
            case 0:
              return SwordAnimation.SwingRight1;
            case 1:
              return SwordAnimation.SwingRight2;
            case 2:
              return SwordAnimation.SwingRight3;
          }
          break;
        case YDirection.Up:
          switch (frame) {
            case 0:
              return SwordAnimation.SwingUp1;
            case 1:
              return SwordAnimation.SwingUp2;
            case 2:
              return SwordAnimation.SwingUp3;
          }
          break;
        case YDirection.Down:
          switch (frame) {
            case 0:
              return SwordAnimation.SwingDown1;
            case 1:
              return SwordAnimation.SwingDown2;
            case 2:
              return SwordAnimation.SwingDown3;
          }
      }
      return null;
    },
    spriteID: swordSpriteID,
  });
  const swordEntityID: string = spawnEntity({
    height: 16,
    layerID: "entities",
    onOverlap: (overlapData: OverlapData<CollisionLayer>): void => {
      const sword: Sword | null =
        state.values.swords.find(
          (swordInState: Sword): boolean =>
            swordInState.entityID === swordEntityID,
        ) ?? null;
      if (sword === null) {
        throw new Error(
          "An Sword collided with an entity, but it could not be found in state.",
        );
      }
      for (const entityCollidable of overlapData.entityCollidables) {
        if (entityCollidable.collisionLayer === CollisionLayer.Monster) {
          const monster: Monster<SwordAnimation> | null =
            (state.values.monsters.find(
              (monsterInState: Monster<string>): boolean =>
                monsterInState.entityID === entityCollidable.entityID,
            ) ?? null) as Monster<SwordAnimation> | null;
          if (monster !== null) {
            const hitAt: number | null =
              sword.monstersHitAt.get(monster.entityID) ?? null;
            if (hitAt === null && !isMonsterInvincible(monster)) {
              sword.monstersHitAt.set(monster.entityID, getCurrentTime());
              monster.hit = {
                direction: state.values.playerDirection,
                time: getCurrentTime(),
              };
            }
          }
        }
      }
    },
    spriteInstanceID: swordSpriteInstanceID,
    width: 16,
    zIndex: 3,
  });
  const swords: Sword[] = [...state.values.swords];
  swords.push({
    entityID: swordEntityID,
    monstersHitAt: new Map(),
    spriteInstanceID: swordSpriteInstanceID,
    swungAt: getCurrentTime(),
  });
  state.setValues({
    playerSwungSwordAt: getCurrentTime(),
    swords,
  });
};
