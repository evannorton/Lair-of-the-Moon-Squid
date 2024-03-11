import { Definable } from "../definables";
import { Direction, XDirection, YDirection } from "../types/Direction";
import { EntityType } from "../types/EntityType";
import { Hit } from "../types/Hit";
import { MonsterAnimation } from "../types/animations";
import {
  createEntity,
  createSprite,
  getCurrentTime,
  isEntityPathing,
  moveEntity,
  pathEntity,
  stopEntity,
} from "pixel-pigeon";
import { invincibilityDuration } from "../constants/invincibilityDuration";
import { knockbackDuration } from "../constants/knockbackDuration";
import { movementSpeed } from "../constants/movementSpeed";
import { state } from "../state";

interface MonsterOptions {
  imagePath: string;
  x: number;
  y: number;
}

export class Monster extends Definable {
  private readonly _direction: Direction = YDirection.Down;
  private _hit: Hit | null = null;

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
      velocity: movementSpeed,
      x,
      y,
    });
  }

  public takeHit(): void {
    this._hit = {
      direction: state.values.playerDirection,
      time: getCurrentTime(),
    };
  }

  public update(): void {
    if (this.isTakingKnockback()) {
      stopEntity(this._id);
      if (this._hit !== null) {
        switch (this._hit.direction) {
          case XDirection.Left:
            moveEntity(this._id, {
              xVelocity: -movementSpeed,
            });
            break;
          case XDirection.Right:
            moveEntity(this._id, {
              xVelocity: movementSpeed,
            });
            break;
          case YDirection.Up:
            moveEntity(this._id, {
              yVelocity: -movementSpeed,
            });
            break;
          case YDirection.Down:
            moveEntity(this._id, {
              yVelocity: movementSpeed,
            });
            break;
        }
      }
    } else {
      if (!isEntityPathing(this._id)) {
        stopEntity(this._id);
      }
    }
  }
}
