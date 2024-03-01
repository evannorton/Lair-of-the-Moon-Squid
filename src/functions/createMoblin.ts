import { EntityType } from "../types/EntityType";
import { MoblinAnimation } from "../types/animations";
import { Monster } from "../types/Monster";
import { XDirection, YDirection } from "../types/Direction";
import { createEntity, createSprite, pathEntity } from "pixel-pigeon";
import { isMonsterInvincible } from "./isMonsterInvincible";
import { movementSpeed } from "../constants/movementSpeed";
import { state } from "../state";

export const createMoblin = (): void => {
  const monsters: Monster<string>[] = [...state.values.monsters];
  const moblinSpriteID: string = createSprite({
    animationID: (): MoblinAnimation => {
      const monster: Monster<MoblinAnimation> | null =
        (state.values.monsters.find(
          (monsterInState: Monster<string>): boolean =>
            monsterInState.spriteID === moblinSpriteID,
        ) ?? null) as Monster<MoblinAnimation> | null;
      if (monster === null) {
        throw new Error(
          "A Monster attempted to get its Sprite AnimationID, but it could not be found in state.",
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
        id: MoblinAnimation.IdleLeft,
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
        id: MoblinAnimation.IdleRight,
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
        id: MoblinAnimation.IdleUp,
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
        id: MoblinAnimation.IdleDown,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 128,
            width: 16,
          },
        ],
        id: MoblinAnimation.IdleLeftInvincible,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 144,
            width: 16,
          },
        ],
        id: MoblinAnimation.IdleRightInvincible,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 160,
            width: 16,
          },
        ],
        id: MoblinAnimation.IdleUpInvincible,
      },
      {
        frames: [
          {
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 176,
            width: 16,
          },
        ],
        id: MoblinAnimation.IdleDownInvincible,
      },
    ],
    imagePath: "monsters/moblin",
  });
  const moblinEntityID: string = createEntity({
    collidesWithMap: true,
    height: 16,
    layerID: "entities",
    levelID: "test_level",
    position: {
      x: 96,
      y: 128,
    },
    sprites: [
      {
        spriteID: moblinSpriteID,
      },
    ],
    type: EntityType.Monster,
    width: 16,
    zIndex: 0,
  });
  pathEntity(moblinEntityID, {
    velocity: movementSpeed,
    x: 16,
    y: 80,
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
    spriteID: moblinSpriteID,
  });
  state.setValues({ monsters });
};
