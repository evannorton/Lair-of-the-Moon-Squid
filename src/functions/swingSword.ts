import { EntityType } from "../types/EntityType";
import { Monster } from "../types/Monster";
import {
  OverlapData,
  createEntity,
  createSprite,
  getCurrentTime,
  getEntityPosition,
} from "pixel-pigeon";
import { Sword } from "../types/Sword";
import { SwordAnimation } from "../types/animations";
import { XDirection, YDirection } from "../types/Direction";
import { isMonsterInvincible } from "./isMonsterInvincible";
import { state } from "../state";
import { swordSwingDuration } from "../constants/swordSwingDuration";

export const swingSword = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error("An sword input was received with no player entity.");
  }
  const swordSpriteID: string = createSprite({
    animationID: (): SwordAnimation => {
      const sword: Sword | null =
        state.values.swords.find(
          (swordInState: Sword): boolean =>
            swordInState.spriteID === swordSpriteID,
        ) ?? null;
      if (sword === null) {
        throw new Error(
          "A Sword attempted to get its Sprite AnimationID, but it could not be found in state.",
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
      throw new Error("Attempted to render sword sprite with no animation.");
    },
    animations: [
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 0,
            width: 16,
          },
        ],
        id: SwordAnimation.SwingLeft1,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 0,
            width: 16,
          },
        ],
        id: SwordAnimation.SwingLeft2,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 0,
            width: 16,
          },
        ],
        id: SwordAnimation.SwingLeft3,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 16,
            width: 16,
          },
        ],
        id: SwordAnimation.SwingRight1,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 16,
            width: 16,
          },
        ],
        id: SwordAnimation.SwingRight2,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 16,
            width: 16,
          },
        ],
        id: SwordAnimation.SwingRight3,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 32,
            width: 16,
          },
        ],
        id: SwordAnimation.SwingUp1,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 32,
            width: 16,
          },
        ],
        id: SwordAnimation.SwingUp2,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 32,
            width: 16,
          },
        ],
        id: SwordAnimation.SwingUp3,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 48,
            width: 16,
          },
        ],
        id: SwordAnimation.SwingDown1,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 48,
            width: 16,
          },
        ],
        id: SwordAnimation.SwingDown2,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 32,
            sourceY: 48,
            width: 16,
          },
        ],
        id: SwordAnimation.SwingDown3,
      },
    ],
    imagePath: "sword",
  });
  const swordEntityID: string = createEntity({
    height: 16,
    layerID: "entities",
    levelID: "test_level",
    onOverlap: (overlapData: OverlapData): void => {
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
        if (entityCollidable.type === EntityType.Monster) {
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
    position: getEntityPosition(state.values.playerEntityID),
    sprites: [{ spriteID: swordSpriteID }],
    type: EntityType.Projectile,
    width: 16,
    zIndex: 3,
  });
  const swords: Sword[] = [...state.values.swords];
  swords.push({
    entityID: swordEntityID,
    monstersHitAt: new Map(),
    spriteID: swordSpriteID,
    swungAt: getCurrentTime(),
  });
  state.setValues({
    playerSwungSwordAt: getCurrentTime(),
    swords,
  });
};
