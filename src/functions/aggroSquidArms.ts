import { Monster } from "../classes/Monster";
import { getDefinable } from "../definables";
import { state } from "../state";

export const aggroSquidArms = (): void => {
  for (const squidArmMonsterID of state.values.squidArmsMonsterIDs) {
    const monster: Monster = getDefinable(Monster, squidArmMonsterID);
    monster.chasePlayer();
  }
};
