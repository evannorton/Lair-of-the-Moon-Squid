import { createAchievement } from "pixel-pigeon";

export const testAchievementID: string = createAchievement({
  description: "Click through the title screen.",
  imagePath: "achievements/test",
  name: "Test Achievement",
});
