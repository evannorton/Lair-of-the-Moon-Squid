import { CollisionLayer } from "../types/CollisionLayer";
import {
  EntityCollidable,
  OverlapData,
  createSpriteInstance,
  getCurrentTime,
  goToLevel,
  lockCameraToEntity,
  spawnEntity,
} from "pigeon-mode-game-framework";
import { MoblinAnimation, moblinSpriteID } from "../game/main/sprites";
import { Monster } from "../types/Monster";
import { YDirection } from "../types/Direction";
import { getOppositeDirection } from "./getOppositeDirection";
import { isPlayerInvincible } from "./isPlayerInvincible";
import { playerSpriteInstanceID } from "../game/main/spriteInstances";
import { state } from "../state";

export const startMainGame = (): void => {
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
        const monster: Monster<string> | null =
          state.values.monsters.get(entityCollidable.entityID) ?? null;
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
  const monsters: Map<string, Monster<string>> = new Map<
    string,
    Monster<string>
  >(state.values.monsters);
  const moblinSpriteInstanceID: string = createSpriteInstance({
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
  monsters.set(moblinEntityID, {
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
