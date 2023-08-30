import { Monster } from "../types/Monster";
import { getCurrentTime } from "pigeon-mode-game-framework";
import { knockbackDuration } from "../constants/knockbackDuration";

export const isMonsterKnockback = (monster: Monster<string>): boolean =>
  monster.hit !== null &&
  getCurrentTime() - monster.hit.time < knockbackDuration;
