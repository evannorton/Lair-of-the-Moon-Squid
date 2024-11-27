import { Monster } from "../classes/Monster";
import { getDefinable } from "definables";
import { state } from "../state";

export const wanderMonsterAtSquidHead = (monsterID: string): void => {
  if (state.values.squidHeadMonsterID === null) {
    throw new Error(
      "Attempted to wander monster at squid head with no squid head monster ID.",
    );
  }
  const monster: Monster = getDefinable(Monster, monsterID);
  monster.wander(state.values.squidHeadMonsterID, 2, 0);
};
