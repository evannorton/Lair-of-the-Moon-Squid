import { ArrowAnimation } from "../types/animations";
import { Definable, getDefinable } from "../definables";
import { Direction, XDirection, YDirection } from "../types/Direction";
import {
  EntityPosition,
  OverlapData,
  createEntity,
  createSprite,
  getCurrentTime,
  getEntityPosition,
  moveEntity,
  removeEntity,
  stopEntity,
} from "pixel-pigeon";
import { EntityType } from "../types/EntityType";
import { Monster } from "./Monster";
import { Phase } from "../types/Phase";
import { aggroSquidArms } from "../functions/aggroSquidArms";
import { arrowBounceDuration } from "../constants/arrowBounceDuration";
import { arrowShootSpeed } from "../constants/arrowShootSpeed";
import { state } from "../state";

export class Arrow extends Definable {
  private _bouncedAt: number | null = null;
  private readonly _shootDirection: Direction = state.values.playerDirection;
  public constructor() {
    if (state.values.playerEntityID === null) {
      throw new Error("Attempted to construct Arrow with no player entity.");
    }
    const playerEntityPosition: EntityPosition | null = getEntityPosition(
      state.values.playerEntityID,
    );
    let x: number = playerEntityPosition.x;
    let y: number = playerEntityPosition.y;
    switch (state.values.playerDirection) {
      case XDirection.Left:
        x -= 16;
        break;
      case XDirection.Right:
        x += 16;
        break;
      case YDirection.Up:
        y -= 16;
        break;
      case YDirection.Down:
        y += 16;
        break;
    }
    const spriteID: string = createSprite({
      animationID: (): ArrowAnimation => {
        if (this._bouncedAt !== null) {
          // Play arrow bounce animation
          switch (this._shootDirection) {
            case XDirection.Left:
              return ArrowAnimation.BounceRight;
            case XDirection.Right:
              return ArrowAnimation.BounceLeft;
            case YDirection.Up:
              return ArrowAnimation.BounceDown;
            case YDirection.Down:
              return ArrowAnimation.BounceUp;
          }
        } else {
          // Play arrow shoot animation
          switch (this._shootDirection) {
            case XDirection.Left:
              return ArrowAnimation.ShootLeft;
            case XDirection.Right:
              return ArrowAnimation.ShootRight;
            case YDirection.Up:
              return ArrowAnimation.ShootUp;
            case YDirection.Down:
              return ArrowAnimation.ShootDown;
          }
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
          id: ArrowAnimation.ShootLeft,
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
          id: ArrowAnimation.ShootRight,
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
          id: ArrowAnimation.ShootUp,
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
          id: ArrowAnimation.ShootDown,
        },
        {
          frames: [
            {
              duration: arrowBounceDuration,
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 0,
              sourceY: 64,
              width: 16,
            },
            {
              duration: arrowBounceDuration,
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 16,
              sourceY: 64,
              width: 16,
            },
            {
              duration: arrowBounceDuration,
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 32,
              sourceY: 64,
              width: 16,
            },
          ],
          id: ArrowAnimation.BounceLeft,
        },
        {
          frames: [
            {
              duration: arrowBounceDuration,
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 0,
              sourceY: 80,
              width: 16,
            },
            {
              duration: arrowBounceDuration,
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 16,
              sourceY: 80,
              width: 16,
            },
            {
              duration: arrowBounceDuration,
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 32,
              sourceY: 80,
              width: 16,
            },
          ],
          id: ArrowAnimation.BounceRight,
        },
        {
          frames: [
            {
              duration: arrowBounceDuration,
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 0,
              sourceY: 96,
              width: 16,
            },
            {
              duration: arrowBounceDuration,
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 16,
              sourceY: 96,
              width: 16,
            },
            {
              duration: arrowBounceDuration,
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 32,
              sourceY: 96,
              width: 16,
            },
          ],
          id: ArrowAnimation.BounceUp,
        },
        {
          frames: [
            {
              duration: arrowBounceDuration,
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 0,
              sourceY: 112,
              width: 16,
            },
            {
              duration: arrowBounceDuration,
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 16,
              sourceY: 112,
              width: 16,
            },
            {
              duration: arrowBounceDuration,
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 32,
              sourceY: 112,
              width: 16,
            },
          ],
          id: ArrowAnimation.BounceDown,
        },
      ],
      imagePath: "arrow",
    });
    const entityID: string = createEntity({
      height: 16,
      layerID: "entities",
      levelID: "test_level",
      onOverlap: (overlapData: OverlapData): void => {
        if (this._bouncedAt === null) {
          let hitCount: number = 0;
          for (const entityCollidable of overlapData.entityCollidables) {
            if (entityCollidable.type === EntityType.Monster) {
              const monster: Monster = getDefinable(
                Monster,
                entityCollidable.entityID,
              );
              if (!monster.isInvincible()) {
                monster.takeHit();
                hitCount++;
                if (
                  state.values.phase === Phase.Phase1 &&
                  entityCollidable.entityID === state.values.squidHeadMonsterID
                ) {
                  aggroSquidArms();
                }
              }
            }
          }
          if (hitCount > 0) {
            this.remove();
          } else if (overlapData.map) {
            stopEntity(this._id);
            this._bouncedAt = getCurrentTime();
            switch (this._shootDirection) {
              case XDirection.Left:
                moveEntity(this._id, {
                  xVelocity: Math.floor(arrowShootSpeed / 2),
                });
                break;
              case XDirection.Right:
                moveEntity(this._id, {
                  xVelocity: -Math.floor(arrowShootSpeed / 2),
                });
                break;
              case YDirection.Up:
                moveEntity(this._id, {
                  yVelocity: Math.floor(arrowShootSpeed / 2),
                });
                break;
              case YDirection.Down:
                moveEntity(this._id, {
                  yVelocity: -Math.floor(arrowShootSpeed / 2),
                });
                break;
            }
          }
        }
      },
      position: {
        x,
        y,
      },
      sprites: [
        {
          spriteID,
        },
      ],
      type: "projectile",
      width: 16,
      zIndex: 2,
    });
    super(entityID);
    switch (state.values.playerDirection) {
      case XDirection.Left:
        moveEntity(this._id, {
          xVelocity: -arrowShootSpeed,
        });
        break;
      case XDirection.Right:
        moveEntity(this._id, { xVelocity: arrowShootSpeed });
        break;
      case YDirection.Up:
        moveEntity(this._id, {
          yVelocity: -arrowShootSpeed,
        });
        break;
      case YDirection.Down:
        moveEntity(this._id, { yVelocity: arrowShootSpeed });
        break;
    }
  }

  public remove(): void {
    super.remove();
    removeEntity(this._id);
  }

  public update(): void {
    if (
      this._bouncedAt !== null &&
      getCurrentTime() - this._bouncedAt >= arrowBounceDuration * 3
    ) {
      this.remove();
    }
  }
}
