import { InputTickHandler } from "pigeon-mode-game-library";
import state from "../../state";

enum Direction {
  Down = "down",
  Left = "left",
  Right = "right",
  Up = "up",
}
const defineMain = (): void => {
  new InputTickHandler<Direction>({
    condition: (): boolean => !state.values.isAtTitle,
    groups: [
      {
        gamepadButtons: [13],
        id: Direction.Down,
        keys: ["ArrowDown", "KeyS"],
      },
      {
        gamepadButtons: [14],
        id: Direction.Left,
        keys: ["ArrowLeft", "KeyA"],
      },
      {
        gamepadButtons: [15],
        id: Direction.Right,
        keys: ["ArrowRight", "KeyD"],
      },
      {
        gamepadButtons: [12],
        id: Direction.Up,
        keys: ["ArrowUp", "KeyW"],
      },
    ],
    onTick: (direction: Direction | null): void => {
      switch (direction) {
        case Direction.Down:
          console.log("walk down");
          break;
        case Direction.Left:
          console.log("walk left");
          break;
        case Direction.Right:
          console.log("walk right");
          break;
        case Direction.Up:
          console.log("walk up");
          break;
      }
    },
  });
};

export default defineMain;
