import {
  addInputTickHandler,
  moveEntity,
  stopEntity,
} from "pigeon-mode-game-library";
import state from "../../state";

enum XDirection {
  Left = "left",
  Right = "right",
}
enum YDirection {
  Down = "down",
  Up = "up",
}
const defineMain = (): void => {
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
};

export default defineMain;
