import { createAchievement } from "pixel-pigeon";

export const testAchievement1ID: string = createAchievement({
  description: "Click through the title screen 1.",
  id: "test-1",
  imagePath: "achievements/test",
  name: "Test Achievement 1",
});

export const testAchievement2ID: string = createAchievement({
  description: "Click through the title screen 2.",
  id: "test-2",
  imagePath: "achievements/test",
  name: "Test Achievement 2",
});
