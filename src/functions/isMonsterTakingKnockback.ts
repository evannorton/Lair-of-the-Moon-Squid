import { Monster } from "../types/Monster";
import { getCurrentTime } from "pixel-pigeon";
import { knockbackDuration } from "../constants/knockbackDuration";

export const isMonsterTakingKnockback = (monster: Monster<string>): boolean =>
  monster.hit !== null &&
  getCurrentTime() - monster.hit.time < knockbackDuration;
