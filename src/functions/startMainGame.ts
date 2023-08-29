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
import { knockbackDuration } from "../constants/knockbackDuration";
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
          if (
            state.values.hit === null ||
            getCurrentTime() - state.values.hit.time >= knockbackDuration
          ) {
            console.log("player walked into monster");
            state.setValues({
              hit: {
                direction: getOppositeDirection(),
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
  const moblinEntityID: string = spawnEntity({
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
    idleDownDamagedAnimationID: MoblinAnimation.IdleDownDamaged,
    idleLeftAnimationID: MoblinAnimation.IdleLeft,
    idleLeftDamagedAnimationID: MoblinAnimation.IdleLeftDamaged,
    idleRightAnimationID: MoblinAnimation.IdleRight,
    idleRightDamagedAnimationID: MoblinAnimation.IdleRightDamaged,
    idleUpAnimationID: MoblinAnimation.IdleUp,
    idleUpDamagedAnimationID: MoblinAnimation.IdleUpDamaged,
    spriteInstanceID: moblinSpriteInstanceID,
  });
  state.setValues({ monsters });
};
