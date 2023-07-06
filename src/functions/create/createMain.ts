import { XDirection, YDirection } from "../../types/Direction";
import {
  createInputTickHandler,
  createSprite,
  getInputTickHandlerGroupID,
  moveEntity,
  onTick,
  playSpriteAnimation,
  stopEntity,
} from "pigeon-mode-game-library";
import state from "../../state";

enum PlayerAnimation {
  IdleLeft = "idle-left",
  IdleRight = "idle-right",
  IdleUp = "idle-up",
  IdleDown = "idle-down",
  WalkLeft = "walk-left",
  WalkRight = "walk-right",
  WalkUp = "walk-up",
  WalkDown = "walk-down",
}
const createMain = (): void => {
  const walkDuration: number = 250;
  const playerEntityID: string = "player";
  const playerSpriteID: string = createSprite<PlayerAnimation>({
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
        id: PlayerAnimation.IdleLeft,
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
        id: PlayerAnimation.IdleRight,
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
        id: PlayerAnimation.IdleUp,
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
        id: PlayerAnimation.IdleDown,
      },
      {
        frames: [
          {
            duration: walkDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 64,
            width: 16,
          },
          {
            duration: walkDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 64,
            width: 16,
          },
        ],
        id: PlayerAnimation.WalkLeft,
      },
      {
        frames: [
          {
            duration: walkDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 80,
            width: 16,
          },
          {
            duration: walkDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 80,
            width: 16,
          },
        ],
        id: PlayerAnimation.WalkRight,
      },
      {
        frames: [
          {
            duration: walkDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 96,
            width: 16,
          },
          {
            duration: walkDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 96,
            width: 16,
          },
        ],
        id: PlayerAnimation.WalkUp,
      },
      {
        frames: [
          {
            duration: walkDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 0,
            sourceY: 112,
            width: 16,
          },
          {
            duration: walkDuration,
            height: 16,
            sourceHeight: 16,
            sourceWidth: 16,
            sourceX: 16,
            sourceY: 112,
            width: 16,
          },
        ],
        id: PlayerAnimation.WalkDown,
      },
    ],
    defaultAnimationID: PlayerAnimation.IdleDown,
    imagePath: "player",
  });
  const xInputTickHandlerID: string = createInputTickHandler<XDirection>({
    groups: [
      {
        gamepadButtons: [14],
        id: XDirection.Left,
        keys: ["ArrowLeft", "KeyA"],
      },
      {
        gamepadButtons: [15],
        id: XDirection.Right,
        keys: ["ArrowRight", "KeyD"],
      },
    ],
  });
  const yInputTickHandlerID: string = createInputTickHandler<YDirection>({
    groups: [
      {
        gamepadButtons: [13],
        id: YDirection.Down,
        keys: ["ArrowDown", "KeyS"],
      },
      {
        gamepadButtons: [12],
        id: YDirection.Up,
        keys: ["ArrowUp", "KeyW"],
      },
    ],
  });
  onTick((): void => {
    if (!state.values.isAtTitle) {
      const xDirection: XDirection | null =
        getInputTickHandlerGroupID<XDirection>(xInputTickHandlerID);
      const yDirection: YDirection | null =
        getInputTickHandlerGroupID<YDirection>(yInputTickHandlerID);
      stopEntity(playerEntityID, {
        x: true,
        y: true,
      });
      const xVelocity: number =
        xDirection === XDirection.Left
          ? -64
          : xDirection === XDirection.Right
          ? 64
          : 0;
      const yVelocity: number =
        yDirection === YDirection.Up
          ? -64
          : yDirection === YDirection.Down
          ? 64
          : 0;
      moveEntity(playerEntityID, {
        xVelocity,
        yVelocity,
      });
      if (yDirection !== null) {
        state.setValues({ direction: yDirection });
      } else if (xDirection !== null) {
        state.setValues({ direction: xDirection });
      }
      if (xVelocity !== 0 || yVelocity !== 0) {
        switch (state.values.direction) {
          case XDirection.Left:
            playSpriteAnimation(playerSpriteID, PlayerAnimation.WalkLeft);
            break;
          case XDirection.Right:
            playSpriteAnimation(playerSpriteID, PlayerAnimation.WalkRight);
            break;
          case YDirection.Down:
            playSpriteAnimation(playerSpriteID, PlayerAnimation.WalkDown);
            break;
          case YDirection.Up:
            playSpriteAnimation(playerSpriteID, PlayerAnimation.WalkUp);
            break;
        }
      } else {
        switch (state.values.direction) {
          case XDirection.Left:
            playSpriteAnimation(playerSpriteID, PlayerAnimation.IdleLeft);
            break;
          case XDirection.Right:
            playSpriteAnimation(playerSpriteID, PlayerAnimation.IdleRight);
            break;
          case YDirection.Down:
            playSpriteAnimation(playerSpriteID, PlayerAnimation.IdleDown);
            break;
          case YDirection.Up:
            playSpriteAnimation(playerSpriteID, PlayerAnimation.IdleUp);
            break;
        }
      }
    }
  });
};

export default createMain;
