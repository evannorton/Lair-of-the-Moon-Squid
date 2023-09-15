import { Monster } from "../types/Monster";
import { getCurrentTime } from "pigeon-mode-game-framework";
import { knockbackDuration } from "../constants/knockbackDuration";

export const isMonsterTakingKnockback = (monster: Monster<string>): boolean =>
  monster.hit !== null &&
  getCurrentTime() - monster.hit.time < knockbackDuration;
