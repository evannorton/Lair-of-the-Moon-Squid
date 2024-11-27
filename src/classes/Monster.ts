import { Definable } from "definables";
import { Direction, XDirection, YDirection } from "../types/Direction";
import {
  EntityPosition,
  addEntitySprite,
  createEntity,
  createSprite,
  getActiveLevelID,
  getCurrentTime,
  getEntityCalculatedPath,
  getEntityPosition,
  isEntityPathing,
  isRectangleInLevel,
  moveEntity,
  pathEntity,
  removeEntity,
  removeEntitySprite,
  stopEntity,
} from "pixel-pigeon";
import { EntityType } from "../types/EntityType";
import { Hit } from "../types/Hit";
import { MonsterAnimation } from "../types/animations";
import { deathAnimationDuration } from "../constants/deathAnimationDuration";
import { getPlayerPosition } from "../functions/getPlayerPosition";
import { invincibilityDuration } from "../constants/invincibilityDuration";
import { knockbackDuration } from "../constants/knockbackDuration";
import { knockbackSpeed } from "../constants/knockbackSpeed";
import { state } from "../state";

interface Wander {
  chasePlayerChance: number;
  entityID: string;
  radius: number;
}

export interface MonsterOptions {
  imagePath: string;
  maxHP: number;
  movementSpeed: number;
  x: number;
  y: number;
}
export class Monster extends Definable {
  private readonly _direction: Direction = YDirection.Down;
  private _hit: Hit | null = null;
  private _hp: number;
  private _isChasingPlayer: boolean = false;
  private _killedAt: number | null = null;
  private readonly _maxHP: number;
  private readonly _movementSpeed: number;
  private readonly _spriteID: string;
  private _wander: Wander | null = null;

  public constructor(options: MonsterOptions) {
    const spriteID: string = createSprite({
      animationID: (): MonsterAnimation => {
        // Play monster idle animation
        switch (this._direction) {
          case XDirection.Left:
            if (this.isInvincible()) {
              return MonsterAnimation.IdleLeftInvincible;
            }
            return MonsterAnimation.IdleLeft;
          case XDirection.Right:
            if (this.isInvincible()) {
              return MonsterAnimation.IdleRightInvincible;
            }
            return MonsterAnimation.IdleRight;
          case YDirection.Up:
            if (this.isInvincible()) {
              return MonsterAnimation.IdleUpInvincible;
            }
            return MonsterAnimation.IdleUp;
          case YDirection.Down:
            if (this.isInvincible()) {
              return MonsterAnimation.IdleDownInvincible;
            }
            return MonsterAnimation.IdleDown;
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
          id: MonsterAnimation.IdleLeft,
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
          id: MonsterAnimation.IdleRight,
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
          id: MonsterAnimation.IdleUp,
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
          id: MonsterAnimation.IdleDown,
        },
        {
          frames: [
            {
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 0,
              sourceY: 128,
              width: 16,
            },
          ],
          id: MonsterAnimation.IdleLeftInvincible,
        },
        {
          frames: [
            {
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 0,
              sourceY: 144,
              width: 16,
            },
          ],
          id: MonsterAnimation.IdleRightInvincible,
        },
        {
          frames: [
            {
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 0,
              sourceY: 160,
              width: 16,
            },
          ],
          id: MonsterAnimation.IdleUpInvincible,
        },
        {
          frames: [
            {
              height: 16,
              sourceHeight: 16,
              sourceWidth: 16,
              sourceX: 0,
              sourceY: 176,
              width: 16,
            },
          ],
          id: MonsterAnimation.IdleDownInvincible,
        },
      ],
      imagePath: options.imagePath,
    });
    const entityID: string = createEntity({
      collidableEntityTypes: [EntityType.Monster],
      collidesWithMap: true,
      height: 16,
      layerID: "entities",
      levelID: "test_level",
      position: {
        x: options.x,
        y: options.y,
      },
      sprites: [
        {
          spriteID,
        },
      ],
      type: EntityType.Monster,
      width: 16,
      zIndex: 0,
    });
    super(entityID);
    this._spriteID = spriteID;
    this._maxHP = options.maxHP;
    this._hp = this._maxHP;
    this._movementSpeed = options.movementSpeed;
  }

  public chasePlayer(): void {
    this._isChasingPlayer = true;
    this._wander = null;
  }

  public isAlive(): boolean {
    return this._killedAt === null;
  }

  public isInvincible(): boolean {
    return (
      this._hit !== null &&
      getCurrentTime() - this._hit.time < invincibilityDuration
    );
  }

  public isTakingKnockback(): boolean {
    return (
      this._hit !== null &&
      getCurrentTime() - this._hit.time < knockbackDuration
    );
  }

  public pathToCoordinates(x: number, y: number): void {
    pathEntity(this._id, {
      velocity: this._movementSpeed,
      x,
      y,
    });
  }

  public remove(): void {
    super.remove();
    removeEntity(this._id);
    if (state.values.squidHeadMonsterID === this._id) {
      state.setValues({
        squidHeadMonsterID: null,
      });
    }
    if (state.values.squidArmsMonsterIDs.includes(this._id)) {
      state.setValues({
        squidArmsMonsterIDs: state.values.squidArmsMonsterIDs.filter(
          (id: string): boolean => id !== this._id,
        ),
      });
    }
  }

