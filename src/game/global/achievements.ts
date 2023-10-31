import { createAchievement } from "pixel-pigeon";

export const testAchievementID: string = createAchievement({
  description: "really epic swag achievement for testing",
  id: "test",
  imagePath: "achievements/test",
  name: "Test Achievement",
  newgroundsMedalID: 75797
});