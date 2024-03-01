import { Definable } from "../definables";
import {
  EntityPosition,
  OverlapData,
  createEntity,
  createSprite,
  getCurrentTime,
  getEntityPosition,
  removeEntity,
  setEntityPosition,
} from "pixel-pigeon";
import { EntityType } from "../types/EntityType";
import { Monster } from "../types/Monster";
import { SwordAnimation } from "../types/animations";
import { XDirection, YDirection } from "../types/Direction";
import { isMonsterInvincible } from "../functions/isMonsterInvincible";
import { state } from "../state";
import { swordSwingDuration } from "../constants/swordSwingDuration";

export class Sword extends Definable {
  private readonly _entityID: string;
  private readonly _monstersHitAt: Map<string, number | null> = new Map();
  private readonly _swungAt: number = getCurrentTime();
  public constructor() {
    if (state.values.playerEntityID === null) {
      throw new Error("Attempted to construct Sword with no player entity.");
    }
    super();
    const swordSpriteID: string = createSprite({
      animationID: (): SwordAnimation => {
        const diff: number = getCurrentTime() - this._swungAt;
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
    this._entityID = createEntity({
      height: 16,
      layerID: "entities",
      levelID: "test_level",
      onOverlap: (overlapData: OverlapData): void => {
        for (const entityCollidable of overlapData.entityCollidables) {
          if (entityCollidable.type === EntityType.Monster) {
            const monster: Monster<SwordAnimation> | null =
              (state.values.monsters.find(
                (monsterInState: Monster<string>): boolean =>
                  monsterInState.entityID === entityCollidable.entityID,
              ) ?? null) as Monster<SwordAnimation> | null;
            if (monster !== null) {
              const hitAt: number | null =
                this._monstersHitAt.get(monster.entityID) ?? null;
              if (hitAt === null && !isMonsterInvincible(monster)) {
                this._monstersHitAt.set(monster.entityID, getCurrentTime());
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
  }

  public remove(): void {
    super.remove();
    removeEntity(this._entityID);
  }

  public update(): void {
    if (state.values.playerEntityID === null) {
      throw new Error("Attempted to update Arrow with no player entity.");
    }
    const currentTime: number = getCurrentTime();
    if (currentTime - this._swungAt >= swordSwingDuration) {
      this.remove();
    } else {
      const diff: number = getCurrentTime() - this._swungAt;
      const frame: number = Math.floor((diff / swordSwingDuration) * 3);
      const playerEntityPosition: EntityPosition = getEntityPosition(
        state.values.playerEntityID,
      );
      switch (state.values.playerDirection) {
        case XDirection.Left:
          switch (frame) {
            case 0:
              setEntityPosition(this._entityID, {
                x: playerEntityPosition.x,
                y: playerEntityPosition.y - 16,
              });
              break;
            case 1:
              setEntityPosition(this._entityID, {
                x: playerEntityPosition.x - 13,
                y: playerEntityPosition.y - 13,
              });
              break;
            case 2:
              setEntityPosition(this._entityID, {
                x: playerEntityPosition.x - 16,
                y: playerEntityPosition.y,
              });
              break;
          }
          break;
        case XDirection.Right:
          switch (frame) {
            case 0:
              setEntityPosition(this._entityID, {
                x: playerEntityPosition.x,
                y: playerEntityPosition.y - 16,
              });
              break;
            case 1:
              setEntityPosition(this._entityID, {
                x: playerEntityPosition.x + 13,
                y: playerEntityPosition.y - 13,
              });
              break;
            case 2:
              setEntityPosition(this._entityID, {
                x: playerEntityPosition.x + 16,
                y: playerEntityPosition.y,
              });
              break;
          }
          break;
        case YDirection.Up:
          switch (frame) {
            case 0:
              setEntityPosition(this._entityID, {
                x: playerEntityPosition.x + 16,
                y: playerEntityPosition.y,
              });
              break;
            case 1:
              setEntityPosition(this._entityID, {
                x: playerEntityPosition.x + 13,
                y: playerEntityPosition.y - 13,
              });
              break;
            case 2:
              setEntityPosition(this._entityID, {
                x: playerEntityPosition.x,
                y: playerEntityPosition.y - 16,
              });
              break;
          }
          break;
        case YDirection.Down:
          switch (frame) {
            case 0:
              setEntityPosition(this._entityID, {
                x: playerEntityPosition.x - 16,
                y: playerEntityPosition.y,
              });
              break;
            case 1:
              setEntityPosition(this._entityID, {
                x: playerEntityPosition.x - 13,
                y: playerEntityPosition.y + 13,
              });
              break;
            case 2:
              setEntityPosition(this._entityID, {
                x: playerEntityPosition.x,
                y: playerEntityPosition.y + 16,
              });
              break;
          }
          break;
      }
    }
  }
}