  public takeHit(): void {
    if (this.isAlive()) {
      this._hit = {
        direction: state.values.playerDirection,
        time: getCurrentTime(),
      };
      this._hp = Math.max(this._hp - 1, 0);
      if (this._hp === 0) {
        const duration: number = deathAnimationDuration / 4;
        const spriteID: string = createSprite({
          animationID: "default",
          animations: [
            {
              frames: [
                {
                  duration,
                  height: 16,
                  sourceHeight: 16,
                  sourceWidth: 16,
                  sourceX: 0,
                  sourceY: 0,
                  width: 16,
                },
                {
                  duration,
                  height: 16,
                  sourceHeight: 16,
                  sourceWidth: 16,
                  sourceX: 16,
                  sourceY: 0,
                  width: 16,
                },
                {
                  duration,
                  height: 16,
                  sourceHeight: 16,
                  sourceWidth: 16,
                  sourceX: 32,
                  sourceY: 0,
                  width: 16,
                },
                {
                  height: 16,
                  sourceHeight: 16,
                  sourceWidth: 16,
                  sourceX: 48,
                  sourceY: 0,
                  width: 16,
                },
              ],
              id: "default",
            },
          ],
          imagePath: "monster-death",
        });
        addEntitySprite(this._id, { spriteID });
        removeEntitySprite(this._id, this._spriteID);
        this._killedAt = getCurrentTime();
        stopEntity(this._id);
      }
    }
  }

  public update(): void {
    const levelID: string | null = getActiveLevelID();
    if (levelID === null) {
      throw new Error(
        `Attempted to update Monster "${this._id}" with no active level.`,
      );
    }
    if (
      this._killedAt !== null &&
      getCurrentTime() > this._killedAt + deathAnimationDuration
    ) {
      this.remove();
    } else if (this.isAlive()) {
      if (this.isTakingKnockback()) {
        if (this._hit !== null) {
          switch (this._hit.direction) {
            case XDirection.Left:
              moveEntity(this._id, {
                xVelocity: -knockbackSpeed,
              });
              break;
            case XDirection.Right:
              moveEntity(this._id, {
                xVelocity: knockbackSpeed,
              });
              break;
            case YDirection.Up:
              moveEntity(this._id, {
                yVelocity: -knockbackSpeed,
              });
              break;
            case YDirection.Down:
              moveEntity(this._id, {
                yVelocity: knockbackSpeed,
              });
              break;
          }
        }
      } else if (this._wander !== null && isEntityPathing(this._id) === false) {
        let chasePosition: [number, number] | null = null;
        if (Math.random() < this._wander.chasePlayerChance) {
          const playerPosition: EntityPosition = getPlayerPosition();
          const path: readonly EntityPosition[] = getEntityCalculatedPath(
            this._id,
            playerPosition,
          );
          if (path.length > 1) {
            chasePosition = [(path[1] as EntityPosition).x, (path[1] as EntityPosition).y];
          }
        }
        if (chasePosition !== null) {
          this.pathToCoordinates(chasePosition[0], chasePosition[1]);
        } else {
          const radiusPX: number = this._wander.radius * 16;
          const entityPosition: EntityPosition = this.getPosition();
          const centerPosition: EntityPosition = getEntityPosition(
            this._wander.entityID,
          );
          const positions: [number, number][] = [];
          for (
            let y: number = centerPosition.y - radiusPX;
            y <= centerPosition.y + radiusPX;
            y += 16
          ) {
            for (
              let x: number = centerPosition.x - radiusPX;
              x <= centerPosition.x + radiusPX;
              x += 16
            ) {
              if (
                (x !== entityPosition.x || y !== entityPosition.y) &&
                isRectangleInLevel({
                  levelID,
                  rectangle: {
                    height: 16,
                    width: 16,
                    x,
                    y,
                  },
                })
              ) {
                positions.push([x, y]);
              }
            }
          }
          positions.sort((): number => Math.random() - 0.5);
          const position: [number, number] | null =
            positions.find(([x, y]: [number, number]): boolean => {
              const path: readonly EntityPosition[] = getEntityCalculatedPath(this._id, {
                x,
                y,
              });
              return path.length > 0;
            }) ?? null;
          if (position !== null) {
            this.pathToCoordinates(position[0], position[1]);
          }
        }
      } else if (this._isChasingPlayer && isEntityPathing(this._id) === false) {
        const playerPosition: EntityPosition = getPlayerPosition();
        const path: readonly EntityPosition[] = getEntityCalculatedPath(
          this._id,
          playerPosition,
        );
        if (path.length > 1) {
          this.pathToCoordinates((path[1] as EntityPosition).x, (path[1] as EntityPosition).y);
        }
      } else if (isEntityPathing(this._id) === false) {
        stopEntity(this._id);
      }
    }
  }

  public wander(
    entityID: string,
    radius: number,
    chasePlayerChance: number,
  ): void {
    this._isChasingPlayer = false;
    this._wander = {
      chasePlayerChance,
      entityID,
      radius,
    };
  }

  private getPosition(): EntityPosition {
    return getEntityPosition(this._id);
  }
}
