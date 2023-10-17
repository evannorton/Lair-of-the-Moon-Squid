import { createAchievement } from "pigeon-mode-game-framework";

export const testAchievementID: string = createAchievement({
  description: "Click through the title screen.",
  imagePath: "achievements/test",
  name: "Test Achievement",
});
