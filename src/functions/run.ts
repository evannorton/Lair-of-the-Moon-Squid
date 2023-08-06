import {
  init,
  onTick,
  playSpriteInstanceAnimation,
} from "pigeon-mode-game-framework";
import { tick } from "./tick";
import { titleSpriteInstanceID } from "../game/title/spriteInstances";

export const run = (): void => {
  console.log("Moon Squid is running!");
  init();
  playSpriteInstanceAnimation(titleSpriteInstanceID, {
    animationID: "title",
  });
  onTick(tick);
};
