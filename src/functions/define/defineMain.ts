import { Level } from "pigeon-mode-game-library";
import state from "../../state";

const defineMain = (): void => {
  new Level({
    file: "test-level",
    condition: (): boolean => !state.values.isAtTitle,
  });
};

export default defineMain;
