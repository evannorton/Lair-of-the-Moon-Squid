import { arrowShootDuration } from "../constants/arrowShootDuration";
import { getCurrentTime } from "pixel-pigeon";
import { state } from "../state";

export const isPlayerShootingArrow = (): boolean =>
  state.values.playerShotArrowAt !== null &&
  getCurrentTime() - state.values.playerShotArrowAt < arrowShootDuration;
