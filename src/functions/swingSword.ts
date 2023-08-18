import {
  CollisionData,
  createSpriteInstance,
  getCurrentTime,
  spawnEntity,
} from "pigeon-mode-game-framework";
import { CollisionLayer } from "../types/CollisionLayer";
import { Monster } from "../types/Monster";
import { Sword } from "../types/Sword";
import { knockbackDuration } from "../constants/knockbackDuration";
import { state } from "../state";
import { swordSpriteID } from "../game/main/sprites";

export const swingSword = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error("An sword input was received with no player entity.");
  }
  const swordSpriteInstanceID: string = createSpriteInstance({
    spriteID: swordSpriteID,
  });
  const swordEntityID: string = spawnEntity<CollisionLayer>({
    collidables: [{ collisionLayer: CollisionLayer.Monster }],
    collisionLayer: CollisionLayer.Projectile,
    height: 16,
    layerID: "entities",
    onCollision: (data: CollisionData): void => {
      const sword: Sword | null =
        state.values.swords.get(swordEntityID) ?? null;
      if (sword === null) {
        throw new Error(
          "An sword collided with an entity instance, but the sword could not be found in state.",
        );
      }
      for (const entityCollidable of data.entityCollidables) {
        const monster: Monster<string> | null =
          state.values.monsters.get(entityCollidable.entityID) ?? null;
        if (
          monster !== null &&
          (monster.hit === null ||
            getCurrentTime() - monster.hit.time >= knockbackDuration)
        ) {
          monster.hit = {
            direction: state.values.direction,
            time: getCurrentTime(),
          };
        }
      }
    },
    spriteInstanceID: swordSpriteInstanceID,
    width: 16,
    zIndex: 3,
  });
  const swords: Map<string, Sword> = new Map(state.values.swords);
  swords.set(swordEntityID, {
    entityID: swordEntityID,
    spriteInstanceID: swordSpriteInstanceID,
    swungAt: getCurrentTime(),
  });
  state.setValues({
    swords,
    swungSwordAt: getCurrentTime(),
  });
};
