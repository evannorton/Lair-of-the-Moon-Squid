import { CollisionLayer } from "../types/CollisionLayer";
import { MoblinAnimation, moblinSpriteID } from "../game/main/sprites";
import { Monster } from "../types/Monster";
import { YDirection } from "../types/Direction";
import {
  createSpriteInstance,
  goToLevel,
  lockCameraToEntity,
  spawnEntity,
} from "pigeon-mode-game-framework";
import { playerSpriteInstanceID } from "../game/main/spriteInstances";
import { state } from "../state";

export const startMainGame = (): void => {
  state.setValues({ isAtTitle: false });
  goToLevel("test_level");
  const playerEntityID: string = spawnEntity<CollisionLayer>({
    collisionLayers: [CollisionLayer.Player],
    height: 16,
    layerID: "entities",
    spriteInstanceID: playerSpriteInstanceID,
    width: 16,
    x: 0,
    y: 0,
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
    collisionLayers: [CollisionLayer.Monster],
    height: 16,
    layerID: "entities",
    spriteInstanceID: moblinSpriteInstanceID,
    width: 16,
    x: 64,
    y: 64,
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
