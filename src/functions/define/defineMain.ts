import { Axis, InputTickHandler, moveEntity } from "pigeon-mode-game-library";
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
  new InputTickHandler<XDirection>({
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
      switch (direction) {
        case XDirection.Left:
          moveEntity("player", Axis.X, -64);
          break;
        case XDirection.Right:
          moveEntity("player", Axis.X, 64);
          break;
      }
    },
  });
  new InputTickHandler<YDirection>({
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
      switch (direction) {
        case YDirection.Down:
          moveEntity("player", Axis.Y, 64);
          break;
        case YDirection.Up:
          moveEntity("player", Axis.Y, -64);
          break;
      }
    },
  });
};

export default defineMain;
