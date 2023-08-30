import { CollisionLayer } from "../types/CollisionLayer";
import { Monster } from "../types/Monster";
import {
  OverlapData,
  createSpriteInstance,
  getCurrentTime,
  spawnEntity,
} from "pigeon-mode-game-framework";
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
  const swordEntityID: string = spawnEntity({
    height: 16,
    layerID: "entities",
    onOverlap: (overlapData: OverlapData<CollisionLayer>): void => {
      const sword: Sword | null =
        state.values.swords.get(swordEntityID) ?? null;
      if (sword === null) {
        throw new Error(
          "An sword collided with an entity instance, but the sword could not be found in state.",
        );
      }
      for (const entityCollidable of overlapData.entityCollidables) {
        if (entityCollidable.collisionLayer === CollisionLayer.Monster) {
          const monster: Monster<string> | null =
            state.values.monsters.get(entityCollidable.entityID) ?? null;
          if (monster !== null) {
            const hitAt: number | null =
              sword.monstersHitAt.get(monster.entityID) ?? null;
            if (hitAt === null) {
              sword.monstersHitAt.set(monster.entityID, getCurrentTime());
              if (
                monster.hit === null ||
                getCurrentTime() - monster.hit.time >= knockbackDuration
              ) {
                monster.hit = {
                  direction: state.values.playerDirection,
                  time: getCurrentTime(),
                };
              }
            }
          }
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
    monstersHitAt: new Map(),
    spriteInstanceID: swordSpriteInstanceID,
    swungAt: getCurrentTime(),
  });
  state.setValues({
    swords,
    swungSwordAt: getCurrentTime(),
  });
};
