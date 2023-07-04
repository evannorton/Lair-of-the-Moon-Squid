import { XDirection, YDirection } from "../../types/Direction";
import {
  addInputTickHandler,
  addSprite,
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
const addMain = (): void => {
  const walkDuration: number = 250;
  addSprite<PlayerAnimation>({
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
  addInputTickHandler<XDirection>({
    condition: (): boolean => !state.values.isAtTitle,
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
    onTick: (direction: XDirection | null): void => {
      state.setValues({ xDirection: direction });
      stopEntity("player", {
        x: true,
      });
      switch (direction) {
        case XDirection.Left:
          moveEntity("player", {
            xVelocity: -64,
          });
          break;
        case XDirection.Right:
          moveEntity("player", {
            xVelocity: 64,
          });
          break;
      }
    },
  });
  addInputTickHandler<YDirection>({
    condition: (): boolean => !state.values.isAtTitle,
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
    onTick: (direction: YDirection | null): void => {
      state.setValues({ yDirection: direction });
      stopEntity("player", {
        y: true,
      });
      switch (direction) {
        case YDirection.Down:
          moveEntity("player", {
            yVelocity: 64,
          });
          break;
        case YDirection.Up:
          moveEntity("player", {
            yVelocity: -64,
          });
          break;
      }
    },
  });
  onTick((): void => {
    if (!state.values.isAtTitle) {
      if (state.values.yDirection !== null) {
        state.setValues({ direction: state.values.yDirection });
      } else if (state.values.xDirection !== null) {
        state.setValues({ direction: state.values.xDirection });
      }
      switch (state.values.direction) {
        case XDirection.Left:
          playSpriteAnimation("player", PlayerAnimation.IdleLeft);
          break;
        case XDirection.Right:
          playSpriteAnimation("player", PlayerAnimation.IdleRight);
          break;
        case YDirection.Down:
          playSpriteAnimation("player", PlayerAnimation.IdleDown);
          break;
        case YDirection.Up:
          playSpriteAnimation("player", PlayerAnimation.IdleUp);
          break;
      }
    }
  });
};

export default addMain;
