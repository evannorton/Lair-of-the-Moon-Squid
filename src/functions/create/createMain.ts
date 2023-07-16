import { ArrowAnimation, PlayerAnimation, arrowSpriteID } from "../../sprites";
import {
  EntityInstanceData,
  createInputPressHandler,
  createInputTickHandler,
  createSpriteInstance,
  getEntityInstanceData,
  getInputTickHandlerGroupID,
  moveEntityInstance,
  onTick,
  playSpriteInstanceAnimation,
  spawnEntityInstance,
  stopEntityInstance,
} from "pigeon-mode-game-library";
import { XDirection, YDirection } from "../../types/Direction";
import state from "../../state";

const isMainGameOngoing = (): boolean => !state.values.isAtTitle;
const createMain = (): void => {
  createInputPressHandler({
    condition: (): boolean => isMainGameOngoing(),
    gamepadButtons: [0],
    keys: ["KeyZ"],
    leftClick: true,
    onInput: (): void => {
      if (state.values.playerEntityInstanceID === null) {
        throw new Error("A sword input was received with no player entity.");
      }
      console.log("swing sword");
    },
  });
  createInputPressHandler({
    condition: (): boolean => isMainGameOngoing(),
    gamepadButtons: [1],
    keys: ["KeyX"],
    onInput: (): void => {
      if (state.values.playerEntityInstanceID === null) {
        throw new Error("An arrow input was received with no player entity.");
      }
      const playerEntityData: EntityInstanceData = getEntityInstanceData(
        state.values.playerEntityInstanceID
      );
      let x: number = playerEntityData.x;
      let y: number = playerEntityData.y;
      switch (state.values.direction) {
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
      const arrowSpriteInstanceID: string = createSpriteInstance({
        spriteID: arrowSpriteID,
      });
      const arrowEntityInstanceID: string = spawnEntityInstance({
        entityID: "arrow",
        height: 16,
        layerID: "entities",
        spriteInstanceID: arrowSpriteInstanceID,
        width: 16,
        x,
        y,
      });
      switch (state.values.direction) {
        case XDirection.Left:
          moveEntityInstance(arrowEntityInstanceID, { xVelocity: -64 });
          break;
        case XDirection.Right:
          moveEntityInstance(arrowEntityInstanceID, { xVelocity: 64 });
          break;
        case YDirection.Up:
          moveEntityInstance(arrowEntityInstanceID, { yVelocity: -64 });
          break;
        case YDirection.Down:
          moveEntityInstance(arrowEntityInstanceID, { yVelocity: 64 });
          break;
      }
      state.setValues({
        arrows: [
          ...state.values.arrows,
          {
            direction: state.values.direction,
            entityInstanceID: arrowEntityInstanceID,
            spriteInstanceID: arrowSpriteInstanceID,
          },
        ],
      });
    },
    rightClick: true,
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
    if (isMainGameOngoing()) {
      if (state.values.playerEntityInstanceID === null) {
        throw new Error(
          "A tick was attempted in the main state with no player entity instance."
        );
      }
      if (state.values.playerSpriteInstanceID === null) {
        throw new Error(
          "A tick was attempted in the main state with no player sprite instance."
        );
      }
      // Stop player entity
      stopEntityInstance(state.values.playerEntityInstanceID, {
        x: true,
        y: true,
      });
      // Move player entity
      const xDirection: XDirection | null =
        getInputTickHandlerGroupID<XDirection>(xInputTickHandlerID);
      const yDirection: YDirection | null =
        getInputTickHandlerGroupID<YDirection>(yInputTickHandlerID);
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
      moveEntityInstance(state.values.playerEntityInstanceID, {
        xVelocity,
        yVelocity,
      });
      // Set player direction
      if (yDirection !== null) {
        state.setValues({ direction: yDirection });
      } else if (xDirection !== null) {
        state.setValues({ direction: xDirection });
      }
      // Play player walk animation
      if (xVelocity !== 0 || yVelocity !== 0) {
        switch (state.values.direction) {
          case XDirection.Left:
            playSpriteInstanceAnimation({
              animationID: PlayerAnimation.WalkLeft,
              spriteInstanceID: state.values.playerSpriteInstanceID,
            });
            break;
          case XDirection.Right:
            playSpriteInstanceAnimation({
              animationID: PlayerAnimation.WalkRight,
              spriteInstanceID: state.values.playerSpriteInstanceID,
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation({
              animationID: PlayerAnimation.WalkDown,
              spriteInstanceID: state.values.playerSpriteInstanceID,
            });
            break;
          case YDirection.Up:
            playSpriteInstanceAnimation({
              animationID: PlayerAnimation.WalkUp,
              spriteInstanceID: state.values.playerSpriteInstanceID,
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
              spriteInstanceID: state.values.playerSpriteInstanceID,
            });
            break;
          case XDirection.Right:
            playSpriteInstanceAnimation({
              animationID: PlayerAnimation.IdleRight,
              spriteInstanceID: state.values.playerSpriteInstanceID,
            });
            break;
          case YDirection.Down:
            playSpriteInstanceAnimation({
              animationID: PlayerAnimation.IdleDown,
              spriteInstanceID: state.values.playerSpriteInstanceID,
            });
            break;
          case YDirection.Up:
            playSpriteInstanceAnimation({
              animationID: PlayerAnimation.IdleUp,
              spriteInstanceID: state.values.playerSpriteInstanceID,
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

export default createMain;
