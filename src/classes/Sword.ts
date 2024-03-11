import { Definable, getDefinable } from "../definables";
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
import { Monster } from "./Monster";
import { Phase } from "../types/Phase";
import { SwordAnimation } from "../types/animations";
import { XDirection, YDirection } from "../types/Direction";
import { aggroSquidArms } from "../functions/aggroSquidArms";
import { getPlayerPosition } from "../functions/getPlayerPosition";
import { state } from "../state";
import { swordSwingDuration } from "../constants/swordSwingDuration";
import { wanderMonsterAtSquidHead } from "../functions/wanderMonsterAtSquidHead";

export class Sword extends Definable {
  private readonly _swungAt: number = getCurrentTime();
  public constructor() {
    if (state.values.playerEntityID === null) {
      throw new Error("Attempted to construct Sword with no player entity.");
    }
    const spriteID: string = createSprite({
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
    const entityID: string = createEntity({
      height: 16,
      layerID: "entities",
      levelID: "test_level",
      onOverlap: (overlapData: OverlapData): void => {
        for (const entityCollidable of overlapData.entityCollidables) {
          if (entityCollidable.type === EntityType.Monster) {
            const monster: Monster = getDefinable(
              Monster,
              entityCollidable.entityID,
            );
            if (!monster.isInvincible()) {
              monster.takeHit();
              if (
                state.values.phase === Phase.Phase1 &&
                entityCollidable.entityID === state.values.squidHeadMonsterID
              ) {
                aggroSquidArms();
              }
              if (
                state.values.phase === Phase.Phase1 &&
                state.values.squidArmsMonsterIDs.includes(
                  entityCollidable.entityID,
                )
              ) {
                wanderMonsterAtSquidHead(entityCollidable.entityID);
              }
            }
          }
        }
      },
      position: getEntityPosition(state.values.playerEntityID),
      sprites: [{ spriteID }],
      type: EntityType.Projectile,
      width: 16,
      zIndex: 3,
    });
    super(entityID);
  }

  public remove(): void {
    super.remove();
    removeEntity(this._id);
  }

  public update(): void {
    const currentTime: number = getCurrentTime();
    if (currentTime - this._swungAt >= swordSwingDuration) {
      this.remove();
    } else {
      const diff: number = getCurrentTime() - this._swungAt;
      const frame: number = Math.floor((diff / swordSwingDuration) * 3);
      const playerEntityPosition: EntityPosition = getPlayerPosition();
      switch (state.values.playerDirection) {
        case XDirection.Left:
          switch (frame) {
            case 0:
              setEntityPosition(this._id, {
                x: playerEntityPosition.x,
                y: playerEntityPosition.y - 16,
              });
              break;
            case 1:
              setEntityPosition(this._id, {
                x: playerEntityPosition.x - 13,
                y: playerEntityPosition.y - 13,
              });
              break;
            case 2:
              setEntityPosition(this._id, {
                x: playerEntityPosition.x - 16,
                y: playerEntityPosition.y,
              });
              break;
          }
          break;
        case XDirection.Right:
          switch (frame) {
            case 0:
              setEntityPosition(this._id, {
                x: playerEntityPosition.x,
                y: playerEntityPosition.y - 16,
              });
              break;
            case 1:
              setEntityPosition(this._id, {
                x: playerEntityPosition.x + 13,
                y: playerEntityPosition.y - 13,
              });
              break;
            case 2:
              setEntityPosition(this._id, {
                x: playerEntityPosition.x + 16,
                y: playerEntityPosition.y,
              });
              break;
          }
          break;
        case YDirection.Up:
          switch (frame) {
            case 0:
              setEntityPosition(this._id, {
                x: playerEntityPosition.x + 16,
                y: playerEntityPosition.y,
              });
              break;
            case 1:
              setEntityPosition(this._id, {
                x: playerEntityPosition.x + 13,
                y: playerEntityPosition.y - 13,
              });
              break;
            case 2:
              setEntityPosition(this._id, {
                x: playerEntityPosition.x,
                y: playerEntityPosition.y - 16,
              });
              break;
          }
          break;
        case YDirection.Down:
          switch (frame) {
            case 0:
              setEntityPosition(this._id, {
                x: playerEntityPosition.x - 16,
                y: playerEntityPosition.y,
              });
              break;
            case 1:
              setEntityPosition(this._id, {
                x: playerEntityPosition.x - 13,
                y: playerEntityPosition.y + 13,
              });
              break;
            case 2:
              setEntityPosition(this._id, {
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
