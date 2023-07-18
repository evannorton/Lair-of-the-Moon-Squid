import { ArrowAnimation, PlayerAnimation } from "./game/main/sprites";
import { XDirection, YDirection } from "./types/Direction";
import {
  init,
  isEntityInstanceMoving,
  onTick,
  playSpriteInstanceAnimation,
} from "pigeon-mode-game-framework";
import { isMainGameOngoing } from "./game/main/conditions";
import { playerSpriteInstanceID } from "./game/main/spriteInstances";
import { titleSpriteInstanceID } from "./game/title/spriteInstances";
import isShootingArrow from "./functions/isShootingArrow";
import movePlayer from "./functions/movePlayer";
import state from "./state";
import stopPlayer from "./functions/stopPlayer";

const run = (): void => {
  console.log("Moon Squid is running!");
  init();
  playSpriteInstanceAnimation({
    animationID: "title",
    spriteInstanceID: titleSpriteInstanceID,
  });
  onTick((): void => {
    if (isMainGameOngoing()) {
      if (state.values.playerEntityInstanceID === null) {
        throw new Error(
          "An attempt was made to update the main game with no player entity instance"
        );
      }
      stopPlayer();
      if (!isShootingArrow()) {
        movePlayer();
      }
      // Play player walk animation
      if (isEntityInstanceMoving(state.values.playerEntityInstanceID)) {
        switch (state.values.direction) {
          case XDirection.Left:
            playSpriteInstanceAnimation({
              animationID: PlayerAnimation.WalkLeft,
              spriteInstanceID: playerSpriteInstanceID,
            });
            break;
          case XDirection.Right:
            playSpriteInstanceAnimation({
              animationID: PlayerAnimation.WalkRight,
              spriteInstanceID: playerSpriteInstanceID,
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation({
              animationID: PlayerAnimation.WalkDown,
              spriteInstanceID: playerSpriteInstanceID,
            });
            break;
          case YDirection.Up:
            playSpriteInstanceAnimation({
              animationID: PlayerAnimation.WalkUp,
              spriteInstanceID: playerSpriteInstanceID,
            });
            break;
        }
      }
      // Play player idle animation
      else {
        switch (state.values.direction) {
          case XDirection.Left:
            playSpriteInstanceAnimation({
              animationID: PlayerAnimation.IdleLeft,
              spriteInstanceID: playerSpriteInstanceID,
            });
            break;
          case XDirection.Right:
            playSpriteInstanceAnimation({
              animationID: PlayerAnimation.IdleRight,
              spriteInstanceID: playerSpriteInstanceID,
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation({
              animationID: PlayerAnimation.IdleDown,
              spriteInstanceID: playerSpriteInstanceID,
            });
            break;
          case YDirection.Up:
            playSpriteInstanceAnimation({
              animationID: PlayerAnimation.IdleUp,
              spriteInstanceID: playerSpriteInstanceID,
            });
            break;
        }
      }
      // Play arrow animations
      for (const arrow of state.values.arrows) {
        switch (arrow.direction) {
          case XDirection.Left:
            playSpriteInstanceAnimation({
              animationID: ArrowAnimation.Left,
              spriteInstanceID: arrow.spriteInstanceID,
            });
            break;
          case XDirection.Right:
            playSpriteInstanceAnimation({
              animationID: ArrowAnimation.Right,
              spriteInstanceID: arrow.spriteInstanceID,
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation({
              animationID: ArrowAnimation.Down,
              spriteInstanceID: arrow.spriteInstanceID,
            });
            break;
          case YDirection.Up:
            playSpriteInstanceAnimation({
              animationID: ArrowAnimation.Up,
              spriteInstanceID: arrow.spriteInstanceID,
            });
            break;
        }
      }
    }
  });
};

export default run;
