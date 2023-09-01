import { CollisionLayer } from "../types/CollisionLayer";
import {
  EntityCollidable,
  OverlapData,
  createSpriteInstance,
  getCurrentTime,
  goToLevel,
  lockCameraToEntity,
  playAudioSource,
  spawnEntity,
  stopAudioSource,
} from "pigeon-mode-game-framework";
import {
  MoblinAnimation,
  PlayerAnimation,
  moblinSpriteID,
} from "../game/main/sprites";
import { Monster } from "../types/Monster";
import { XDirection, YDirection } from "../types/Direction";
import { getOppositeDirection } from "./getOppositeDirection";
import { isMonsterInvincible } from "./isMonsterInvincible";
import { isPlayerInvincible } from "./isPlayerInvincible";
import { playerSpriteInstanceID } from "../game/main/spriteInstances";
import { state } from "../state";

export const startMainGame = (): void => {
  stopAudioSource("title");
  playAudioSource("boss");
  state.setValues({ isAtTitle: false });
  goToLevel("test_level");
  const playerEntityID: string = spawnEntity<CollisionLayer>({
    collidableLayers: [],
    collisionLayer: CollisionLayer.Player,
    height: 16,
    layerID: "entities",
    onOverlap: (overlapData: OverlapData<CollisionLayer>): void => {
      if (overlapData.entityCollidables.length > 0) {
        const entityCollidable: EntityCollidable<CollisionLayer> =
          overlapData.entityCollidables[0];
        const monster: Monster<PlayerAnimation> | null =
          (state.values.monsters.find(
            (monsterInState: Monster<string>): boolean =>
              monsterInState.entityID === entityCollidable.entityID,
          ) ?? null) as Monster<PlayerAnimation> | null;
        if (monster !== null) {
          if (!isPlayerInvincible()) {
            state.setValues({
              playerHit: {
                direction: getOppositeDirection(state.values.playerDirection),
                time: getCurrentTime(),
              },
            });
          }
        }
      }
    },
    position: {
      x: 0,
      y: 0,
    },
    spriteInstanceID: playerSpriteInstanceID,
    width: 16,
    zIndex: 1,
  });
  state.setValues({
    playerEntityID,
  });
  lockCameraToEntity(playerEntityID);
  const monsters: Monster<string>[] = [...state.values.monsters];
  const moblinSpriteInstanceID: string = createSpriteInstance({
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
      x: 64,
      y: 64,
    },
    spriteInstanceID: moblinSpriteInstanceID,
    width: 16,
    zIndex: 0,
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
