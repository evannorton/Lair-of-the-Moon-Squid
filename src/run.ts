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
import { isShootingArrow } from "./functions/isShootingArrow";
import { movePlayer } from "./functions/movePlayer";
import { state } from "./state";
import { stopPlayer } from "./functions/stopPlayer";

export const run = (): void => {
  console.log("Moon Squid is running!");
  init();
  playSpriteInstanceAnimation(titleSpriteInstanceID, {
    animationID: "title",
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
      // Play player arrow animation
      if (isShootingArrow()) {
        switch (state.values.direction) {
          case XDirection.Left:
            playSpriteInstanceAnimation(playerSpriteInstanceID,{
              animationID: PlayerAnimation.ArrowLeft,
              
            });
            break;
          case XDirection.Right:
            playSpriteInstanceAnimation(playerSpriteInstanceID,{
              animationID: PlayerAnimation.ArrowRight,
              
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation(playerSpriteInstanceID,{
              animationID: PlayerAnimation.ArrowDown,
              
            });
            break;
          case YDirection.Up:
            playSpriteInstanceAnimation(playerSpriteInstanceID,{
              animationID: PlayerAnimation.ArrowUp,
              
            });
            break;
        }
      }
      // Play player walk animation
      else if (isEntityInstanceMoving(state.values.playerEntityInstanceID)) {
        switch (state.values.direction) {
          case XDirection.Left:
            playSpriteInstanceAnimation(playerSpriteInstanceID,{
              animationID: PlayerAnimation.WalkLeft,
              
            });
            break;
          case XDirection.Right:
            playSpriteInstanceAnimation(playerSpriteInstanceID,{
              animationID: PlayerAnimation.WalkRight,
              
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation(playerSpriteInstanceID,{
              animationID: PlayerAnimation.WalkDown,
              
            });
            break;
          case YDirection.Up:
            playSpriteInstanceAnimation(playerSpriteInstanceID,{
              animationID: PlayerAnimation.WalkUp,
              
            });
            break;
        }
      }
      // Play player idle animation
      else {
        switch (state.values.direction) {
          case XDirection.Left:
            playSpriteInstanceAnimation(playerSpriteInstanceID,{
              animationID: PlayerAnimation.IdleLeft,
            });
            break;
          case XDirection.Right:
            playSpriteInstanceAnimation(playerSpriteInstanceID,{
              animationID: PlayerAnimation.IdleRight,
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation(playerSpriteInstanceID,{
              animationID: PlayerAnimation.IdleDown,
            });
            break;
          case YDirection.Up:
            playSpriteInstanceAnimation(playerSpriteInstanceID,{
              animationID: PlayerAnimation.IdleUp,
            });
            break;
        }
      }
      // Play arrow animations
      for (const arrow of state.values.arrows) {
        switch (arrow.shootDirection) {
          case XDirection.Left:
            playSpriteInstanceAnimation(arrow.spriteInstanceID,{
              animationID: ArrowAnimation.ShootLeft
            });
            break;
          case XDirection.Right:
            playSpriteInstanceAnimation(arrow.spriteInstanceID,{
              animationID: ArrowAnimation.ShootRight
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation(arrow.spriteInstanceID,{
              animationID: ArrowAnimation.ShootDown
            });
            break;
          case YDirection.Up:
            playSpriteInstanceAnimation(arrow.spriteInstanceID,{
              animationID: ArrowAnimation.ShootUp
            });
            break;
        }
      }
    }
  });
};