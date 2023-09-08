import { CollisionLayer } from "../types/CollisionLayer";
import {
  EntityCollidable,
  OverlapData,
  getCurrentTime,
  lockCameraToEntity,
  spawnEntity,
} from "pigeon-mode-game-framework";
import { Monster } from "../types/Monster";
import { getOppositeDirection } from "../functions/getOppositeDirection";
import { isPlayerInvincible } from "./isPlayerInvincible";
import { playerSpriteInstanceID } from "../game/main/spriteInstances";
import { state } from "../state";

export const createPlayer = (): void => {
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
          state.values.monsters.find(
            (monsterInState: Monster<string>): boolean =>
              monsterInState.entityID === entityCollidable.entityID,
          ) ?? null;
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
  lockCameraToEntity(playerEntityID);
  state.setValues({
    playerEntityID,
  });
};
