import { state } from "./state";

export const isAtTitle = (): boolean => state.values.isAtTitle;
export const isAtGameOver = (): boolean => state.values.playerHP === 0;
export const isMainGameOngoing = (): boolean =>
  isAtTitle() === false && isAtGameOver() === false;
