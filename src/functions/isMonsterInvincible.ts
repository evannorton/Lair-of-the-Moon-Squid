import { Monster } from "../types/Monster";
import { getCurrentTime } from "pixel-pigeon";
import { invincibilityDuration } from "../constants/invincibilityDuration";

export const isMonsterInvincible = (monster: Monster<string>): boolean =>
  monster.hit !== null &&
  getCurrentTime() - monster.hit.time < invincibilityDuration;
