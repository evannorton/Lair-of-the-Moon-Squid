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

export const testLockedAchievementID: string = createAchievement({
  description: "You cannot unlock this xD",
  id: "locked",
  imagePath: "achievements/test",
  name: "Test Locked Achievement",
});

export const testAchievement3ID: string = createAchievement({
  description: "Click through the title screen 3 asdf asdf asdfasdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdfasdfasdf asdf asdf asdfasdf asdf asdf asdf asdf asdf.",
  id: "test-3",
  imagePath: "achievements/test",
  name: "Test Achievement 3 asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdfasdf asdf asdfasdf asdf asdf asdfasdfasdfvasdf    asdf asdf asdf",
});
