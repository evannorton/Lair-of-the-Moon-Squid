import { Monster } from "../../classes/Monster";
import { Phase } from "../../types/Phase";
import { state } from "../../state";
import { wanderMonsterAtSquidHead } from "../wanderMonsterAtSquidHead";

export const startPhase1 = (): void => {
  const squidHeadMovementSpeed: number = 16;
  const squidArmMovementSpeed: number = 32;
  const squidHead: Monster = new Monster({
    imagePath: "monsters/squid-head",
    movementSpeed: squidHeadMovementSpeed,
    x: 8 * 16,
    y: 3 * 16,
  });
  const squidArms: Monster[] = [
    new Monster({
      imagePath: "monsters/squid-arm",
      movementSpeed: squidArmMovementSpeed,
      x: 6 * 16,
      y: 3 * 16,
    }),
    new Monster({
      imagePath: "monsters/squid-arm",
      movementSpeed: squidArmMovementSpeed,
      x: 7 * 16,
      y: 3 * 16,
    }),
    new Monster({
      imagePath: "monsters/squid-arm",
      movementSpeed: squidArmMovementSpeed,
      x: 9 * 16,
      y: 3 * 16,
    }),
    new Monster({
      imagePath: "monsters/squid-arm",
      movementSpeed: squidArmMovementSpeed,
      x: 10 * 16,
      y: 3 * 16,
    }),
  ];
  state.setValues({
    phase: Phase.Phase1,
    squidArmsMonsterIDs: squidArms.map(
      (squidArm: Monster): string => squidArm.id,
    ),
    squidHeadMonsterID: squidHead.id,
  });
  squidHead.wander(squidHead.id, 1, 0.5);
  for (const squidArm of squidArms) {
    wanderMonsterAtSquidHead(squidArm.id);
  }
};
