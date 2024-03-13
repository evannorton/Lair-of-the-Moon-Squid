import { createQuadrilateral, getGameHeight } from "pixel-pigeon";
import { isMainGameOngoing } from "../conditions";
import { playerMaxHP } from "../constants/playerMaxHP";
import { playerMaxMP } from "../constants/playerMaxMP";
import { state } from "../state";

export const createMainHUD = (): void => {
  const barHeight: number = 8;
  const barWidth: number = 32;
  createQuadrilateral({
    color: "#000000",
    coordinates: {
      condition: isMainGameOngoing,
      x: 2,
      y: getGameHeight() - barHeight - 2,
    },
    height: barHeight,
    width: barWidth,
  });
  createQuadrilateral({
    color: "#e03c28",
    coordinates: {
      condition: isMainGameOngoing,
      x: 2,
      y: getGameHeight() - barHeight - 2,
    },
    height: barHeight,
    width: (): number => {
      let hpBarWidth: number = (state.values.playerHP / playerMaxHP) * barWidth;
      if (hpBarWidth > 0 && hpBarWidth < 1) {
        hpBarWidth = 1;
      }
      if (hpBarWidth < barWidth && hpBarWidth > barWidth - 1) {
        hpBarWidth = barWidth - 1;
      }
      return Math.round(hpBarWidth);
    },
  });
  createQuadrilateral({
    color: "#000000",
    coordinates: {
      condition: isMainGameOngoing,
      x: 2 + barWidth + 2,
      y: getGameHeight() - barHeight - 2,
    },
    height: barHeight,
    width: barWidth,
  });
  createQuadrilateral({
    color: "#0084ff",
    coordinates: {
      condition: isMainGameOngoing,
      x: 2 + barWidth + 2,
      y: getGameHeight() - barHeight - 2,
    },
    height: barHeight,
    width: (): number => {
      let mpBarWidth: number = (state.values.playerMP / playerMaxMP) * barWidth;
      if (mpBarWidth > 0 && mpBarWidth < 1) {
        mpBarWidth = 1;
      }
      if (mpBarWidth < barWidth && mpBarWidth > barWidth - 1) {
        mpBarWidth = barWidth - 1;
      }
      return Math.round(mpBarWidth);
    },
  });
};
